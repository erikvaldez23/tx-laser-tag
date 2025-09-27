import React from "react";
import { Box, Container, Button, Stack, useTheme, useMediaQuery } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

const Wrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "70vh",
  display: "grid",
  placeItems: "center",
  background: "transparent",
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
  fontFamily:
    "'Staatliches', ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji'",
  fontSize: "clamp(40px, 9vw, 120px)",
}));

const Line = styled("span")(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  paddingInline: theme.spacing(1),
  letterSpacing: "0.02em",
}));

const Cta = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  textTransform: "none",
  fontSize: 16,
  fontWeight: 700,
  paddingInline: theme.spacing(3),
  paddingBlock: theme.spacing(1.25),
  backgroundColor: "#c6a045",
  color: "#1a1a1a",
  "&:hover": {
    backgroundColor: "#af8e3e",
  },
}));

export default function EventsHero({
  line1 = "Epic Battles.",
  line2 = "Unforgettable Events.",
  ctaText = "Book now",
  onCtaClick,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Wrap>
      <Container maxWidth="lg">
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
            <br />
            <Line>{line2}</Line>
          </Headline>

          <Cta
            size={isMobile ? "medium" : "large"}
            onClick={onCtaClick}
            component={motion.button}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            aria-label={ctaText}
          >
            {ctaText}
          </Cta>
        </Stack>
      </Container>
    </Wrap>
  );
}
