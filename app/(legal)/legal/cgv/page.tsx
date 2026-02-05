import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description: 'Consultez les conditions générales de vente de DVS-CV : tarifs, modalités de paiement, droit de rétractation et garanties.',
  alternates: {
    canonical: '/legal/cgv',
  },
}

export default function CGVPage() {
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
          Conditions Générales de Vente
        </h1>

        <div className="bg-[#F3EDE5] rounded-xl border p-8 space-y-8 text-[#4A4440]">
          <p className="text-sm text-[#6B6560]">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              Article 1 - Objet
            </h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent les ventes de services
              proposés par DVS-CV, accessible à l'adresse{' '}
              <span className="font-medium">https://dvs-web.fr</span>, ci-après dénommé "le Service".
            </p>
            <p className="mt-2">
              Le Service propose un générateur de CV en ligne avec des fonctionnalités gratuites
              et premium payantes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              Article 2 - Identité du vendeur
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Nom : <span className="font-medium">Davison Evan</span></li>
              <li>Statut : Auto-entrepreneur</li>
              <li>SIRET : <span className="font-medium">10007724700011</span></li>
              <li>Adresse : <span className="font-medium">22 Le Domaine, 35310 Mordelles</span></li>
              <li>Email : <span className="font-medium">contact@dvs-web.fr</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              Article 3 - Prix et modalités de paiement
            </h2>
            <p>
              Les prix sont indiqués en euros (€) toutes taxes comprises (TTC).
              En tant qu'auto-entrepreneur, la TVA n'est pas applicable (article 293 B du CGI).
            </p>
            <p className="mt-2">
              <strong>Tarification :</strong>
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Template MODERN : Gratuit (édition et export PDF illimités)</li>
              <li>Fonctionnalités premium (IA, ATS, templates PRO) : 4,99 € par CV</li>
            </ul>
            <p className="mt-2">
              Le paiement s'effectue par carte bancaire via la plateforme sécurisée Stripe.
              Le paiement est exigible immédiatement à la commande.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              Article 4 - Livraison et accès au service
            </h2>
            <p>
              L'accès aux fonctionnalités premium est immédiat après confirmation du paiement.
              Aucune livraison physique n'est effectuée, le Service étant entièrement dématérialisé.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              Article 5 - Droit de rétractation
            </h2>
            <p>
              Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation
              ne peut être exercé pour les contrats de fourniture de contenu numérique non fourni
              sur un support matériel dont l'exécution a commencé avec l'accord préalable exprès
              du consommateur.
            </p>
            <p className="mt-2">
              En validant votre achat, vous reconnaissez expressément que l'exécution du Service
              commence immédiatement et renoncez à votre droit de rétractation.
            </p>
            <p className="mt-2">
              Toutefois, en cas de problème technique empêchant l'utilisation du Service,
              un remboursement pourra être accordé sur demande à{' '}
              <span className="font-medium">contact@dvs-web.fr</span>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              Article 6 - Description du service
            </h2>
            <p>Le Service comprend :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Offre gratuite :</strong> Création de CV avec le template MODERN, export PDF</li>
              <li>
                <strong>Offre premium (4,99 € par CV) :</strong> Accès à tous les templates,
                suggestions IA pour améliorer le contenu, analyse ATS du CV
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              Article 7 - Responsabilité
            </h2>
            <p>
              Le vendeur s'engage à fournir un service conforme à la description.
              Toutefois, il ne saurait être tenu responsable :
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Des contenus rédigés par l'utilisateur dans son CV</li>
              <li>De l'utilisation faite du CV généré (candidatures, résultats d'entretiens, etc.)</li>
              <li>Des interruptions temporaires du Service pour maintenance</li>
              <li>Des suggestions générées par l'intelligence artificielle</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              Article 8 - Propriété intellectuelle
            </h2>
            <p>
              L'utilisateur conserve l'entière propriété intellectuelle des contenus qu'il crée
              avec le Service. Les templates et l'interface du Service restent la propriété
              exclusive de DVS-CV.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              Article 9 - Données personnelles
            </h2>
            <p>
              Les données personnelles collectées sont traitées conformément à notre{' '}
              <Link href="/legal/confidentialite" className="text-[#722F37] hover:underline">
                Politique de confidentialité
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              Article 10 - Litiges
            </h2>
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, une solution
              amiable sera recherchée avant toute action judiciaire.
            </p>
            <p className="mt-2">
              Conformément aux dispositions du Code de la consommation concernant le règlement
              amiable des litiges, le client peut recourir au service de médiation proposé par
              DVS-CV. Le médiateur peut être saisi via{' '}
              <span className="font-medium">contact@dvs-web.fr</span>.
            </p>
            <p className="mt-2">
              Le client peut également utiliser la plateforme de règlement en ligne des litiges
              de la Commission européenne :{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#722F37] hover:underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              Article 11 - Modification des CGV
            </h2>
            <p>
              Le vendeur se réserve le droit de modifier les présentes CGV à tout moment.
              Les CGV applicables sont celles en vigueur à la date de la commande.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
