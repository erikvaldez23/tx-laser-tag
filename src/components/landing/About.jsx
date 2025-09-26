// src/components/sections/About.jsx
import React from "react";
import { Box, Typography, Button, Stack, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import LocationOnIcon from "@mui/icons-material/LocationOn";


/* ------------------------------ Design Tokens ------------------------------ */
const ACCENT = "#f2c230"; // brand yellow
const ACCENT_HOVER = "#ffd95a";

/* ------------------------------ Styled CTA ------------------------------ */
const CTAButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== "sizeVariant",
})(({ sizeVariant }) => ({
  fontWeight: 700,
  padding: sizeVariant === "large" ? "16px 40px" : "12px 32px",
  borderRadius: 50,
  fontSize: sizeVariant === "large" ? "1.1rem" : "1rem",
  textTransform: "none",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.35s ease",
  boxShadow: `0 8px 28px ${ACCENT}55`,
  background: ACCENT,
  border: "none",
  color: "#101113",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: `0 12px 40px ${ACCENT}66`,
    background: ACCENT_HOVER,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
    transition: "left 0.6s",
  },
  "&:hover::before": { left: "100%" },
}));

/* ------------------------------ CSS Grid ------------------------------ */
const GridWrap = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr", // xs: 1 col
  gap: theme.spacing(0),
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)", // sm: 2 cols
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(3, 1fr)", // md+: 3 cols
  },
}));

const CardItem = styled("div")(({ theme }) => ({
  position: "relative",
  paddingInline: theme.spacing(4),
  paddingBlock: theme.spacing(5),
  [theme.breakpoints.up("sm")]: {
    borderLeft: "2px solid transparent",
    background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent) left/2px 100% no-repeat`,
  },
  "&:nth-child(2n+1)": {
    background: "none",
    [theme.breakpoints.up("md")]: {
      background: `linear-gradient(180deg, transparent, ${ACCENT}, transparent) left/2px 100% no-repeat`,
    },
  },
  [theme.breakpoints.up("md")]: {
    "&:nth-child(3n+1)": {
      background: "none",
    },
    paddingBlock: theme.spacing(7),
  },
}));

/* ----------------------------- Data (cards) ----------------------------- */
const items = [
  {
    icon: <PrecisionManufacturingIcon sx={{ fontSize: 44 }} />,
    title: "State-of-the-art Equipment",
    body: "Built to thrill with cutting edge technology",
  },
  {
    icon: <AccessibleForwardIcon sx={{ fontSize: 44 }} />,
    title: "Accessible Game Play",
    body: "All age friendly with wheelchair accessibility",
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 44 }} />,
    title: "Convenient Location",
    body: "Located off Coit in Central Plano",
  },
];


/* ----------------------------- Component ----------------------------- */
const About = () => {
  return (
    <Box sx={{ py: { xs: 4, md: 10 }, background: "transparent" }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Centered Grid */}
          <GridWrap>
            {items.map((item, idx) => (
              <CardItem key={idx}>
                <Stack direction="row" spacing={2.5} alignItems="flex-start">
                  <Box
                    sx={{
                      color: ACCENT,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 52,
                      height: 52,
                      borderRadius: "14px",
                      boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, mb: 1, color: "#ffffff" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "rgba(255,255,255,0.80)",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.body}
                    </Typography>
                  </Box>
                </Stack>
              </CardItem>
            ))}
          </GridWrap>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;
