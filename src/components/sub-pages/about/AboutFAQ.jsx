// src/components/faq/ModernFAQ.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { motion } from "framer-motion";

const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  background: "transparent",
  color: "#fff",
  overflow: "hidden",
  paddingBlock: theme.spacing(10),
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: 0.2,
  background: "linear-gradient(180deg, #ffffff, #b9c3cf)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
}));

const Sub = styled(Typography)(({ theme }) => ({
  opacity: 0.8,
  maxWidth: 780,
  marginInline: "auto",
}));

const Shell = styled(Box)(({ theme }) => ({
  "--glass": alpha("#fff", 0.06),
  "--stroke": alpha("#fff", 0.12),
  borderRadius: 18,
  border: `1px solid var(--stroke)`,
  background: `linear-gradient(180deg, ${alpha("#fff", 0.06)}, ${alpha(
    "#fff",
    0.03
  )})`,
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: `0 24px 80px ${alpha("#000", 0.45)}`,
}));

const Row = styled(Accordion)(({ theme }) => ({
  background: "transparent",
  borderRadius: 14,
  boxShadow: "none",
  border: `1px solid ${alpha("#fff", 0.08)}`,
  margin: theme.spacing(1, 0),
  "&::before": { display: "none" },
  "& .MuiAccordionSummary-root": {
    padding: theme.spacing(1.25, 2),
    minHeight: 64,
  },
  "& .MuiAccordionDetails-root": {
    padding: theme.spacing(2.25),
    borderTop: `1px solid ${alpha("#fff", 0.06)}`,
    lineHeight: 1.8,
    color: alpha("#fff", 0.86),
  },
}));

export default function AboutFAQ({
  title = "Frequently Asked Questions",
  subtitle = "Quick answers to common questions.",
  items = [
    {
      q: "How long is a session?",
      a: "A standard laser tag session lasts 75 minutes, which includes approximately 15 minutes for safety briefings and gearing up, leaving 1 hour of active gameplay",
    },
    {
      q: "Are there age or height restrictions to play?",
      a: "Answer",
    },
    {
      q: "What should I wear for a tactial laser tag session?",
      a: "Answer",
    },
    {
      q: "Does Texas Laser Tag Comabt accept walk-in players?",
      a: "Answer",
    },
    {
      q: "What are the waivers, and who needs to complete them?",
      a: "Answer",
    },
  ],
}) {
  const [active, setActive] = useState(-1);

  return (
    <Section>
      <Container maxWidth="lg" sx={{ textAlign: "center", mb: 5, pt: 15 }}>
        <Stack spacing={1.5} alignItems="center">
          <Headline variant="h3" sx={{ fontSize: { xs: 32, md: 40 } }}>
            {title}
          </Headline>
          <Sub variant="body1">{subtitle}</Sub>
        </Stack>
      </Container>

      <Container maxWidth="xl">
        <Shell
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Box sx={{ p: { xs: 1.25, md: 2 } }}>
            {items.map((item, i) => (
              <Row
                key={i}
                expanded={active === i}
                onChange={(_, ex) => setActive(ex ? i : -1)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreRoundedIcon sx={{ color: "#fff" }} />}
                >
                  <Stack
                    direction="row"
                    spacing={1.25}
                    alignItems="center"
                    sx={{ width: "100%", pr: 1 }}
                  >
                    <Typography sx={{ fontWeight: 700, flex: 1, color: "#fff" }}>
                      {item.q}
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.a}</Typography>
                </AccordionDetails>
              </Row>
            ))}
          </Box>
        </Shell>
      </Container>
    </Section>
  );
}
