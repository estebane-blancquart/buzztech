import React from 'react';
import styles from './legal.module.scss';

const ConditionsGenerales: React.FC = () => {
  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>CONDITIONS GÉNÉRALES DE VENTE</h1>

        <section className={styles.section}>
          <h2>ARTICLE 1 - PRÉAMBULE</h2>
          <p>
            Les présentes Conditions Générales de Vente (CGV) s'appliquent à
            toutes les prestations de services et ventes conclues par BuzzTech -
            Informatique, auto-entrepreneur, dont le siège social est situé à 20b
            impasse Montesquieu 42100 Saint-Etienne, immatriculé sous le numéro
            SIRET 934 735 374 00019.
          </p>
          <p>
            Toute commande de prestations ou de produits implique l'acceptation
            sans réserve par le Client et son adhésion pleine et entière aux
            présentes CGV.
          </p>
        </section>

        <section className={styles.section}>
          <h2>ARTICLE 2 - SERVICES PROPOSÉS</h2>
          <p>Le Prestataire propose les services suivants :</p>

          <h3>2.1 Dépannage informatique</h3>
          <p>
            Ce service consiste en la résolution de tous les problèmes affectant
            votre équipement et vous permettre d'en retrouver rapidement le plein
            usage.
          </p>

          <h3>2.2 Conception de PC sur mesure</h3>
          <p>
            Notre service de configuration personnalisée vous offre une solution
            complète pour obtenir un ordinateur parfaitement adapté à vos besoins.
          </p>

          <h3>2.3 Développement web</h3>
          <p>
            Notre service de conception vous offre une solution complète pour des
            sites internet vitrines performants, esthétiques et parfaitement
            adaptés à vos objectifs commerciaux.
          </p>
        </section>

        <section className={styles.section}>
          <h2>ARTICLE 3 - ZONE D'INTERVENTION ET DISPONIBILITÉ</h2>
          <p>
            Le Prestataire intervient à Saint-Étienne et dans un rayon de 20 km
            alentour.
          </p>
          <p>
            Les interventions sont possibles du lundi au dimanche, sur
            rendez-vous. Certaines interventions en soirée, le week-end ou les
            jours fériés peuvent faire l'objet d'une majoration tarifaire qui sera
            précisée dans le devis.
          </p>
        </section>

        <section className={styles.section}>
          <h2>ARTICLE 4 - DEVIS ET COMMANDE</h2>

          <h3>4.1 Établissement du devis</h3>
          <p>
            Pour toute prestation, un devis gratuit sera établi par le
            Prestataire, mentionnant :
          </p>
          <ul>
            <li>La nature précise de la prestation</li>
            <li>Le délai d'exécution estimé</li>
            <li>Le prix HT (TVA non applicable, article 293 B du CGI)</li>
            <li>Les conditions de paiement</li>
            <li>
              La durée de validité du devis (30 jours sauf mention contraire)
            </li>
          </ul>

          <h3>4.2 Validation de la commande</h3>
          <p>La commande n'est définitivement confirmée qu'après :</p>
          <ul>
            <li>
              Acceptation écrite du devis par le Client (signature avec la mention
              "bon pour accord")
            </li>
            <li>Versement de l'acompte éventuel mentionné dans le devis</li>
            <li>
              Fourniture par le Client de tous les éléments nécessaires à la
              réalisation de la prestation
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>ARTICLE 5 - TARIFS ET MODALITÉS DE PAIEMENT</h2>

          <h3>5.1 Tarifs</h3>
          <p>
            Les prix des prestations sont ceux en vigueur au jour de l'émission du
            devis. Ils sont libellés en euros et calculés hors taxes (TVA non
            applicable, article 293 B du CGI).
          </p>

          <h3>5.2 Modalités de paiement</h3>
          <p>
            <strong>Pour les particuliers :</strong>
          </p>
          <ul>
            <li>
              Pour les prestations de dépannage : paiement intégral à la fin de
              l'intervention
            </li>
            <li>
              Pour les PC sur mesure : le client avance le prix des composants et
              la prestation de service est réglée dès la réception
            </li>
            <li>
              Pour le développement web : acompte de 30% à la commande, 30% à
              mi-projet, solde à la livraison
            </li>
          </ul>

          <p>
            <strong>Pour les professionnels :</strong>
          </p>
          <ul>
            <li>Acompte de 30% à la commande</li>
            <li>
              Solde à 30 jours à compter de la date d'émission de la facture
            </li>
          </ul>

          <h3>5.3 Moyens de paiement acceptés</h3>
          <ul>
            <li>Espèces (dans la limite légale en vigueur soit 1000€)</li>
            <li>Chèque bancaire</li>
            <li>Virement bancaire</li>
            <li>Paypal</li>
          </ul>

          <h3>5.4 Pénalités de retard pour les professionnels</h3>
          <p>
            En cas de retard de paiement, des pénalités de retard calculées au
            taux annuel de 11,13% du montant TTC du prix des prestations seront
            automatiquement acquises au Prestataire. Une indemnité forfaitaire
            pour frais de recouvrement d'un montant de 40 euros sera également due
            de plein droit.
          </p>
        </section>

        <section className={styles.section}>
          <h2>ARTICLE 6 - EXÉCUTION DES PRESTATIONS</h2>

          <h3>6.1 Délais d'exécution</h3>
          <p>
            Le Prestataire s'engage à mettre en œuvre tous les moyens nécessaires
            pour respecter les délais d'exécution indiqués dans le devis. Ces
            délais sont donnés à titre indicatif et ne constituent pas un
            engagement ferme.
          </p>

          <h3>6.2 Obligations du Client</h3>
          <p>Le Client s'engage à :</p>
          <ul>
            <li>
              Fournir au Prestataire tous les éléments nécessaires à la bonne
              exécution de la prestation
            </li>
            <li>
              Disposer des droits nécessaires sur les logiciels, données et
              contenus fournis
            </li>
            <li>Assurer au Prestataire l'accès aux équipements concernés</li>
            <li>Effectuer des sauvegardes préalables de ses données</li>
          </ul>
          <p>
            Le Client reconnaît que le Prestataire ne pourra être tenu responsable
            de la perte de données non sauvegardées par le Client avant
            l'intervention.
          </p>
        </section>

        <section className={styles.section}>
          <h2>ARTICLE 7 - GARANTIES</h2>

          <h3>7.1 Dépannage informatique</h3>
          <p>
            Les prestations de dépannage informatique bénéficient d'une garantie
            de 30 jours à compter de la date d'intervention. Cette garantie couvre
            uniquement les problèmes identiques à ceux ayant fait l'objet de
            l'intervention initiale.
          </p>

          <h3>7.2 PC sur mesure</h3>
          <p>
            Les composants matériels des PC sur mesure bénéficient des garanties
            constructeurs (généralement 2 ans). L'assemblage et l'installation
            bénéficient d'une garantie de 6 mois couvrant les défauts
            d'assemblage.
          </p>

          <h3>7.3 Développement web</h3>
          <p>
            Les sites web développés bénéficient d'une garantie de bon
            fonctionnement de 3 mois à compter de la mise en ligne. Cette garantie
            couvre la correction des bugs et dysfonctionnements.
          </p>

          <h3>7.4 Exclusions de garantie</h3>
          <p>Sont exclus de toute garantie :</p>
          <ul>
            <li>
              Les problèmes résultant d'une mauvaise utilisation par le Client
            </li>
            <li>
              Les dommages causés par des éléments extérieurs (surtensions, dégâts
              des eaux, chocs, etc.)
            </li>
            <li>
              Les modifications effectuées par le Client ou un tiers non autorisé
            </li>
            <li>L'usure normale des composants</li>
            <li>Les problèmes liés à des logiciels ou services tiers</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>ARTICLE 8 - DROIT DE RÉTRACTATION</h2>
          <p>
            Conformément aux articles L.221-18 et suivants du Code de la
            consommation, le Client particulier dispose d'un délai de 14 jours à
            compter de la conclusion du contrat pour exercer son droit de
            rétractation, sans avoir à justifier de motifs ni à payer de
            pénalités.
          </p>
          <p>Ce droit de rétractation ne s'applique pas :</p>
          <ul>
            <li>
              Aux prestations pleinement exécutées avant la fin du délai de
              rétractation avec l'accord du Client
            </li>
            <li>Aux logiciels descellés (dont les emballages ont été ouverts)</li>
            <li>Aux contenus numériques fournis sur support immatériel</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>ARTICLE 9 - RESPONSABILITÉ</h2>
          <p>Le Prestataire ne pourra être tenu responsable de :</p>
          <ul>
            <li>La perte de données non sauvegardées par le Client</li>
            <li>
              Les dommages indirects ou immatériels tels que perte d'exploitation,
              perte de chance, préjudice commercial
            </li>
            <li>
              L'inadéquation du service aux besoins spécifiques du Client non
              expressément mentionnés lors de l'établissement du devis
            </li>
            <li>
              Les dysfonctionnements liés à des modifications apportées par le
              Client ou un tiers
            </li>
            <li>Les problèmes causés par des logiciels ou services tiers</li>
          </ul>
          <p>
            En tout état de cause, la responsabilité du Prestataire, si elle est
            engagée, ne pourra excéder le montant des sommes effectivement payées
            par le Client au titre de la prestation concernée.
          </p>
        </section>

        <section className={styles.section}>
          <h2>ARTICLE 10 - PROPRIÉTÉ INTELLECTUELLE</h2>
          <p>
            Pour les prestations de développement web, le transfert de propriété
            intellectuelle sur les créations réalisées par le Prestataire n'est
            effectif qu'après paiement intégral du prix convenu.
          </p>
          <p>
            Ce transfert concerne uniquement les éléments créés spécifiquement
            pour le Client et n'inclut pas :
          </p>
          <ul>
            <li>
              Les outils, méthodes et savoir-faire utilisés par le Prestataire
            </li>
            <li>
              Les composants logiciels préexistants soumis à des licences tierces
            </li>
            <li>Les éléments génériques non spécifiques au Client</li>
          </ul>
          <p>
            Le Prestataire se réserve le droit de mentionner sa réalisation pour
            le Client comme référence dans le cadre de ses démarches de
            prospection commerciale, sauf mention contraire explicite dans le
            contrat.
          </p>
        </section>

        <section className={styles.section}>
          <h2>ARTICLE 11 - CONFIDENTIALITÉ</h2>
          <p>
            Le Prestataire s'engage à considérer comme confidentielles toutes les
            informations dont il aura connaissance dans le cadre de l'exécution
            des prestations et à ne pas les divulguer à des tiers sans l'accord
            préalable du Client.
          </p>
        </section>

        <section className={styles.section}>
          <h2>ARTICLE 12 - PROTECTION DES DONNÉES PERSONNELLES</h2>
          <p>
            Le Prestataire s'engage à respecter la réglementation en vigueur
            applicable au traitement de données à caractère personnel et, en
            particulier, le Règlement Général sur la Protection des Données
            (RGPD).
          </p>
          <p>
            Le Client dispose d'un droit d'accès, de rectification, d'effacement
            et de portabilité des données le concernant. Ces droits peuvent être
            exercés en contactant le Prestataire à l'adresse email :
            contact@buzztech-informatique.fr.
          </p>
        </section>

        <section className={styles.section}>
          <h2>ARTICLE 13 - FORCE MAJEURE</h2>
          <p>
            La responsabilité du Prestataire ne pourra pas être mise en œuvre si
            la non-exécution ou le retard dans l'exécution de l'une de ses
            obligations découle d'un cas de force majeure.
          </p>
        </section>

        <section className={styles.section}>
          <h2>ARTICLE 14 - DROIT APPLICABLE ET JURIDICTION COMPÉTENTE</h2>
          <p>Les présentes CGV sont soumises au droit français.</p>
          <p>
            En cas de litige, et après recherche d'une solution amiable,
            compétence exclusive est attribuée aux tribunaux de Saint-Étienne.
          </p>
        </section>

        <section className={styles.section}>
          <h2>ARTICLE 15 - CONTACT</h2>
          <p>
            Pour toute question relative aux présentes CGV, vous pouvez contacter
            le Prestataire :
          </p>
          <ul>
            <li>BuzzTech - Informatique</li>
            <li>20b impasse Montesquieu 42100 Saint-Etienne</li>
            <li>Email : contact@buzztech-informatique.fr</li>
            <li>Téléphone : 06 60 35 22 67</li>
          </ul>
          <p>
            <strong>
              Les présentes CGV sont en vigueur à compter du 25/04/2025.
            </strong>
          </p>
        </section>
      </div>
    </div>
  );
};

export default ConditionsGenerales;