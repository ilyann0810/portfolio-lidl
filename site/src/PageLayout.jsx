import { useNavigate } from "react-router-dom";
import { useBgm, useSfx } from "./audio";

export default function PageLayout({ kicker, title, lead, children }) {
  const navigate = useNavigate();
  const playSfx = useSfx();
  useBgm("page");

  const goBack = () => {
    playSfx("back");
    navigate("/");
  };

  return (
    <div className="page">
      <div className="lidl-bg" />
      <div className="lidl-bg-grid" />
      <button className="page-back" onClick={goBack}>← MENU</button>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto" }}>
        {kicker && (
          <div className="page-kicker">
            <span className="page-kicker-text">{kicker}</span>
          </div>
        )}
        <h1 className="page-title">{title}</h1>
        {lead && <p className="page-lead">{lead}</p>}
        {children}
      </div>
    </div>
  );
}
