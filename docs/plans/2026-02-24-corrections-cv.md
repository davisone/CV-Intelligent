# Corrections CV — Plan d'implémentation

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Objectif :** Corriger 5 problèmes sur l'éditeur de CV : validation URL, messages d'erreur, toggle formation en cours, affichage URL projets, et PDF avec liens cliquables.

**Architecture :** Corrections réparties sur 3 couches : validation Zod (schéma), éditeur React (UI), templates CV (affichage). Le PDF passe de html-to-image (capture PNG) à window.print() via popup (vrai PDF vectoriel).

**Stack :** Next.js, Zod v4, TypeScript, Tailwind CSS

---

## Tâche 1 : Validation URL auto-correction + messages d'erreur

**Fichiers :**
- Modifier : `lib/validations/resume.schema.ts`
- Modifier : `app/api/resumes/[id]/route.ts`
- Modifier : `app/(dashboard)/dashboard/resumes/[id]/edit/resume-editor.tsx`

**Étape 1 : Créer le helper `urlField()` dans le schéma Zod**

Dans `lib/validations/resume.schema.ts`, ajouter un helper qui :
- Accepte une string vide (champ optionnel)
- Préfixe `https://` si aucun protocole n'est présent
- Valide ensuite que c'est une URL valide
- Message d'erreur en français

Puis remplacer toutes les occurrences de `z.string().url().optional().or(z.literal(''))` par `urlField()` dans tous les schémas concernés (personalInfo, update, certification, project).

**Étape 2 : Améliorer le message d'erreur côté API**

Dans `app/api/resumes/[id]/route.ts` ligne 183-189, retourner le chemin du champ en erreur dans le message.

**Étape 3 : Afficher le message d'erreur spécifique dans l'éditeur**

Dans `resume-editor.tsx`, modifier `performSave` pour parser la réponse JSON d'erreur et afficher le message spécifique dans le toast.

**Étape 4 : Commit**

```
feat(validation): auto-corriger les URLs sans protocole et améliorer les messages d'erreur
```

---

## Tâche 2 : Toggle "en cours" pour les formations

**Fichiers :**
- Modifier : `app/(dashboard)/dashboard/resumes/[id]/edit/resume-editor.tsx`

**Étape 1 :** Ajouter `current: boolean` à l'interface `EducationData`
**Étape 2 :** Initialiser `current: false` dans `addEducation()`
**Étape 3 :** Envoyer `current` dans `performSave` (mapping educations)
**Étape 4 :** Modifier `EducationCard` : ajouter checkbox, désactiver date de fin quand current=true, gérer le toggle dans handleChange
**Étape 5 :** Commit

```
feat(editor): ajouter le toggle "formation en cours" pour les formations
```

---

## Tâche 3 : Projets — afficher l'URL au lieu de "Voir le projet"

**Fichiers :**
- Modifier : `components/cv-templates/modern-template.tsx`
- Modifier : `components/cv-templates/classic-template.tsx`
- Modifier : `components/cv-templates/ats-template.tsx`
- Modifier : `components/cv-templates/minimal-template.tsx`
- Modifier : `components/cv-templates/creative-template.tsx`

**Approche :** Ajouter un helper `displayUrl()` dans chaque template qui enlève le protocole et le trailing slash. Remplacer les textes "Voir le projet", "Lien", "Voir" par l'URL formatée. L'URL reste un lien `<a>` cliquable.

**Étape 1 :** Ajouter `displayUrl` dans chaque template
**Étape 2 :** Modifier l'affichage des projets dans les 5 templates
**Étape 3 :** Commit

```
fix(templates): afficher l'URL des projets au lieu de "Voir le projet"
```

---

## Tâche 4 : PDF avec liens cliquables via window.print()

**Fichiers :**
- Modifier : `app/(dashboard)/dashboard/resumes/[id]/edit/resume-editor.tsx`

**Approche :** Remplacer `html-to-image` + `jsPDF` par `window.print()` dans une nouvelle fenêtre popup. On clone le contenu HTML du CV dans un popup, on injecte les styles compilés, et on déclenche l'impression. Le résultat : liens cliquables, texte sélectionnable, mise en page fidèle au CSS.

**Étape 1 :** Réécrire `downloadPDF()` avec l'approche popup + print
**Étape 2 :** Supprimer les imports inutilisés (`toPng`, `jsPDF`)
**Étape 3 :** Commit

```
fix(pdf): remplacer html-to-image par window.print() pour des liens cliquables et une meilleure mise en page
```

---

## Tâche 5 : Build et vérification

**Étape 1 :** `npm run build` — vérifier qu'il n'y a pas d'erreur
**Étape 2 :** `npm run lint` — corriger les éventuels warnings
**Étape 3 :** Commit si nécessaire

```
chore: nettoyage post-corrections
```