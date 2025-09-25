import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  useTheme,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

/* ----------------------------- Styled ----------------------------- */
const Section = styled(Box)(({ theme, bgimg }) => ({
  position: "relative",
  width: "100%",
  minHeight: "60vh",
  display: "grid",
  placeItems: "center",
  background: bgimg ? `url(${bgimg}) center/cover no-repeat` : "#222",
  color: "#fff",
  overflow: "hidden",
  isolation: "isolate",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,.45))",
    zIndex: 0,
  },
}));

const Glass = styled(Box)(({ theme }) => ({
  background: alpha("#000", 0.28),
  border: `1px solid ${alpha("#fff", 0.18)}`,
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  borderRadius: 16,
  padding: theme.spacing(3),
  width: "100%",
}));

/* ---------------------------- Component ---------------------------- */
export default function CTA({
  title = "Join the laser experience today!",
  hours = [
    "Wed–Thurs: 4pm – 10pm",
    "Fri: 4pm – 12am",
    "Sat: 11am – 12am",
    "Sun: 11am – 7pm",
  ],
  address = "2300 Coit Road #400, Plano, TX 75075",
  backgroundImage = "/placeholder.jpg",
  primaryCta = { label: "Book Now", href: "/book" },
  secondaryCta = {
    label: "Get Directions",
    href: "https://maps.google.com/?q=2300+Coit+Road+%23400,+Plano,+TX+75075",
  },
  dense = false, // set true if you want a tighter hero
}) {
  const theme = useTheme();

  return (
    <Section bgimg={backgroundImage}>
      <Container
        maxWidth="md"
        component={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        sx={{ position: "relative", zIndex: 1, px: { xs: 2, sm: 3 } }}
      >
        <Stack spacing={2.5} alignItems="center" textAlign="center">
          <Typography
            component="h1"
            variant="h3"
            sx={{
              fontWeight: 800,
              lineHeight: 1.15,
              textShadow: "0 2px 20px rgba(0,0,0,.5)",
              fontSize: { xs: "1.9rem", sm: "2.2rem", md: "2.6rem" },
            }}
          >
            {title}
          </Typography>

          <Glass sx={{ maxWidth: 560 }}>
            <Stack spacing={1.25}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, letterSpacing: 0.2 }}
              >
                Hours
              </Typography>
              <Stack spacing={0.5}>
                {hours.map((line, i) => (
                  <Typography
                    key={i}
                    variant="body1"
                    sx={{ lineHeight: 1.6, opacity: 0.95 }}
                  >
                    {line}
                  </Typography>
                ))}
              </Stack>

              <Typography
                variant="body1"
                sx={{
                  pt: 1,
                  fontWeight: 600,
                  lineHeight: 1.6,
                  opacity: 0.95,
                }}
              >
                {address}
              </Typography>
            </Stack>
          </Glass>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.25}
            sx={{ pt: dense ? 0.5 : 1 }}
          >
            {primaryCta && (
              <Button
                component="a"
                href={primaryCta.href}
                variant="contained"
                size="large"
                sx={{
                  px: 3,
                  borderRadius: 999,
                  boxShadow: "none",
                  textTransform: "none",
                  background: "yellow",
                  color: "#000"
                }}
              >
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button
                component="a"
                href={secondaryCta.href}
                target={secondaryCta.href?.startsWith("/") ? "_self" : "_blank"}
                rel="noreferrer"
                variant="outlined"
                size="large"
                sx={{
                  px: 3,
                  borderRadius: 999,
                  color: "#fff",
                  borderColor: alpha("#fff", 0.6),
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#fff",
                    background: alpha("#fff", 0.06),
                  },
                }}
              >
                {secondaryCta.label}
              </Button>
            )}
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
