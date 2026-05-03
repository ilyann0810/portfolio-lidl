import PageLayout from "../PageLayout";

export default function VisionPage() {
  return (
    <PageLayout
      kicker="Chapitre 03"
      title="MA VISION"
      lead="Ce que j'ai compris du poste, comment je le vois, et pourquoi je pense que mon profil colle. La partie qu'on m'a demandé de restituer après l'entretien."
    >
      <div className="section-card" style={{ borderLeft: "4px solid var(--lidl-red)" }}>
        <h3 style={{ color: "var(--lidl-red)" }}>Ce que j'ai compris</h3>
        <p>
          Le poste n'est pas un poste de Data Scientist « pur recherche ». C'est un poste de
          <strong> Data Scientist appliqué au métier</strong>, intégré dans une équipe qui doit prouver,
          tous les mois, que la donnée fait gagner du temps et de l'argent au Contrôle de Gestion.
        </p>
        <p style={{ marginTop: 12 }}>
          La valeur attendue n'est pas la complexité du modèle, c'est <strong>la fiabilité du livrable</strong> :
          un pipeline qui tourne sans bug le 1<sup>er</sup> du mois, un Power BI qui charge en
          moins de 10 secondes, une prévision dont l'écart est explicable au métier.
        </p>
      </div>

      <div className="torn-sep" />

      <div className="section-card" style={{ borderLeft: "4px solid var(--lidl-yellow)" }}>
        <h3>Le triptyque qui structure le rôle</h3>
        <p style={{ marginBottom: 16 }}>
          Trois mondes qui doivent dialoguer en permanence :
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          <div style={{ background: "rgba(0, 80, 170, 0.25)", padding: 20, borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ fontFamily: "Anton, sans-serif", fontSize: 20, color: "var(--lidl-yellow)", letterSpacing: 1 }}>DATA ENGINEERING</div>
            <p style={{ marginTop: 8, fontSize: 15 }}>SQL, Python, pipelines, qualité des données, fiabilité des sources.</p>
          </div>
          <div style={{ background: "rgba(0, 80, 170, 0.25)", padding: 20, borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ fontFamily: "Anton, sans-serif", fontSize: 20, color: "var(--lidl-yellow)", letterSpacing: 1 }}>MACHINE LEARNING</div>
            <p style={{ marginTop: 8, fontSize: 15 }}>Modèles de prévision, détection d'anomalies, optimisation. Pragmatisme avant tout.</p>
          </div>
          <div style={{ background: "rgba(0, 80, 170, 0.25)", padding: 20, borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ fontFamily: "Anton, sans-serif", fontSize: 20, color: "var(--lidl-yellow)", letterSpacing: 1 }}>BUSINESS INTELLIGENCE</div>
            <p style={{ marginTop: 8, fontSize: 15 }}>Power BI, modélisation en étoile, KPI lisibles, automatisation des rapports.</p>
          </div>
        </div>
      </div>

      <div className="torn-sep flip" />

      <div className="section-card" style={{ borderLeft: "4px solid var(--lidl-yellow)" }}>
        <h3>Pourquoi mon profil colle</h3>
        <p>
          <strong>Côté formation</strong> : ingénieur EFREI majeure <em>Big Data & Machine Learning</em>.
          Une base solide en algorithmique, statistiques, et manipulation de données à grande échelle.
        </p>
        <p style={{ marginTop: 12 }}>
          <strong>Côté terrain</strong> : un an d'expérience comme <em>Ingénieur IA & Tech Lead</em>.
          J'ai construit et mis en production des pipelines Python, modélisé des entrepôts de données
          en étoile sous Power BI, automatisé des rapports hebdomadaires que des équipes faisaient
          à la main. Je sais ce que coûte un pipeline qui plante en prod.
        </p>
        <p style={{ marginTop: 12 }}>
          <strong>Mon angle</strong> : penser l'architecture technique sans jamais perdre de vue le ROI
          et l'utilisateur final. Un modèle qui n'est pas utilisé n'existe pas.
        </p>
      </div>

      <div className="torn-sep" />

      <div className="section-card" style={{ borderLeft: "4px solid var(--lidl-red)" }}>
        <h3 style={{ color: "var(--lidl-red)" }}>Ce que je veux apporter</h3>
        <p>
          La rigueur d'industrialisation que j'ai acquise en startup, appliquée à l'échelle d'un
          réseau de 1 580 magasins. Et une obsession très simple : <strong>rendre la donnée
          actionnable, pas spectaculaire</strong>. Au sein de Lidl, où l'efficacité opérationnelle
          est dans l'ADN, c'est la seule métrique qui compte vraiment.
        </p>
      </div>
    </PageLayout>
  );
}
