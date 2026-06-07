import React from "react";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import SEOHead from "../../seo/SEOHead";

const Wrap = styled(Box)(({ theme }) => ({
  minHeight: "80vh",
  display: "grid",
  placeItems: "center",
  color: "#eee",
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
  textAlign: "center",
}));

const Code = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  fontSize: "clamp(80px, 18vw, 180px)",
  lineHeight: 1,
  letterSpacing: "-0.04em",
  fontFamily: "PostNoBillsJaffna, sans-serif",
  background: "linear-gradient(135deg, #f2c230, #ff6b35)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
}));

export default function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="Page Not Found (404)"
        description="The page you're looking for doesn't exist. Head back to Texas Laser Combat's homepage to explore our laser tag arena, events, and packages in Plano, TX."
        canonical="/404"
        noIndex={true}
      />
      <main>
        <Wrap component="section" aria-label="Page not found">
          <Container maxWidth="md">
            <Stack spacing={4} alignItems="center">
              <Code aria-hidden="true">404</Code>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.75rem", md: "2.5rem" },
                  color: "#fff",
                }}
              >
                Page Not Found
              </Typography>
              <Typography
                sx={{
                  color: alpha("#fff", 0.7),
                  fontSize: { xs: 16, md: 18 },
                  maxWidth: 520,
                  lineHeight: 1.7,
                }}
              >
                Looks like this page went MIA. Don't worry — the arena's still
                open. Head back and find your next mission.
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  component={RouterLink}
                  to="/"
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 800,
                    fontFamily: "Podkova",
                    backgroundColor: "#f2c230",
                    color: "#0e0f11",
                    px: 4,
                    "&:hover": { backgroundColor: "#ffd24a" },
                  }}
                >
                  Go Home
                </Button>
                <Button
                  component={RouterLink}
                  to="/events"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 700,
                    fontFamily: "Podkova",
                    borderColor: alpha("#fff", 0.4),
                    color: "#fff",
                    px: 4,
                    "&:hover": { borderColor: "#fff", backgroundColor: alpha("#fff", 0.08) },
                  }}
                >
                  View Events
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Wrap>
      </main>
    </>
  );
}
