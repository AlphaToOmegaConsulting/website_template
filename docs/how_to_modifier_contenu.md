# How-To – Modifier ou Ajouter du Contenu

> **Objectif :** Décrire précisément, de manière 100% fonctionnelle, comment modifier ou ajouter du contenu dans les Content Collections (pages, sections, events) du template Alpha WebCore.
>
> Le contenu est **la seule source de vérité des textes, images et données affichées**. Aucun contenu ne doit jamais être écrit dans les pages, sections ou primitives.

Ce document ne décrit pas le code, uniquement **le processus fonctionnel**.

---
# 1. Rôle du Contenu
Le contenu (Content Collections) définit :
- les textes des pages ;
- les entrées d’événements ;
- les titres, descriptions, items des sections ;
- les CTA ;
- les images ;
- les données propres à la langue.

Il doit être :
- structuré,
- symétrique FR/EN,
- validé par les schémas Zod,
- indépendant du design et des composants,
- complet et cohérent.

Aucun composant n’a le droit de contenir du texte métier.

---
# 2. Étape 1 – Identifier le type de contenu à modifier
Trois collections existent :

### 2.1 `pages`
Contient :
- titre,
- description,
- langue.

### 2.2 `sections`
Contient :
- type de section,
- ordre d’affichage,
- données de la section (titres, items, CTA…).

### 2.3 `events`
Contient :
- titre,
- description,
- date,
- lieu (optionnel),
- langue.

Identifier correctement la collection évite toute mauvaise modification.

---
# 3. Étape 2 – Modifier ou créer les fichiers FR et EN
Le contenu doit exister **en deux versions** :
```
src/content/<collection>/
  ├── element.json       (FR)
  └── element-en.json    (EN)
```

### Règle fondamentale : **Parité parfaite FR/EN**
- Les deux fichiers doivent exister.
- Ils doivent avoir la **même structure**.
- Toutes les clés doivent être présentes dans les deux langues.
- Les textes doivent être dans la bonne langue.

Cette règle est vérifiée automatiquement par les tests unitaires.

---
# 4. Étape 3 – Respecter la structure des schémas Zod
Chaque collection possède une structure déterminée :
- `pages`: `{ title, description, lang }`
- `sections`: `{ type, visible, order, data }`
- `events`: `{ title, date, description, lang, location? }`

### Règles fonctionnelles :
- Ne jamais ajouter de clé non prévue.
- Ne jamais modifier les types attendus.
- Ne jamais omettre une clé obligatoire.
- Respecter l’ordre logique.

Les tests unitaires échoueront en cas de violation.

---
# 5. Étape 4 – Gestion des liens dans les fichiers de contenu
Si le contenu contient des liens (ex : CTA dans une section), ils doivent respecter :

## Règle critique : **Interdiction des liens en dur `/...`**
Mauvais exemple (interdit) :
```
"href": "/fr/about"
```

### Obligation fonctionnelle : utiliser `buildUrl()` dans les composants
Le contenu doit uniquement contenir :
```
"href": "/about"
```
Et c’est la section (UI) qui appliquera `buildUrl()`.

**Le contenu ne doit jamais appeler directement `buildUrl()`**, il ne contient que la route logique.

---
# 6. Étape 5 – Gestion des images et assets
Toute image dans le contenu doit :
- venir du dossier `public/`,
- ne jamais utiliser `/assets/...`,
- utiliser un helper dans les composants pour le base path si nécessaire.

### Mauvais (interdit) :
```
"image": "/assets/team/john.jpg"
```

### Correct :
```
"image": "team/john.jpg"
```

**Le helper `publicAsset()` est appliqué dans les sections**, pas dans le contenu.

---
# 7. Étape 6 – Vérifier l’ordre et la visibilité des sections
Chaque entrée d’une section doit contenir :
- `order`: entier déterminant l’ordre d’apparition,
- `visible`: true/false.

Règles fonctionnelles :
- L’ordre doit être **strictement le même** en FR et EN.
- Si une section est invisible (visible: false), elle doit être invisible dans les deux langues.

---
# 8. Étape 7 – Mise à jour des tests
Modifier du contenu impose de relancer plusieurs tests :

## Tests à relancer :
1. **validate:source** → vérifie les URLs dans le contenu.
2. **validate:build** → vérifie le HTML généré.
3. **validate:links** → pipeline complet.
4. **check-links** → liens du site final.

## Tests unitaires :
- validation des collections via Zod,
- test de symétrie i18n,
- test d’absence de fichiers obsolètes.

## Tests E2E :
- navigation,
- base path,
- accessibilité.

Tout doit être 100% vert.

---
# 9. Checklists Officielles

## 9.1 Checklist "Contenu"
- [ ] Fichier FR créé ou mis à jour
- [ ] Fichier EN créé ou mis à jour
- [ ] Structure strictement identique
- [ ] Valeurs correctes dans les deux langues
- [ ] Clés conformes au schéma Zod

## 9.2 Checklist "Liens"
- [ ] Aucun lien en `/...`
- [ ] Les URLs sont des chemins logiques (ex: `/about`)
- [ ] Aucun appel `buildUrl()` dans le contenu

## 9.3 Checklist "Images"
- [ ] Aucun chemin `/assets/...`
- [ ] Images pointant vers des assets valides
- [ ] Compatibles avec le helper `publicAsset()`

## 9.4 Checklist "Sections"
- [ ] Ordre cohérent FR/EN
- [ ] `visible` cohérent FR/EN
- [ ] Données complètes

## 9.5 Checklist "Tests"
- [ ] validate:source OK
- [ ] validate:build OK
- [ ] validate:links OK
- [ ] check-links OK
- [ ] Tests unitaires OK
- [ ] Tests E2E OK

---
# 10. Résumé
Modifier ou ajouter du contenu consiste à :
1. Identifier la collection (pages, sections, events).
2. Modifier ou créer les fichiers FR et EN.
3. Respecter strictement le schéma Zod.
4. Ne mettre **aucune logique** dans le contenu.
5. Ne jamais mettre de lien en `/...`.
6. Ne jamais mettre de chemin d’asset absolu.
7. Maintenir la symétrie FR/EN.
8. Relancer tous les tests.

Ce processus garantit :
- un contenu propre et cohérent,
- une compatibilité totale base path,
- une parfaite parité FR/EN,
- zéro lien cassé,
- un site toujours stable et fiable.

Ce guide est la référence fonctionnelle officielle pour la gestion du contenu dans Alpha WebCore.

