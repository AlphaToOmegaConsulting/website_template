#!/usr/bin/env node
/**
 * Script de validation de la configuration des agents Claude
 * Vérifie la cohérence entre les fichiers de configuration et les définitions d'agents
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const CLAUDE_DIR = '.claude';
const AGENTS_DIR = join(CLAUDE_DIR, 'agents');

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message: string) {
  log(`❌ ${message}`, 'red');
}

function success(message: string) {
  log(`✅ ${message}`, 'green');
}

function warning(message: string) {
  log(`⚠️  ${message}`, 'yellow');
}

function info(message: string) {
  log(`ℹ️  ${message}`, 'blue');
}

interface Agent {
  name: string;
  description: string;
  tools: string[];
  model: string;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Vérifie l'existence des fichiers de configuration
 */
function checkConfigFiles(): ValidationResult {
  const result: ValidationResult = { valid: true, errors: [], warnings: [] };

  const requiredFiles = [
    'settings.local.json',
    'claude_agents_config.json',
    'README.md',
  ];

  const optionalFiles = [
    'agents/orchestrator.md',
    'agents/frontend-astro.md',
    'agents/style-tokens.md',
    'agents/content-collections.md',
    'agents/i18n-fr-en.md',
    'agents/tests-qa.md',
  ];

  info('Vérification des fichiers de configuration...');

  // Fichiers requis
  for (const file of requiredFiles) {
    const path = join(CLAUDE_DIR, file);
    if (existsSync(path)) {
      success(`Fichier présent : ${file}`);
    } else {
      error(`Fichier manquant : ${file}`);
      result.errors.push(`Fichier requis manquant : ${file}`);
      result.valid = false;
    }
  }

  // Fichiers optionnels (agents)
  for (const file of optionalFiles) {
    const path = join(CLAUDE_DIR, file);
    if (existsSync(path)) {
      success(`Agent présent : ${file}`);
    } else {
      warning(`Agent manquant : ${file}`);
      result.warnings.push(`Agent manquant : ${file}`);
    }
  }

  return result;
}

/**
 * Parse les métadonnées d'un agent depuis son fichier .md
 */
function parseAgentMetadata(filePath: string): Agent | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    
    // Extraire le bloc YAML des métadonnées
    const yamlMatch = content.match(/```yaml\n([\s\S]*?)\n```/);
    if (!yamlMatch) {
      return null;
    }

    const yamlContent = yamlMatch[1];
    const lines = yamlContent.split('\n');
    
    const agent: Partial<Agent> = {};
    
    for (const line of lines) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      
      if (key.trim() === 'name') {
        agent.name = value;
      } else if (key.trim() === 'description') {
        agent.description = value;
      } else if (key.trim() === 'tools') {
        // Parse array format: [Read, Write, Edit]
        const toolsMatch = value.match(/\[(.*?)\]/);
        if (toolsMatch) {
          agent.tools = toolsMatch[1].split(',').map(t => t.trim());
        }
      } else if (key.trim() === 'model') {
        agent.model = value;
      }
    }

    return agent as Agent;
  } catch (err) {
    return null;
  }
}

/**
 * Vérifie la cohérence entre agents et configuration
 */
function checkAgentsConsistency(): ValidationResult {
  const result: ValidationResult = { valid: true, errors: [], warnings: [] };

  info('\nVérification de la cohérence des agents...');

  const agentFiles = [
    'orchestrator.md',
    'frontend-astro.md',
    'style-tokens.md',
    'content-collections.md',
    'i18n-fr-en.md',
    'tests-qa.md',
  ];

  // Charger la configuration MCP
  let mcpConfig: any;
  try {
    const configPath = join(CLAUDE_DIR, 'claude_agents_config.json');
    mcpConfig = JSON.parse(readFileSync(configPath, 'utf-8'));
  } catch (err) {
    error('Impossible de lire claude_agents_config.json');
    result.errors.push('Configuration MCP illisible');
    result.valid = false;
    return result;
  }

  // Charger les permissions
  let permissions: any;
  try {
    const permPath = join(CLAUDE_DIR, 'settings.local.json');
    permissions = JSON.parse(readFileSync(permPath, 'utf-8'));
  } catch (err) {
    error('Impossible de lire settings.local.json');
    result.errors.push('Permissions illisibles');
    result.valid = false;
    return result;
  }

  for (const agentFile of agentFiles) {
    const agentPath = join(AGENTS_DIR, agentFile);
    
    if (!existsSync(agentPath)) {
      warning(`Agent manquant : ${agentFile}`);
      continue;
    }

    const agent = parseAgentMetadata(agentPath);
    
    if (!agent) {
      error(`Impossible de parser les métadonnées de ${agentFile}`);
      result.errors.push(`Métadonnées invalides : ${agentFile}`);
      result.valid = false;
      continue;
    }

    // Vérifier présence dans MCP config
    const agentName = agent.name;
    if (!mcpConfig.mcpServers || !mcpConfig.mcpServers[agentName]) {
      error(`Agent ${agentName} absent de claude_agents_config.json`);
      result.errors.push(`Agent ${agentName} absent de la config MCP`);
      result.valid = false;
    } else {
      success(`Agent ${agentName} présent dans la config MCP`);
    }

    // Vérifier présence dans permissions
    if (!permissions.agents || !permissions.agents[agentName]) {
      warning(`Agent ${agentName} absent de settings.local.json`);
      result.warnings.push(`Agent ${agentName} absent des permissions`);
    } else {
      success(`Agent ${agentName} présent dans les permissions`);
    }

    // Vérifier cohérence bash_access
    const hasBashTool = agent.tools.includes('Bash');
    const hasBashPermission = permissions.agents?.[agentName]?.bash_access === true;

    if (hasBashTool && !hasBashPermission) {
      error(`Agent ${agentName} a l'outil Bash mais pas la permission bash_access`);
      result.errors.push(`Incohérence bash_access : ${agentName}`);
      result.valid = false;
    } else if (!hasBashTool && hasBashPermission) {
      warning(`Agent ${agentName} a bash_access mais pas l'outil Bash déclaré`);
      result.warnings.push(`bash_access inutile : ${agentName}`);
    }

    // Vérifier que seul tests-qa a bash_access
    if (hasBashPermission && agentName !== 'tests-qa') {
      error(`Agent ${agentName} a bash_access alors que seul tests-qa devrait l'avoir`);
      result.errors.push(`bash_access non autorisé : ${agentName}`);
      result.valid = false;
    }
  }

  return result;
}

/**
 * Vérifie les règles de sécurité
 */
function checkSecurityRules(): ValidationResult {
  const result: ValidationResult = { valid: true, errors: [], warnings: [] };

  info('\nVérification des règles de sécurité...');

  let permissions: any;
  try {
    const permPath = join(CLAUDE_DIR, 'settings.local.json');
    permissions = JSON.parse(readFileSync(permPath, 'utf-8'));
  } catch (err) {
    error('Impossible de lire settings.local.json');
    result.errors.push('Permissions illisibles');
    result.valid = false;
    return result;
  }

  // Vérifier les commandes dangereuses dans deny
  const dangerousCommands = ['rm -rf', 'git push --force', 'npm publish'];
  const deniedCommands = permissions.permissions?.deny || [];

  for (const cmd of dangerousCommands) {
    if (!deniedCommands.some((d: string) => d.includes(cmd))) {
      warning(`Commande dangereuse non bloquée : ${cmd}`);
      result.warnings.push(`Commande dangereuse non bloquée : ${cmd}`);
    } else {
      success(`Commande dangereuse bloquée : ${cmd}`);
    }
  }

  // Vérifier que git push nécessite confirmation
  const askCommands = permissions.permissions?.ask || [];
  if (!askCommands.some((a: string) => a.includes('git push'))) {
    warning('git push ne nécessite pas de confirmation');
    result.warnings.push('git push devrait être dans "ask"');
  } else {
    success('git push nécessite confirmation');
  }

  return result;
}

/**
 * Fonction principale
 */
function main() {
  log('\n🔍 Audit de la configuration des agents Claude\n', 'blue');

  const results: ValidationResult[] = [];

  results.push(checkConfigFiles());
  results.push(checkAgentsConsistency());
  results.push(checkSecurityRules());

  // Rapport final
  log('\n' + '='.repeat(60), 'blue');
  log('📊 RAPPORT FINAL', 'blue');
  log('='.repeat(60) + '\n', 'blue');

  const totalErrors = results.reduce((sum, r) => sum + r.errors.length, 0);
  const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);
  const allValid = results.every(r => r.valid);

  if (allValid) {
    success('✅ Configuration VALIDE - Aucune erreur critique');
  } else {
    error(`❌ Configuration INVALIDE - ${totalErrors} erreur(s) critique(s)`);
  }

  if (totalWarnings > 0) {
    warning(`⚠️  ${totalWarnings} avertissement(s)`);
  }

  log('\nDétails :', 'blue');
  
  for (const result of results) {
    if (result.errors.length > 0) {
      log('\nErreurs critiques :', 'red');
      result.errors.forEach(err => error(`  - ${err}`));
    }
    if (result.warnings.length > 0) {
      log('\nAvertissements :', 'yellow');
      result.warnings.forEach(warn => warning(`  - ${warn}`));
    }
  }

  log('\n' + '='.repeat(60) + '\n', 'blue');

  process.exit(allValid ? 0 : 1);
}

main();
