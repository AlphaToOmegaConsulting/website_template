# 🤖 Agents Claude - Alpha WebCore

> **Guide minimal d'utilisation des agents spécialisés**

---

## 📋 Installation (3 étapes)

### 1. Valider la configuration

```powershell
npx tsx .claude/validate-config.ts
```

### 2. Installer la config MCP

**Windows (Claude Desktop) :**
```powershell
Copy-Item .claude\claude_agents_config.json $env:APPDATA\Claude\claude_desktop_config.json
Stop-Process -Name "Claude" -Force -ErrorAction SilentlyContinue
```

**VS Code :**
```powershell
New-Item -ItemType Directory -Path .vscode -Force
Copy-Item .claude\claude_agents_config.json .vscode\mcp.json
```

### 3. Tester

```
@orchestrator Lis le Corpus et liste les 6 règles immuables
```

---

## 🎯 Les 6 Agents

| Agent | Rôle |
|-------|------|
| **orchestrator** | Tech Lead - coordonne, lit le Corpus, délègue, VETO |
| **frontend-astro** | Pages, sections, primitives Astro |
| **i18n-fr-en** | Parité FR/EN obligatoire |
| **content-collections** | Content Collections (pages, sections, events) |
| **style-tokens** | Tokens CSS, Tailwind |
| **tests-qa** | Tests, validations, accessibilité - BLOQUE si < 100% |

---

## ✅ Les 6 Règles Immuables

1. **Parité FR/EN obligatoire** : toute page, toute collection existe en FR ET EN
2. **Tous les liens via `buildUrl()`** : interdiction absolue de `/...`
3. **Aucun asset `/assets/...`** : utiliser `publicAsset()`
4. **Fonctionne en sous-dossier** : base path, GitHub Pages
5. **Tests 100% verts obligatoires** : aucune exception
6. **Architecture simple** : Pages → Sections → Primitives → Contenu

---

## 🔧 Pattern d'Usage

### Tâche Simple (modification locale)

```
@[agent-spécialisé] [Action précise]
```

**Exemple :**
```
@style-tokens Change la couleur primaire en #3b82f6
```

### Tâche Complexe (multi-agents)

```
@orchestrator [Objectif global]
```

**Exemple :**
```
@orchestrator Crée une page "Services" (FR + EN) avec Hero, Features et CTA
```

**L'Orchestrateur coordonne :** Frontend → Contenu → i18n → Tests

---

## 📝 Workflows Types

### 1. Modifier une couleur (2 min)

```
@orchestrator Change la couleur primaire en #3b82f6 et vérifie les contrastes WCAG AA
```

**Agents :** Orchestrator → Style → Tests

---

### 2. Ajouter un événement (5 min)

```
@orchestrator Ajoute un événement "Webinaire IA" le 15/06/2025 à 14h en ligne
```

**Agents :** Orchestrator → Contenu → i18n → Tests

---

### 3. Créer une page (10 min)

```
@orchestrator Crée une page "Contact" (FR + EN) avec :
- Hero : titre + sous-titre
- CTA : bouton "Nous contacter"

Parité FR/EN stricte, liens via buildUrl()
```

**Agents :** Orchestrator → Frontend → Contenu → i18n → Tests → Docs

---

## ⚠️ Éviter les Pièges

### ❌ Liens en dur

```
<a href="/about">
```

### ✅ Utiliser buildUrl()

```
<a href={buildUrl('/about')}>
```

---

### ❌ Assets absolus

```
background: url('/assets/bg.jpg')
```

### ✅ Utiliser publicAsset()

```
background: url(${publicAsset('bg.jpg')})
```

---

### ❌ Texte en dur

```astro
<h1>Bienvenue sur notre site</h1>
```

### ✅ Contenu dans collections

```astro
<h1>{pageData.title}</h1>
```

---

### ❌ Page unilingue

```
src/pages/fr/test.astro
```

### ✅ Parité FR/EN

```
src/pages/fr/test.astro
src/pages/en/test.astro
```

---

## 🧪 Tests Obligatoires

**Après TOUTE modification :**

```powershell
pnpm validate:source   # Détecte violations code source
pnpm validate:build    # Build OK
pnpm validate:links    # Liens internes OK
pnpm check-links       # Liens externes OK
pnpm test:unit         # Tests unitaires 100%
pnpm test:e2e          # Tests E2E 100%
```

**Ou déléguer :**

```
@tests-qa Exécute la validation complète
```

**Critère de succès :** 🟢 100% vert (AUCUNE exception)

**Si un test échoue :** ❌ BLOQUÉ par l'agent Tests

---

## 🎨 Exemples d'Instructions

### Bonne instruction (précise)

```
@orchestrator Change 3 couleurs :
- Primaire : #3b82f6 (bleu)
- Secondaire : #8b5cf6 (violet)
- Vérifie contrastes WCAG AA
```

**Pourquoi :** Précis, contraintes claires, validation demandée

---

### Mauvaise instruction (vague)

```
Change les couleurs
```

**Problème :** Aucun détail, aucune contrainte

---

## 🚨 Dépannage

### Problème : Agent refuse la tâche

**Solution :**
1. Lire l'explication de refus
2. Consulter le Corpus : `docs/CORPUS_FONCTIONNEL_AGENTS_READY.md`
3. Reformuler en respectant les règles

---

### Problème : Tests échouent

**Solution :**
1. Lire le rapport de l'Agent Tests
2. Identifier la cause (buildUrl manquant ? Parité rompue ?)
3. Corriger
4. Relancer tests

---

### Problème : Parité FR/EN rompue

**Solution :**

```
@i18n-fr-en Vérifie la parité et détecte les orphelins
```

Puis créer les fichiers manquants.

---

### Problème : Build OK local, échoue sur GitHub Pages

**Cause :** Base path incorrect ou liens en dur

**Solution :**

```bash
# Vérifier liens en dur
grep -r 'href="/' src/

# Vérifier /assets/
grep -r '/assets/' src/
```

Puis corriger avec `buildUrl()` et `publicAsset()`.

---

## 📚 Ressources

### Documentation Principale

- **Corpus Fonctionnel** : `docs/CORPUS_FONCTIONNEL_AGENTS_READY.md` (source de vérité)
- **Plan Agents** : `docs/PLAN_EQUIPE_AGENTS.md`
- **How-To** : `docs/how_to_*.md`

### Agents

Fichiers dans `.claude/agents/` :
- `orchestrator.md`
- `frontend-astro.md`
- `i18n-fr-en.md`
- `content-collections.md`
- `style-tokens.md`
- `tests-qa.md`

---

## ✅ Checklist de Démarrage

- [ ] Config MCP installée
- [ ] `validate-config.ts` OK
- [ ] Orchestrateur répond
- [ ] Corpus Fonctionnel lu
- [ ] 6 règles comprises
- [ ] Tests 100% verts

**Si tout est coché → ✅ Prêt !**

---

## 🎯 Les 3 Règles d'Or

1. **Toujours passer par l'Orchestrateur** (tâches complexes)
2. **Toujours vérifier la parité FR/EN** (Agent i18n)
3. **Toujours exécuter les tests** (Agent Tests)

**Aucune exception. Aucun compromis. 100% conforme.**

---

**Version :** 1.0
**Lignes :** ~200
**Dernière MAJ :** 2025-11-19
