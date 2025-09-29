// src/components/sections/CommunityCommitment.jsx
import React from "react";
import {
  Box,
  Typography,
  Stack,
  Link as MuiLink,
  useTheme,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

/* --------------------------- Full-bleed wrapper --------------------------- */
const FullBleed = styled(Box)({
  position: "relative",
  left: "50%",
  right: "50%",
  marginLeft: "-50vw",
  marginRight: "-50vw",
  width: "100vw",
  background: "transparent",
});

/* ----------------------- Centered 80vw panel container -------------------- */
const Panel = styled(Box)(({ theme }) => ({
  "--gutter": "min(4vw, 32px)", // single source of truth for side padding
  width: "100vw",
  maxWidth: 1600, // optional cap
  marginInline: "auto",

  borderRadius: 30,
  overflow: "hidden",
  background: "linear-gradient(180deg, #2a2a2a 0%, #2b2b2b 100%)",
  color: alpha("#fff", 0.92),
  border: `1px solid ${alpha("#fff", 0.08)}`,
  boxShadow: `0 24px 80px ${alpha("#000", 0.45)}`,

  paddingInline: "var(--gutter)", // panel’s inner side padding
}));

/* ------------------------------ Inner content ---------------------------- */
const Track = styled(Box)(({ theme }) => ({
  width: "100%",
  marginInline: "auto",
  paddingTop: theme.spacing(8),
  paddingBottom: 0,
}));

/* ----------------------------- Grid & visuals ---------------------------- */
const GridWrap = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(6),
  alignItems: "center",
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "380px 1fr",
    gap: theme.spacing(10),
  },
}));

const LogosStack = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(6),
  [theme.breakpoints.up("md")]: { alignItems: "flex-start" },
}));

const Logo = styled("img")(({ theme }) => ({
  width: "220px",
  height: "auto",
  filter: "saturate(0.98)",
  userSelect: "none",
  pointerEvents: "none",
  [theme.breakpoints.down("sm")]: { width: "180px" },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: `'Playfair Display', ui-serif, Georgia, serif`,
  fontWeight: 800,
  letterSpacing: 0.2,
  color: alpha("#fff", 0.96),
  textShadow: `0 1px 0 ${alpha("#000", 0.35)}`,
}));

const Copy = styled(Typography)(({ theme }) => ({
  lineHeight: 1.8,
  fontSize: 18,
  color: alpha("#fff", 0.88),
}));

/* --------- Pledge bar that visually spans full panel width (edge-to-edge) -------- */
const PledgeBar = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),

  // Break out of Panel’s side padding to reach its edges
  marginInline: "calc(-1 * var(--gutter))",
  width: "calc(100% + (2 * var(--gutter)))",

  background: "#f2c230",
  color: "#151515",
  borderTop: `1px solid ${alpha("#000", 0.2)}`,

  // Keep inner text aligned with content above
  paddingInline: "var(--gutter)",
  paddingTop: theme.spacing(2.25),
  paddingBottom: theme.spacing(2.25),
  fontSize: 16,
}));

/* --------------------------------- Component ----------------------------- */
export default function CommunityCommitment({
  title = "Our Community Commitment",
  woundedWarriorLogo = "/community/wounded-warrior.png",
  bcrfLogo = "/community/breast-cancer.png",
  pinkLinkHref = "#",
}) {
  const theme = useTheme();

  return (
    <FullBleed component="section" aria-label="Community Commitment">
      <Panel>
        <Track>
          <Title
            variant="h3"
            sx={{
              mb: 3,
              fontSize: { xs: "2rem", md: "2.4rem" },
              textAlign: { xs: "center", md: "left" },
            }}
          >
            {title}
          </Title>

          <GridWrap>
            <LogosStack>
              <Logo src={woundedWarriorLogo} alt="Wounded Warrior Project" />
              <Logo src={bcrfLogo} alt="Breast Cancer Research Foundation" />
            </LogosStack>

            <Stack spacing={3}>
              <Copy>
                At Texas Laser Combat, our{" "}
                <strong>veteran and woman-owned</strong> roots fuel a deep
                commitment to community. A share of our proceeds from these
                weapon upgrades proudly support the{" "}
                <MuiLink
                  href="https://www.woundedwarriorproject.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="inherit"
                  sx={{ fontWeight: 600 }}
                >
                  Wounded Warrior Project
                </MuiLink>
                , aiding our disabled heroes, and the{" "}
                <MuiLink
                  href="https://www.bcrf.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="inherit"
                  sx={{ fontWeight: 600 }}
                >
                  Breast Cancer Research Foundation
                </MuiLink>
                , driving life-saving research.
              </Copy>

              <Copy>
                Through local events, charities and partnerships, we build
                stronger bonds and promote active lifestyles—because fun and
                impact go hand in hand.
              </Copy>
            </Stack>
          </GridWrap>
        </Track>

        <PledgeBar role="note">
          For certain special weapons upgrades such as our{" "}
          <MuiLink
            href={pinkLinkHref}
            underline="always"
            color="inherit"
            sx={{ fontWeight: 700 }}
          >
            Pink P90
          </MuiLink>
          , we have pledged to donate 50% of the profit to our nonprofit
          partners.
        </PledgeBar>
      </Panel>
    </FullBleed>
  );
}
