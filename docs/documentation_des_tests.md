# Documentation des Tests – Alpha WebCore

> **Objectif :** Décrire de manière 100% fonctionnelle le rôle des tests, leur périmètre, leur comportement attendu, les scripts de validation, les cas où ils doivent être mis à jour, et les checklists officielles.**
>
> Cette documentation ne décrit pas le code. Elle définit **ce que les tests doivent garantir** pour assurer la qualité, la stabilité et la conformité du template Alpha WebCore.

---
# 1. Rôle global des tests
La suite de tests garantit :
- le bon fonctionnement du template dans **toutes les langues** (FR/EN) ;
- la compatibilité totale avec le **base path** (déploiement en sous-dossier, GitHub Pages) ;
- l’absence de liens cassés ;
- la conformité des collections de contenu ;
- la validité des structures i18n ;
- le bon fonctionnement des primitives UI ;
- l’accessibilité AA ;
- la stabilité du site après tout ajout ou modification.

Les tests sont un **pilier obligatoire** : aucun changement ne peut être accepté si les tests ne sont pas 100% verts.

---
# 2. Types de tests dans le template

## 2.1 Tests unitaires (Vitest)
Ils vérifient :
- les primitives UI (Button, ButtonLink, Card, Input, Dialog) ;
- les classes et variants ;
- l’accessibilité de base ;
- le bon typage des props ;
- la validation des Content Collections.

**Objectif fonctionnel :** garantir que l’UI est stable, simple, neutre et prédictible.

---
## 2.2 Tests de validation (Collections + i18n)
Les tests vérifient :
- la symétrie parfaite FR/EN ;
- l’absence de fichiers obsolètes ;
- la conformité aux schémas Zod ;
- l’absence de types non valides ;
- l’absence de contenu TWT ;
- l’intégrité des structures.

**Objectif fonctionnel :** le contenu doit toujours être propre, conforme, et identique entre les langues.

---
## 2.3 Tests E2E (Playwright)
Ils testent :
- la navigation ;
- le language-switcher ;
- les routes FR/EN ;
- le fonctionnement du site **avec base path simulé** ;
- l’accessibilité (axe-core) ;
- les liens internes ;
- l’affichage des sections dans les pages.

**Objectif fonctionnel :** simuler exactement l’expérience utilisateur en production.

---
# 3. Scripts de validation (pipeline qualité)
Ces scripts sont essentiels : ils assurent la conformité du site **avant même l’exécution des tests**.

## 3.1 `validate:source`
Objectif : détecter **dans le code source** les violations suivantes :
- présence de liens internes écrits en dur (`href="/..."`) ;
- présence d’assets absolus (`/assets/...`).

Ce script doit échouer si :
- une URL interne commence par `/` ;
- un CTA est incorrect ;
- une section contient un lien écrit à la main.

---
## 3.2 `validate:build`
Objectif : analyser le **site généré** (`dist/`) et détecter des liens cassés ou incorrectement préfixés.

Ce script doit échouer si :
- une URL interne ne respecte pas le BASE_URL ;
- des assets ne sont pas accessibles ;
- une page génère une URL invalide.

---
## 3.3 `validate:links`
Objectif : pipeline complet
```
validate:source → build → validate:build
```
Il est exécuté en une seule commande.

---
## 3.4 `check-links`
Objectif : vérifier les liens du site final généré.
- URLs internes → doivent fonctionner
- URLs externes → doivent répondre 200

Ce script doit être relancé **à chaque ajout ou modification de page, de section, de primitive ou de contenu**.

---
# 4. Périmètre fonctionnel des tests
Chaque catégorie de tests couvre des aspects précis du fonctionnement du template.

## 4.1 Périmètre navigation
Les tests doivent vérifier :
- Header ;
- Footer ;
- Navigation ;
- LanguageSwitcher ;
- Cohérence FR/EN ;
- Aucune page 404 imprévue.

## 4.2 Périmètre base path
Obligation fonctionnelle :
- les E2E doivent simuler un site servi depuis `/repository-name/` ;
- aucune URL interne ne doit casser ;
- les assets doivent être chargés ;
- aucun lien ne doit commencer par `/...`.

## 4.3 Périmètre accessibilité
Les tests doivent garantir :
- contraste correct ;
- structure sémantique ;
- labels corrects pour les inputs ;
- focus visibles ;
- absence de violations WCAG.

## 4.4 Périmètre contenus
Les tests doivent vérifier :
- symétrie parfaite FR/EN ;
- présence des deux langues ;
- absence de fichiers obsolètes ;
- conformité Zod ;
- cohérence entre les pages et sections.

---
# 5. Quand mettre à jour les tests ?
Voici **tous les cas** où un agent doit mettre à jour les tests.

## 5.1 Ajout ou modification d’une page
Impact :
- nouvelles routes FR/EN,
- navigation modifiée,
- sections affichées modifiées.

Tests à mettre à jour :
- E2E navigation,
- E2E routes,
- tests FR/EN.

## 5.2 Ajout ou modification d’une section
Impact :
- contenu FR/EN,
- data des sections,
- UI,
- navigation interne.

Tests à mettre à jour :
- tests unitaires (si primitives utilisées),
- tests i18n ou collections,
- tests E2E (si affichage modifié).

## 5.3 Ajout ou modification d’une primitive
Impact :
- UI,
- accessibilité,
- liens internes.

Tests à mettre à jour :
- tests unitaires,
- tests accessibilité,
- validate:source,
- validate:build.

## 5.4 Ajout ou modification d’un asset
Impact :
- base path,
- chargement des images,
- liens.

Tests à relancer :
- validate:build,
- check-links,
- tests E2E.

## 5.5 Modification du style
Impact :
- UI,
- lisibilité,
- accessibilité.

Tests à relancer :
- accessibilité E2E,
- tests unitaires (si primitives modifiées),
- validate:source (si liens).

---
# 6. Checklists officielles

## 6.1 Checklist "Aucun lien cassé"
- [ ] Aucun lien interne `href="/..."`
- [ ] Aucun chemin d’asset `/assets/...`
- [ ] Tous les liens internes passent par `buildUrl()`
- [ ] validate:source OK
- [ ] validate:build OK
- [ ] validate:links OK
- [ ] check-links OK

## 6.2 Checklist "Contenu conforme"
- [ ] Fichiers FR/EN présents
- [ ] Structures FR/EN identiques
- [ ] Validation Zod OK
- [ ] Pas de fichiers obsolètes
- [ ] Tests des collections OK

## 6.3 Checklist "Navigation"
- [ ] Navigation Header/Footers conforme
- [ ] Routes FR/EN présentes
- [ ] Switcher FR/EN fonctionnel
- [ ] E2E navigation OK

## 6.4 Checklist "Base path"
- [ ] Simulation E2E base path OK
- [ ] Toutes les URLs correctement préfixées
- [ ] Aucune image cassée
- [ ] Aucun lien absolu

## 6.5 Checklist "Accessibilité"
- [ ] Tests axe-playwright OK
- [ ] Contrastes conformes
- [ ] Focus visibles
- [ ] Formulaires accessibles

## 6.6 Checklist "UI et primitives"
- [ ] Primitives testées unitairement
- [ ] Variants valides
- [ ] Tailles cohérentes
- [ ] Accessibilité intégrée

---
# 7. Résumé
La suite de tests est conçue pour garantir :
- la stabilité du template,
- la neutralité du design,
- la compatibilité totale base path,
- la parité parfaite FR/EN,
- l’absence de liens cassés,
- la qualité de l’accessibilité,
- la cohérence du contenu,
- la fiabilité des primitives.

Toute modification doit déclencher :
1. Exécution des scripts de validation,
2. Exécution de tous les tests,
3. Analyse des erreurs,
4. Mise à jour des tests si nécessaire.

Ce document est la **référence fonctionnelle officielle** de la stratégie de tests du template Alpha WebCore.

