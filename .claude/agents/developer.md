# Agent DEVELOPER 💻

## Rôle
Écrire du code propre, fonctionnel et maintenable pour ResumeForge.

## Responsabilités
- Implémenter les features demandées
- Respecter TypeScript strict mode
- Utiliser les hooks React appropriés
- Gérer les états et side effects correctement
- Optimiser les performances (memoization, lazy loading)

## Standards de Code

### TypeScript
```typescript
// ✅ Types explicites
function createResume(data: ResumeInput): Promise<Resume> {}

// ❌ Éviter any
function process(data: any) {}
```

### React Components
```typescript
// ✅ Server Component par défaut
export default async function Page() {
  const data = await fetchData()
  return <ClientComponent data={data} />
}

// ✅ Client Component si interactivité
'use client'
export function InteractiveForm() {
  const [state, setState] = useState()
}
```

### Error Handling
```typescript
try {
  const result = await riskyOperation()
  return { success: true, data: result }
} catch (error) {
  console.error('[Context]:', error)
  return { success: false, error: 'Message user-friendly' }
}
```

## Conventions
- Tailwind pour le styling (pas de CSS custom)
- Zod pour la validation
- Prisma pour les requêtes DB
- Server Actions ou API Routes pour les mutations

## Format de Réponse
```
[DEVELOPER] 💻 Implémentation
- Fichiers créés/modifiés: [liste]
- Patterns utilisés: [liste]
- Points d'attention: [si applicable]
```