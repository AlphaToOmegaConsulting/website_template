# How-To – Ajouter une Section

> **Objectif :** Décrire précisément, de manière 100% fonctionnelle, comment ajouter une nouvelle section au template Alpha WebCore, en respectant toutes les règles transversales : FR/EN, base path, liens internes, assets, collections, orchestration dans les pages et tests.

Ce document explique **le processus**, **les responsabilités**, et **les contrôles qualité obligatoires**. Aucun code technique n’est décrit.

---
# 1. Rôle d’une Section
Une section est un **bloc de page réutilisable** (Hero, Features, CTA…). Elle doit rester :
- générique,
- neutre,
- flexible,
- simple,
- indépendante du contenu métier.

**Une section n’a jamais de texte en dur** : tout vient des content collections.

---
# 2. Étape 1 – Créer la section (composant UI)
Même si ce document reste fonctionnel, tu dois savoir qu’une section est un composant affichant :
- de la mise en page,
- des primitives,
- des données reçues en props.

Règles fonctionnelles :
- la section doit recevoir toutes ses données en props,
- aucune image / texte / lien ne doit être codé en dur,
- si la section contient des CTA ou liens : **ils doivent obligatoirement utiliser `buildUrl()`**.

---
# 3. Étape 2 – Créer les fichiers de contenu FR et EN
Chaque nouvelle section utilisée dans une page doit avoir **sa configuration dans les content collections**, en deux versions :
```
src/content/sections/
  ├── nouvelle-section.json       (FR)
  └── nouvelle-section-en.json    (EN)
```

Chaque fichier doit contenir :
- `type` : le nom de la section (ex: `features`, `cta`, `hero`, etc.) ;
- `visible` : booléen ;
- `order` : ordre d’apparition dans la page ;
- `data` : les données spécifiques (titres, listes, CTA…).

### Règles fonctionnelles essentielles :
- Les fichiers FR et EN sont **obligatoires**.
- Les structures FR/EN doivent être **strictement identiques**.
- Les textes doivent être **dans la bonne langue**.
- Les images doivent respecter la règle des assets (pas `/assets/...`).

---
# 4. Étape 3 – Intégrer la section dans une page
Une section ne devient active que lorsqu’elle est référencée dans une page.

Cela implique :
- ajouter le fichier de contenu FR pour la page ;
- ajouter le fichier de contenu EN pour la page ;
- déclarer la section dans les deux ;
- définir son ordre.

### Règles :
- Toute page doit utiliser **exactement les mêmes sections** en FR et EN.
- Toute modification sur une langue doit être répliquée sur l’autre.

---
# 5. Étape 4 – Vérifier les liens de la section
Si la section contient des CTA, liens, boutons, cards cliquables, etc., chaque URL interne doit **obligatoirement** :
- passer par `buildUrl()` ;
- ne jamais commencer par `/...` ;
- être définie dans les fichiers de contenu FR/EN.

### Règle fonctionnelle stricte :
**Interdiction totale :**
```
"href": "/about"
```

**Obligation :**
```
"href": buildUrl("/about")
```

Impact :
- compatibilité GitHub Pages,
- compatibilité sites en sous-dossiers,
- élimination des liens cassés.

---
# 6. Étape 5 – Vérifier la gestion des assets
Si la section utilise des images :
- ne jamais écrire `/assets/...` ;
- utiliser un helper du type `publicAsset('image.png')`.

Motifs fonctionnels :
- support parfait du base path,
- aucun lien mort lors du build,
- gestion multi-environnement.

---
# 7. Étape 6 – Mise à jour de la Référence des Sections
Le document **Référentiel des Sections** doit être mis à jour avec :
- nom de la nouvelle section ;
- rôle ;
- structure des props ;
- indication si la section contient des liens internes.

---
# 8. Étape 7 – Mise à jour des tests
L’ajout d’une section impacte plusieurs catégories de tests.

## Tests à relancer :
1. **validate:source** → vérifie l’absence d’URL interdite.
2. **validate:build** → vérifie les liens dans le HTML.
3. **validate:links** → pipeline complet.
4. **check-links** → liens finaux.
5. Tests unitaires :
   - content collections ;
   - i18n structure.
6. Tests E2E :
   - navigation ;
   - base path ;
   - pages FR/EN ;
   - accessibilité.

Tous les tests doivent être 100% passants.

---
# 9. Checklists Officielles

## 9.1 Checklist "Section"
- [ ] Section générique et neutre
- [ ] Aucune donnée métier dans la section
- [ ] Props complètes et cohérentes
- [ ] Pas de texte en dur

## 9.2 Checklist "Contenu"
- [ ] Fichier FR créé
- [ ] Fichier EN créé
- [ ] Structure FR et EN identique
- [ ] Ordre cohérent
- [ ] Aucun asset en `/assets/...`
- [ ] Aucune URL interne en `/...`

## 9.3 Checklist "Liens"
- [ ] Tous les CTA utilisent `buildUrl()`
- [ ] Aucun lien absolu
- [ ] URLs présentes uniquement dans les fichiers de contenu

## 9.4 Checklist "Intégration dans une page"
- [ ] Section ajoutée dans la page FR
- [ ] Section ajoutée dans la page EN
- [ ] Même ordre FR/EN
- [ ] Aucun contenu divergent

## 9.5 Checklist "Tests"
- [ ] validate:source OK
- [ ] validate:build OK
- [ ] validate:links OK
- [ ] check-links OK
- [ ] Tests unitaires OK
- [ ] Tests E2E OK

---
# 10. Résumé
Ajouter une section consiste à :
1. Créer une section générique UI.
2. Créer les fichiers de contenu FR + EN.
3. Déclarer la section dans les pages FR + EN.
4. Respecter les règles de liens (`buildUrl`).
5. Respecter les règles d’assets.
6. Mettre à jour le Référentiel.
7. Relancer tous les tests.

Ce processus garantit :
- compatibilité totale base path ;
- parité FR/EN parfaite ;
- zéro lien interne cassé ;
- robustesse des pages ;
- qualité homogène dans tout le template.

Ce guide est la référence fonctionnelle officielle pour l’ajout de toute nouvelle section.

