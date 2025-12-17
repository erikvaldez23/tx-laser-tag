// src/components/TopbarResponsiveNav.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Link as MuiLink,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  useScrollTrigger,
  Button,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Waitlist from "../forms/Waitlist";

/* ----------------------------- Styled ----------------------------- */
const GlassBar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  background: "transparent",
  boxShadow: "none",
  transition: "background-color 220ms ease, box-shadow 220ms ease",
  "&.elevated": {
    background: `linear-gradient(180deg, ${alpha("#0a0a0a", 0.78)}, ${alpha("#0a0a0a", 0.64)})`,
    backdropFilter: "saturate(140%) blur(10px)",
    WebkitBackdropFilter: "saturate(140%) blur(10px)",
    boxShadow: `0 10px 30px ${alpha("#000", 0.45)}`,
    borderBottom: `1px solid ${alpha("#fff", 0.08)}`,
  },
}));

const Wrap = styled(Toolbar)(({ theme }) => ({
  minHeight: 72,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: "max(env(safe-area-inset-top, 0px), 0px)",
  [theme.breakpoints.up("sm")]: { minHeight: 76, paddingLeft: 3, paddingRight: 3 },
  [theme.breakpoints.up("md")]: { minHeight: 80, paddingLeft: 4, paddingRight: 4, paddingTop: 0 },
  position: "relative",
}));

/* Equal edge padding (slightly increased) for logo and right-side area */
const EdgeSlot = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingInline: theme.spacing(1.25),
  [theme.breakpoints.up("sm")]: { paddingInline: theme.spacing(1.5) },
  [theme.breakpoints.up("md")]: { paddingInline: theme.spacing(1.75) },
}));

/* Right-aligned desktop nav (now a normal flex row) */
const CenterRail = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: theme.spacing(1.75),
  paddingInline: theme.spacing(1),
  whiteSpace: "nowrap",
  [theme.breakpoints.up("md")]: { display: "flex" },
}));

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
  transition: "transform 160ms ease, color 160ms ease",
  "&:hover": { transform: "translateY(-1px)" },
  "&::after": {
    content: '""',
    position: "absolute",
    left: "10%",
    right: "10%",
    bottom: 6,
    height: 3,
    borderRadius: 2,
    transform: "scaleX(0)",
    transformOrigin: "center",
    background: alpha("#ffd15b", 0.95),
    transition: "transform 220ms ease",
  },
  "&:hover::after": { transform: "scaleX(1)" },
  "&.active": { color: "#fff" },
  "&.active::after": { transform: "scaleX(1)" },
}));

const LogoLink = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  textDecoration: "none",
});

const Burger = styled("span")(({ theme }) => ({
  position: "relative",
  width: 24,
  height: 2,
  borderRadius: 2,
  background: alpha("#fff", 0.95),
  display: "block",
  transition: "background 180ms ease",
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    left: 0,
    width: 24,
    height: 2,
    borderRadius: 2,
    background: alpha("#fff", 0.95),
    transition: "transform 220ms ease, opacity 220ms ease",
  },
  "&::before": { top: -7 },
  "&::after": { top: 7 },
}));
const BurgerWrap = styled(Box)(({ theme }) => ({
  "&.open span": { background: "transparent" },
  "&.open span::before": { transform: "translateY(7px) rotate(45deg)" },
  "&.open span::after": { transform: "translateY(-7px) rotate(-45deg)" },
}));

const DrawerShell = styled(Box)(({ theme }) => ({
  width: "min(86vw, 420px)",
  background: "linear-gradient(180deg, rgba(14,15,17,.95), rgba(14,15,17,.9))",
  color: alpha("#fff", 0.92),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  paddingTop: "max(env(safe-area-inset-top, 0px), 12px)",
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
}));

const DrawerLogo = styled("img")(({ theme }) => ({
  height: 44,
  width: "auto",
  display: "block",
}));

const DrawerList = styled(List)(({ theme }) => ({
  padding: theme.spacing(1, 1),
  "& .MuiListItemButton-root": {
    borderRadius: 12,
    margin: theme.spacing(0.5, 0),
    padding: theme.spacing(1.25, 1.5),
    "&.active": {
      background: alpha("#ffffff", 0.06),
      boxShadow: `inset 0 0 0 1px ${alpha("#fff", 0.06)}`,
    },
  },
  "& .MuiListItemText-primary": {
    fontSize: 18,
    letterSpacing: 0.2,
  },
}));

function useElevateOnScroll() {
  return useScrollTrigger({ disableHysteresis: true, threshold: 8 });
}

/* Desktop CTA */
const WaitlistCta = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 800,
  letterSpacing: "0.02em",
  borderRadius: 999,
  paddingInline: theme.spacing(2.25),
  paddingBlock: theme.spacing(1.1),
  color: "#0e0f11",
  backgroundColor: "#f2c230",
  boxShadow: `0 10px 28px ${alpha("#f2c230", 0.35)}`,
  "&:hover": {
    backgroundColor: "#ffd24a",
    boxShadow: `0 12px 32px ${alpha("#ffd24a", 0.45)}`,
    transform: "translateY(-1px)",
  },
  transition: "all .2s ease",
}));

/* ------------------------------ Component ------------------------------ */
export default function TopbarResponsiveNav({
  logoSrc = "/alt-logo.png",
  logoAlt = "TX Laser Tag",
  links = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Events", to: "/events" },
    { label: "Experience", to: "/experience" },
  ],
  onJoinWaitlist,
  appBarProps,
}) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const scrolled = useElevateOnScroll();

  const [open, setOpen] = React.useState(false);
  const toggle = (val) => () => setOpen(val);

  // Internal waitlist state (used if onJoinWaitlist isn't passed)
  const [waitlistOpen, setWaitlistOpen] = React.useState(false);
  const handleJoinClick = () => {
    if (onJoinWaitlist) onJoinWaitlist();
    else setWaitlistOpen(true);
  };
  const handleWaitlistClose = () => setWaitlistOpen(false);
  const handleWaitlistSubmit = async (data) => {
    console.log("Topbar waitlist submission:", data);
    setWaitlistOpen(false);
  };

  const activeCheck = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <GlassBar position="fixed" className={scrolled ? "elevated" : ""} {...appBarProps}>
        <Wrap disableGutters>
          {/* Left: Logo */}
          <EdgeSlot>
            <LogoLink component={RouterLink} to="/" aria-label="Go to homepage">
              <Box
                component="img"
                src={logoSrc}
                alt={logoAlt}
                sx={{
                  height: { xs: 56, sm: 68, md: 88 },
                  width: "auto",
                  display: "block",
                  objectFit: "contain",
                  filter: "drop-shadow(0 2px 6px rgba(0,0,0,.35))",
                }}
              />
            </LogoLink>
          </EdgeSlot>

          {/* Spacer pushes everything after this to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop nav now right-aligned, sitting next to the CTA */}
          <CenterRail aria-label="Primary navigation (desktop)" role="navigation">
            {links.map((link) => {
              const active = activeCheck(link.to);
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

          {/* Right side: CTA (desktop) or hamburger (mobile) */}
          {isMobile ? (
            <EdgeSlot>
              <IconButton
                aria-label={open ? "Close menu" : "Open menu"}
                edge="end"
                onClick={toggle(!open)}
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "12px",
                  backgroundColor: alpha("#fff", 0.06),
                  border: `1px solid ${alpha("#fff", 0.08)}`,
                  backdropFilter: "saturate(140%) blur(6px)",
                  WebkitBackdropFilter: "saturate(140%) blur(6px)",
                  "&:hover": { backgroundColor: alpha("#fff", 0.1) },
                }}
              >
                <BurgerWrap className={open ? "open" : ""}>
                  <Burger />
                </BurgerWrap>
              </IconButton>
            </EdgeSlot>
          ) : (
            <EdgeSlot sx={{ ml: 1.5 }}>
              <WaitlistCta onClick={handleJoinClick} aria-label="Join waitlist">
                Join VIP Access List
              </WaitlistCta>
            </EdgeSlot>
          )}
        </Wrap>
      </GlassBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggle(false)}
        PaperProps={{
          sx: {
            background: "transparent",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        <DrawerShell role="dialog" aria-label="Mobile navigation">
          <DrawerHeader>
            <DrawerLogo src={logoSrc} alt={logoAlt} />
            <IconButton
              aria-label="Close menu"
              onClick={toggle(false)}
              sx={{
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: alpha("#fff", 0.06),
                border: `1px solid ${alpha("#fff", 0.08)}`,
                "&:hover": { backgroundColor: alpha("#fff", 0.1) },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: 18,
                  height: 18,
                  "&::before, &::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    width: 18,
                    height: 2,
                    borderRadius: 2,
                    background: alpha("#fff", 0.95),
                  },
                  "&:before": { transform: "translateY(-50%) rotate(45deg)" },
                  "&:after": { transform: "translateY(-50%) rotate(-45deg)" },
                }}
              />
            </IconButton>
          </DrawerHeader>

          <Divider sx={{ opacity: 0.1, borderColor: alpha("#fff", 0.2) }} />

          <DrawerList component="nav" aria-label="Primary navigation (mobile)">
            {links.map(({ label, to }) => {
              const active = activeCheck(to);
              return (
                <ListItemButton
                  key={to}
                  component={RouterLink}
                  to={to}
                  onClick={toggle(false)}
                  className={active ? "active" : undefined}
                  aria-current={active ? "page" : undefined}
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              );
            })}
          </DrawerList>

          {/* Waitlist shortcut in the drawer */}
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                toggle(false)();
                handleJoinClick();
              }}
              sx={{
                textTransform: "none",
                fontWeight: 800,
                borderRadius: 2,
                backgroundColor: "#f2c230",
                color: "#0e0f11",
                "&:hover": { backgroundColor: "#ffd24a" },
              }}
            >
              Join waitlist
            </Button>
          </Box>

          <Box sx={{ mt: "auto", p: 2, opacity: 0.7, fontSize: 12 }}>
            © {new Date().getFullYear()} {logoAlt}
          </Box>
        </DrawerShell>
      </Drawer>

      {/* Embedded Waitlist form (used if no onJoinWaitlist prop is provided) */}
      {!onJoinWaitlist && (
        <Waitlist
          open={waitlistOpen}
          onClose={handleWaitlistClose}
          onSubmit={handleWaitlistSubmit}
        />
      )}
    </>
  );
}
