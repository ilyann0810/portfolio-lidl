import { Routes, Route, useLocation, useNavigate, BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LidlMenu from './LidlMenu'
import PageTransition from './PageTransition'
import LidlPage from './pages/LidlPage'
import PostePage from './pages/PostePage'
import VisionPage from './pages/VisionPage'
import ParcoursPage from './pages/ParcoursPage'
import EquipePage from './pages/EquipePage'
import ProjetsPage from './pages/ProjetsPage'
import { AudioStartGate, AudioPanel } from './AudioGate'
import { useBgm } from './audio'
import { asset } from './asset'
import './App.css'

function MenuScreen() {
  const navigate = useNavigate()
  useBgm("menu")
  return (
    <div id="menu-screen">
      <div className="lidl-bg" />
      <div className="lidl-bg-grid" />
      <img src={asset("img/lightning.png")} alt="" className="menu-deco left" />
      <img src={asset("img/lightning.png")} alt="" className="menu-deco right" />

      <div className="lidl-logo">
        <div className="lidl-logo-mark">L</div>
        <div className="lidl-logo-text">Lidl France · Châtenay-Malabry</div>
      </div>

      <LidlMenu onNavigate={(page) => navigate(`/${page}`)} />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition><MenuScreen /></PageTransition>
        } />
        <Route path="/lidl" element={
          <PageTransition variant="cards"><LidlPage /></PageTransition>
        } />
        <Route path="/poste" element={
          <PageTransition variant="stripes"><PostePage /></PageTransition>
        } />
        <Route path="/vision" element={
          <PageTransition variant="vision"><VisionPage /></PageTransition>
        } />
        <Route path="/parcours" element={
          <PageTransition variant="cards"><ParcoursPage /></PageTransition>
        } />
        <Route path="/equipe" element={
          <PageTransition variant="cards"><EquipePage /></PageTransition>
        } />
        <Route path="/projets" element={
          <PageTransition variant="stripes"><ProjetsPage /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  )
}

// Vite injects BASE_URL based on the `base` config. In prod it's "/portfolio-lidl/", in dev it's "/".
// Strip trailing slash so React Router doesn't double up on it.
const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <AudioStartGate />
      <AudioPanel />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
