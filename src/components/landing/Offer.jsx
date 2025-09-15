// src/components/sections/OffersShowcase.jsx
import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

/* ---- Brand ---- */
const ACCENT = "#f2c230";
const ACCENT_HOVER = "#ffd95a";

/* ---- Styled ---- */
const Section = styled(Box)(({ theme }) => ({
  background: "#222",
  color: alpha("#fff", 0.92),
  paddingBlock: theme.spacing(8, 12),
}));

const GridWrap = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(6),
  [theme.breakpoints.up("sm")]: { gridTemplateColumns: "repeat(2, 1fr)" },
  [theme.breakpoints.up("md")]: { gridTemplateColumns: "repeat(3, 1fr)" },
}));

const Media = styled(Box)(({ theme }) => ({
  width: "100%",
  aspectRatio: "2 / 3",
  borderRadius: 16,
  overflow: "hidden",
  background: "#9b9b9b",
  border: `1px solid ${alpha("#fff", 0.12)}`,
  boxShadow: `0 20px 50px ${alpha("#000", 0.5)}, inset 0 1px 0 ${alpha("#fff", 0.06)}`,
}));

const LearnBtn = styled(Button)({
  borderRadius: 999,
  textTransform: "none",
  fontWeight: 800,
  padding: "10px 20px",
  background: ACCENT,
  color: "#101113",
  boxShadow: `0 10px 28px ${ACCENT}55`,
  "&:hover": { background: ACCENT_HOVER, boxShadow: `0 14px 36px ${ACCENT}66`, transform: "translateY(-1px)" },
  transition: "all .25s ease",
});

/* ---- Component ---- */
export default function OffersShowcase({
  title = "What we offer",
  items = [
    {
      img: "", // optional image url
      heading: "The experience",
      sub: "Immersive tactical game play",
      cta: "Learn more",
      onClick: () => {},
    },
    {
      img: "",
      heading: "Groups and parties",
      sub: "Host events, corporate events & more",
      cta: "Learn more",
      onClick: () => {},
    },
    {
      img: "",
      heading: "Food and beverages",
      sub: "Enjoy unique food offerings and catering",
      cta: "Learn more",
      onClick: () => {},
    },
  ],
}) {
  return (
    <Section>
      <Container maxWidth="xl">
        {/* Title */}
        <Typography
          variant="h3"
          sx={{ fontWeight: 900, mb: 4, letterSpacing: { md: "0.01em" } }}
        >
          {title}
        </Typography>

        {/* Cards */}
        <GridWrap>
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Stack spacing={3} alignItems="center" textAlign="center">
                <Media>
                  {it.img ? (
                    <Box
                      component="img"
                      src={it.img}
                      alt={it.heading}
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

                <Box sx={{ maxWidth: 380 }}>
                  <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>
                    {it.heading}
                  </Typography>
                  <Typography sx={{ opacity: 0.85, mb: 2 }}>
                    {it.sub}
                  </Typography>
                  <LearnBtn onClick={it.onClick}>{it.cta}</LearnBtn>
                </Box>
              </Stack>
            </motion.div>
          ))}
        </GridWrap>
      </Container>
    </Section>
  );
}
