// src/components/sections/JoinOurTeam.jsx
import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

/* ---- Brand ---- */
const ACCENT = "#f2c230";
const ACCENT_HOVER = "#ffd95a";

/* ---- Styled ---- */
const Section = styled(Box)(({ theme }) => ({
  background: "#222",
  color: alpha("#fff", 0.92),
  paddingBlock: theme.spacing(10, 14),
}));

const Media = styled(Box)(({ theme }) => ({
  width: "100%",
  aspectRatio: "16 / 6.5", // wide banner look
  borderRadius: 14,
  overflow: "hidden",
  background: "#9b9b9b",
  border: `1px solid ${alpha("#fff", 0.12)}`,
  boxShadow: `0 24px 60px ${alpha("#000", 0.55)}, inset 0 1px 0 ${alpha(
    "#fff",
    0.06
  )}`,
}));

const CTA = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  textTransform: "none",
  fontWeight: 800,
  padding: "10px 24px",
  background: ACCENT,
  color: "#101113",
  boxShadow: `0 12px 32px ${ACCENT}55`,
  transition: "all .25s ease",
  "&:hover": {
    background: ACCENT_HOVER,
    boxShadow: `0 16px 40px ${ACCENT}66`,
    transform: "translateY(-1px)",
  },
}));

/* ---- Component ---- */
export default function Apply({
  title = "Join our team!",
  description = `We're opening our first laser tag arena and looking for energetic, customer-focused team members to create unforgettable experiences for our guests.`,
  imageSrc = "",      // put an image/video poster here if you have one
  imageAlt = "Hiring banner",
  onApply = () => {}, // e.g., () => window.open('/careers', '_self')
}) {
  return (
    <Section>
      <Container maxWidth="xl">
        {/* Title */}
        <Typography
          component={motion.h2}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          variant="h3"
          align="center"
          sx={{ fontWeight: 900, mb: 4, letterSpacing: { md: "0.01em" } }}
        >
          {title}
        </Typography>

        {/* Media */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <Media>
            {imageSrc ? (
              <Box
                component="img"
                alt={imageAlt}
                src={imageSrc}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
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
                }}
              >
                [Image placeholder]
              </Box>
            )}
          </Media>
        </motion.div>

        {/* Copy + CTA */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          sx={{ textAlign: "center", mt: 4 }}
        >
          <Typography
            sx={{
              maxWidth: 980,
              mx: "auto",
              opacity: 0.9,
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.7,
              mb: 3,
            }}
          >
            {description}
          </Typography>

          <CTA onClick={onApply}>Apply now</CTA>
        </Box>
      </Container>
    </Section>
  );
}
