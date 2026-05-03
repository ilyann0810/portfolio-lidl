import PageLayout from "../PageLayout";

/* Two project categories:
   - "lidl" : projects built specifically for this application, with mock datasets
   - "perso": projects from the CV, real work done elsewhere */

const PROJECTS_LIDL = [
  {
    id: "ca-prediction",
    title: "Prédiction du CA par magasin",
    pitch: "Modèle de Machine Learning pour anticiper le chiffre d'affaires mensuel de chaque magasin Lidl, avec un dataset simulé qui reproduit la saisonnalité et les effets régionaux.",
    stack: ["Python", "scikit-learn", "XGBoost", "Pandas", "Jupyter"],
    repo: "https://github.com/ilyann0810/lidl-ca-prediction",
    status: "À venir",
    accent: "yellow",
    why: "Cas d'usage typique du Contrôle de Gestion : anticiper le CA pour ajuster les budgets et détecter les écarts.",
  },
  {
    id: "sunday-scoring",
    title: "Scoring : quels magasins ouvrir le dimanche ?",
    pitch: "Notebook d'analyse qui score chaque magasin sur sa pertinence à ouvrir le dimanche, basé sur le traffic, la zone de chalandise et l'historique de ventes simulé.",
    stack: ["Python", "Pandas", "scikit-learn", "Matplotlib", "Jupyter"],
    repo: "https://github.com/ilyann0810/lidl-sunday-scoring",
    status: "À venir",
    accent: "yellow",
    why: "Question stratégique réelle pour la grande distribution. Outil d'aide à la décision pour le réseau de 1 580 magasins.",
  },
];

const PROJECTS_PERSO = [
  {
    id: "wise-ai-bi",
    title: "Dashboards Power BI clients & internes",
    pitch: "Conception et mise en production de dashboards Power BI hôteliers (monitoring email/chatbot, KPIs opérationnels) et d'un dashboard interne de pilotage des rendements par projet.",
    stack: ["Power BI", "DAX", "SQL", "Modélisation en étoile"],
    context: "Wise AI / J-aime · Production",
  },
  {
    id: "rag-mcp",
    title: "RAG connecté à un PMS hôtelier via MCP",
    pitch: "Système Retrieval-Augmented Generation branché sur le Property Management System d'un hôtel via Model Context Protocol. Le support client passe en self-service.",
    stack: ["Python", "LangChain", "MCP", "LLM", "Vector store"],
    context: "Wise AI · Production · −60 % temps de réponse support",
  },
  {
    id: "email-pipeline",
    title: "Pipeline de traitement automatique des emails",
    pitch: "Classification multi-classes + génération de réponses LLM pour traiter automatiquement les emails entrants. Réduction massive du temps de traitement manuel.",
    stack: ["Python", "LLM", "Classification", "Pipeline ETL"],
    context: "Wise AI · Production · −70 % temps de traitement",
  },
  {
    id: "scoring-ml",
    title: "Scoring supervisé (qualité de vin, prix immobilier)",
    pitch: "Pipeline ML complet : preprocessing, feature engineering, cross-validation. Comparaison Random Forest vs Gradient Boosting vs XGBoost sur deux datasets.",
    stack: ["scikit-learn", "XGBoost", "Pandas"],
    context: "Projets EFREI",
  },
  {
    id: "cnn-resnet",
    title: "Classification & détection d'images",
    pitch: "CNN entraîné from scratch puis fine-tuning de ResNet50 sur un dataset personnalisé. Comparaison des performances et analyse des couches intermédiaires.",
    stack: ["TensorFlow", "PyTorch", "ResNet50", "Computer Vision"],
    context: "Projets EFREI",
  },
  {
    id: "lora-sdxl",
    title: "Fine-tuning LoRA sur Stable Diffusion XL",
    pitch: "Adaptation d'un modèle de génération d'images SDXL via LoRA sur un dataset custom, avec évaluation qualitative des résultats.",
    stack: ["LoRA", "Stable Diffusion", "PyTorch", "Diffusers"],
    context: "Projets perso",
  },
  {
    id: "etl-streamlit",
    title: "Pipeline ETL Python complet",
    pitch: "Webscraping, nettoyage avec Pandas, stockage en SQL/MongoDB, visualisation dans Streamlit. Bout en bout depuis l'ingestion jusqu'au tableau de bord.",
    stack: ["Python", "Pandas", "MongoDB", "Streamlit", "Web scraping"],
    context: "Projet EFREI",
  },
  {
    id: "neo4j-musee",
    title: "Modélisation graphe Neo4j (projet musée)",
    pitch: "Modélisation d'entités et relations d'un musée en base de données graphe, avec requêtes Cypher pour répondre à des questions métier complexes.",
    stack: ["Neo4j", "Cypher", "Graph DB"],
    context: "Projet EFREI",
  },
];

function StackPill({ children }) {
  return (
    <span style={{
      padding: "4px 10px",
      background: "var(--lidl-yellow)",
      color: "var(--lidl-blue-deep)",
      fontFamily: "Anton, sans-serif",
      fontSize: 11,
      letterSpacing: 1.5,
      borderRadius: 3,
      border: "2px solid var(--lidl-red)",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function LidlProject({ p }) {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.06)",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        borderLeft: "5px solid var(--lidl-yellow)",
        borderRadius: 6,
        padding: "22px 26px",
        marginBottom: 18,
        position: "relative",
      }}
    >
      <div style={{
        position: "absolute",
        top: 18,
        right: 22,
        background: "var(--lidl-red)",
        color: "var(--lidl-white)",
        fontFamily: "Anton, sans-serif",
        fontSize: 12,
        letterSpacing: 2,
        padding: "3px 10px",
        textTransform: "uppercase",
        transform: "rotate(-3deg)",
      }}>{p.status}</div>

      <div style={{
        fontFamily: "Anton, sans-serif",
        fontStyle: "italic",
        fontSize: 24,
        color: "var(--lidl-yellow)",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 10,
        paddingRight: 110,
      }}>{p.title}</div>

      <p style={{ marginBottom: 12, lineHeight: 1.55 }}>{p.pitch}</p>

      <div style={{
        background: "rgba(0, 80, 170, 0.22)",
        borderLeft: "3px solid var(--lidl-yellow)",
        padding: "10px 14px",
        marginBottom: 14,
        borderRadius: 3,
      }}>
        <div style={{
          fontFamily: "Anton, sans-serif",
          fontSize: 11,
          letterSpacing: 2,
          color: "var(--lidl-yellow)",
          textTransform: "uppercase",
          marginBottom: 4,
        }}>Pourquoi ce projet</div>
        <div style={{ fontSize: 14, fontStyle: "italic" }}>{p.why}</div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {p.stack.map((s) => <StackPill key={s}>{s}</StackPill>)}
      </div>

      <a
        href={p.repo}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "Anton, sans-serif",
          fontSize: 13,
          letterSpacing: 2,
          color: "var(--lidl-yellow)",
          textDecoration: "underline",
          textTransform: "uppercase",
        }}
      >
        → Voir le repo GitHub
      </a>
    </div>
  );
}

function PersoProject({ p }) {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderLeft: "3px solid var(--lidl-yellow)",
        borderRadius: 4,
        padding: "16px 20px",
        marginBottom: 12,
      }}
    >
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 8,
        alignItems: "baseline",
        marginBottom: 6,
      }}>
        <div style={{
          fontFamily: "Anton, sans-serif",
          fontStyle: "italic",
          fontSize: 18,
          color: "var(--lidl-yellow)",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}>{p.title}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 1 }}>
          {p.context}
        </div>
      </div>

      <p style={{ marginBottom: 10, fontSize: 14, lineHeight: 1.5 }}>{p.pitch}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {p.stack.map((s) => <StackPill key={s}>{s}</StackPill>)}
      </div>
    </div>
  );
}

export default function ProjetsPage() {
  return (
    <PageLayout
      kicker="Chapitre 05"
      title="PROJETS"
      lead="Deux projets data conçus spécifiquement pour cette candidature, avec des datasets simulés qui collent au métier du Contrôle de Gestion. Plus une sélection de projets professionnels et académiques."
    >
      <div className="section-card">
        <h3 style={{ color: "var(--lidl-red)" }}>Projets construits pour ce poste</h3>
        <p style={{ marginBottom: 16, fontStyle: "italic", color: "rgba(255,255,255,0.7)" }}>
          Mise en pratique des compétences attendues sur des cas d'usage Lidl. Datasets simulés pour rester réaliste sans utiliser de données confidentielles.
        </p>
        {PROJECTS_LIDL.map((p) => <LidlProject key={p.id} p={p} />)}
      </div>

      <div className="section-card">
        <h3>Projets professionnels & académiques</h3>
        <p style={{ marginBottom: 16, fontStyle: "italic", color: "rgba(255,255,255,0.7)" }}>
          Sélection de réalisations en production chez Wise AI et de projets EFREI / perso liés à la Data Science et au Machine Learning.
        </p>
        {PROJECTS_PERSO.map((p) => <PersoProject key={p.id} p={p} />)}
      </div>

      <div className="section-card" style={{ borderLeft: "4px solid var(--lidl-red)" }}>
        <h3 style={{ color: "var(--lidl-red)" }}>Plus sur GitHub</h3>
        <p>
          L'ensemble de mes projets (notebooks, dashboards, prototypes) est publié sur
          <a
            href="https://github.com/ilyann0810"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--lidl-yellow)", textDecoration: "underline", marginLeft: 6 }}
          >github.com/ilyann0810</a>.
        </p>
      </div>
    </PageLayout>
  );
}
