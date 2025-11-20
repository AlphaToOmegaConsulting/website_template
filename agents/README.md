# 🤖 Agents Alpha WebCore

Cette équipe d'agents IA spécialisés garantit la qualité, la conformité et la cohérence du template Alpha WebCore.

---

## 📋 Vue d'Ensemble

**Architecture :** 1 Orchestrateur + 6 Agents Spécialisés

```
Orchestrateur (Tech Lead)
    ├─ Agent Frontend Astro
    ├─ Agent i18n FR/EN
    ├─ Agent Contenu Collections
    ├─ Agent Style/Tokens
    ├─ Agent Tests & QA
    └─ Agent Documentation
```

---

## 🎯 Les Agents

### 1. [Orchestrateur](orchestrator.md) – Tech Lead
**Rôle :** Coordinateur, gardien du Corpus, politique de non-violation

**Responsabilités :**
- Lire le Corpus Fonctionnel avant toute action
- Analyser les demandes utilisateur
- Déléguer aux agents spécialisés
- Vérifier la conformité
- Exercer un VETO sur les violations

**Outils :** Read, Glob, Task
**MCP :** context7, sequential-thinking

---

### 2. [Agent Frontend Astro](frontend-astro.md)
**Rôle :** Spécialiste des composants Astro (pages, sections, primitives)

**Responsabilités :**
- Créer/modifier pages (FR + EN)
- Créer/modifier sections
- Créer/modifier primitives
- Gérer layouts et navigation
- Garantir buildUrl() partout

**Outils :** Read, Write, Edit, Glob, Grep
**MCP :** filesystem, github, context7, sequential-thinking

**Limites strictes :**
- Jamais de page unilingue
- Jamais `/...` dans les href
- Jamais `/assets/...`
- Maximum 6 sections, 5 primitives

---

### 3. [Agent i18n FR/EN](i18n-fr-en.md)
**Rôle :** Gardien de la parité linguistique parfaite

**Responsabilités :**
- Vérifier parité FR/EN (pages, collections)
- Vérifier structures identiques
- Détecter fichiers orphelins
- Vérifier ordre des sections
- Générer rapports de symétrie

**Outils :** Read, Glob, Grep, Edit
**MCP :** filesystem, github, context7, sequential-thinking

**Limites strictes :**
- Jamais accepter de page/collection unilingue
- Jamais accepter de divergence structurelle

---

### 4. [Agent Contenu Collections](content-collections.md)
**Rôle :** Spécialiste des Content Collections

**Responsabilités :**
- Créer/modifier collections pages, sections, events
- Garantir conformité Zod
- Garantir parité FR/EN
- Routes logiques uniquement (`"/about"`)
- Assets relatifs uniquement (`"logo.png"`)

**Outils :** Read, Write, Edit, Glob, Grep
**MCP :** filesystem, github, context7, sequential-thinking

**Limites strictes :**
- Jamais buildUrl() dans le contenu (routes logiques uniquement)
- Jamais `/assets/...` dans le contenu (noms relatifs uniquement)
- Jamais de HTML dans le contenu

---

### 5. [Agent Style/Tokens](style-tokens.md)
**Rôle :** Spécialiste du style visuel

**Responsabilités :**
- Modifier tokens CSS (couleurs, typo, espacements)
- Modifier classes Tailwind
- Maintenir neutralité et minimalisme
- Garantir accessibilité visuelle

**Outils :** Read, Edit, Glob
**MCP :** filesystem, github, context7, sequential-thinking

**Limites strictes :**
- Jamais de design system complexe
- Jamais de thèmes multiples
- Jamais `/assets/...` dans les backgrounds
- Jamais d'animations lourdes

---

### 6. [Agent Tests & QA](tests-qa.md)
**Rôle :** Gardien de la qualité

**Responsabilités :**
- Exécuter scripts de validation (validate:source, validate:build, validate:links, check-links)
- Exécuter tests unitaires (Vitest)
- Exécuter tests E2E (Playwright)
- Créer/modifier tests si nécessaire
- Bloquer si tests < 100% verts

**Outils :** Read, Write, Edit, Glob, Bash
**MCP :** filesystem, github, netlify, playwright, sequential-thinking

**Limites strictes :**
- Jamais modifier le code source pour "passer les tests"
- Jamais désactiver un test sans validation
- Jamais accepter < 100% vert

---

### 7. [Agent Documentation](docs-functional.md)
**Rôle :** Mainteneur de la documentation fonctionnelle

**Responsabilités :**
- Mettre à jour Corpus, Référentiels, How-To
- Garantir cohérence entre code et docs
- Maintenir terminologie cohérente
- Ne jamais documenter de violation

**Outils :** Read, Edit, Glob, Grep
**MCP :** context7, filesystem, github, sequential-thinking

**Limites strictes :**
- Jamais modifier le code
- Jamais documenter une fonctionnalité interdite par le Corpus
- Jamais créer de contradiction entre documents

---

## 🔧 Serveurs MCP du Projet

Le projet utilise les serveurs MCP suivants :

### MCP Disponibles

- **`filesystem`** : Lecture/écriture locale du projet
- **`github`** : Accès API GitHub (branches, PR, historique, fichiers)
- **`netlify`** : Déploiement, logs, diagnostics
- **`playwright`** : Tests E2E
- **`context7`** : Récupération et synthèse du contexte
- **`sequential-thinking`** : Raisonnement étape par étape

### Répartition MCP par Agent

| Agent | MCP Autorisés | Raison |
|-------|---------------|--------|
| **Orchestrateur** | `context7`, `sequential-thinking` | Coordination et planification uniquement |
| **Frontend Astro** | `filesystem`, `github`, `context7`, `sequential-thinking` | Création/modification composants |
| **i18n FR/EN** | `filesystem`, `github`, `context7`, `sequential-thinking` | Vérification et correction parité |
| **Content Collections** | `filesystem`, `github`, `context7`, `sequential-thinking` | Gestion du contenu structuré |
| **Style/Tokens** | `filesystem`, `github`, `context7`, `sequential-thinking` | Modification des styles |
| **Tests & QA** | `filesystem`, `github`, `netlify`, `playwright`, `sequential-thinking` | Exécution et diagnostic complets |
| **Documentation** | `context7`, `filesystem`, `github`, `sequential-thinking` | Maintenance documentation |

**Règle importante :** Chaque agent ne doit utiliser **QUE** les MCP listés pour son rôle. Toute tentative d'utiliser un MCP non autorisé doit être refusée.

---

## 🔄 Workflows Types

### Workflow 1 : Ajouter une page

```
1. Orchestrateur
   └─ Lit Corpus section "RÈGLES PAGES"
   └─ Délègue aux agents

2. Agent Frontend
   └─ Crée fr/page.astro + en/page.astro

3. Agent i18n
   └─ Vérifie parité FR/EN

4. Agent Contenu
   └─ Crée collections pages + sections (FR + EN)

5. Agent Tests
   └─ Exécute validate:source, build, validate:build, check-links, tests

6. Agent Docs
   └─ Met à jour référentiel si nécessaire

7. Orchestrateur
   └─ Validation finale ✅
```

### Workflow 2 : Modifier les couleurs

```
1. Orchestrateur
   └─ Lit Corpus section "RÈGLES STYLE"
   └─ Délègue

2. Agent Style
   └─ Édite src/styles/tokens.css

3. Agent Tests
   └─ Vérifie accessibilité (contrastes)

4. Orchestrateur
   └─ Validation finale ✅
```

### Workflow 3 : Demande interdite (ex: carrousel)

```
1. Orchestrateur
   └─ Lit Corpus section "Anti-Over-Engineering"
   └─ Détecte violation
   └─ REFUSE + explique
```

---

## 📚 Documents de Référence

**Source de vérité absolue :**
- [Corpus Fonctionnel](../docs/CORPUS_FONCTIONNEL_AGENTS_READY.md)

**Documentation :**
- [Spécifications v4](../docs/specifications_webcore_v_4.md)
- [Référentiel Sections/Primitives/Collections](../docs/referentiel_sections_primitives_collections.md)
- [Documentation des Tests](../docs/documentation_des_tests.md)
- [Plan d'Équipe Agents](../docs/PLAN_EQUIPE_AGENTS.md)

**How-To :**
- [Ajouter une Page](../docs/how_to_ajouter_page.md)
- [Ajouter une Section](../docs/how_to_ajouter_section.md)
- [Ajouter une Primitive](../docs/how_to_ajouter_primitive.md)
- [Modifier du Contenu](../docs/how_to_modifier_contenu.md)
- [Modifier le Style](../docs/how_to_modifier_style.md)

---

## ✅ Les 6 Principes Immuables

Tous les agents doivent respecter :

1. ✅ **Parité FR/EN obligatoire**
2. ✅ **Tous les liens internes passent par `buildUrl()`**
3. ✅ **Aucun asset ne commence par `/assets/...`**
4. ✅ **Tout doit fonctionner en sous-dossier (base path)**
5. ✅ **Les tests sont obligatoires (100% verts)**
6. ✅ **Architecture simple : Pages → Sections → Primitives → Contenu**

**Aucune exception. Aucun compromis.**

---

## 🚀 Utilisation avec Claude Code

### Méthode 1 : Via l'Orchestrateur (recommandé)

```
Demande utilisateur → Orchestrateur
  → Orchestrateur lit le Corpus
  → Orchestrateur délègue aux agents spécialisés
  → Validation finale
```

**Avantage :** Respect garanti du Corpus, coordination automatique.

### Méthode 2 : Agent direct (cas simples)

```
Demande très spécifique → Agent spécialisé
  → Agent lit son fichier .md
  → Agent exécute la tâche
  → Agent relaye à l'Orchestrateur
```

**Utiliser uniquement pour :** tâches très ciblées (ex: "vérifier parité FR/EN").

---

## 🔐 Règles de Coordination

1. **Toute action commence par l'Orchestrateur**
2. **Aucun agent ne travaille seul** (sauf demande explicite)
3. **Les tests sont TOUJOURS exécutés** après modifications
4. **L'Orchestrateur a un VETO absolu** sur les violations
5. **Parité FR/EN vérifiée** sur TOUTE modification
6. **Agent Tests bloque** si < 100% vert
7. **Agent Docs synchronise** après modifications structurelles

---

## 📊 Matrice de Responsabilités

| Tâche | Orchestrateur | Frontend | i18n | Contenu | Style | Tests | Docs |
|-------|:-------------:|:--------:|:----:|:-------:|:-----:|:-----:|:----:|
| Ajouter page | ✅ Coordonne | ✅ Exécute | ✅ Valide | ✅ Exécute | - | ✅ Valide | ✅ MAJ |
| Ajouter section | ✅ Coordonne | ✅ Exécute | ✅ Valide | ✅ Exécute | - | ✅ Valide | ✅ MAJ |
| Ajouter primitive | ✅ Coordonne | ✅ Exécute | - | - | ✅ Participe | ✅ Valide | ✅ MAJ |
| Modifier contenu | ✅ Coordonne | - | ✅ Valide | ✅ Exécute | - | ✅ Valide | - |
| Modifier style | ✅ Coordonne | - | - | - | ✅ Exécute | ✅ Valide | - |
| Exécuter tests | ✅ Ordonne | - | - | - | - | ✅ Exécute | - |
| Refus violation | ✅ VETO | - | - | - | - | - | - |

---

## 🎯 Prochaines Étapes

1. **Tester l'Orchestrateur** avec une demande simple
2. **Vérifier la coordination** entre agents
3. **Ajuster les prompts** si nécessaire
4. **Documenter les cas d'usage** réels

---

## 💬 Support

Pour toute question sur les agents :
- Consulter le [Corpus Fonctionnel](../docs/CORPUS_FONCTIONNEL_AGENTS_READY.md)
- Consulter le [Plan d'Équipe](../docs/PLAN_EQUIPE_AGENTS.md)
- Relire le fichier `.md` de l'agent concerné

**Les agents sont au service du Corpus. Le Corpus est la source de vérité absolue.**
