// src/components/hero/HeroIntroSplit.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

const BG = "#0e0f11";
const CTA = "#f2c230";
const CTA_HOVER = "#ffd24a";

/* ----------------------------- Layout Shell ----------------------------- */
const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  color: alpha("#fff", 0.92),
  background: "transparent",
  overflow: "hidden",
  paddingBlock: theme.spacing(8),
  [theme.breakpoints.up("md")]: {
    paddingBlock: theme.spacing(12),
  },
}));

/* ------------------------------ Grid Layout ----------------------------- */
const GridWrap = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  gridTemplateAreas: `
    "media"
    "content"
  `,
  rowGap: theme.spacing(4),
  columnGap: theme.spacing(6),
  alignItems: "center",
  paddingInline: "0px",

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "minmax(0, 0.4fr) minmax(0, 0.6fr)", // 40/60
    gridTemplateAreas: '"media content"',
    rowGap: theme.spacing(0),
  },
}));

const MediaArea = styled("div")({
  gridArea: "media",
  minWidth: 0,
});

const ContentArea = styled("div")({
  gridArea: "content",
  minWidth: 0,
});

/* ------------------------------ Media Card ------------------------------ */
const MediaWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  // Keep the media nicely proportioned on mobile; grow taller on desktop
  aspectRatio: "4 / 3",
  [theme.breakpoints.up("sm")]: { aspectRatio: "16 / 10" },
  [theme.breakpoints.up("md")]: { minHeight: 420, aspectRatio: "auto" },

  borderRadius: 18,
  overflow: "hidden",
  border: `1px solid ${alpha("#fff", 0.12)}`,
  background: alpha("#fff", 0.06),
  boxShadow: `0 18px 60px ${alpha("#000", 0.5)}, inset 0 1px 0 ${alpha(
    "#fff",
    0.06
  )}`,
}));

/* --------------------------------- CTA --------------------------------- */
const CtaButton = styled(Button)(({ theme }) => ({
  alignSelf: "flex-start",
  paddingInline: theme.spacing(3.25),
  paddingBlock: theme.spacing(1.4),
  borderRadius: 999,
  fontWeight: 800,
  letterSpacing: "0.02em",
  textTransform: "none",
  color: "#101113",
  backgroundColor: CTA,
  boxShadow: `0 14px 34px ${alpha(CTA, 0.38)}, inset 0 1px 0 ${alpha(
    "#fff",
    0.35
  )}`,
  transition:
    "transform .2s ease, box-shadow .2s ease, background-color .2s ease",
  "&:hover": {
    backgroundColor: CTA_HOVER,
    boxShadow: `0 18px 42px ${alpha(CTA, 0.5)}`,
    transform: "translateY(-1px)",
  },
  "&:active": { transform: "translateY(0)" },
  // Larger tap target on touch devices
  [theme.breakpoints.down("sm")]: { paddingBlock: theme.spacing(1.6) },
}));

/* ------------------------------- Component ------------------------------ */
export default function HeroIntroSplit({
  title = "A premier immersive experience",
  paragraphs = [
    "At Texas Laser Combat, we deliver more than laser tag—we create full-scale missions that immerse you in strategy, teamwork, and adrenaline. Our DFW arena is built for players of all ages, where every mission challenges you to think fast, move smart, and win together in a safe, inclusive environment.",
    "Blending cutting-edge technology with creative scenarios, we’re redefining what tactical entertainment means. Texas Laser Combat is where families, friends, schools, and organizations come to connect, celebrate, and experience unforgettable adventures—making us the premier destination for mission-based fun.",
  ],
  ctaText = "Join our VIPs waitlist",
  onCtaClick = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }),
  imageSrc = "/intro.png",
  imageAlt = "Texas Laser Combat preview",
}) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Section component="section" aria-label="Intro">
      <Container maxWidth="xl">
        <GridWrap>
          {/* Media FIRST in DOM for mobile + semantics */}
          <MediaArea>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <MediaWrap>
                {imageSrc ? (
                  <Box
                    component="img"
                    alt={imageAlt}
                    src={imageSrc}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 960px) 100vw, 40vw"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      color: alpha("#fff", 0.55),
                    }}
                  >
                    <Typography variant="body2">
                      [ Image / Video Placeholder ]
                    </Typography>
                  </Stack>
                )}

                {/* Soft vignette */}
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(700px 360px at 100% 0%, rgba(255,255,255,0.08), transparent 60%)",
                    pointerEvents: "none",
                  }}
                />
              </MediaWrap>
            </motion.div>
          </MediaArea>

          {/* Content (centered on mobile, left on md+) */}
          <ContentArea>
            <Stack
              spacing={downMd ? 3 : 4}
              alignItems={{ xs: "center", md: "flex-start" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: 32, sm: 35, md: 40 },
                    lineHeight: 1.15,
                    letterSpacing: { xs: 0, md: "0.2px" },
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  {title}
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.05 }}
              >
                <Stack spacing={2.25}>
                  {paragraphs.map((p, i) => (
                    <Typography
                      key={i}
                      sx={{
                        opacity: 0.88,
                        fontSize: { xs: 15.5, md: 16.5 },
                        lineHeight: 1.8,
                        textAlign: { xs: "center", md: "left" },
                      }}
                    >
                      {p}
                    </Typography>
                  ))}
                </Stack>
              </motion.div>

              <motion.div
                style={{
                  alignSelf: downMd ? "stretch" : "flex-start",
                  width: downMd ? "100%" : "auto",
                }}
              >
                <CtaButton
                  onClick={onCtaClick}
                  size={downMd ? "medium" : "large"}
                  fullWidth={downMd} // also works on MUI Button
                >
                  {ctaText}
                </CtaButton>
              </motion.div>
            </Stack>
          </ContentArea>
        </GridWrap>
      </Container>
    </Section>
  );
}
