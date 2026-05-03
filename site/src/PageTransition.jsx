import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

// Lidl-themed page transitions: yellow/red/blue panels sweep in/out.

const defaultBlocks = [
  { color: "#FFD400" }, // yellow
  { color: "#E60A14" }, // red
  { color: "#0050AA" }, // blue
];

function DefaultTransition() {
  return defaultBlocks.map((b, i) => (
    <motion.div
      key={i}
      style={{
        position: "fixed",
        pointerEvents: "none",
        inset: 0,
        background: b.color,
        zIndex: 999 - i,
        originX: 0,
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: [0, 1, 1, 0] }}
      transition={{
        duration: 0.5,
        delay: i * 0.06,
        times: [0, 0.4, 0.6, 1],
        ease: [0.76, 0, 0.24, 1],
      }}
    />
  ));
}

function VisionTransition() {
  // For "Ma Vision" — the showpiece. Bigger, more dramatic.
  const panels = [
    { color: "#FFD400", top: "-12vh", left: "-18vw", width: "92vw", delay: 0 },
    { color: "#E60A14", top: "30vh",  left: "-10vw", width: "78vw", delay: 0.06 },
    { color: "#0050AA", top: "62vh",  left: "-14vw", width: "88vw", delay: 0.12 },
  ];

  return panels.map((panel, i) => (
    <motion.div
      key={i}
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: panel.top,
        left: panel.left,
        width: panel.width,
        height: "30vh",
        background: panel.color,
        zIndex: 999 - i,
        clipPath: "polygon(0 0, 100% 0, calc(100% - 140px) 100%, 0 100%)",
        transform: "rotate(-14deg)",
        transformOrigin: "left center",
      }}
      initial={{ x: -700, opacity: 0 }}
      animate={{ x: [-700, 20, 0], opacity: [1, 1, 0] }}
      transition={{
        duration: 0.6,
        delay: panel.delay,
        times: [0, 0.7, 1],
        ease: [0.22, 1, 0.36, 1],
      }}
    />
  ));
}

function StripesTransition() {
  const stripes = [
    { color: "#0050AA", left: "70vw", width: "26vw", delay: 0 },
    { color: "#FFD400", left: "80vw", width: "14vw", delay: 0.06 },
    { color: "#E60A14", left: "88vw", width: "8vw",  delay: 0.12 },
  ];

  return stripes.map((stripe, i) => (
    <motion.div
      key={i}
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: "-6vh",
        left: stripe.left,
        width: stripe.width,
        height: "112vh",
        background: stripe.color,
        zIndex: 999 - i,
        transform: "skewX(-16deg)",
        transformOrigin: "top",
      }}
      initial={{ y: "-120vh", opacity: 1 }}
      animate={{ y: ["-120vh", "0vh", "0vh", "120vh"], opacity: [1, 1, 1, 0] }}
      transition={{
        duration: 0.6,
        delay: stripe.delay,
        times: [0, 0.42, 0.58, 1],
        ease: [0.76, 0, 0.24, 1],
      }}
    />
  ));
}

function CardsTransition() {
  const cards = [
    { top: "10vh", color: "#FFD400", delay: 0 },
    { top: "30vh", color: "#0050AA", delay: 0.05 },
    { top: "50vh", color: "#E60A14", delay: 0.1 },
    { top: "70vh", color: "#FFD400", delay: 0.15 },
  ];

  return cards.map((card, i) => (
    <motion.div
      key={i}
      style={{
        position: "fixed",
        pointerEvents: "none",
        left: "-6vw",
        top: card.top,
        width: "82vw",
        height: "16vh",
        background: card.color,
        zIndex: 999 - i,
        clipPath: "polygon(0 0, 97% 0, 100% 100%, 3% 100%)",
        opacity: 0,
      }}
      initial={{ x: "-110vw", opacity: 1 }}
      animate={{ x: ["-110vw", "2vw", "0vw", "110vw"], opacity: [1, 1, 1, 0] }}
      transition={{
        duration: 0.7,
        delay: card.delay,
        times: [0, 0.48, 0.7, 1],
        ease: [0.76, 0, 0.24, 1],
      }}
    />
  ));
}

function TransitionOverlay({ variant }) {
  if (variant === "vision")   return <VisionTransition />;
  if (variant === "stripes")  return <StripesTransition />;
  if (variant === "cards")    return <CardsTransition />;
  return <DefaultTransition />;
}

export default function PageTransition({ children, variant = "default" }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} style={{ position: "relative" }}>
        <TransitionOverlay variant={variant} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
