import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  background: "transparent",
  color: alpha("#fff", 0.92),
  overflow: "hidden",
  isolation: "isolate",
}));

const Center = styled(Box)({
  "--max": "1680px",
  width: "min(100% - 64px, var(--max))", // 32px gutters
  marginInline: "auto",
  position: "relative",
});

const Vignette = styled("div")(({ side = "right", color = "red" }) => {
  const colorMap = {
    red: "rgba(200,0,0,",
    gold: "rgba(255,196,0,",
    green: "rgba(73,201,120,",
    blue: "rgba(39,148,210,",
  };
  const c = colorMap[color] || colorMap.red;
  const base = `${c}.55) 0%, ${c}.18) 45%, ${c}0) 70%)`;

  return {
    position: "absolute",
    inset: 0,
    [side]: "0",
    width: "60%",
    pointerEvents: "none",
    background:
      side === "right"
        ? `radial-gradient(60% 60% at 75% 30%, ${base})`
        : `radial-gradient(60% 60% at 25% 30%, ${base})`,
    filter: "blur(2px)",
    zIndex: 0,
    opacity: 0.55,
  };
});

const Copy = styled(Box)(({ theme }) => ({
  maxWidth: 720,
  lineHeight: 1.65,
  "& p": { margin: 0, marginBottom: theme.spacing(3) },
}));

const Emphasis = styled("span")({
  color: "#ffcc33",
  fontWeight: 800,
});

const ImageCard = styled(Paper)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  height: 460,
  borderRadius: 16,
  background: "transparent",
  border: `1px solid ${alpha("#fff", 0.09)}`,
  boxShadow:
    "0 30px 60px rgba(0,0,0,.45), inset 0 1px rgba(255,255,255,.06), inset 0 -1px rgba(255,255,255,.03)",
  overflow: "hidden",
  transformStyle: "preserve-3d",
  [theme.breakpoints.down("md")]: {
    height: 320,
  },
}));

const Media = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.24) 100%)",
  },
}));

const ITEMS = [
  {
    id: "welcome",
    side: "left",
    glow: "red",
    title:
      "Welcome to Texas Laser Combat, North Dallas’s newest premier destination for adrenaline-fueled tactical laser tag adventures in Plano, TX.",
    body: (
      <p>
        As a proudly veteran and woman-owned family business, we're committed to
        fostering unforgettable and safe bonding experiences for{" "}
        <Emphasis>ages 7 and up</Emphasis>, where families, friends,
        individuals, and teams unite in the heat of combat. Through our
        community events, charities, and partnerships with local schools and
        businesses, we promote healthy and active lifestyles for the public and
        players.
      </p>
    ),
    image: "/assets/lasercombat/hero-arena.jpg",
    imageAlt: "Players engaged in tactical laser combat in the arena",
  },
  {
    id: "arena",
    side: "right",
    glow: "gold",
    title: "Immersive Multi-Level Arena",
    body: (
      <>
        <p>
          Our expansive <Emphasis>15,000-square-foot</Emphasis> indoor arena
          delivers wasteland scenario-based gameplay designed to spark teamwork
          and fun for up to <Emphasis>50 players</Emphasis> - Think
          strategy-driven missions, vibration-feedback vests, headsets, and
          proprietary weapons—every visit becomes a memorable saga.
        </p>
        <p>
          With safety always first through our state-of-the-art equipment and
          expert staff oversight, we ensure every visit is exhilarating yet
          secure for varying mobility.
        </p>
      </>
    ),
    image: "/assets/lasercombat/multi-level.jpg",
    imageAlt: "Multi-level laser combat arena with ramps and barriers",
  },
  {
    id: "events",
    side: "left",
    glow: "green",
    title: "Private Parties & Events",
    body: (
      <>
        <p>
          Plus, our private party rooms ensure seamless celebrations tailored to
          your group, including birthdays, corporate events, or gatherings with
          customized packages that keep the excitement rolling.
        </p>
        <p>
          Join us now as a group or solo and discover why Texas Laser Combat
          isn't just a game—it's a way to unleash your inner warrior while
          experiencing one of the most thrilling activities around.
        </p>
      </>
    ),
    image: "/assets/lasercombat/party-event.jpg",
    imageAlt: "Group celebrating a birthday party with laser tag gear",
  },
];

export default function IntroStaggeredSections({ items = ITEMS, renderImage }) {
  return (
    <>
      {items.map((item, idx) => {
        const textOnRight = item.side === "right";
        const tilt = textOnRight ? -3 : 3;

        return (
          <Section key={item.id || idx}>
            <Center>
              <Vignette
                side={textOnRight ? "left" : "right"}
                color={item.glow}
              />

              <Grid
                container
                spacing={{ xs: 6, md: 10 }}
                alignItems="center"
                direction={textOnRight ? "row-reverse" : "row"}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ position: "relative", zIndex: 1 }}
                >
                  <Copy>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        letterSpacing: 0.2,
                        color: "#fff",
                        mb: 3,
                        lineHeight: 1.25,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      component="div"
                      sx={{ fontSize: 18, opacity: 0.95 }}
                    >
                      {item.body}
                    </Typography>
                  </Copy>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ position: "relative", zIndex: 1 }}
                >
                  <ImageCard>
                    {renderImage ? (
                      renderImage(item)
                    ) : (
                      <Media
                        role="img"
                        aria-label={item.imageAlt || item.title}
                        sx={{
                          backgroundImage: item.image
                            ? `url(${item.image})`
                            : `radial-gradient(120% 120% at 70% 20%, rgba(255,255,255,.06) 0%, rgba(255,255,255,0) 60%), 
                                 linear-gradient(135deg, ${alpha(
                                   "#fff",
                                   0.06
                                 )}, ${alpha("#000", 0.2)})`,
                        }}
                      />
                    )}

                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 16,
                        boxShadow: `0 0 0 1px ${alpha("#fff", 0.06)} inset`,
                        pointerEvents: "none",
                      }}
                    />
                  </ImageCard>
                </Grid>
              </Grid>
            </Center>
          </Section>
        );
      })}
    </>
  );
}
