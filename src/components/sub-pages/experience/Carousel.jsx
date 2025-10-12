import React from "react";
import {
  Box,
  Container,
  IconButton,
  Stack,
  Typography,
  Dialog,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

/* ---------- 3D: react-three-fiber / drei ---------- */
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
  useProgress,
} from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { useLoader } from "@react-three/fiber";

/* -------------------------------- Config -------------------------------- */
export const CAROUSEL_CONFIG = {
  title: "READY YOUR GEAR",
  subtitle: "Build the load-out that takes the territory.",
  slides: [
    // Add `model` (obj + optional mtl) to enable the 3D popup for that slide:
    {
      src: "/weapons/pink-p90.png",
      modalSrc: "/weapons/p90-detail.png",
      alt: "P90 - Pink camo",
      model: {
        obj: "/3d/Gun_obj/model.glb",
        mtl: "/3d/gun.rar", // optional (omit if the OBJ has embedded materials)
        scale: 1.1,
        position: [0, -0.25, 0],
        rotation: [0, Math.PI / 8, 0],
      },
    },
    { src: "/weapons/p90.png", alt: "P90 - Blue neon" },
    { src: "/weapons/green-rifle.png", alt: "P90 - Forest" },
    { src: "/weapons/orange-gun.png", alt: "P90 - Purple" },
    { src: "/weapons/pistol.png", alt: "P90 - City" },
    { src: "/weapons/purple-gun.png", alt: "P90 - City" },
  ],

  stageHeight: { xs: 340, md: 460 },
  containerMaxWidth: "lg",
  spacingY: { xs: 6, md: 20 },

  card: {
    radius: 28,
    width: { xs: 300, md: 780 },
    height: { xs: 180, md: 440 },
    outlineAlpha: 0.4,
    shadowCenterAlpha: 0.55,
    shadowSideAlpha: 0.35,
  },

  offsets: { near: { xs: 220, md: 320 }, farMultiplier: 1.9 },
  scales: { center: 1.0, near: 0.86, far: 0.76 },
  blur: { near: { xs: 1, md: 2 }, farExtra: 1 },

  showDots: true,
  showArrows: true,
  dots: { activeColor: "#d8b14a", inactiveAlpha: 0.35, size: { active: 12, inactive: 8 } },

  drag: { offsetThreshold: 120, velocityThreshold: 600 },
  autoplay: { enabled: false, intervalMs: 5000, pauseOnHover: true },
  initialIndex: 0,
};
/* ------------------------------------------------------------------------ */

const SHADOW = (a) => `0 24px 80px rgba(0,0,0,${a})`;
const SPRING = { type: "spring", stiffness: 160, damping: 26, mass: 0.9 };

/* ---------------------------- 3D Helpers ---------------------------- */

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <Box
        sx={{
          px: 2,
          py: 1,
          borderRadius: 2,
          bgcolor: "rgba(0,0,0,0.6)",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        Loading… {progress.toFixed(0)}%
      </Box>
    </Html>
  );
}

/** Load and render an OBJ (+ optional MTL) with props for transform */
function WeaponModel({
  objUrl,
  mtlUrl,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) {
  // If there's an MTL, load it and bind to OBJ loader
  const materials = mtlUrl ? useLoader(MTLLoader, mtlUrl) : null;
  const obj = useLoader(OBJLoader, objUrl, (loader) => {
    if (materials) {
      materials.preload();
      loader.setMaterials(materials);
    }
  });

  // Enable shadows and sane defaults
  React.useEffect(() => {
    obj.traverse((c) => {
      if (c.isMesh) {
        c.castShadow = true;
        c.receiveShadow = true;
      }
    });
  }, [obj]);

  return (
    <primitive
      object={obj}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

/* ------------------------------ Carousel ------------------------------ */

function useCarousel(length, initial = 0) {
  const [index, setIndex] = React.useState(initial);
  const clamp = (v) => (length ? (v + length) % length : 0);
  const next = React.useCallback(() => setIndex((i) => clamp(i + 1)), [length]);
  const prev = React.useCallback(() => setIndex((i) => clamp(i - 1)), [length]);
  const goto = React.useCallback((i) => setIndex(clamp(i)), [length]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return { index, next, prev, goto, setIndex };
}

function positionFor(slot, cfg, isMdUp) {
  const xBase = isMdUp ? cfg.offsets.near.md : cfg.offsets.near.xs;
  const blurNear = isMdUp ? cfg.blur.near.md : cfg.blur.near.xs;
  switch (slot) {
    case 0:  return { x: 0,         scale: cfg.scales.center, zIndex: 5, filter: "none",                               opacity: 1   };
    case -1: return { x: -xBase,    scale: cfg.scales.near,   zIndex: 4, filter: `blur(${blurNear}px)`,               opacity: 0.8 };
    case 1:  return { x: xBase,     scale: cfg.scales.near,   zIndex: 4, filter: `blur(${blurNear}px)`,               opacity: 0.8 };
    case -2: return { x: -xBase*cfg.offsets.farMultiplier, scale: cfg.scales.far, zIndex: 3, filter: `blur(${blurNear+cfg.blur.farExtra}px)`, opacity: 0.5 };
    case 2:  return { x:  xBase*cfg.offsets.farMultiplier, scale: cfg.scales.far, zIndex: 3, filter: `blur(${blurNear+cfg.blur.farExtra}px)`, opacity: 0.5 };
    default: return { x: 0, scale: 0.6, zIndex: 1, filter: "blur(3px)", opacity: 0 };
  }
}

export default function GearCarousel(props) {
  const cfg = {
    ...CAROUSEL_CONFIG,
    ...props,
    card: { ...CAROUSEL_CONFIG.card, ...(props.card || {}) },
  };

  const theme = useTheme();
  const isMdUp =
    typeof window !== "undefined"
      ? window.innerWidth >= theme.breakpoints.values.md
      : true;

  const { index, next, prev, goto } = useCarousel(cfg.slides.length, cfg.initialIndex);
  const dragX = useMotionValue(0);

  // Lightbox (image OR 3D)
  const [lightbox, setLightbox] = React.useState({ open: false, index: 0 });
  const openLightbox = (i) => setLightbox({ open: true, index: i });
  const closeLightbox = () => setLightbox((v) => ({ ...v, open: false }));

  // relative slot around active (-2,-1,0,1,2)
  const rel = (i) => {
    const n = cfg.slides.length;
    const diff = ((i - index) % n + n) % n; // 0..n-1
    return diff > n / 2 ? diff - n : diff; // negative = left side
  };

  const onDragEnd = (_, info) => {
    const { offset, velocity } = info;
    if (offset.x < -cfg.drag.offsetThreshold || velocity.x < -cfg.drag.velocityThreshold) next();
    else if (offset.x > cfg.drag.offsetThreshold || velocity.x > cfg.drag.velocityThreshold) prev();
  };

  // Preload images & models (basic warm-up)
  React.useEffect(() => {
    cfg.slides.forEach((s) => {
      const imgUrl = s.modalSrc || s.src;
      if (imgUrl) {
        const i = new Image();
        i.decoding = "async";
        i.src = imgUrl;
      }
      // Let three.js load models on demand (preloading OBJ/MTL in the browser is non-trivial).
    });
  }, [cfg.slides]);

  // Autoplay
  React.useEffect(() => {
    if (!cfg.autoplay.enabled || cfg.slides.length <= 1) return;
    const id = setInterval(() => next(), cfg.autoplay.intervalMs);
    return () => clearInterval(id);
  }, [cfg.autoplay.enabled, cfg.autoplay.intervalMs, cfg.slides.length, next]);

  const activeSlide = cfg.slides[lightbox.index] || {};

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        color: "#fff",
        py: cfg.spacingY,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <Container maxWidth={cfg.containerMaxWidth} sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
        <Typography variant="h2" sx={{ fontWeight: 900, textTransform: "uppercase", fontSize: { xs: 36, md: 64 }, lineHeight: 1.1 }}>
          {cfg.title}
        </Typography>
        <Typography sx={{ opacity: 0.8, mt: 1 }}>{cfg.subtitle}</Typography>
      </Container>

      {/* Stage */}
      <Box sx={{ position: "relative", height: cfg.stageHeight, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ position: "relative", width: "100%", maxWidth: 1100, height: "100%" }}>
          <AnimatePresence initial={false} mode="popLayout">
            {cfg.slides.map((s, i) => {
              const slot = rel(i);
              if (Math.abs(slot) > 2) return null;
              const pos = positionFor(slot, cfg, isMdUp);

              return (
                <motion.div
                  key={i}
                  style={{ position: "absolute", top: 0, left: "50%", x: "-50%" }}
                  initial={{ opacity: 0, scale: 0.98 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  animate={{
                    x: `calc(-50% + ${pos.x}px)`,
                    scale: pos.scale,
                    filter: pos.filter,
                    opacity: pos.opacity,
                    zIndex: pos.zIndex,
                  }}
                  transition={SPRING}
                >
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    style={{ x: dragX, cursor: "grab" }}
                    onDragEnd={onDragEnd}
                  >
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0.92 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ scale: slot === 0 ? 1.02 : 1 }}
                      onClick={() => openLightbox(i)}
                      role="button"
                      aria-label={`View ${s.alt || "weapon"} larger`}
                      tabIndex={0}
                      sx={{
                        width: cfg.card.width,
                        height: cfg.card.height,
                        borderRadius: cfg.card.radius,
                        overflow: "hidden",
                        willChange: "transform, filter, opacity",
                        boxShadow: SHADOW(slot === 0 ? cfg.card.shadowCenterAlpha : cfg.card.shadowSideAlpha),
                        backgroundColor: s.bg || "#0e0f11",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      <Box
                        component={motion.img}
                        src={s.src}
                        alt={s.alt || "slide"}
                        loading="eager"
                        decoding="async"
                        initial={{ opacity: 0.85 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        draggable={false}
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </Box>
      </Box>

      {/* Controls */}
      <Stack direction="row" spacing={3} alignItems="center" justifyContent="center" sx={{ mt: { xs: 2, md: 3 } }}>
        {cfg.showArrows && (
          <IconButton onClick={prev} aria-label="Previous" sx={{ color: alpha("#fff", 0.9) }}>
            <ArrowBackIosNewIcon />
          </IconButton>
        )}

        {cfg.showDots && (
          <Stack direction="row" spacing={1.25} alignItems="center">
            {cfg.slides.map((_, i) => (
              <Box
                key={i}
                onClick={() => goto(i)}
                role="button"
                aria-label={`Go to slide ${i + 1}`}
                sx={{
                  width: i === index ? cfg.dots.size.active : cfg.dots.size.inactive,
                  height: i === index ? cfg.dots.size.active : cfg.dots.size.inactive,
                  borderRadius: 999,
                  cursor: "pointer",
                  backgroundColor: i === index ? cfg.dots.activeColor : alpha("#fff", 0.35),
                  boxShadow: i === index ? SHADOW(0.35) : "none",
                  transition: "all .2s ease",
                }}
              />
            ))}
          </Stack>
        )}

        {cfg.showArrows && (
          <IconButton onClick={next} aria-label="Next" sx={{ color: alpha("#fff", 0.9) }}>
            <ArrowForwardIosIcon />
          </IconButton>
        )}
      </Stack>

      {/* Lightbox Dialog: renders 3D if slide has model; otherwise shows image */}
      <Dialog
        open={lightbox.open}
        onClose={closeLightbox}
        maxWidth="lg"
        fullWidth
        BackdropProps={{
          sx: {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0,0,0,0.65)",
          },
        }}
        PaperProps={{
          sx: {
            bgcolor: "transparent",
            boxShadow: "none",
            overflow: "visible",
          },
        }}
      >
        {/* Close */}
        <IconButton
          onClick={closeLightbox}
          aria-label="Close"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 2,
            color: "#fff",
            bgcolor: "rgba(0,0,0,0.4)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.55)" },
          }}
        >
          <CloseRoundedIcon />
        </IconButton>

        {/* Content */}
        <Box sx={{ position: "relative", p: { xs: 1.5, md: 2 } }}>
          {activeSlide.model?.obj ? (
            <Box sx={{ height: { xs: "60vh", md: "72vh" }, borderRadius: 2, overflow: "hidden" }}>
              <Canvas
                shadows
                camera={{ fov: 45, position: [0, 1.2, 2.6] }}
                gl={{ antialias: true }}
              >
                {/* Lights */}
                <ambientLight intensity={0.4} />
                <directionalLight
                  position={[2, 4, 3]}
                  intensity={1.1}
                  castShadow
                  shadow-mapSize-width={1024}
                  shadow-mapSize-height={1024}
                />
                <directionalLight position={[-2, 1.5, -3]} intensity={0.6} />

                {/* Ground for soft occlusion */}
                <mesh rotation-x={-Math.PI / 2} position={[0, -0.5, 0]} receiveShadow>
                  <planeGeometry args={[20, 20]} />
                  <meshStandardMaterial color="#111" />
                </mesh>

                {/* Model */}
                <React.Suspense fallback={<Loader />}>
                  <WeaponModel
                    objUrl={activeSlide.model.obj}
                    mtlUrl={activeSlide.model.mtl}
                    scale={activeSlide.model.scale ?? 1}
                    position={activeSlide.model.position ?? [0, 0, 0]}
                    rotation={activeSlide.model.rotation ?? [0, 0, 0]}
                  />
                  <Environment preset="warehouse" />
                </React.Suspense>

                <OrbitControls
                  enablePan={false}
                  minDistance={1.2}
                  maxDistance={5}
                  enableDamping
                  dampingFactor={0.08}
                  autoRotate
                  autoRotateSpeed={0.6}
                />
              </Canvas>
            </Box>
          ) : (
            // Fallback large image
            <Box
              component="img"
              src={activeSlide.modalSrc || activeSlide.src}
              alt={activeSlide.alt || "weapon large"}
              draggable={false}
              style={{ userSelect: "none" }}
              sx={{
                maxWidth: "100%",
                maxHeight: "80vh",
                borderRadius: 2,
                objectFit: "contain",
                boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
                display: "block",
                mx: "auto",
              }}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  );
}
