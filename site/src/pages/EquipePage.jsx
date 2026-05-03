import PageLayout from "../PageLayout";
import { useState } from "react";
import { useSfx } from "../audio";
import { asset } from "../asset";

const TEAM = [
  {
    id: "ilyann",
    unlocked: true,
    name: "Ilyann Mouisset",
    short: "ILYANN",
    role: "Data Scientist · Alternant",
    level: 22,
    img: asset("img/team/ilyann.png"),
    stats: [
      { label: "Python",    value: 88 },
      { label: "SQL",       value: 82 },
      { label: "Power BI",  value: 75 },
    ],
    catchphrase: "Salut moi c'est Ilyann, étudiant en 4ème année et data scientist à en devenir.",
  },
  {
    id: "narimane",
    unlocked: true,
    name: "Narimane Zenati",
    short: "NARIMANE",
    role: "Chef de Projet RH & Recrutement",
    level: 35,
    img: asset("img/team/narimane.png"),
    stats: [
      { label: "Recrut.",   value: 92 },
      { label: "Relations", value: 88 },
      { label: "Process",   value: 84 },
    ],
    catchphrase: "C'est moi qui ai porté le recrutement de cette alternance. Bienvenue à Châtenay.",
  },
  {
    id: "amelie",
    unlocked: true,
    name: "Amélie Pereira Gomes",
    short: "AMÉLIE",
    role: "Chef de Projet Digital · Recrutement",
    level: 33,
    img: asset("img/team/amelie.png"),
    stats: [
      { label: "Strategy",  value: 86 },
      { label: "Digital",   value: 90 },
      { label: "Process",   value: 80 },
    ],
    catchphrase: "Je pilote la transformation digitale du recrutement Lidl France.",
  },
  {
    id: "hafssa",
    unlocked: true,
    name: "Hafssa Rougui",
    short: "HAFSSA",
    role: "Data Scientist",
    level: 38,
    img: asset("img/team/hafssa.png"),
    stats: [
      { label: "Python",    value: 90 },
      { label: "SQL",       value: 92 },
      { label: "Power BI",  value: 85 },
    ],
    catchphrase: "Mentor data sur les sujets Contrôle de Gestion. Toujours là pour faire avancer les modèles.",
  },
  {
    id: "flora",
    unlocked: false,
    name: "Flora Zheng",
    short: "FLORA",
    role: "Data Scientist",
    catchphrase: "Rejoignez l'équipe pour me débloquer.",
  },
  {
    id: "bochra",
    unlocked: false,
    name: "Bochra Kallala",
    short: "BOCHRA",
    role: "Data Scientist",
    catchphrase: "Rejoignez l'équipe pour me débloquer.",
  },
];

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(s => s[0]?.toUpperCase()).join("");
}

function CharSlot({ member, index, total, isHover, isSelected, onHover, onLeave, onClick }) {
  const { unlocked } = member;
  // Reverse the stripe direction across slots so they alternate slightly
  const skew = -10;

  return (
    <div
      className={[
        "char-slot",
        isHover ? "hover" : "",
        isSelected ? "selected" : "",
        unlocked ? "unlocked" : "locked",
      ].join(" ")}
      style={{ "--slot-index": index, "--slot-total": total }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      role="button"
      aria-label={unlocked ? member.name : "Membre verrouillé"}
      tabIndex={unlocked ? 0 : -1}
    >
      <div className="char-slot-frame" style={{ transform: `skewX(${skew}deg)` }}>
        <div className="char-slot-inner" style={{ transform: `skewX(${-skew}deg)` }}>
          {member.img ? (
            <img
              src={member.img}
              alt=""
              className="char-img"
              loading="eager"
              decoding="async"
            />
          ) : (
            <div className="char-fallback">
              <span>{unlocked ? initials(member.name) : "?"}</span>
            </div>
          )}
          <div className="char-slot-overlay" />
          <div className="char-slot-shine" />
        </div>
      </div>
      <div className="char-slot-label">
        {member.short}
      </div>
    </div>
  );
}

/* TeamDrawer — slides in from the right when a slot is clicked.
   Two zones: left = big bust + name, right = stats + bubble.
   The whole drawer has a torn red+black scratch on its left edge,
   reproducing the P5 "splash entrance" feel. */
function TeamDrawer({ member, onClose }) {
  // We always render, but flip a class to drive the slide animation.
  const open = !!member;
  const m = member || {};

  return (
    <div className={`team-drawer-root${open ? " open" : ""}`} aria-hidden={!open}>
      {/* Backdrop (clickable to close) */}
      <div className="team-drawer-backdrop" onClick={onClose} />

      {/* The drawer panel */}
      <aside className="team-drawer">
        {/* Torn scratch decoration on the left edge */}
        <div className="team-drawer-scratch" />

        {/* Close button (P5-style "X" tag) */}
        <button className="team-drawer-close" onClick={onClose} aria-label="Fermer">
          <span>✕</span>
        </button>

        {member && (
          <div className="team-drawer-content" key={m.id}>
            <div className="team-drawer-bust">
              {m.img ? (
                <img src={m.img} alt="" loading="eager" decoding="async" />
              ) : (
                <div className="team-drawer-bust-fallback"><span>?</span></div>
              )}
              <div className="team-drawer-bust-overlay" />
              <div className="team-drawer-name-tag">{m.short}</div>
            </div>

            <div className="team-drawer-stats-col">
              <div className="team-drawer-name">{m.name}</div>
              <div className="team-drawer-role">{m.role}</div>
              {m.unlocked ? (
                <div className="team-drawer-level"><span>LV</span> {m.level}</div>
              ) : (
                <>
                  <div className="team-drawer-level"><span>LV</span> ???</div>
                  <div className="team-drawer-locked-tag">LOCKED</div>
                </>
              )}

              <div className="team-drawer-stats">
                {(m.unlocked ? m.stats : [
                  { label: "???" }, { label: "???" }, { label: "???" }
                ]).map((s, i) => (
                  <div className="team-drawer-stat" key={`${s.label}-${i}`}>
                    <div className="team-drawer-stat-row">
                      <span>{s.label}</span>
                      <span>{m.unlocked ? s.value : "???"}</span>
                    </div>
                    <div className="team-drawer-stat-track">
                      <div
                        className="team-drawer-stat-fill"
                        style={{ width: `${m.unlocked ? s.value : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="team-drawer-bubble">
                <div className="team-drawer-bubble-tag">{m.short}</div>
                <div className="team-drawer-bubble-text">
                  {m.unlocked ? m.catchphrase : "???"}
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function BigBust({ member }) {
  if (!member) return null;
  const { unlocked } = member;
  return (
    <div className={`big-bust${unlocked ? "" : " locked"}`} key={member.id}>
      <div className="big-bust-frame">
        <div className="big-bust-inner">
          {member.img ? (
            <img src={member.img} alt="" className="big-bust-img" />
          ) : (
            <div className="big-bust-fallback">
              <span>{unlocked ? member.short[0] : "?"}</span>
            </div>
          )}
          <div className="big-bust-overlay" />
          <div className="big-bust-tag">{member.short}</div>
        </div>
      </div>
    </div>
  );
}

function StatsPanel({ member }) {
  if (!member) return null;
  const { unlocked } = member;
  // For locked members, we still show name/role but mask everything else with "???"
  const lockedStats = [
    { label: "???", value: 0 },
    { label: "???", value: 0 },
    { label: "???", value: 0 },
  ];
  return (
    <div className={`stats-panel${unlocked ? "" : " locked"}`} key={member.id}>
      <div className="stats-panel-header">
        <div className="stats-panel-name">{member.name}</div>
        <div className="stats-panel-role">{member.role}</div>
        {unlocked ? (
          <div className="stats-panel-level"><span>LV</span> {member.level}</div>
        ) : (
          <>
            <div className="stats-panel-level"><span>LV</span> ???</div>
            <div className="stats-panel-locked-tag">LOCKED</div>
          </>
        )}
      </div>

      <div className="stats-panel-stats">
        {(unlocked ? member.stats : lockedStats).map((s, i) => (
          <div className="stats-panel-stat" key={`${s.label}-${i}`}>
            <div className="stats-panel-stat-row">
              <span className="stats-panel-stat-label">{s.label}</span>
              <span className="stats-panel-stat-value">{unlocked ? s.value : "???"}</span>
            </div>
            <div className="stats-panel-stat-track">
              <div className="stats-panel-stat-fill" style={{ width: `${unlocked ? s.value : 0}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="stats-panel-bubble">
        <div className="stats-panel-bubble-tag">{member.short}</div>
        <div className="stats-panel-bubble-text">
          {unlocked ? member.catchphrase : "???"}
        </div>
      </div>
    </div>
  );
}

export default function EquipePage() {
  const [hoverIdx, setHoverIdx] = useState(null);
  const [openIdx, setOpenIdx] = useState(null);
  const playSfx = useSfx();

  const handleHover = (i) => {
    if (hoverIdx === i) return;
    playSfx("select");
    setHoverIdx(i);
  };

  const handleClick = (i) => {
    if (openIdx === i) {
      // toggle close
      playSfx("back");
      setOpenIdx(null);
      return;
    }
    playSfx("click");
    setOpenIdx(i);
  };

  const closeDrawer = () => {
    playSfx("back");
    setOpenIdx(null);
  };

  const openMember = openIdx !== null ? TEAM[openIdx] : null;

  return (
    <PageLayout
      kicker="Chapitre 04"
      title="L'ÉQUIPE"
      lead="Survolez les membres de l'équipe Lidl pour les éclairer, cliquez pour révéler leurs stats. Format roster, comme dans un menu de jeu vidéo."
    >
      <div className="char-roster">
        {TEAM.map((m, i) => (
          <CharSlot
            key={m.id}
            member={m}
            index={i}
            total={TEAM.length}
            isHover={hoverIdx === i}
            isSelected={openIdx === i}
            onHover={() => handleHover(i)}
            onLeave={() => setHoverIdx(null)}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>

      <TeamDrawer member={openMember} onClose={closeDrawer} />
    </PageLayout>
  );
}
