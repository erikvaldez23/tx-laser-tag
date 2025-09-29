// src/components/testimonials/TestimonialsGlass.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Rating,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

/* --------------------------- Styled Components --------------------------- */
const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  background: "transparent",
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(10),
  overflow: "hidden",
}));

const Card = styled(motion.div)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: theme.spacing(2),
  minWidth: 280,
  maxWidth: 420,
  height: "100%",
  padding: theme.spacing(3),
  borderRadius: 18,
  color: theme.palette.text.primary,
  background: "rgba(255, 255, 255, 0.4)",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 8px 30px rgba(0,0,0,.45)"
      : "0 8px 30px rgba(0,0,0,.12)",
}));

const RingGlow = styled("span")(({ theme }) => ({
  pointerEvents: "none",
  position: "absolute",
  inset: -2,
  borderRadius: 20,
  background: `radial-gradient(120% 120% at 0% 0%, ${alpha(
    theme.palette.primary.main,
    0.14
  )} 0%, transparent 45%)`,
  filter: "blur(16px)",
  zIndex: 0,
}));

/* ------------------------------ Component ------------------------------- */
export default function AboutTestimonials({
  title = "What our customers say",
  subtitle = "Real stories from people who trust us.",
  testimonials = [
    {
      name: "Alex Martinez",
      role: "Dallas, TX",
      rating: 5,
      quote:
        "Incredible experience from start to finish. Professional, fast, and the results speak for themselves.",
      avatar: "/avatars/alex.jpg",
    },
    {
      name: "Priya Singh",
      role: "Fort Worth, TX",
      rating: 5,
      quote:
        "The team went above and beyond to make sure I was happy. Communication and quality were top-notch.",
      avatar: "/avatars/priya.jpg",
    },
    {
      name: "Jordan Lee",
      role: "Plano, TX",
      rating: 4,
      quote:
        "Clean install, great price, and they walked me through everything. Highly recommend.",
      avatar: "/avatars/jordan.jpg",
    },
    {
      name: "Jordan Lee",
      role: "Plano, TX",
      rating: 4,
      quote:
        "Clean install, great price, and they walked me through everything. Highly recommend.",
      avatar: "/avatars/jordan.jpg",
    },
  ],
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Section>
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, pb: 15 }}>
        <Stack spacing={1.2} sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="overline"
            sx={{ letterSpacing: 2, opacity: 0.8 }}
          >
            Testimonials
          </Typography>
          <Typography
            component="h2"
            variant="h4"
            sx={{
              fontWeight: 700,
              lineHeight: 1.2,
              fontSize: { xs: "1.8rem", md: "2.2rem" },
            }}
          >
            {title}
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "calc(80% - 8px) calc(80% - 8px) calc(80% - 8px)",
              sm: "repeat(3, calc(60%))",
              md: "repeat(4, 1fr)",
            },
            gap: { xs: 2, md: 3 },
            alignItems: "stretch",
            overflowX: { xs: "auto", md: "visible" },
            scrollSnapType: { xs: "x mandatory", md: "none" },
            px: { xs: 1, md: 0 },
            pb: { xs: 1, md: 0 },
            // show a bit of the next card on mobile
            "& > *": {
              scrollSnapAlign: { xs: "start", md: "none" },
            },
            // hide scrollbar (most browsers)
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
          aria-label="Customer testimonials"
        >
          {testimonials.map((t, idx) => (
            <Card
              key={idx}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            >
              <RingGlow />
              <Stack spacing={2} sx={{ position: "relative", zIndex: 1 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={t.avatar}
                    alt={t.name}
                    sx={{
                      width: 48,
                      height: 48,
                      fontWeight: 600,
                      bgcolor: alpha(theme.palette.primary.main, 0.18),
                    }}
                  >
                    {getInitials(t.name)}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      {t.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ opacity: 0.7, mt: -0.25 }}
                    >
                      {t.role}
                    </Typography>
                  </Box>
                </Stack>

                <Rating
                  value={t.rating ?? 5}
                  precision={0.5}
                  readOnly
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color:
                        theme.palette.mode === "dark"
                          ? alpha("#fff", 0.9)
                          : theme.palette.primary.main,
                    },
                  }}
                />

                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.7, opacity: 0.95 }}
                >
                  “{t.quote}”
                </Typography>
              </Stack>
            </Card>
          ))}
        </Box>
      </Container>
    </Section>
  );
}

/* ------------------------------- Utilities ------------------------------- */
function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
