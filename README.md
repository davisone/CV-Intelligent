# ResumeForge

Generateur de CV intelligent avec IA.

## Stack Technique

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Supabase)
- **Auth**: NextAuth.js
- **IA**: OpenAI API (gpt-4o-mini)
- **PDF**: @react-pdf/renderer

## Installation

```bash
# Installer les dependances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Editer .env.local avec vos cles

# Appliquer le schema Prisma
npx prisma db push

# Lancer le serveur de dev
npm run dev
```

## Structure du Projet

```
resume-forge/
├── app/              # Pages et API routes (App Router)
├── components/       # Composants React
├── lib/              # Utilitaires et configurations
├── types/            # Types TypeScript
├── hooks/            # Hooks React personnalises
├── prisma/           # Schema et migrations
└── tests/            # Tests unitaires et E2E
```

## Variables d'Environnement

Voir `.env.example` pour la liste complete.
