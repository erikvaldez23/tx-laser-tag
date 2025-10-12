// src/components/sections/OffersShowcase.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";

/* ---- Brand ---- */
const ACCENT = "#f2c230";
const ACCENT_HOVER = "#ffd95a";

/* ---- Styled ---- */
const Section = styled(Box)(({ theme }) => ({
  paddingBlock: theme.spacing(8, 12),
  [theme.breakpoints.down('sm')]: {
    paddingBlock: theme.spacing(2, 4),
  },
}));

const GridWrap = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(6),
  [theme.breakpoints.up("sm")]: { gridTemplateColumns: "repeat(2, 1fr)" },
  [theme.breakpoints.up("md")]: { gridTemplateColumns: "repeat(3, 1fr)" },
}));

const Media = styled(Box)(({ theme }) => ({
  position: "relative", // <-- allow overlay positioning
  width: "100%",
  aspectRatio: "2 / 3",
  borderRadius: 16,
  overflow: "hidden",
  background: "#9b9b9b",
  border: `1px solid ${alpha("#fff", 0.12)}`,
   boxShadow: {
      xs: "none", // mobile
      sm: `0 20px 50px ${alpha("#000", 0.5)}, inset 0 1px 0 ${alpha("#fff", 0.06)}`,
    },
}));

const LearnBtn = styled(Button)(({ theme }) => ({
  /* Mobile (xs) — full-width, transparent, blurred, yellow text */
  width: "100%",
  borderRadius: 12,
  textTransform: "none",
  fontWeight: 800,
  padding: "12px 16px",
  background: alpha("#000", 0.06),
  color: ACCENT,
  border: `1px solid ${alpha(ACCENT, 0.45)}`,
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  boxShadow: "none",
  letterSpacing: 0.2,
  transition: "all .25s ease",
  "&:hover": {
    background: alpha("#000", 0.12),
    borderColor: ACCENT,
    color: ACCENT_HOVER,
    transform: "translateY(-1px)",
  },

  /* Tablet/Desktop (sm and up) — revert to original style */
  [theme.breakpoints.up("sm")]: {
    width: "auto",
    borderRadius: 999,
    padding: "10px 20px",
    background: ACCENT,
    color: "#101113",
    border: "none",
    backdropFilter: "none",
    WebkitBackdropFilter: "none",
    boxShadow: `0 10px 28px ${ACCENT}55`,
    "&:hover": {
      background: ACCENT_HOVER,
      boxShadow: `0 14px 36px ${ACCENT}66`,
      transform: "translateY(-1px)",
      color: "#101113",
    },
  },
}));



/* ---- Mobile carousel bits ---- */
const ScrollRow = styled(Box)(({ theme }) => ({
  "--gap": theme.spacing(2.5),
  position: "relative",
  display: "grid",
  gridAutoFlow: "column",
  gap: "var(--gap)",
  overflowX: "auto",
  paddingBottom: theme.spacing(1.5),
  scrollSnapType: "x proximity",
  scrollPadding: "var(--gap)",
  WebkitOverflowScrolling: "touch",
  overscrollBehaviorX: "contain",
  gridAutoColumns: "88%", // large, single-card focus with peek
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": { display: "none" },
}));

const OverlayBar = styled("div")({
  pointerEvents: "none",
  position: "relative",
  width: "100%",
  marginTop: 12,
});

const OverlayTrack = styled("div")(({ visible }) => ({
  position: "relative",
  height: 6,
  width: "100%",
  borderRadius: 999,
  background: "transparent",
  transition: "opacity 220ms ease",
  opacity: visible ? 1 : 0,
}));

const OverlayThumb = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  height: 6,
  borderRadius: 999,
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.85))",
  boxShadow: "0 0.5px 0 rgba(0,0,0,0.35) inset, 0 2px 6px rgba(0,0,0,0.25)",
});

/* ---- Mobile overlayed text panel on card ---- */
const GradientWash = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.45) 26%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0) 72%)",
  pointerEvents: "none",
}));

const OverlayContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: 12,
  right: 12,
  bottom: 12,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  textAlign: "left",
  gap: theme.spacing(1),
  pointerEvents: "auto",
}));

/* Mobile card shell */
function OfferCard({ it, overlayContent = false }) {
  const ImageBlock = (
    <Box
      component="img"
      src={it.img}
      alt={it.heading}
      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );

  return (
    <Stack
      spacing={3}
      alignItems="center"
      textAlign={overlayContent ? "left" : "center"}
      sx={{ scrollSnapAlign: "center" }}
    >
      <Media>
        {it.img ? (
          ImageBlock
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              color: "#222",
              fontSize: 14,
              letterSpacing: 0.2,
              background: "#bdbdbd",
            }}
          >
            [Image placeholder]
          </Box>
        )}

        {overlayContent ? (
          <>
            <GradientWash />
            <OverlayContent>
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, color: "#fff", mb: -1 }}
              >
                {it.heading}
              </Typography>
              <Typography sx={{ color: alpha("#fff", 0.92) }}>
                {it.sub}
              </Typography>
              <LearnBtn onClick={it.onClick}>{it.cta}</LearnBtn>
            </OverlayContent>
          </>
        ) : null}
      </Media>

      {/* Desktop/tablet: details below the card as before */}
      {!overlayContent && (
        <Box sx={{ maxWidth: 380 }}>
          <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
            {it.heading}
          </Typography>
          <Typography sx={{ opacity: 0.85, mb: 2 }}>{it.sub}</Typography>
          <LearnBtn onClick={it.onClick}>{it.cta}</LearnBtn>
        </Box>
      )}
    </Stack>
  );
}

/* ---- Component ---- */
export default function OffersShowcase({
  title = "What We Offer",
  items = [
    {
      img: "/offer/experience.png",
      heading: "The experience",
      sub: "Immersive tactical game play",
      cta: "Learn more",
      onClick: () => {},
    },
    {
      img: "/offer/group.jpg",
      heading: "Groups and parties",
      sub: "Host events, corporate events & more",
      cta: "Learn more",
      onClick: () => {},
    },
    {
      img: "/offer/food.png",
      heading: "Food and beverages",
      sub: "Enjoy unique food offerings and catering",
      cta: "Learn more",
      onClick: () => {},
    },
  ],
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // overlay progress state (mobile)
  const rowRef = useRef(null);
  const [thumb, setThumb] = useState({ widthPct: 0, leftPct: 0 });
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef(null);

  const updateThumb = () => {
    const el = rowRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const widthPct = Math.max((clientWidth / scrollWidth) * 100, 8);
    const maxLeft = 100 - widthPct;
    const leftPct =
      scrollWidth > clientWidth
        ? Math.min(
            (scrollLeft / (scrollWidth - clientWidth)) * maxLeft,
            maxLeft
          )
        : 0;
    setThumb({ widthPct, leftPct });
  };

  const showThenFade = () => {
    setVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), 900);
  };

  useEffect(() => {
    if (!isMobile) return;
    updateThumb();
    const el = rowRef.current;
    if (!el) return;

    const onScroll = () => {
      updateThumb();
      showThenFade();
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(updateThumb);
    ro.observe(el);

    showThenFade();
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [isMobile]);

  return (
    <Section>
      <Container maxWidth="xl">
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            mb: 4,
            letterSpacing: { md: "0.01em" },
            textAlign: "center",
          }}
        >
          {title}
        </Typography>

        {/* Mobile: horizontal carousel with overlayed, left-aligned content */}
        {isMobile ? (
          <Box>
            <ScrollRow ref={rowRef} aria-label="offers carousel">
              {items.map((it, i) => (
                <Box key={i} sx={{ minWidth: 0 }}>
                  <OfferCard it={it} overlayContent />
                </Box>
              ))}
            </ScrollRow>

            <OverlayBar aria-hidden>
              <OverlayTrack visible={visible}>
                <OverlayThumb
                  style={{
                    width: `${thumb.widthPct}%`,
                    left: `${thumb.leftPct}%`,
                  }}
                />
              </OverlayTrack>
            </OverlayBar>
          </Box>
        ) : (
          // Tablet / Desktop: 3-up grid (unchanged)
          <GridWrap>
            {items.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                <OfferCard it={it} />
              </motion.div>
            ))}
          </GridWrap>
        )}
      </Container>
    </Section>
  );
}
