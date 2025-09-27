import React, { useEffect, useMemo, useState } from "react";
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

const ACCENT = "#f2c230";
const CANVAS = "#0e0f11";
const ACCENT_TEXT = "#0e0f11";

const pad2 = (n) => String(n).padStart(2, "0");

function useCountdown(targetDate) {
  const target = useMemo(() => targetDate.getTime(), [targetDate]);
  const [diff, setDiff] = useState(() => Math.max(0, target - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setDiff(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);
  const total = diff;
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((total / (1000 * 60)) % 60);
  const secs = Math.floor((total / 1000) % 60);
  return { days, hours, mins, secs, finished: total === 0 };
}

const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "100vh",
  display: "grid",
  placeItems: "center",
  color: "#e8e8e8",
  background: "transparent",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    height: "100svh",
    paddingTop: "max(12px, env(safe-area-inset-top))",
    paddingBottom: "max(12px, env(safe-area-inset-bottom))",
  },
}));

const GridOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
  backgroundSize: "40px 40px, 40px 40px",
  maskImage:
    "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.95) 65%, rgba(0,0,0,1) 100%)",
  pointerEvents: "none",
  [theme.breakpoints.down("sm")]: {
    backgroundSize: "28px 28px, 28px 28px",
    maskImage:
      "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.85) 58%, rgba(0,0,0,1) 100%)",
  },
}));

const GlassCard = styled(Box)(({ theme }) => ({
  borderRadius: 24,
  border: `1px solid ${alpha("#fff", 0.12)}`,
  background: alpha("#ffffff", 0.06),
  backdropFilter: "blur(10px)",
  boxShadow: `0 20px 60px ${alpha("#000", 0.45)}, inset 0 1px 0 ${alpha("#fff", 0.06)}`,
  [theme.breakpoints.down("sm")]: {
    borderRadius: 20,
    background: alpha("#ffffff", 0.07),
    boxShadow: `0 12px 36px ${alpha("#000", 0.5)}, inset 0 1px 0 ${alpha("#fff", 0.05)}`,
  },
}));

const Digit = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: "clamp(34px, 9vw, 120px)",
  lineHeight: 1,
  letterSpacing: "0.02em",
  fontVariantNumeric: "tabular-nums lining-nums",
  textShadow: `0 8px 30px ${alpha("#000", 0.6)}`,
}));

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  letterSpacing: "0.22em",
  fontSize: "12px",
  opacity: 0.75,
  textTransform: "uppercase",
  [theme.breakpoints.down("sm")]: {
    letterSpacing: "0.18em",
    fontSize: 11,
  },
}));

const Separator = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: "clamp(32px, 7vw, 82px)",
  opacity: 0.7,
  transform: "translateY(-4px)",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const CountdownRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "flex-end",
  textAlign: "center",
  gap: theme.spacing(2.5),
  [theme.breakpoints.up("sm")]: {
    gap: theme.spacing(4),
  },
  [theme.breakpoints.down("sm")]: {
    flexWrap: "nowrap",
    overflow: "hidden",
    gap: theme.spacing(2),
  },
}));

export default function HeroCountdown({
  title = "TX LASER COMBAT",
  subtitle = "Grand Opening Countdown",
  ctaText = "Join our VIPs waitlist",
  onCtaClick = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }),
}) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const targetDate = useMemo(() => new Date(2025, 9, 1, 0, 0, 0), []);
  const { days, hours, mins, secs, finished } = useCountdown(targetDate);

  return (
    <Section>
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 2.25, sm: 3, md: 4 },
        }}
      >
        <Stack spacing={{ xs: 3.5, md: 6 }} alignItems="center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Stack spacing={1} alignItems="center" sx={{ textAlign: "center" }}>
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: { xs: "0.2em", sm: "0.28em" },
                  opacity: 0.85,
                  color: alpha("#fff", 0.85),
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: 26, sm: 30, md: 40 },
                  lineHeight: 1.15,
                }}
              >
                {subtitle}
              </Typography>
              <Typography sx={{ opacity: 0.7, fontSize: { xs: 14, sm: 15 } }}>
                Opening day: <strong>October 1, 2025</strong>
              </Typography>
            </Stack>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            style={{ width: "100%" }}
          >
            <GlassCard
              sx={{
                px: { xs: 2, md: 4 },
                py: { xs: 2, md: 4 },
              }}
            >
              <CountdownRow>
                <TimeBlock value={pad2(days)} label="Days" />
                <Separator variant="h2">:</Separator>
                <TimeBlock value={pad2(hours)} label="Hours" />
                <Separator variant="h2">:</Separator>
                <TimeBlock value={pad2(mins)} label="Mins" />
                <Separator variant="h2">:</Separator>
                <TimeBlock value={pad2(secs)} label="Seconds" />
              </CountdownRow>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <Button
              onClick={onCtaClick}
              size={isSm ? "medium" : "large"}
              sx={{
                px: { xs: 3, sm: 3.5 },
                py: { xs: 1.25, sm: 1.5 },
                borderRadius: 999,
                fontWeight: 800,
                textTransform: "none",
                letterSpacing: "0.02em",
                color: ACCENT_TEXT,
                backgroundColor: ACCENT,
                boxShadow: `0 10px 30px ${alpha(ACCENT, 0.45)}`,
                "&:hover": {
                  backgroundColor: "#ffd24a",
                  boxShadow: `0 14px 36px ${alpha(ACCENT, 0.55)}`,
                  transform: "translateY(-1px)",
                },
                transition: "all .25s ease",
              }}
            >
              {finished ? "We’re Live — Enter" : ctaText}
            </Button>
          </motion.div>
        </Stack>
      </Container>
    </Section>
  );
}

function TimeBlock({ value, label }) {
  return (
    <Stack
      alignItems="center"
      spacing={0.75}
      minWidth={{ xs: 52, sm: 92, md: 120 }}
      sx={{ flex: { xs: "1 1 0", sm: "0 0 auto" } }}
    >
      <Digit variant="h1">{value}</Digit>
      <Label component="span">{label}</Label>
    </Stack>
  );
}