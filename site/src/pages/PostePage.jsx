import PageLayout from "../PageLayout";

export default function PostePage() {
  return (
    <PageLayout
      kicker="Chapitre 02"
      title="LE POSTE"
      lead="Alternant Data Scientist au sein de l'équipe Data & AI du Contrôle de Gestion. Un rôle à la charnière entre data engineering, machine learning et business intelligence."
    >
      <div className="section-card">
        <h3>Le contexte : un siège, un volume, un enjeu</h3>
        <p>
          Avec environ <strong>1 580 supermarchés</strong> et <strong>25 plateformes logistiques</strong>,
          Lidl France génère chaque jour un volume colossal de données : ventes magasin, flux logistiques,
          ruptures, marges, prévisions, masse salariale. Le siège de Châtenay-Malabry est le centre
          névralgique où ces données deviennent des décisions.
        </p>
      </div>

      <div className="section-card">
        <h3>Le rôle du Contrôle de Gestion</h3>
        <p>
          Fournir à la direction des analyses fiables et des prévisions précises pour piloter la
          performance financière et opérationnelle. Dans un modèle où chaque centime de marge compte,
          la rigueur du contrôle de gestion est un actif stratégique.
        </p>
      </div>

      <div className="section-card">
        <h3>L'équipe Data & AI : l'accélérateur</h3>
        <p>
          Au sein du Contrôle de Gestion, l'équipe Data & AI joue le rôle de modernisateur :
          industrialiser ce qui se faisait à la main sur Excel/VBA, déployer des modèles prédictifs
          pour anticiper les comportements métier, rendre la donnée actionnable via des tableaux
          de bord interactifs.
        </p>
      </div>

      <div className="section-card">
        <h3>Les missions, telles que je les comprends</h3>
        <p style={{ marginBottom: 16 }}>
          Trois piliers, qui couvrent toute la chaîne de la valeur de la data :
        </p>

        <div style={{ display: "grid", gap: 16 }}>
          <div style={{ borderLeft: "3px solid var(--lidl-yellow)", paddingLeft: 16 }}>
            <strong style={{ color: "var(--lidl-yellow)" }}>1. Exploitation & préparation</strong>
            <p style={{ marginTop: 6 }}>
              Extraire, nettoyer, structurer de grands volumes de données financières et opérationnelles
              avec <strong>Python</strong> et <strong>SQL</strong>. Construire des pipelines reproductibles.
            </p>
          </div>

          <div style={{ borderLeft: "3px solid var(--lidl-yellow)", paddingLeft: 16 }}>
            <strong style={{ color: "var(--lidl-yellow)" }}>2. Modélisation prédictive</strong>
            <p style={{ marginTop: 6 }}>
              Développer et entraîner des algorithmes de <strong>Machine Learning</strong> pour optimiser
              la prise de décision : prévision des ventes, gestion des stocks, détection d'anomalies,
              optimisation des coûts. Robustesse face à la réalité du terrain.
            </p>
          </div>

          <div style={{ borderLeft: "3px solid var(--lidl-yellow)", paddingLeft: 16 }}>
            <strong style={{ color: "var(--lidl-yellow)" }}>3. Restitution & automatisation (BI)</strong>
            <p style={{ marginTop: 6 }}>
              Traduire les résultats en KPI clairs via <strong>Power BI</strong>, construire des modèles
              en étoile, automatiser les rapports récurrents. Rendre la donnée directement actionnable
              pour les parties prenantes.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
