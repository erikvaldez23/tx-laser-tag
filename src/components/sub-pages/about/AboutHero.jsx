import React from "react";
import { Box, Container, Button, Stack, useTheme, useMediaQuery } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

const Wrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "50vh",
  display: "grid",
  placeItems: "center",
  background: "transparent", // close to the screenshot
  color: "#eee",
  overflow: "hidden",
}));

const Headline = styled(motion.h1)(({ theme }) => ({
  margin: 0,
  lineHeight: 1,
  textAlign: "center",
  fontWeight: 800,
  letterSpacing: "0.02em",
  textTransform: "uppercase",
  // Stencil-ish look (works well with 'Staatliches' if you include it)
  fontFamily:
    "'Staatliches', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'",
  // responsive sizing
  fontSize: "clamp(40px, 9vw, 120px)",
}));

const Line = styled("span")(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  paddingInline: theme.spacing(1),
  // subtle tracking similar to the reference
  letterSpacing: "0.02em",
}));

const Cta = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  textTransform: "none",
  fontSize: 16,
  fontWeight: 700,
  paddingInline: theme.spacing(3),
  paddingBlock: theme.spacing(1.25),
  backgroundColor: "#c6a045", // gold
  color: "#1a1a1a",
  "&:hover": {
    backgroundColor: "#af8e3e",
  },
}));

export default function EventsHero({
  line1 = "About us",
  line2 = "Unforgettable Events.",
  ctaText = "Book now",
  onCtaClick,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Wrap>
      <Container maxWidth="xl">
        <Stack
          spacing={isMobile ? 4 : 6}
          alignItems="center"
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Headline
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
          >
            <Line>{line1}</Line>
          </Headline>
        </Stack>
      </Container>
    </Wrap>
  );
}
