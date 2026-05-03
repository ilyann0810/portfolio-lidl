import PageLayout from "../PageLayout";

export default function LidlPage() {
  return (
    <PageLayout
      kicker="Chapitre 01"
      title="LIDL FRANCE"
      lead="De l'épicerie de gros allemande des années 1930 au virage Smart Discount français : un acteur qui a su réinventer le discount sans renier son ADN d'efficacité."
    >
      <div className="kpi-grid">
        <div className="kpi"><div className="kpi-num">~1 580</div><div className="kpi-label">supermarchés en France</div></div>
        <div className="kpi"><div className="kpi-num">~46 000</div><div className="kpi-label">collaborateurs</div></div>
        <div className="kpi"><div className="kpi-num">~16 Md€</div><div className="kpi-label">CA France 2024</div></div>
        <div className="kpi"><div className="kpi-num">25</div><div className="kpi-label">plateformes logistiques</div></div>
      </div>

      <div className="section-card">
        <h3>Une histoire familiale devenue géant européen</h3>
        <p>
          Fondée en <strong>1930</strong> par Josef Schwarz à Neckarsulm comme grossiste alimentaire,
          l'enseigne ouvre son premier magasin discount à <strong>Ludwigshafen en 1973</strong>, sous l'impulsion de
          Dieter Schwarz. Aujourd'hui, le groupe <strong>Schwarz Gruppe</strong> (Lidl + Kaufland) est le
          n°1 de la distribution en Europe.
        </p>
      </div>

      <div className="section-card">
        <h3>1989 : Lidl arrive en France</h3>
        <p>
          Le premier magasin Lidl français ouvre le <strong>5 avril 1989 à Sarreguemines</strong> (Moselle).
          Trente-six ans plus tard, l'enseigne est devenue un acteur incontournable du paysage,
          avec un maillage de proximité qui couvre l'ensemble du territoire.
        </p>
      </div>

      <div className="section-card">
        <h3>Le virage Smart Discount (depuis 2012)</h3>
        <p>
          Lidl ne veut plus être perçu comme un hard-discounter. Magasins repensés, élargissement de
          l'assortiment (frais, bio, marques nationales), création de la MDD <em>« Saveurs de nos régions »</em>
          et signature publicitaire <strong>« Le vrai prix des bonnes choses »</strong> (2014–2015). L'objectif :
          convaincre que prix bas et qualité ne sont pas antinomiques.
        </p>
        <div className="kpi-grid" style={{ marginTop: 20 }}>
          <div className="kpi"><div className="kpi-num">~5 500</div><div className="kpi-label">références alimentaires</div></div>
          <div className="kpi"><div className="kpi-num">73 %</div><div className="kpi-label">made in France</div></div>
        </div>
      </div>

      <div className="section-card">
        <h3>Châtenay-Malabry : le nouveau cerveau (2024)</h3>
        <p>
          Inauguré le <strong>25 septembre 2024</strong> dans l'écoquartier <em>LaVallée</em>, le siège regroupe
          <strong> 1 200 collaborateurs</strong> sur <strong>36 500 m²</strong> de bureaux. Investissement de
          <strong> 140 M€</strong>, certifications HQE Excellent et BREEAM Excellent. Plus qu'un déménagement :
          un signal stratégique sur l'ambition française du groupe.
        </p>
      </div>

      <div className="section-card">
        <h3>Direction</h3>
        <p>
          <strong>John-Paul Scally</strong>, ex-CEO de Lidl Irlande, préside Lidl France depuis
          <strong> août 2024</strong>, succédant à Michel Biero qui a quitté le groupe en mars 2025.
        </p>
      </div>
    </PageLayout>
  );
}
