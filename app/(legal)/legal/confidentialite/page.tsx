import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité de CV Builder : collecte, utilisation et protection de vos données personnelles conformément au RGPD.',
  alternates: {
    canonical: '/legal/confidentialite',
  },
}

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-[#6B6560] hover:text-[#1F1A17] mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl font-bold text-[#1F1A17] mb-8">
          Politique de Confidentialité
        </h1>

        <div className="bg-[#F3EDE5] rounded-xl border p-8 space-y-8 text-[#4A4440]">
          <p className="text-sm text-[#6B6560]">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              1. Introduction
            </h2>
            <p>
              La présente politique de confidentialité décrit comment CV Builder
              (<span className="font-medium">https://dvs-web.fr</span>) collecte, utilise et protège
              vos données personnelles conformément au Règlement Général sur la Protection
              des Données (RGPD) et à la loi Informatique et Libertés.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              2. Responsable du traitement
            </h2>
            <ul className="list-none space-y-2">
              <li><strong>Nom :</strong> <span className="font-medium">Davison Evan</span></li>
              <li><strong>Adresse :</strong> <span className="font-medium">22 Le Domaine, 35310 Mordelles</span></li>
              <li><strong>Email :</strong> <span className="font-medium">contact@dvs-web.fr</span></li>
              <li><strong>SIRET :</strong> <span className="font-medium">10007724700011</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              3. Données collectées
            </h2>
            <p>Nous collectons les données suivantes :</p>

            <h3 className="text-lg font-medium text-[#2D2825] mt-4 mb-2">
              3.1 Données fournies directement
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Données d'inscription :</strong> Nom, prénom, adresse email, mot de passe (hashé)</li>
              <li><strong>Données du CV :</strong> Informations professionnelles, expériences, formations, compétences, photo (optionnel)</li>
              <li><strong>Données de paiement :</strong> Traitées directement par Stripe (nous ne stockons pas vos données bancaires)</li>
            </ul>

            <h3 className="text-lg font-medium text-[#2D2825] mt-4 mb-2">
              3.2 Données collectées automatiquement
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Données de connexion :</strong> Adresse IP, type de navigateur, système d'exploitation</li>
              <li><strong>Cookies :</strong> Identifiants de session, préférences utilisateur</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              4. Finalités du traitement
            </h2>
            <p>Vos données sont utilisées pour :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Gérer votre compte utilisateur et l'authentification</li>
              <li>Fournir le service de création de CV</li>
              <li>Traiter les paiements via Stripe</li>
              <li>Générer des suggestions IA pour améliorer votre CV</li>
              <li>Vous envoyer des emails transactionnels (confirmation de paiement, réinitialisation de mot de passe)</li>
              <li>Améliorer nos services et l'expérience utilisateur</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              5. Base légale du traitement
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Exécution du contrat :</strong> Fourniture du service de création de CV</li>
              <li><strong>Consentement :</strong> Envoi d'emails marketing (si applicable)</li>
              <li><strong>Intérêt légitime :</strong> Amélioration du service, sécurité</li>
              <li><strong>Obligation légale :</strong> Conservation des données de facturation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              6. Destinataires des données
            </h2>
            <p>Vos données peuvent être partagées avec :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Stripe :</strong> Traitement des paiements (voir leur{' '}
                <a
                  href="https://stripe.com/fr/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#722F37] hover:underline"
                >
                  politique de confidentialité
                </a>
                )
              </li>
              <li><strong>OpenAI :</strong> Génération de suggestions IA (données anonymisées)</li>
              <li><strong>Vercel :</strong> Hébergement du site</li>
              <li><strong>Supabase :</strong> Hébergement de la base de données</li>
              <li><strong>Resend :</strong> Envoi d'emails transactionnels</li>
            </ul>
            <p className="mt-2">
              Nous ne vendons jamais vos données personnelles à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              7. Transferts internationaux
            </h2>
            <p>
              Certains de nos sous-traitants sont situés aux États-Unis (Stripe, OpenAI, Vercel).
              Ces transferts sont encadrés par des clauses contractuelles types approuvées par
              la Commission européenne ou par la certification Privacy Shield.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              8. Durée de conservation
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Données de compte :</strong> Conservées tant que le compte est actif, puis 3 ans après suppression</li>
              <li><strong>Données de CV :</strong> Conservées tant que le compte est actif</li>
              <li><strong>Données de facturation :</strong> 10 ans (obligation légale)</li>
              <li><strong>Logs de connexion :</strong> 1 an</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              9. Vos droits
            </h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données</li>
              <li><strong>Droit de rectification :</strong> Corriger vos données inexactes</li>
              <li><strong>Droit à l'effacement :</strong> Supprimer vos données (« droit à l'oubli »)</li>
              <li><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</li>
              <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
              <li><strong>Droit à la limitation :</strong> Limiter le traitement de vos données</li>
            </ul>
            <p className="mt-4">
              Pour exercer ces droits, contactez-nous à :{' '}
              <span className="font-medium">contact@dvs-web.fr</span>
            </p>
            <p className="mt-2">
              Vous pouvez également supprimer votre compte directement depuis les paramètres
              de votre profil.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              10. Sécurité des données
            </h2>
            <p>Nous mettons en œuvre des mesures de sécurité appropriées :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Chiffrement HTTPS pour toutes les communications</li>
              <li>Hashage des mots de passe (bcrypt)</li>
              <li>Authentification à deux facteurs (optionnelle)</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Sauvegardes régulières chiffrées</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              11. Cookies
            </h2>
            <p>Notre site utilise des cookies :</p>
            <table className="w-full mt-4 text-sm border-collapse">
              <thead>
                <tr className="bg-[#FBF8F4]">
                  <th className="border p-2 text-left">Cookie</th>
                  <th className="border p-2 text-left">Finalité</th>
                  <th className="border p-2 text-left">Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">next-auth.session-token</td>
                  <td className="border p-2">Authentification</td>
                  <td className="border p-2">Session</td>
                </tr>
                <tr>
                  <td className="border p-2">next-auth.csrf-token</td>
                  <td className="border p-2">Sécurité CSRF</td>
                  <td className="border p-2">Session</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4">
              Ces cookies sont essentiels au fonctionnement du site et ne nécessitent pas
              votre consentement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              12. Réclamation
            </h2>
            <p>
              Si vous estimez que le traitement de vos données personnelles constitue une
              violation du RGPD, vous avez le droit d'introduire une réclamation auprès de
              la CNIL (Commission Nationale de l'Informatique et des Libertés) :{' '}
              <a
                href="https://www.cnil.fr/fr/plaintes"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#722F37] hover:underline"
              >
                www.cnil.fr
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              13. Modifications
            </h2>
            <p>
              Nous nous réservons le droit de modifier cette politique de confidentialité.
              Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              14. Contact
            </h2>
            <p>
              Pour toute question concernant cette politique de confidentialité, contactez-nous :
            </p>
            <p className="mt-2">
              Email : <span className="font-medium">contact@dvs-web.fr</span>
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
