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

/* --------------------- Layout: pure CSS 40/60 split --------------------- */
const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  color: alpha("#fff", 0.92),
  background: `transparent`,
  overflow: "hidden",
  paddingBlock: theme.spacing(8, 12),
}));

const SplitWrap = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing(6),
  },
}));

const Left = styled("div")(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: { width: "40%" }, // ← exact 40%
  minWidth: 0, // prevent overflow when shrinking
}));

const Right = styled("div")(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: { width: "60%" }, // ← exact 60%
  minWidth: 0,
}));

const MediaWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "70%",
   minHeight: 400,
  borderRadius: 18,
  overflow: "hidden",
  border: `1px solid ${alpha("#fff", 0.12)}`,
  background: alpha("#fff", 0.06),
  boxShadow: `0 18px 60px ${alpha("#000", 0.5)}, inset 0 1px 0 ${alpha("#fff", 0.06)}`,
}));

/* ------------------------------- Component ------------------------------ */
export default function HeroIntroSplit({
  title = "A premier immersive experience",
  paragraphs = [
    "At Texas Laser Combat, we deliver more than laser tag—we create full-scale missions that immerse you in strategy, teamwork, and adrenaline. Our DFW arena is built for players of all ages, where every mission challenges you to think fast, move smart, and win together in a safe, inclusive environment.",
    "Blending cutting-edge technology with creative scenarios, we’re redefining what tactical entertainment means. Texas Laser Combat is where families, friends, schools, and organizations come to connect, celebrate, and experience unforgettable adventures—making us the premier destination for mission-based fun.",
  ],
  ctaText = "Join our VIPs waitlist",
  onCtaClick = () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }),
  imageSrc = "/placeholder.jpg",
  imageAlt = "Texas Laser Combat preview",
}) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Section>
      <Container maxWidth="xl">
        <SplitWrap>
          {/* Left (40%) */}
          <Left>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <MediaWrap>
                {imageSrc ? (
                  <Box
                    component="img"
                    alt={imageAlt}
                    src={imageSrc}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Stack alignItems="center" justifyContent="center" sx={{ width: "100%", height: "100%", color: alpha("#fff", 0.55) }}>
                    <Typography variant="body2">[ Image / Video Placeholder ]</Typography>
                  </Stack>
                )}
                <Box
                  aria-hidden
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(700px 360px at 100% 0%, rgba(255,255,255,0.08), transparent 60%)",
                    pointerEvents: "none",
                  }}
                />
              </MediaWrap>
            </motion.div>
          </Left>

          {/* Right (60%) */}
          <Right>
            <Stack spacing={downMd ? 3 : 4}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: 28, md: 40 }, lineHeight: 1.15 }}>
                  {title}
                </Typography>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.05 }}>
                <Stack spacing={2.25}>
                  {paragraphs.map((p, i) => (
                    <Typography key={i} sx={{ opacity: 0.88, fontSize: { xs: 15.5, md: 16.5 }, lineHeight: 1.8 }}>
                      {p}
                    </Typography>
                  ))}
                </Stack>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }}>
                <Button
                  onClick={onCtaClick}
                  size={downMd ? "medium" : "large"}
                  sx={{
                    alignSelf: "flex-start",
                    px: 3.25,
                    py: 1.4,
                    borderRadius: 999,
                    fontWeight: 800,
                    letterSpacing: "0.02em",
                    textTransform: "none",
                    color: "#101113",
                    backgroundColor: CTA,
                    boxShadow: `0 14px 34px ${alpha(CTA, 0.38)}, inset 0 1px 0 ${alpha("#fff", 0.35)}`,
                    transition: "all .25s ease",
                    "&:hover": { backgroundColor: CTA_HOVER, boxShadow: `0 18px 42px ${alpha(CTA, 0.5)}`, transform: "translateY(-1px)" },
                    "&:active": { transform: "translateY(0)" },
                  }}
                >
                  {ctaText}
                </Button>
              </motion.div>
            </Stack>
          </Right>
        </SplitWrap>
      </Container>
    </Section>
  );
}
