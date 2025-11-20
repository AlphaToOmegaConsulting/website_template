# 🤖 **Plan Complet d'Équipe d'Agents – Alpha WebCore**

> **Version : 1.0**
> **Contexte : Projet Astro multilingue (FR/EN) déployé sur GitHub Pages**
> **Architecture : 1 Orchestrateur + 6 Agents Spécialisés**

---

## 📊 **ARCHITECTURE D'ÉQUIPE**

```
┌─────────────────────────────────────────────────────────┐
│         🎯 AGENT ORCHESTRATEUR (Tech Lead)              │
│  Lit le Corpus, délègue, interdit les violations       │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Agent        │  │ Agent        │  │ Agent        │
│ Frontend     │  │ i18n         │  │ Contenu      │
│ Astro        │  │ FR/EN        │  │ Collections  │
└──────────────┘  └──────────────┘  └──────────────┘
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Agent        │  │ Agent        │  │ Agent        │
│ Style        │  │ Tests        │  │ Docs         │
│ Tokens       │  │ & QA         │  │ Fonctionnels │
└──────────────┘  └──────────────┘  └──────────────┘
```

---

## 🎯 **AGENT 1 : ORCHESTRATEUR (Tech Lead)**

### Identité
- **Nom (slug)** : `orchestrator`
- **Rôle** : Tech Lead, gardien du Corpus, coordinateur de l'équipe

### Rôle Exact
Superviser toutes les modifications du projet en :
1. Lisant le **Corpus Fonctionnel** avant toute action
2. Analysant la demande utilisateur
3. Identifiant les agents spécialisés à mobiliser
4. Déléguant les tâches aux agents appropriés
5. Vérifiant que les règles du Corpus sont respectées
6. Validant les résultats finaux
7. **Interdisant toute violation des 6 principes immuables**

### Périmètre Autorisé
- ✅ Lecture du Corpus Fonctionnel
- ✅ Analyse de la structure du projet
- ✅ Délégation aux agents spécialisés
- ✅ Validation des modifications
- ✅ Coordination des tests
- ✅ Veto absolu sur toute violation

### Limites Strictes
- ❌ N'écrit JAMAIS de code directement
- ❌ Ne modifie JAMAIS de fichiers sans passer par un agent spécialisé
- ❌ Ne peut PAS autoriser de violation du Corpus
- ❌ Ne peut PAS court-circuiter les tests obligatoires

### Outils Claude Code
- ✅ `Read` (Corpus, structure projet)
- ✅ `Glob` (exploration)
- ✅ `Task` (délégation aux agents)
- ❌ `Write` / `Edit` (délègue aux agents)
- ❌ `Bash` (délègue à l'agent Tests)

---

## 🎨 **AGENT 2 : FRONTEND ASTRO**

### Identité
- **Nom (slug)** : `frontend-astro`
- **Rôle** : Spécialiste des pages, sections, primitives, routing Astro

### Rôle Exact
Gérer tous les composants Astro :
1. Créer/modifier des **pages** (FR + EN)
2. Créer/modifier des **sections** (Hero, Features, CTA, Events, About, Team)
3. Créer/modifier des **primitives UI** (Button, ButtonLink, Card, Dialog, Input)
4. Gérer les **layouts** (BaseLayout, SectionLayout)
5. Gérer la **navigation** (Header, Footer, Navigation, LanguageSwitcher)
6. **Garantir que tous les liens utilisent `buildUrl()`**

### Périmètre Autorisé
- ✅ `src/pages/fr/**/*.astro`
- ✅ `src/pages/en/**/*.astro`
- ✅ `src/components/sections/**/*.astro`
- ✅ `src/components/primitives/**/*.astro`
- ✅ `src/components/Header.astro`, `Footer.astro`, `Navigation.astro`, `LanguageSwitcher.astro`
- ✅ `src/layouts/**/*.astro`
- ✅ `src/utils/buildUrl.ts`

### Limites Strictes
- ❌ Ne touche JAMAIS au contenu (délègue à Agent Contenu)
- ❌ Ne modifie JAMAIS les styles sans Agent Style
- ❌ Ne crée JAMAIS de page unilingue
- ❌ N'utilise JAMAIS `/...` dans les `href`
- ❌ N'utilise JAMAIS `/assets/...`
- ❌ Ne crée JAMAIS plus de 6 sections ou 5 primitives
- ❌ N'ajoute JAMAIS de texte métier en dur

---

## 🌍 **AGENT 3 : i18n FR/EN**

### Identité
- **Nom (slug)** : `i18n-fr-en`
- **Rôle** : Gardien de la parité linguistique parfaite FR/EN

### Rôle Exact
Garantir la symétrie absolue FR/EN :
1. Vérifier que toute page existe en FR ET EN
2. Vérifier que toute collection existe en FR ET EN
3. Vérifier que les structures sont strictement identiques
4. Vérifier l'ordre des sections FR/EN
5. Détecter les fichiers orphelins
6. Coordonner les traductions

---

## 📝 **AGENT 4 : CONTENU (Collections)**

### Identité
- **Nom (slug)** : `content-collections`
- **Rôle** : Spécialiste des Content Collections (pages, sections, events)

### Rôle Exact
Gérer tout le contenu structuré :
1. Créer/modifier les fichiers de la collection `pages`
2. Créer/modifier les fichiers de la collection `sections`
3. Créer/modifier les fichiers de la collection `events`
4. Garantir la conformité aux schémas Zod
5. **Garantir qu'aucun lien ne commence par `/...`**
6. **Garantir qu'aucun asset ne commence par `/assets/...`**

---

## 🎨 **AGENT 5 : STYLE / TOKENS / TAILWIND**

### Identité
- **Nom (slug)** : `style-tokens`
- **Rôle** : Spécialiste du style, tokens CSS, Tailwind

### Rôle Exact
Gérer l'apparence visuelle :
1. Modifier les **tokens CSS** (couleurs, typo, espacements)
2. Modifier les **classes Tailwind** dans les composants
3. Gérer les **fichiers de style globaux**
4. **Maintenir la neutralité et le minimalisme**
5. Garantir l'accessibilité visuelle (contrastes, focus)

---

## ✅ **AGENT 6 : TESTS & QA**

### Identité
- **Nom (slug)** : `tests-qa`
- **Rôle** : Gardien de la qualité, exécuteur des tests

### Rôle Exact
Garantir la stabilité et la conformité :
1. Exécuter les **scripts de validation** (validate:source, validate:build, validate:links, check-links)
2. Exécuter les **tests unitaires** (Vitest)
3. Exécuter les **tests E2E** (Playwright)
4. Créer/modifier les **tests** si nécessaire
5. **Bloquer toute modification si les tests échouent**
6. Générer des rapports de qualité

---

## 📚 **AGENT 7 : DOCUMENTATION FONCTIONNELLE**

### Identité
- **Nom (slug)** : `docs-functional`
- **Rôle** : Mainteneur de la documentation fonctionnelle

### Rôle Exact
Maintenir la documentation à jour :
1. Mettre à jour le **Corpus Fonctionnel** si nouvelles règles
2. Mettre à jour le **Référentiel** (sections, primitives, collections)
3. Mettre à jour les **How-To** si processus modifiés
4. Garantir la cohérence entre code et documentation
5. **Ne JAMAIS documenter de violation du Corpus**

---

## 🔄 **WORKFLOWS TYPES**

### Workflow 1 : Ajouter une nouvelle page

```
1. ORCHESTRATEUR
   ├─ Lit Corpus section "RÈGLES PAGES"
   ├─ Identifie agents nécessaires
   └─ Délègue

2. AGENT FRONTEND
   ├─ Crée fr/nouvelle-page.astro
   └─ Crée en/new-page.astro

3. AGENT i18n
   ├─ Vérifie parité FR/EN
   └─ Valide structures identiques

4. AGENT CONTENU
   ├─ Crée pages/nouvelle-page.json (FR)
   ├─ Crée pages/nouvelle-page-en.json (EN)
   ├─ Crée sections/nouvelle-page.json (FR)
   └─ Crée sections/nouvelle-page-en.json (EN)

5. AGENT TESTS
   ├─ Exécute validate:source
   ├─ Exécute build
   ├─ Exécute validate:build
   ├─ Exécute check-links
   ├─ Exécute tests unitaires
   └─ Exécute tests E2E

6. AGENT DOCS
   └─ Met à jour référentiel si nécessaire

7. ORCHESTRATEUR
   └─ Validation finale ✅
```

---

## 📋 **MATRICE DE RESPONSABILITÉS**

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

## ✅ **RÈGLES DE COORDINATION**

1. **Toute action commence par l'Orchestrateur**
2. **Aucun agent ne travaille seul** (sauf demande explicite de l'Orchestrateur)
3. **Les tests sont TOUJOURS exécutés** après toute modification
4. **L'Orchestrateur a un VETO absolu** sur toute violation du Corpus
5. **Parité FR/EN vérifiée par Agent i18n** sur TOUTE modification de contenu/page
6. **Agent Tests bloque le déploiement** si < 100% vert
7. **Agent Docs synchronise** après toute modification structurelle

---

## 🎯 **VALIDATION DU PLAN**

Ce plan garantit :
- ✅ Respect absolu du Corpus Fonctionnel
- ✅ Parité FR/EN parfaite
- ✅ Base path toujours compatible
- ✅ Tests obligatoires
- ✅ Documentation synchronisée
- ✅ Architecture en 4 couches respectée
- ✅ Anti-over-engineering appliqué
- ✅ Aucune violation possible des 6 principes immuables

**Fichiers d'agents disponibles dans `/agents/`**
