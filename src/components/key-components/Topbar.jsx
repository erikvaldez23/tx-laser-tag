// src/components/TopbarCenteredNav.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Link as MuiLink,
  useScrollTrigger,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";

/* ----------------------------- Styled ----------------------------- */
const GlassBar = styled(AppBar)(({ theme }) => ({
  "--bg": alpha("#0a0a0a", 0.22),
  "--stroke": alpha("#fff", 0.08),
  position: "fixed",
  background: "transparent",
  boxShadow: "none",
  transition: "background-color 220ms ease, box-shadow 220ms ease",
  "&.elevated": {
    background:
      `linear-gradient(180deg, ${alpha("#0a0a0a", 0.78)}, ${alpha("#0a0a0a", 0.64)})`,
    backdropFilter: "saturate(140%) blur(10px)",
    WebkitBackdropFilter: "saturate(140%) blur(10px)",
    boxShadow: `0 10px 30px ${alpha("#000", 0.45)}`,
    borderBottom: `1px solid var(--stroke)`,
  },
}));

const Wrap = styled(Toolbar)(({ theme }) => ({
  minHeight: 72,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up("sm")]: { minHeight: 76, paddingLeft: 24, paddingRight: 24 },
  [theme.breakpoints.up("md")]: { minHeight: 80, paddingLeft: 32, paddingRight: 32 },
  position: "relative",
}));

/* Center rail with edge fades so overflow feels intentional */
const CenterRail = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.25),
  paddingInline: theme.spacing(1),
  maxWidth: "min(100%, 1100px)",
  overflowX: "auto",
  whiteSpace: "nowrap",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": { display: "none" },

  /* soft edge fades */
  maskImage:
    "linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%)",
}));

/* Link with animated underline + active pill */
const NavLink = styled(MuiLink)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  fontSize: 22,
  [theme.breakpoints.up("md")]: { fontSize: 28 },
  letterSpacing: 0.2,
  textDecoration: "none",
  color: alpha("#fff", 0.92),
  padding: theme.spacing(1, 1.25),
  borderRadius: 12,
  transition: "transform 160ms ease, background 160ms ease, color 160ms ease",
  outline: "none",

  /* hover scale + subtle glass hover */
  "&:hover": {
    transform: "translateY(-1px)",
  },

  /* focus ring (keyboard) */
  "&:focus-visible": {
    boxShadow: `0 0 0 2px ${alpha("#fff", 0.14)}, 0 0 0 4px ${alpha("#fff", 0.06)}`,
  },

  /* animated underline */
  "&::after": {
    content: '""',
    position: "absolute",
    left: "10%",
    right: "10%",
    bottom: 6,
    height: 2,
    borderRadius: 2,
    transform: "scaleX(0)",
    transformOrigin: "center",
    background: alpha("#ffd15b", 0.95),
    transition: "transform 220ms ease",
  },
  "&:hover::after": { transform: "scaleX(1)" },

  /* active state = pill + persistent underline */
  "&.active": {
    color: "#fff",
  },
  "&.active::after": { transform: "scaleX(1)" },

  /* reduced motion */
  "@media (prefers-reduced-motion: reduce)": {
    transition: "none",
    "&::after": { transition: "none" },
  },
}));

/* Logo link */
const LogoLink = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  textDecoration: "none",
}));

/* ------------------------- Scroll elevation hook ------------------------- */
function useElevateOnScroll() {
  return useScrollTrigger({ disableHysteresis: true, threshold: 8 });
}

/* ------------------------------ Component ------------------------------ */
export default function TopbarCenteredNav({
  logoSrc = "/logo.png",
  logoAlt = "Company",
  links = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Events", to: "/events" },
    { label: "Experience", to: "/experience" },
  ],
  appBarProps,
}) {
  const location = useLocation();
  const scrolled = useElevateOnScroll();

  return (
    <GlassBar
      position="fixed"
      className={scrolled ? "elevated" : ""}
      {...appBarProps}
    >
      <Wrap disableGutters>
        {/* Left: Logo */}
        <LogoLink component={RouterLink} to="/" aria-label="Go to homepage">
          <Box
            component="img"
            src={logoSrc}
            alt={logoAlt}
            sx={{
              height: { xs: 64, sm: 72, md: 84 },
              width: "auto",
              display: "block",
              objectFit: "contain",
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,.35))",
              transition: "transform 200ms ease",
              "&:hover": { transform: "scale(1.03)" },
              "@media (prefers-reduced-motion: reduce)": { transition: "none" },
            }}
          />
        </LogoLink>

        {/* Center: Navigation */}
        <CenterRail aria-label="Primary navigation" role="navigation">
          {links.map((link) => {
            const active =
              link.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.to);
            return (
              <NavLink
                key={link.to}
                component={RouterLink}
                to={link.to}
                className={active ? "active" : undefined}
                underline="none"
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </NavLink>
            );
          })}
        </CenterRail>

        {/* Right spacer keeps visual balance with logo area (room for future icons) */}
        <Box sx={{ ml: "auto", width: { xs: 40, md: 56 }, height: { xs: 40, md: 56 } }} />
      </Wrap>
    </GlassBar>
  );
}
