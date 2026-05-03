import { useState } from "react";
import { useAudioState, audio } from "./audio";

export function AudioStartGate() {
  const { started, start } = useAudioState();
  if (started) return null;

  // IMPORTANT: start() must be called synchronously in the click handler — that's
  // what unlocks the browser's autoplay policy. No await/setTimeout before it.
  const handleStart = () => {
    audio.init();
    start("menu");
  };

  return (
    <div
      onClick={handleStart}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--lidl-blue-deep)",
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        animation: "fadeIn 0.4s ease",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 520, padding: 32 }}>
        <div style={{
          width: 96, height: 96,
          margin: "0 auto 28px",
          background: "var(--lidl-yellow)",
          border: "4px solid var(--lidl-red)",
          borderRadius: 8,
          display: "grid", placeItems: "center",
          fontFamily: "Anton, sans-serif",
          fontSize: 48,
          color: "var(--lidl-blue)",
          letterSpacing: 1,
          animation: "pulse 1.6s ease-in-out infinite",
        }}>L</div>

        <div style={{
          fontFamily: "Anton, sans-serif",
          fontSize: 14, letterSpacing: 4,
          color: "var(--lidl-red)",
          textTransform: "uppercase",
          marginBottom: 8,
        }}>Rendu pour Lidl France</div>

        <h1 style={{
          fontFamily: "Anton, sans-serif",
          fontStyle: "italic",
          fontSize: "clamp(40px, 6vw, 72px)",
          color: "var(--lidl-yellow)",
          margin: "0 0 24px",
          letterSpacing: 2,
          lineHeight: 1,
        }}>APPUYEZ POUR<br/>COMMENCER</h1>

        <p style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: 15,
          letterSpacing: 1,
        }}>Cliquez n'importe où, musique et SFX activés</p>

        <div style={{
          marginTop: 36,
          fontFamily: "Anton, sans-serif",
          fontSize: 12, letterSpacing: 3,
          color: "rgba(255,255,255,0.4)",
        }}>♪ AVEC SON</div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.06); }
        }
      `}</style>
    </div>
  );
}

export function AudioPanel() {
  const { muted, started, musicVol, sfxVol, toggleMute, setMusicVol, setSfxVol } = useAudioState();
  const [open, setOpen] = useState(false);
  if (!started) return null;

  return (
    <div style={{
      position: "fixed",
      top: 24,
      right: 24,
      zIndex: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 10,
    }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => setOpen(o => !o)}
          aria-label="Réglages audio"
          style={btnStyle(false)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94 0 .31.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
          </svg>
        </button>

        <button
          onClick={toggleMute}
          aria-label={muted ? "Activer le son" : "Couper le son"}
          style={btnStyle(!muted)}
        >
          {muted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0021 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
          )}
        </button>
      </div>

      {open && (
        <div style={{
          background: "rgba(0, 30, 69, 0.92)",
          border: "2px solid var(--lidl-yellow)",
          borderRadius: 8,
          padding: "16px 18px",
          minWidth: 220,
          backdropFilter: "blur(10px)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
          fontFamily: "Anton, sans-serif",
          color: "var(--lidl-white)",
        }}>
          <SliderRow label="MUSIQUE"  value={musicVol} onChange={setMusicVol} muted={muted} />
          <SliderRow label="SFX"      value={sfxVol}   onChange={setSfxVol}   muted={muted} />
        </div>
      )}
    </div>
  );
}

function SliderRow({ label, value, onChange, muted }) {
  return (
    <label style={{ display: "block", marginBottom: 14, opacity: muted ? 0.5 : 1 }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        letterSpacing: 2,
        marginBottom: 6,
        color: "var(--lidl-yellow)",
      }}>
        <span>{label}</span>
        <span style={{ color: "var(--lidl-white)" }}>{Math.round(value * 100)}</span>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={muted}
        style={{
          width: "100%",
          accentColor: "var(--lidl-yellow)",
          cursor: muted ? "not-allowed" : "pointer",
        }}
      />
    </label>
  );
}

function btnStyle(highlighted) {
  return {
    width: 44, height: 44,
    borderRadius: "50%",
    border: "2px solid var(--lidl-yellow)",
    background: highlighted ? "var(--lidl-yellow)" : "rgba(0, 30, 69, 0.7)",
    color: highlighted ? "var(--lidl-blue-deep)" : "var(--lidl-yellow)",
    display: "grid", placeItems: "center",
    cursor: "pointer",
    backdropFilter: "blur(6px)",
    transition: "transform 0.15s ease",
  };
}
