# Système de parrainage — Design

## Mécanique

- **Filleul** : reçoit -1€ de crédit dès l'inscription via un lien ou code parrain
- **Parrain** : reçoit -1€ de crédit uniquement quand son filleul effectue son premier achat
- Les deux crédits expirent après **30 jours**
- Les crédits s'appliquent automatiquement au checkout et sont visibles dans le profil

## Base de données

### Ajouts sur `User`
```prisma
referralCode  String?  @unique  // code unique généré à la création du compte
referredBy    String?           // userId du parrain
```

### Nouveau modèle `ReferralCredit`
```prisma
model ReferralCredit {
  id         String             @id @default(cuid())
  userId     String             // bénéficiaire du crédit
  fromUserId String?            // qui a déclenché ce crédit (traçabilité)
  amount     Int                @default(100) // en centimes
  reason     ReferralReason     // REFERRAL_SIGNUP | REFERRAL_PURCHASE
  usedAt     DateTime?          // null = pas encore utilisé
  expiresAt  DateTime           // createdAt + 30 jours
  createdAt  DateTime           @default(now())
  user       User               @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum ReferralReason {
  REFERRAL_SIGNUP    // crédit filleul à l'inscription
  REFERRAL_PURCHASE  // crédit parrain au premier achat du filleul
}
```

## Flux d'inscription

### Inscription manuelle
1. Champ optionnel "Code parrain" dans le formulaire `/signup`
2. `POST /api/auth/signup` : vérifie le code → stocke `referredBy` sur le User + crée un `ReferralCredit` REFERRAL_SIGNUP (100 centimes, expire J+30) pour le filleul

### Inscription OAuth (Google/GitHub) via lien partagé
1. `/signup?ref=CODE` ou `/login?ref=CODE` → sauvegarde `ref_code` dans un cookie (durée 1h)
2. Callback NextAuth → si nouveau compte + cookie présent → même logique que ci-dessus

## Déclenchement du crédit parrain

Dans le webhook Stripe `checkout.session.completed` :
- Après paiement réussi, vérifier si c'est le **premier achat** du filleul (`payments` count = 1)
- Si `referredBy` est renseigné → créer un `ReferralCredit` REFERRAL_PURCHASE (100 centimes, expire J+30) pour le parrain

## Application au checkout

Dans `POST /api/payments/create-checkout` :
1. Vérifier si l'utilisateur a un crédit actif (`usedAt = null` ET `expiresAt > now()`)
2. Si oui → déduire 100 centimes du `unit_amount` Stripe
3. Marquer le crédit comme utilisé (`usedAt = now()`) dans la même transaction que la création du paiement

## Interface utilisateur

### Page profil
- Section "Parrainage" avec :
  - Le code personnel de l'utilisateur (copiable)
  - Le lien de parrainage `https://www.cv-builder.fr/signup?ref=CODE`
  - Le solde de crédit actif avec date d'expiration (si crédit disponible)
  - Historique des parrainages réussis

### Signup
- Champ optionnel "Vous avez un code parrain ?" en bas du formulaire manuel

### Checkout
- Ligne "Crédit parrainage : -1,00 €" visible si crédit appliqué

## Génération du code de parrainage

- Généré à la création du compte (signup manuel et OAuth)
- Format : 8 caractères alphanumériques majuscules (ex: `AB3X9KLM`)
- Stocké en `@unique` sur le modèle User
