import PageLayout from "../PageLayout";

export default function ContactPage() {
  return (
    <PageLayout
      kicker="Chapitre 05"
      title="CONTACT"
      lead="Merci pour le temps consacré à mon entretien. Je reste disponible pour échanger davantage sur le poste."
    >
      <div className="section-card">
        <h3>Email</h3>
        <p style={{ fontSize: 22, fontFamily: "Anton, sans-serif", color: "var(--lidl-yellow)", letterSpacing: 1 }}>
          <a href="mailto:hdebbah61@gmail.com">hdebbah61@gmail.com</a>
        </p>
      </div>

      <div className="section-card">
        <h3>Liens</h3>
        <p>LinkedIn · GitHub · Portfolio (à compléter avec les URLs souhaitées).</p>
      </div>

      <div className="section-card" style={{ borderLeft: "4px solid var(--lidl-red)" }}>
        <h3 style={{ color: "var(--lidl-red)" }}>Un mot pour finir</h3>
        <p>
          Ce rendu, c'est ma façon de montrer comment je travaille : prendre un brief,
          le comprendre en profondeur, et le restituer d'une manière qui se démarque sans
          se prendre au sérieux. Si vous lisez cette page, c'est que ça a fonctionné.
          À très vite, j'espère.
        </p>
      </div>
    </PageLayout>
  );
}
