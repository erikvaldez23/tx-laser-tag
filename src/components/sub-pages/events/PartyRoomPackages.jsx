// src/components/PartyRoomPackages.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

/* ----------------------------- Styled ----------------------------- */
const Section = styled(Box)({
  width: "100%",
  background: "transparent",
  color: "#eee",
  paddingBlock: 48,
});

const Title = styled(Typography)({
  fontWeight: 800,
  marginBottom: 24,
});

const Cards = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),

  // 6 tracks (think "3-card width"); each card will span 3 => two per row
  gridTemplateColumns: "repeat(6, minmax(0, 1fr))",

  // On medium: 4 tracks, each card spans 2 => two per row
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  },

  // On small: single column
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

const CardWrap = styled(Box)(({ theme }) => ({
  gridColumn: "span 3", // fills half of the 6-track row (two cards per row)
  [theme.breakpoints.down("lg")]: {
    gridColumn: "span 2", // half of 4 tracks
  },
  [theme.breakpoints.down("sm")]: {
    gridColumn: "auto", // full width
  },
}));

const ImgShell = styled(Paper)(({ theme }) => ({
  position: "relative",
  height: 300,
  borderRadius: 10,
  background: "#8d8d8d",
  boxShadow: "none",
  display: "grid",
  placeItems: "center",
  color: alpha("#000", 0.6),
  fontSize: 12,
  userSelect: "none",
}));

const Body = styled(Typography)(({ theme }) => ({
  color: alpha("#fff", 0.8),
  marginTop: theme.spacing(1),
  maxWidth: 900, // won’t constrain the two-card width
}));

const Cta = styled(Button)({
  alignSelf: "flex-start",
  borderRadius: 999,
  textTransform: "none",
  fontWeight: 700,
  padding: "8px 16px",
  backgroundColor: "#c6a045",
  color: "#1a1a1a",
  boxShadow: "none",
  "&:hover": { backgroundColor: "#af8e3e", boxShadow: "none" },
});

/* --------------------------- Defaults ---------------------------- */
const packagesDefault = [
  {
    id: "basic",
    title: "Basic Package",
    description:
      "Includes 1 hour in the party room and 2 games of laser tag. Up to 15 people can attend.",
  },
  {
    id: "deluxe",
    title: "Deluxe Package",
    description:
      "Includes 2 hours in the party room, 3 games of laser tag, and a pizza party. Up to 15 people can attend.",
  },
];

/* --------------------------- Component --------------------------- */
export default function PartyRoomPackages({
  heading = "Party room packages",
  items = packagesDefault,
  onBook,
}) {
  return (
    <Section>
      <Container maxWidth="xl">
        <Title variant="h4">{heading}</Title>

        <Cards>
          {items.map((pkg) => (
            <CardWrap key={pkg.id}>
              <Stack spacing={2}>
                <ImgShell>
                  <Typography component="span" sx={{ opacity: 0.8 }}>
                    [Image placeholder]
                  </Typography>
                </ImgShell>

                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    {pkg.title}
                  </Typography>
                  <Body variant="body2">{pkg.description}</Body>
                </Box>

                <Cta onClick={() => onBook?.(pkg)}>Book now</Cta>
              </Stack>
            </CardWrap>
          ))}
        </Cards>
      </Container>
    </Section>
  );
}
