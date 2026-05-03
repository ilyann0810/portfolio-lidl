import { useState, useEffect } from "react";
import { useSfx } from "./audio";

const ITEMS = [
  { id: "lidl",     label: "LIDL",         page: "lidl",     fontSize: 90,  offsetX: 0,  offsetY: 0,  skew: 0, skewY: 0 },
  { id: "poste",    label: "LE POSTE",     page: "poste",    fontSize: 80,  offsetX: 16, offsetY: 42, skew: 0, skewY: 0 },
  { id: "vision",   label: "MA VISION",    page: "vision",   fontSize: 96,  offsetX: 6,  offsetY: 42, skew: 0, skewY: 0 },
  { id: "parcours", label: "MON PARCOURS", page: "parcours", fontSize: 72,  offsetX: 14, offsetY: 46, skew: 0, skewY: 0 },
  { id: "equipe",   label: "L'ÉQUIPE",     page: "equipe",   fontSize: 80,  offsetX: 10, offsetY: 42, skew: 0, skewY: 0 },
  { id: "contact",  label: "CONTACT",      page: "contact",  fontSize: 68,  offsetX: 8,  offsetY: 42, skew: 0, skewY: 0 },
];

const clip = (w, h) => `polygon(0px 0px, ${w}px ${h * 0.5}px, 0px ${h}px)`;

function MenuRow({ item, index, isActive, dist, mounted, animKey, onConfirm, onHover }) {
  // Highlight/shadow size is driven by CSS — they wrap the label with width:100% so they always
  // match the rendered text width, no JS measurement, no font-load race.
  const opacity = isActive ? 1 : Math.max(0.5, 1 - dist * 0.18);
  const triClip = `polygon(0 0, 100% 50%, 0 100%)`;

  return (
    <a
      href="#"
      className={`lm-row ${isActive ? "active" : ""} ${mounted ? "mounted" : ""}`}
      style={{
        marginRight: item.offsetX,
        marginTop: item.offsetY,
        transitionDelay: mounted ? `${index * 80}ms` : "0ms",
      }}
      onClick={(e) => { e.preventDefault(); onConfirm(); }}
      onMouseEnter={onHover}
      aria-current={isActive ? "page" : undefined}
    >
      <div className="lm-glow" />
      <div
        className="lm-skew-wrap"
        style={{ transform: `skewX(${item.skew}deg) skewY(${item.skewY}deg)` }}
      >
        <div className="lm-label-wrap" style={{ opacity }}>
          <span className="lm-label-base lm-label-dark" style={{ fontSize: item.fontSize }}>
            {/* Inline transform on shadow + highlight reproduces the original P3 menu animation:
                a smooth scaleX from 0 to 1 with a snappy cubic-bezier, instead of an instant CSS class swap. */}
            <span
              key={isActive ? `pop-${index}-${animKey}` : `idle-${index}`}
              className={`lm-shadow-tri${isActive ? ' pop' : ''}`}
              style={{
                clipPath: triClip,
                transform: `translateY(-40%) translateX(-12px) scaleX(${isActive ? 1 : 0})`,
              }}
              aria-hidden="true"
            />
            <span
              className="lm-highlight"
              style={{
                clipPath: triClip,
                transform: `translateY(-50%) scaleX(${isActive ? 1 : 0})`,
              }}
              aria-hidden="true"
            />
            <span className="lm-label-text">{item.label}</span>
          </span>
        </div>
      </div>
    </a>
  );
}

export default function LidlMenu({ onNavigate }) {
  const [active, setActive] = useState(2); // "MA VISION" highlighted by default — most important section
  const [mounted, setMounted] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const playSfx = useSfx();

  const activate = (idx) => {
    if (idx === active) return;
    playSfx("select");
    setActive(idx);
    setAnimKey(k => k + 1);
  };

  const confirm = (idx) => {
    playSfx("click");
    onNavigate?.(ITEMS[idx].page);
  };

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp")   activate(Math.max(0, active - 1));
      if (e.key === "ArrowDown") activate(Math.min(ITEMS.length - 1, active + 1));
      if (e.key === "Enter")     confirm(active);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <style>{`
        .lm-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .lm-stripe  { position:absolute; right:0; top:0; bottom:0; width:6px; background: var(--lidl-yellow); z-index:10; pointer-events:none; }
        .lm-stripe2 { position:absolute; right:10px; top:0; bottom:0; width:2px; background: rgba(230, 10, 20, 0.4); z-index:10; pointer-events:none; }
        .lm-stripe3 { position:absolute; left:0; top:0; right:0; height:5px; background: var(--lidl-red); z-index:10; pointer-events:none; }

        .lm-menu {
          position: relative;
          z-index: 20;
          padding: 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: all;
        }

        .lm-row {
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          text-decoration: none;
          opacity: 0;
          transform: translateX(36px);
          transition: opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .lm-row.mounted {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        .lm-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 130%; height: 220%;
          background: radial-gradient(ellipse at center, rgba(255, 212, 0, 0.45) 0%, transparent 65%);
          filter: blur(22px);
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .lm-row.active .lm-glow { opacity: 1; }

        .lm-skew-wrap {
          position: relative;
          display: flex;
          align-items: center;
          isolation: isolate;
        }

        /* Original P5-style layered arrows: red shadow slightly offset down-left,
           yellow highlight on top — the offset is subtle (a few pixels), not stacked. */
        /* Pop animation = a snappy scaleX overshoot when the active row changes.
           Reproduces the original P3 menu's "shadow snap" feel. */
        /* Pop animation = a snappy scaleX overshoot when the active row changes.
           Reproduces the original P3 menu's "shadow snap" feel.
           Keeps the same translateY(-40%) translateX(-12px) base offset throughout. */
        @keyframes lm-shadow-pop {
          0%   { transform: translateY(-40%) translateX(-12px) scaleX(0) scaleY(1); }
          55%  { transform: translateY(-46%) translateX(-15px) scaleX(1.22) scaleY(1.18); }
          75%  { transform: translateY(-39%) translateX(-11px) scaleX(0.96) scaleY(0.97); }
          100% { transform: translateY(-40%) translateX(-12px) scaleX(1) scaleY(1); }
        }

        .lm-shadow-tri {
          position: absolute;
          top: 50%;
          left: 0;
          width: calc(100% + 36px);
          height: 100%;
          transform-origin: left center;
          /* Translucent red, like the P3 original's translucent pink. Lets the highlight peek through. */
          background: rgba(230, 10, 20, 0.82);
          z-index: 1;
          pointer-events: none;
          transition: transform 0.18s ease;
        }
        .lm-shadow-tri.pop {
          animation: lm-shadow-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .lm-highlight {
          position: absolute;
          top: 50%;
          left: 0;
          width: calc(100% + 36px);
          height: 100%;
          transform-origin: left center;
          background: var(--lidl-yellow);
          z-index: 2;
          /* Smooth elastic transition like the original P3 menu */
          transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }

        .lm-label-wrap {
          position: relative;
          z-index: 3;
        }

        .lm-label-base {
          font-family: 'Persona5 Menu', 'Anton', sans-serif;
          font-style: italic;
          letter-spacing: 2px;
          line-height: 0.85;
          display: inline-block;
          position: relative;
          isolation: isolate;
          white-space: nowrap;
          user-select: none;
        }

        .lm-label-dark {
          color: #ffffff;
        }

        .lm-label-text {
          position: relative;
          z-index: 5;
          display: inline-block;
          transition: color 0.12s ease;
        }
        .lm-row.active .lm-label-text { color: var(--lidl-blue-deep); }
        .lm-row:hover:not(.active) .lm-label-text { color: var(--lidl-yellow); }

        .lm-hint {
          position: absolute;
          bottom: 24px; right: 28px;
          z-index: 20;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 5px;
          font-family: 'Persona5 Menu', 'Anton', sans-serif;
          opacity: 0;
          transition: opacity 0.5s ease 0.9s;
        }
        .lm-hint.mounted { opacity: 1; }
        .lm-hint-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; letter-spacing: 2px;
          color: rgba(255,255,255,0.45);
        }
        .lm-hint-key {
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 3px;
          padding: 1px 6px; font-size: 11px;
        }

        .lm-name-tag {
          position: absolute;
          top: 22vh;
          left: 80px;
          z-index: 20;
          font-family: 'Persona5 Menu', 'Anton', sans-serif;
          font-style: italic;
          font-size: clamp(36px, 5vw, 88px);
          line-height: 0.88;
          letter-spacing: 2px;
          color: rgba(255, 212, 0, 0.18);
          transform: rotate(-4deg);
          transform-origin: left top;
          user-select: none;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        @media (max-width: 1500px) {
          .lm-name-tag { display: none; }
        }
        .lm-name-tag span:first-child {
          color: rgba(255, 255, 255, 0.10);
        }

        .lm-tag-bottom {
          position: absolute;
          bottom: 28px;
          left: 28px;
          z-index: 20;
          font-family: 'Persona5 Menu', 'Anton', sans-serif;
          font-size: 13px;
          letter-spacing: 4px;
          color: rgba(255, 255, 255, 0.55);
          text-transform: uppercase;
          opacity: 0;
          transition: opacity 0.5s ease 1.1s;
          line-height: 1.5;
        }
        .lm-tag-bottom.mounted { opacity: 1; }
        .lm-tag-bottom .accent { color: var(--lidl-yellow); }
      `}</style>

      <div className="lm-overlay">
        <div className="lm-name-tag">
          <span>ilyann's</span>
          <span>application</span>
        </div>
        <div className="lm-stripe" />
        <div className="lm-stripe2" />
        <div className="lm-stripe3" />

        <nav className="lm-menu">
          {ITEMS.map((item, i) => (
            <MenuRow
              key={item.id}
              item={item}
              index={i}
              isActive={active === i}
              dist={Math.abs(i - active)}
              mounted={mounted}
              animKey={animKey}
              onConfirm={() => confirm(i)}
              onHover={() => activate(i)}
            />
          ))}
        </nav>

        <div className={`lm-hint ${mounted ? "mounted" : ""}`}>
          <div className="lm-hint-row"><span className="lm-hint-key">↑↓</span><span>NAVIGUER</span></div>
          <div className="lm-hint-row"><span className="lm-hint-key">↵</span><span>OUVRIR</span></div>
        </div>

        <div className={`lm-tag-bottom ${mounted ? "mounted" : ""}`}>
          <div>ALTERNANCE <span className="accent">DATA SCIENTIST</span> H/F</div>
          <div>SIÈGE LIDL FRANCE · CHÂTENAY-MALABRY</div>
        </div>
      </div>
    </>
  );
}
