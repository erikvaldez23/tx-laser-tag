import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const Section = styled(Box)({
  width: "100%",
  background: "transparent",
  color: "#eee",
  paddingBlock: 48,
});

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
  [theme.breakpoints.up("md")]: { height: 300 },
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

export default function PartyRoomPackages({
  heading = "Party room packages",
  items = packagesDefault,
  onBook,
}) {
  return (
    <Section>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight={800} gutterBottom sx={{ mb: 3 }}>
          {heading}
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {items.map((pkg) => (
            <Grid item xs={12} sm={10} md={5} key={pkg.id}>
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
                  <Typography
                    variant="body2"
                    sx={{ color: alpha("#fff", 0.8), mt: 1, maxWidth: 600 }}
                  >
                    {pkg.description}
                  </Typography>
                </Box>

                <Cta onClick={() => onBook?.(pkg)}>Book now</Cta>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
