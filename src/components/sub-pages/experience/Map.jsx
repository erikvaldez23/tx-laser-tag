import React from "react";
import { Box, Container } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const BASE_URL = (import.meta?.env?.BASE_URL ?? "/").replace(/\/+/g, "/");

const DEFAULT_SRC = `/experience.png`;

const Wrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: `0 28px 64px ${alpha("#000", 0.55)}`,
}));

const Img = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
  display: "block",
});

const Overlay = styled(Box)(() => ({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
}));

export default function FeatureBanner({
  src = DEFAULT_SRC,
  alt = "",
  height="clamp(420px, 48vw, 720px)",
  radius = 16,
  overlay = false,
  overlaySx,
  children,
  containerProps,
  sx,
}) {
  return (
    <Container
      maxWidth="xl"
      sx={{
        mb: { xs: 6, md: 8 },        // nice spacing below the banner
      }}
      {...containerProps}
    >
      <Wrap sx={{ height, borderRadius: radius, ...sx }}>
        <Img src={src} alt={alt} loading="eager" decoding="async" />
        {overlay ? <Overlay sx={overlaySx} /> : null}

        {children ? (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              p: 2,
            }}
          >
            {children}
          </Box>
        ) : null}
      </Wrap>
    </Container>
  );
}
