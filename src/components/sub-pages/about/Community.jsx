// src/components/sections/CommunityImpactSection.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

const Section = styled(Box)(({ theme }) => ({
  background: "#0e0f10",
  color: "#fff",
  width: "100%",
  position: "relative",
  paddingBlock: theme.spacing(10),
}));

const Shell = styled(Box)(({ theme }) => ({
  background: alpha("#000", 0.25),
  border: `1px solid ${alpha("#fff", 0.08)}`,
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: 16,
  padding: theme.spacing(5),
  boxShadow: "0 10px 40px rgba(0,0,0,.35)",
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: alpha("#fff", 0.06),
  border: `1px solid ${alpha("#fff", 0.18)}`,
  boxShadow: "0 8px 30px rgba(0,0,0,.35)",
  borderRadius: 14,
  overflow: "hidden",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  transition: "transform .25s ease, box-shadow .25s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 16px 50px rgba(0,0,0,.45)",
  },
}));

export default function Community({
  eyebrow = "Our Community Commitment",
  subtitle = "A portion of every purchase supports organizations that make a real difference.",
  orgs = [
    {
      name: "Wounded Warrior Project",
      logo: "/logos/wounded-warrior.png",
      href: "#",
      cta: "Learn more",
    },
    {
      name: "Breast Cancer Research Foundation",
      logo: "/logos/bcrf.png",
      href: "#",
      cta: "Learn more",
    },
  ],
  body = [
    <>
      At <strong>Texas Laser Combat</strong>, our{" "}
      <strong>veteran and woman-owned</strong> roots fuel a deep commitment to
      community. A share of our proceeds proudly supports the Wounded Warrior
      Project, <strong>aiding our disabled heroes</strong>, and the Breast
      Cancer Research Foundation, <strong>driving life-saving research</strong>.
    </>,
    <>
      Through local events, charities, and partnerships, we build stronger bonds
      and promote active lifestyles—because fun and impact go hand in hand.
    </>,
  ],
}) {
  return (
    <Section>
      <Container maxWidth="lg">
        <Shell component={motion.section} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <Stack spacing={1.2} sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              component="h2"
              variant="h4"
              sx={{
                fontWeight: 800,
                letterSpacing: 0.2,
                lineHeight: 1.2,
                fontSize: { xs: "1.8rem", md: "2.25rem" },
              }}
            >
              {eyebrow}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                maxWidth: 720,
                mx: "auto",
                lineHeight: 1.6,
                textAlign: "center",
              }}
            >
              {subtitle}
            </Typography>
          </Stack>

          {/* Orgs */}
          <Grid
            container
            spacing={3}
            sx={{
              mb: 4,
              // mobile: horizontal snap with peek
              overflowX: { xs: "auto", md: "visible" },
              flexWrap: { xs: "nowrap", md: "wrap" },
              scrollSnapType: { xs: "x mandatory", md: "none" },
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {orgs.map((org, i) => (
              <Grid
                item
                key={org.name + i}
                xs={10}
                sm={6}
                md={6}
                lg={6}
                sx={{ scrollSnapAlign: { xs: "start", md: "none" } }}
              >
                <GlassCard component={motion.div} whileHover={{ y: -4 }}>
                  <CardActionArea
                    component="a"
                    href={org.href}
                    target={org.href?.startsWith("#") ? "_self" : "_blank"}
                    rel="noreferrer"
                    sx={{ p: 2 }}
                  >
                    <CardMedia
                      component="img"
                      alt={org.name}
                      image={org.logo}
                      sx={{
                        background: alpha("#fff", 0.06),
                        borderRadius: 1,
                        objectFit: "contain",
                        width: "100%",
                        height: { xs: 200, sm: 220 },
                      }}
                    />
                    <CardContent sx={{ textAlign: "center" }}>
                      <Button
                        size="small"
                        variant="contained"
                        sx={(theme) => ({
                          mt: 1,
                          fontWeight: 600,
                          textTransform: "none",
                          borderRadius: 999,
                          px: 2.2,
                          py: 0.6,
                          background: theme.palette.warning.main,
                          color: "#1d1d1d",
                          boxShadow: "none",
                          "&:hover": { boxShadow: "none" },
                        })}
                      >
                        {org.cta ?? "Learn more"}
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </GlassCard>
              </Grid>
            ))}
          </Grid>

          {/* Body copy */}
          <Stack spacing={2} sx={{ textAlign: "center", maxWidth: 950, mx: "auto" }}>
            {body.map((para, idx) => (
              <Typography
                key={idx}
                variant="body1"
                sx={{
                  opacity: 0.9,
                  lineHeight: 1.8,
                }}
              >
                {para}
              </Typography>
            ))}
          </Stack>
        </Shell>
      </Container>
    </Section>
  );
}
