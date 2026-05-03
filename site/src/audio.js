// Centralized audio: BGM crossfade between menu and pages, SFX, mute, volume controls.
// Browser autoplay policy requires the FIRST .play() to happen synchronously inside a
// user gesture handler — that's what `start()` does (it calls play() right away).

import { useEffect, useState, useCallback, useRef } from "react";
import { asset } from "./asset";

const LS_MUTED      = "lidl_audio_muted";
const LS_VOL_MUSIC  = "lidl_audio_vol_music";
const LS_VOL_SFX    = "lidl_audio_vol_sfx";

const DEFAULT_MUSIC_VOL = 0.08;
const DEFAULT_SFX_VOL   = 0.30;
const PAGE_MUSIC_RATIO  = 0.65; // page BGM is a bit quieter than menu BGM
const CROSSFADE_MS      = 800;

const readNum = (key, fallback) => {
  const v = parseFloat(localStorage.getItem(key));
  return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : fallback;
};

class AudioController {
  constructor() {
    this.muted    = localStorage.getItem(LS_MUTED) === "1";
    this.musicVol = readNum(LS_VOL_MUSIC, DEFAULT_MUSIC_VOL);
    this.sfxVol   = readNum(LS_VOL_SFX,   DEFAULT_SFX_VOL);
    this.started  = false;
    this.currentTrackName = null;
    this.tracks = {};
    this.sfx    = {};
    this.fadeTimer = null;
    this.listeners = new Set();
    this._initialized = false;
  }

  init() {
    if (this._initialized) return;
    this._initialized = true;

    // ratio is how loud this track is relative to the global music volume slider
    this.tracks.menu = { audio: this._makeTrack(asset("sounds/main.mp3")),  ratio: 1.0 };
    this.tracks.page = { audio: this._makeTrack(asset("sounds/main1.mp3")), ratio: PAGE_MUSIC_RATIO };

    this.sfx.click  = this._makeSfx(asset("sounds/click_menu.mp3"));
    this.sfx.back   = this._makeSfx(asset("sounds/return_sfx.mp3"));
    this.sfx.select = this._makeSfx(asset("sounds/menu_select.mp3"));
  }

  _makeTrack(src) {
    const a = new Audio(src);
    a.loop = true;
    a.preload = "auto";
    a.volume = 0;
    return a;
  }

  _makeSfx(src) {
    const a = new Audio(src);
    a.preload = "auto";
    return a;
  }

  _targetVolume(trackEntry) {
    return this.muted ? 0 : this.musicVol * trackEntry.ratio;
  }

  // Synchronously called inside a click handler. Must call .play() immediately so the browser
  // unlocks the audio context. Returns a Promise that resolves when playback is actually running.
  start(initialTrack = "menu") {
    this.init();
    this.started = true;

    // Kick off all tracks muted so the browser counts them as user-triggered, then pause the inactive ones.
    const promises = Object.entries(this.tracks).map(([name, entry]) => {
      entry.audio.volume = 0;
      const p = entry.audio.play();
      // we'll pause the ones that aren't the initial track right after they've started
      return p
        .then(() => { if (name !== initialTrack) entry.audio.pause(); })
        .catch(() => { /* still ok, will retry later */ });
    });

    this.currentTrackName = initialTrack;
    this._fadeTo(initialTrack);
    this._notify();
    return Promise.all(promises);
  }

  // Crossfade from the current track to `name`.
  playTrack(name) {
    this.init();
    if (!this.started) return;             // start() will be called from the gate first
    if (this.currentTrackName === name) {
      // re-apply volume in case slider changed
      this._applyAllVolumes();
      return;
    }
    const prev = this.currentTrackName;
    this.currentTrackName = name;

    // Make sure target track is actually playing so we can fade it in.
    const target = this.tracks[name];
    if (target.audio.paused) target.audio.play().catch(() => {});

    this._fadeTo(name, prev);
  }

  _fadeTo(name, prev = null) {
    if (this.fadeTimer) {
      clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }

    const steps = 24;
    const interval = CROSSFADE_MS / steps;
    let i = 0;

    const target = this.tracks[name];
    const targetEnd = this._targetVolume(target);
    const targetStart = target.audio.volume;

    const prevEntry = prev ? this.tracks[prev] : null;
    const prevStart = prevEntry ? prevEntry.audio.volume : 0;

    this.fadeTimer = setInterval(() => {
      i++;
      const t = i / steps;
      target.audio.volume = Math.max(0, Math.min(1, targetStart + (targetEnd - targetStart) * t));
      if (prevEntry) {
        prevEntry.audio.volume = Math.max(0, Math.min(1, prevStart * (1 - t)));
      }
      if (i >= steps) {
        clearInterval(this.fadeTimer);
        this.fadeTimer = null;
        if (prevEntry && prev !== name) prevEntry.audio.pause();
      }
    }, interval);
  }

  _applyAllVolumes() {
    if (!this._initialized) return;
    Object.entries(this.tracks).forEach(([name, entry]) => {
      if (name === this.currentTrackName) {
        entry.audio.volume = this._targetVolume(entry);
      } else {
        entry.audio.volume = 0;
      }
    });
  }

  setMusicVolume(v) {
    this.musicVol = Math.max(0, Math.min(1, v));
    localStorage.setItem(LS_VOL_MUSIC, String(this.musicVol));
    this._applyAllVolumes();
    this._notify();
  }

  setSfxVolume(v) {
    this.sfxVol = Math.max(0, Math.min(1, v));
    localStorage.setItem(LS_VOL_SFX, String(this.sfxVol));
    this._notify();
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem(LS_MUTED, this.muted ? "1" : "0");
    this._applyAllVolumes();
    this._notify();
  }

  isStarted()    { return this.started; }
  isMuted()      { return this.muted; }
  getMusicVol()  { return this.musicVol; }
  getSfxVol()    { return this.sfxVol; }

  playSfx(name) {
    this.init();
    if (this.muted || !this.started) return;
    const a = this.sfx[name];
    if (!a) return;
    try {
      a.currentTime = 0;
      a.volume = this.sfxVol;
      a.play().catch(() => {});
    } catch { /* ignore */ }
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  _notify() {
    this.listeners.forEach(fn => fn());
  }
}

export const audio = new AudioController();

export function useAudioState() {
  const [, force] = useState(0);
  useEffect(() => audio.subscribe(() => force(n => n + 1)), []);
  return {
    muted:        audio.isMuted(),
    started:      audio.isStarted(),
    musicVol:     audio.getMusicVol(),
    sfxVol:       audio.getSfxVol(),
    toggleMute:   () => audio.toggleMute(),
    start:        (track) => audio.start(track),
    setMusicVol:  (v) => audio.setMusicVolume(v),
    setSfxVol:    (v) => audio.setSfxVolume(v),
  };
}

export function useBgm(trackName) {
  const last = useRef(null);
  useEffect(() => {
    if (last.current === trackName) return;
    last.current = trackName;
    audio.playTrack(trackName);
  }, [trackName]);
}

export function useSfx() {
  return useCallback((name) => audio.playSfx(name), []);
}
