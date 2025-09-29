// src/components/contact/ContactUsDark.jsx
import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

/* ---- Design tokens ---- */
const FIELD = "#2a2b2c";
const LINE = "rgba(255,255,255,0.08)";
const FG = alpha("#fff", 0.92);
const MUTED = alpha("#fff", 0.72);
const ACCENT = "#f2c230";

/* ---- Section wrapper ---- */
const Section = styled(Box)(({ theme }) => ({
  width: "100%",
  background: "transparent",
  color: FG,
  paddingBlock: theme.spacing(10),
}));

/* ---- Form card ---- */
const Card = styled(Box)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: { padding: theme.spacing(3) },
}));

const fieldSx = {
  "& .MuiInputBase-root": {
    background: FIELD,
    color: FG,
    borderRadius: 8,
    border: `1px solid ${LINE}`,
  },
  "& .MuiInputBase-input::placeholder": { color: alpha("#fff", 0.5) },
  "& .MuiInputLabel-root": { color: MUTED },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "& .MuiInputBase-root.Mui-focused": {
    boxShadow: `0 0 0 2px ${alpha(ACCENT, 0.35)}`,
  },
};

export default function ContactUsDark() {
  return (
    <Section>
      {/* Container centers itself with auto margins */}
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="flex-start">
          {/* Left copy: narrower */}
          <Grid item xs={12} md={4} lg={3}>
            <Typography variant="h4" fontWeight={800} gutterBottom>
              Contact Us
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: MUTED, maxWidth: 520, lineHeight: 1.7 }}
            >
              Have questions? Reach out to our team, and we&apos;ll get back to
              you as soon as possible.
            </Typography>
          </Grid>

          {/* Right form: wider (md 8 / lg 9) */}
          <Grid item xs={12} md={8} lg={9}>
            <Card component="form" onSubmit={(e) => e.preventDefault()}>
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 3fr" },
                  ml: 5
                }}
              >
                <TextField
                  label="First name"
                  placeholder="First name"
                  variant="outlined"
                  size="medium"
                  fullWidth
                  sx={fieldSx}
                />
                <TextField
                  label="Last name"
                  placeholder="Last name"
                  variant="outlined"
                  size="medium"
                  fullWidth
                  sx={fieldSx}
                />

                <TextField
                  label="Email"
                  placeholder="Email"
                  variant="outlined"
                  size="medium"
                  fullWidth
                  sx={fieldSx}
                />
                <TextField
                  label="Phone number"
                  placeholder="Phone number"
                  variant="outlined"
                  size="medium"
                  fullWidth
                  sx={fieldSx}
                />

                {/* Message spans both columns */}
                <TextField
                  label="Your message here"
                  placeholder="Your message here"
                  variant="outlined"
                  size="medium"
                  fullWidth
                  multiline
                  minRows={5}
                  sx={{ ...fieldSx, gridColumn: { xs: "1", sm: "1 / -1" } }}
                />

                <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disableElevation
                    sx={{
                      px: 3,
                      py: 1,
                      fontWeight: 700,
                      textTransform: "none",
                      background: ACCENT,
                      color: "#111",
                      "&:hover": { background: "#ffd95a" },
                      borderRadius: 8,
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Section>
  );
}
