import PageLayout from "../PageLayout";

const SKILL_GROUPS = [
  { label: "Langages",                 items: ["Python", "SQL", "R", "Scala", "C#"] },
  { label: "Data Analyse & BI",        items: ["Power BI", "DAX", "Modélisation en étoile", "Pandas", "NumPy", "Streamlit", "Excel/VBA"] },
  { label: "IA & Machine Learning",    items: ["scikit-learn", "TensorFlow", "PyTorch", "Random Forest", "XGBoost", "Gradient Boosting", "CNN", "RAG", "LLM", "LoRA"] },
  { label: "Big Data & NoSQL",         items: ["Apache Spark", "Hive", "MongoDB", "Neo4j", "Pipeline ETL", "SQL avancé"] },
  { label: "Agents & Automatisation",  items: ["LangChain", "LangGraph", "n8n", "MCP", "Web scraping"] },
  { label: "Outils & Cloud",           items: ["Git", "GitHub", "Docker", "Azure", "Firebase"] },
];

function Pill({ children }) {
  return (
    <span style={{
      padding: "6px 12px",
      background: "var(--lidl-yellow)",
      color: "var(--lidl-blue-deep)",
      fontFamily: "Anton, sans-serif",
      fontSize: 12,
      letterSpacing: 1.5,
      borderRadius: 3,
      border: "2px solid var(--lidl-red)",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function ExpItem({ title, company, period, location, bullets }) {
  return (
    <div style={{ borderLeft: "3px solid var(--lidl-yellow)", paddingLeft: 18, marginBottom: 24 }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
        <strong style={{ color: "var(--lidl-yellow)", fontSize: 18 }}>{title}</strong>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: 1 }}>{period}</span>
      </div>
      <div style={{ fontStyle: "italic", color: "rgba(255,255,255,0.75)", marginTop: 4, marginBottom: 10 }}>
        {company} · {location}
      </div>
      <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.55 }}>
        {bullets.map((b, i) => <li key={i} style={{ marginBottom: 6 }}>{b}</li>)}
      </ul>
    </div>
  );
}

export default function ParcoursPage() {
  return (
    <PageLayout
      kicker="Chapitre 05"
      title="MON PARCOURS"
      lead="Étudiant ingénieur Big Data & Machine Learning à l'EFREI, déjà un an d'expérience en production chez Wise AI sur la stack data complète : Python, SQL, Power BI, et lead technique d'une équipe de 3."
    >
      {/* ═════════════════════════ PROFIL ═════════════════════════ */}
      <div className="section-card">
        <h3>Profil</h3>
        <p>
          Alternant ingénieur Data à <strong>EFREI Paris</strong> (majeure Big Data & ML), avec
          <strong> 1 an d'expérience en production</strong> chez Wise AI : dashboards Power BI,
          reporting KPIs, automatisation de données et lead technique d'une équipe de 3.
          Maîtrise du <strong>cycle complet de la donnée</strong>, de l'ingestion à la
          visualisation (Python, SQL, DAX).
        </p>
        <p style={{ marginTop: 10 }}>
          <strong style={{ color: "var(--lidl-yellow)" }}>
            Recherche alternance Développeur Power BI / Data Analyst, à partir de septembre 2026.
          </strong>
        </p>
      </div>

      {/* ═════════════════════════ EXPÉRIENCES ═════════════════════════ */}
      <div className="section-card">
        <h3>Expériences professionnelles</h3>

        <ExpItem
          title="AI Engineer & Lead Technique (Alternance)"
          company="Wise AI / J-aime"
          period="Jan. 2025 → Présent"
          location="Paris"
          bullets={[
            <>Conception de <strong>dashboards Power BI</strong> clients/hôteliers : monitoring des flux de communication (email, chatbot), analyse de la valeur générée par canal, suivi de KPIs (taux de résolution, temps de réponse). <strong>Modèle en étoile, DAX avancé.</strong></>,
            <>Développement d'un <strong>dashboard interne de pilotage des rendements</strong> par projet : suivi de la rentabilité, avancement et performance des livrables</>,
            <>Pipeline de <strong>traitement automatique des emails</strong> (classification, réponse LLM) : <strong>−70 % de temps de traitement manuel</strong></>,
            <>Implémentation de systèmes <strong>RAG connectés à un PMS hôtelier via MCP</strong> (Model Context Protocol) : <strong>−60 % de temps de réponse support</strong></>,
            <><strong>Change Management</strong> : formation et onboarding des clients, rédaction de guides utilisateurs, suivi de l'adoption</>,
            <>Outil d'<strong>upselling</strong> et modèle ML pour le <strong>revenue management hôtelier</strong> : prédiction de la demande et optimisation dynamique des tarifs</>,
            <><strong>Lead technique</strong> d'une équipe de 3 : architecture, revue de code, suivi des livrables</>,
          ]}
        />

        <ExpItem
          title="Stagiaire Recherche : IA & Systèmes Intelligents"
          company="Laboratoire Costech, UTC Compiègne"
          period="Jan. 2025 → Juil. 2025"
          location="Compiègne"
          bullets={[
            <>Conception et développement d'un <strong>agent conversationnel adaptatif</strong> en Python, avec mémoire contextuelle et gestion d'état</>,
            <>Système <strong>RAG (LangChain + vector store)</strong> pour la recherche sémantique sur corpus scientifique</>,
            <><strong>Benchmark de 4 architectures d'agents LLM autonomes</strong> (ReAct, Plan-and-Execute, AutoGPT-style). Rapport de 20 pages livré.</>,
          ]}
        />
      </div>

      {/* ═════════════════════════ PROJETS ═════════════════════════ */}
      <div className="section-card">
        <h3>Projets</h3>

        <div style={{ borderLeft: "3px solid var(--lidl-yellow)", paddingLeft: 18, marginBottom: 18 }}>
          <strong style={{ color: "var(--lidl-yellow)" }}>Datavisualisation & Reporting</strong>
          <ul style={{ margin: "8px 0 0", paddingLeft: 18, lineHeight: 1.55 }}>
            <li>Dashboard Power BI interactif pour le suivi de KPIs métiers : modèle en étoile, DAX avancé, filtres dynamiques, slicers</li>
            <li>Automatisation Excel/VBA : macros de consolidation multi-feuilles, nettoyage et génération automatique de rapports graphiques</li>
            <li>Analyse de second niveau : identification d'anomalies, corrélations et tendances sur données historiques (Python, Pandas)</li>
          </ul>
        </div>

        <div style={{ borderLeft: "3px solid var(--lidl-yellow)", paddingLeft: 18, marginBottom: 18 }}>
          <strong style={{ color: "var(--lidl-yellow)" }}>Machine Learning : Modélisation & Classification</strong>
          <ul style={{ margin: "8px 0 0", paddingLeft: 18, lineHeight: 1.55 }}>
            <li>Modèles de scoring supervisé (qualité de vin, prix immobilier) : pipeline complet preprocessing → cross-validation (Random Forest, Gradient Boosting, XGBoost)</li>
            <li>Classification et détection d'images : CNN entraîné from scratch + fine-tuning ResNet50 sur dataset personnalisé</li>
            <li>Fine-tuning de modèles LoRA pour la génération d'images (Stable Diffusion XL) avec dataset custom</li>
          </ul>
        </div>

        <div style={{ borderLeft: "3px solid var(--lidl-yellow)", paddingLeft: 18 }}>
          <strong style={{ color: "var(--lidl-yellow)" }}>Data Engineering & Pipelines</strong>
          <ul style={{ margin: "8px 0 0", paddingLeft: 18, lineHeight: 1.55 }}>
            <li>Pipeline ETL Python complet : webscraping, nettoyage Pandas, stockage SQL/MongoDB, visualisation Streamlit</li>
            <li>Modélisation et requêtage de bases relationnelles + graphes (Neo4j), projet musée : entités, relations, requêtes Cypher</li>
          </ul>
        </div>
      </div>

      {/* ═════════════════════════ FORMATION ═════════════════════════ */}
      <div className="section-card">
        <h3>Formation</h3>

        <div style={{ borderLeft: "3px solid var(--lidl-yellow)", paddingLeft: 18, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <strong style={{ color: "var(--lidl-yellow)" }}>Cycle Ingénieur, Majeure Big Data & Machine Learning</strong>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>2025 → 2027</span>
          </div>
          <div style={{ fontStyle: "italic", color: "rgba(255,255,255,0.75)", marginTop: 4 }}>EFREI Paris</div>
          <p style={{ marginTop: 8, fontSize: 14 }}>
            Machine Learning, Deep Learning, Apache Spark/Hive, Cloud Computing, SQL avancé, API & Web Services, Statistiques & Algèbre linéaire pour la Data Science.
          </p>
        </div>

        <div style={{ borderLeft: "3px solid var(--lidl-yellow)", paddingLeft: 18, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <strong style={{ color: "var(--lidl-yellow)" }}>Cycle Ingénieur, Génie Informatique</strong>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>2021 → 2025</span>
          </div>
          <div style={{ fontStyle: "italic", color: "rgba(255,255,255,0.75)", marginTop: 4 }}>Université Technologique de Compiègne (UTC)</div>
          <p style={{ marginTop: 8, fontSize: 14 }}>
            Spécialisation IA & génie logiciel, recherche appliquée, projets industriels.
          </p>
        </div>

        <div style={{ borderLeft: "3px solid var(--lidl-yellow)", paddingLeft: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <strong style={{ color: "var(--lidl-yellow)" }}>Baccalauréat Scientifique, Mention Très Bien</strong>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>2021</span>
          </div>
          <div style={{ fontStyle: "italic", color: "rgba(255,255,255,0.75)", marginTop: 4 }}>École privée Notre Dame des Missions</div>
        </div>
      </div>

      {/* ═════════════════════════ COMPÉTENCES ═════════════════════════ */}
      <div className="section-card">
        <h3>Compétences techniques</h3>
        <div style={{ display: "grid", gap: 18 }}>
          {SKILL_GROUPS.map((g) => (
            <div key={g.label}>
              <div style={{
                fontFamily: "Anton, sans-serif",
                fontStyle: "italic",
                fontSize: 14,
                letterSpacing: 2,
                color: "var(--lidl-yellow)",
                textTransform: "uppercase",
                marginBottom: 8,
              }}>{g.label}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {g.items.map((s) => <Pill key={s}>{s}</Pill>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═════════════════════════ LANGUES & INTÉRÊTS ═════════════════════════ */}
      <div className="section-card">
        <h3>Langues & centres d'intérêt</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginTop: 8 }}>
          <div>
            <div style={{
              fontFamily: "Anton, sans-serif", fontStyle: "italic", fontSize: 13,
              letterSpacing: 2, color: "var(--lidl-yellow)", textTransform: "uppercase",
              marginBottom: 8,
            }}>Langues</div>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
              <li><strong>Français</strong> : Langue maternelle</li>
              <li><strong>Anglais</strong> : C1 (professionnel)</li>
              <li><strong>Allemand</strong> : B1</li>
            </ul>
          </div>
          <div>
            <div style={{
              fontFamily: "Anton, sans-serif", fontStyle: "italic", fontSize: 13,
              letterSpacing: 2, color: "var(--lidl-yellow)", textTransform: "uppercase",
              marginBottom: 8,
            }}>Centres d'intérêt</div>
            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.7 }}>
              <li>Gymnastique artistique (compétition)</li>
              <li>Échecs · Boxe</li>
              <li>Guitare & Formation musicale (Conservatoire André Navarra)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ═════════════════════════ CONTACT ═════════════════════════ */}
      <div className="section-card" style={{ borderLeft: "4px solid var(--lidl-red)" }}>
        <h3 style={{ color: "var(--lidl-red)" }}>Me contacter</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 12 }}>
          <div>
            <div style={{
              fontFamily: "Anton, sans-serif", fontStyle: "italic", fontSize: 12,
              letterSpacing: 2, color: "var(--lidl-yellow)", textTransform: "uppercase",
              marginBottom: 4,
            }}>Email</div>
            <a href="mailto:ilyann0810@gmail.com" style={{ fontSize: 15, color: "var(--lidl-white)" }}>
              ilyann0810@gmail.com
            </a>
          </div>
          <div>
            <div style={{
              fontFamily: "Anton, sans-serif", fontStyle: "italic", fontSize: 12,
              letterSpacing: 2, color: "var(--lidl-yellow)", textTransform: "uppercase",
              marginBottom: 4,
            }}>Téléphone</div>
            <a href="tel:+33651364933" style={{ fontSize: 15, color: "var(--lidl-white)" }}>
              06 51 36 49 33
            </a>
          </div>
          <div>
            <div style={{
              fontFamily: "Anton, sans-serif", fontStyle: "italic", fontSize: 12,
              letterSpacing: 2, color: "var(--lidl-yellow)", textTransform: "uppercase",
              marginBottom: 4,
            }}>GitHub</div>
            <a
              href="https://github.com/ilyann0810"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 15, color: "var(--lidl-white)" }}
            >
              github.com/ilyann0810
            </a>
          </div>
          <div>
            <div style={{
              fontFamily: "Anton, sans-serif", fontStyle: "italic", fontSize: 12,
              letterSpacing: 2, color: "var(--lidl-yellow)", textTransform: "uppercase",
              marginBottom: 4,
            }}>Localisation</div>
            <span style={{ fontSize: 15 }}>Paris, Île-de-France</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
