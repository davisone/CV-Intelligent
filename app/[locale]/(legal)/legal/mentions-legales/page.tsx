import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales de CV Builder : éditeur du site, hébergeur, propriété intellectuelle et responsabilité.',
  alternates: {
    canonical: '/legal/mentions-legales',
  },
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: baseUrl },
          { name: 'Mentions légales', url: `${baseUrl}/legal/mentions-legales` },
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-[#6B6560] hover:text-[#1F1A17] mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl font-bold text-[#1F1A17] mb-8">
          Mentions Légales
        </h1>

        <div className="bg-[#F3EDE5] rounded-xl border p-8 space-y-8 text-[#4A4440]">
          <p className="text-sm text-[#6B6560]">
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
          </p>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              1. Éditeur du site
            </h2>
            <p>
              Le site CV Builder est édité par :
            </p>
            <ul className="list-none mt-4 space-y-2">
              <li><strong>Nom :</strong> <span className="font-medium">Davison Evan</span></li>
              <li><strong>Statut :</strong> Auto-entrepreneur</li>
              <li><strong>SIRET :</strong> <span className="font-medium">10007724700011</span></li>
              <li><strong>Adresse :</strong> <span className="font-medium">22 Le Domaine, 35310 Mordelles</span></li>
              <li><strong>Email :</strong> <span className="font-medium">contact@dvs-web.fr</span></li>
              <li><strong>Téléphone :</strong> <span className="font-medium">06 51 01 95 06</span></li>
            </ul>
            <p className="mt-4 text-sm text-[#6B6560]">
              TVA non applicable, article 293 B du Code Général des Impôts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              2. Directeur de la publication
            </h2>
            <p>
              Le directeur de la publication est <span className="font-medium">Davison Evan</span>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              3. Hébergement
            </h2>
            <p>Le site est hébergé par :</p>
            <ul className="list-none mt-4 space-y-2">
              <li><strong>Nom :</strong> Vercel Inc.</li>
              <li><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
              <li><strong>Site web :</strong>{' '}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#722F37] hover:underline"
                >
                  https://vercel.com
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              4. Propriété intellectuelle
            </h2>
            <p>
              L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, code source)
              est la propriété exclusive de CV Builder ou de ses partenaires et est protégé par
              les lois françaises et internationales relatives à la propriété intellectuelle.
            </p>
            <p className="mt-2">
              Toute reproduction, représentation, modification, publication, adaptation de tout
              ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé,
              est interdite sans autorisation écrite préalable de CV Builder.
            </p>
            <p className="mt-2">
              Les CV créés par les utilisateurs restent leur entière propriété.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              5. Protection des données personnelles
            </h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la
              loi Informatique et Libertés, vous disposez de droits sur vos données personnelles.
            </p>
            <p className="mt-2">
              Pour plus d'informations, consultez notre{' '}
              <Link href="/legal/confidentialite" className="text-[#722F37] hover:underline">
                Politique de confidentialité
              </Link>
              .
            </p>
            <p className="mt-2">
              <strong>Délégué à la protection des données (DPO) :</strong>{' '}
              <span className="font-medium">contact@dvs-web.fr</span>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              6. Cookies
            </h2>
            <p>
              Le site utilise des cookies pour améliorer l'expérience utilisateur.
              En naviguant sur le site, vous acceptez l'utilisation de cookies conformément
              à notre politique de confidentialité.
            </p>
            <p className="mt-2">
              <strong>Types de cookies utilisés :</strong>
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site (authentification, session)</li>
              <li><strong>Cookies analytiques :</strong> Permettent d'analyser l'utilisation du site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              7. Liens hypertextes
            </h2>
            <p>
              Le site peut contenir des liens vers d'autres sites. CV Builder n'exerce aucun
              contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              8. Limitation de responsabilité
            </h2>
            <p>
              CV Builder s'efforce de fournir des informations exactes et à jour.
              Toutefois, nous ne pouvons garantir l'exactitude, la complétude ou l'actualité
              des informations diffusées sur le site.
            </p>
            <p className="mt-2">
              CV Builder ne saurait être tenu responsable des dommages directs ou indirects
              résultant de l'accès ou de l'utilisation du site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              9. Droit applicable
            </h2>
            <p>
              Les présentes mentions légales sont régies par le droit français.
              En cas de litige, les tribunaux français seront seuls compétents.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-4">
              10. Contact
            </h2>
            <p>
              Pour toute question concernant les présentes mentions légales, vous pouvez
              nous contacter à : <span className="font-medium">contact@dvs-web.fr</span>
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
