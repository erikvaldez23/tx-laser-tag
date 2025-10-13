// src/components/landing/IntroWithImagesGrid.jsx
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

// ✅ Put your images in /public or import from /src/assets (Vite-safe)
import arenaRight from "/placeholder.jpg"; // first section (right)
import arenaLeft from "/placeholder.jpg";  // second section (left)

/* ------------------------------- Tokens -------------------------------- */
const ACCENT = "#f2c230";

/* ------------------------------- Styled -------------------------------- */
const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  color: alpha("#fff", 0.95),
  paddingBlock: theme.spacing(12),
}));

/**
 * TwoColumn uses CSS Grid with named areas.
 * - Mobile: one column (copy then media by default)
 * - Desktop: two columns; when `reverse` is true, media appears left.
 * - Adds a slightly angled vertical divider on desktop.
 */
const TwoColumn = styled(Box)(({ theme, reverse }) => ({
  position: "relative",
  display: "grid",
  gap: theme.spacing(6),
  gridTemplateAreas: `
    "copy"
    "media"
  `,
  gridTemplateColumns: "1fr",
  alignItems: "center",

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateAreas: reverse ? `"media copy"` : `"copy media"`,
    gap: theme.spacing(8),
  },

  /* Angled vertical divider line — desktop only */
  "&::before": {
    content: '""',
    position: "absolute",
    left: "50%",
    top: "10%",
    height: "80%",
    width: 1,
    background: "#ccca",
    transform: "translateX(-50%) rotate(-2.3deg)",
    transformOrigin: "center",
    filter: "drop-shadow(0 0 12px rgba(242,194,48,0.25))",
    opacity: 0.7,
    pointerEvents: "none",
    display: "none",
    zIndex: 0,
    [theme.breakpoints.up("md")]: {
      display: "block",
    },
  },
}));

const Copy = styled(Box)({
  gridArea: "copy",
  position: "relative",
  zIndex: 1,
});

const Media = styled(Box)({
  gridArea: "media",
  position: "relative",
  zIndex: 1,
});

const Eyebrow = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  letterSpacing: 2.2,
  textTransform: "uppercase",
  color: alpha("#fff", 0.7),
  marginBottom: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  lineHeight: 1.15,
  marginBottom: theme.spacing(3),
}));

const Body = styled(Typography)(({ theme }) => ({
  color: alpha("#fff", 0.82),
  lineHeight: 1.7,
}));

const Strong = styled("span")({
  color: "#ffd95a",
  fontWeight: 800,
});

/* Image with aggressive neon glow + depth + animated sweep */
const ImgBlock = ({ src, alt }) => (
  <Box
    sx={{
      position: "relative",
      width: "100%",
      aspectRatio: { xs: "16 / 10", md: "16 / 10" },
      borderRadius: 3,
      overflow: "hidden",
      backgroundColor: "#0b0b0c",
      isolation: "isolate",

      // HUGE depth: stacked outer drop-shadows (not clipped)
      filter: `
        drop-shadow(0 40px 110px rgba(0,0,0,0.65))
        drop-shadow(0 0 90px rgba(242,194,48,0.45))
        drop-shadow(0 0 70px rgba(106,209,255,0.35))
        drop-shadow(0 0 60px rgba(155,92,255,0.28))
      `,
      // Subtle 3D lift on hover
      transition: "transform 300ms ease, filter 300ms ease",
      transform: "perspective(1000px) translateZ(0)",
      "&:hover": {
        transform: "perspective(1000px) translateY(-4px) scale(1.015) rotateZ(-0.2deg)",
        filter: `
          drop-shadow(0 48px 130px rgba(0,0,0,0.72))
          drop-shadow(0 0 110px rgba(242,194,48,0.55))
          drop-shadow(0 0 90px rgba(106,209,255,0.45))
          drop-shadow(0 0 80px rgba(155,92,255,0.38))
        `,
      },

      // keyframes
      "@keyframes pulseAura": {
        "0%":   { opacity: 0.75, transform: "scale(1)" },
        "50%":  { opacity: 1,    transform: "scale(1.06)" },
        "100%": { opacity: 0.75, transform: "scale(1)" },
      },
      "@keyframes sweepRing": {
        "0%":   { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(360deg)" },
      },
    }}
  >
    {/* MONSTER glow field behind (inside frame) */}
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: "-18%",
        zIndex: 0,
        background: `
          radial-gradient(closest-side at 72% 28%, ${alpha(ACCENT, 0.55)} 0%, transparent 62%),
          radial-gradient(closest-side at 28% 75%, ${alpha("#6ad1ff", 0.45)} 0%, transparent 62%),
          radial-gradient(closest-side at 50% 50%, ${alpha("#9b5cff", 0.40)} 0%, transparent 58%)
        `,
        filter: "blur(38px)",
        mixBlendMode: "screen",
        animation: "pulseAura 5.5s ease-in-out infinite",
      }}
    />

    {/* Animated conic sweep for that “electric ring” vibe */}
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: -2,
        zIndex: 1,
        pointerEvents: "none",
        background: `
          conic-gradient(
            from 180deg,
            ${alpha("#ffffff", 0.0)} 0deg,
            ${alpha("#6ad1ff", 0.5)} 40deg,
            ${alpha(ACCENT, 0.6)} 120deg,
            ${alpha("#9b5cff", 0.5)} 200deg,
            ${alpha("#ffffff", 0.0)} 360deg
          )
        `,
        mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMask:
          "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: 2, // thickness of the ring
        borderRadius: 10,
        opacity: 0.9,
        filter: "blur(1px)",
        transformOrigin: "50% 50%",
        animation: "sweepRing 12s linear infinite",
      }}
    />

    {/* Image */}
    <Box
      component="img"
      loading="lazy"
      alt={alt}
      src={src}
      sx={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        display: "block",
        zIndex: 2,
        filter: "saturate(1.08) contrast(1.08) drop-shadow(0 10px 28px rgba(0,0,0,0.45))",
        transform: "translateZ(0)",
      }}
    />

    {/* Vignette for legibility */}
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        background:
          "linear-gradient(to bottom, rgba(0,0,0,0.10), rgba(0,0,0,0.36))",
      }}
    />

    {/* Brighter rim-light to really pop */}
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 4,
        borderRadius: 3,
        boxShadow: `
          inset 0 0 0 1px ${alpha("#ffffff", 0.16)},
          inset 0 0 40px ${alpha("#ffffff", 0.06)}
        `,
      }}
    />

    {/* Lens flare streak (subtle but flashy) */}
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        top: "-10%",
        left: "-15%",
        width: "65%",
        height: "35%",
        zIndex: 5,
        background:
          "linear-gradient(115deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.25) 45%, rgba(255,255,255,0.0) 100%)",
        filter: "blur(10px)",
        transform: "rotate(-6deg)",
        opacity: 0.6,
        pointerEvents: "none",
      }}
    />
  </Box>
);



/* -------------------------------- View -------------------------------- */
export default function IntroWithImagesGrid() {
  return (
    <Section>
      {/* ✅ True MUI container with xl max width */}
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "grid",
            gap: { xs: 10, md: 12 },
          }}
        >
          {/* -------- Section 1: text LEFT, image RIGHT -------- */}
          <TwoColumn>
            <Copy>
              <Eyebrow>Welcome</Eyebrow>
              <Title variant="h4">
                Welcome to Texas Laser Combat, North Dallas’s newest premier
                destination for tactical laser tag adventures in Plano, TX.
              </Title>
              <Body>
                As a veteran and woman-owned family business, we create safe,
                unforgettable bonding for <Strong>ages 7+</Strong>, uniting
                families, friends, and teams. Our community events and
                partnerships with schools and businesses promote active lifestyles.
              </Body>
            </Copy>

            {/* ✅ Image on the RIGHT via grid area */}
            <Media>
              <ImgBlock src={arenaRight} alt="Texas Laser Combat arena view" />
            </Media>
          </TwoColumn>

          {/* -------- Section 2: image LEFT, text RIGHT -------- */}
          <TwoColumn reverse>
            {/* ✅ Image on the LEFT when reverse=true */}
            <Media>
              <ImgBlock src={arenaLeft} alt="Immersive multi-level arena" />
            </Media>

            <Copy>
              <Eyebrow>Arena</Eyebrow>
              <Title variant="h4">Immersive Multi-Level Arena</Title>
              <Body sx={{ mb: 2 }}>
                Our <Strong>15,000-square-foot arena</Strong> offers immersive,
                wasteland-themed gameplay for up to 50, with strategy missions,
                vibration-feedback headsets, and lightweight weapons—making every{" "}
                <Strong>75-minute session</Strong> epic.
              </Body>
              <Body>
                Safety-first equipment and expert staff ensure thrilling,
                accessible fun. Private party rooms host tailored birthdays,
                corporate events, or gatherings. Join solo or with a group to
                unleash your inner warrior at Texas Laser Combat!
              </Body>
            </Copy>
          </TwoColumn>
        </Box>
      </Container>
    </Section>
  );
}
