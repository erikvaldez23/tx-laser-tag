import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Typography, Paper, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const SectionWrap = styled(Box)({
  width: "100%",
  background: "transparent",
  color: "#eee",
  paddingBlock: 48,
});

const GroupTitle = (props) => (
  <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5 }} {...props} />
);

const Grid3 = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  [theme.breakpoints.down("md")]: { gridTemplateColumns: "repeat(2, 1fr)" },
  [theme.breakpoints.down("sm")]: { gridTemplateColumns: "1fr" },
}));

const ScrollRow = styled(Box)(({ theme }) => ({
  "--gap": theme.spacing(2),
  position: "relative",
  display: "grid",
  gridAutoFlow: "column",
  gap: "var(--gap)",
  overflowX: "auto",
  paddingBottom: theme.spacing(1),
  scrollSnapType: "x mandatory",
  scrollPadding: "var(--gap)",
  WebkitOverflowScrolling: "touch",
  overscrollBehaviorX: "contain",
  gridAutoColumns: "calc((100% - (var(--gap) * 2)) / 3.05)",
  [theme.breakpoints.down("md")]: {
    gridAutoColumns: "calc((100% - var(--gap)) / 2.1)",
  },
  [theme.breakpoints.down("sm")]: {
    gridAutoColumns: "88%",
    scrollSnapType: "x proximity",
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": { display: "none" },
}));

const OverlayBar = styled("div")({
  pointerEvents: "none",
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 6,
});
const OverlayTrack = styled("div")(({ visible }) => ({
  position: "relative",
  height: 6,
  width: "100%",
  borderRadius: 999,
  background: "transparent",
  transition: "opacity 220ms ease",
  opacity: visible ? 1 : 0,
}));
const OverlayThumb = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  height: 6,
  borderRadius: 999,
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.85))",
  boxShadow: "0 0.5px 0 rgba(0,0,0,0.35) inset, 0 2px 6px rgba(0,0,0,0.25)",
});

const Tile = styled(Paper)(({ theme }) => ({
  position: "relative",
  borderRadius: 10,
  background: "#8d8d8d",
  boxShadow: "none",
  overflow: "hidden",
  display: "grid",
  placeItems: "center",
  aspectRatio: "16 / 10",
  color: alpha("#000", 0.65),
  fontSize: 12,
  userSelect: "none",
}));

const Caption = (props) => (
  <Typography
    variant="caption"
    sx={{ display: "block", mt: 0.75, color: alpha("#fff", 0.9) }}
    {...props}
  />
);

const Cta = styled(Button)({
  alignSelf: "center",
  borderRadius: 999,
  textTransform: "none",
  fontWeight: 700,
  padding: "8px 16px",
  backgroundColor: "#c6a045",
  color: "#1a1a1a",
  boxShadow: "none",
  "&:hover": { backgroundColor: "#af8e3e", boxShadow: "none" },
});

const DATA_DEFAULT = [
  {
    id: "youth",
    title: "Youth events",
    items: [
      { id: "scouts", label: "Scouts", image: "" },
      { id: "church", label: "Church Youth Groups", image: "" },
      { id: "camps", label: "Summer Camps", image: "" },
    ],
  },
  {
    id: "adult",
    title: "Adult Social Groups",
    items: [
      { id: "singles", label: "Singles Meet Ups", image: "" },
      { id: "parents", label: "Parent Groups", image: "" },
      { id: "retirement", label: "Retirement Outing", image: "" },
      { id: "seniors", label: "Senior Clubs", image: "" },
    ],
  },
  {
    id: "school",
    title: "School Organizations",
    items: [
      { id: "jrotc", label: "JROTC", image: "" },
      { id: "fieldtrips", label: "Field Trips", image: "" },
      { id: "athletics", label: "Athletic Teams", image: "" },
      { id: "clubs", label: "Clubs", image: "" },
    ],
  },
  {
    id: "corporate",
    title: "Corporate Events",
    items: [
      { id: "team", label: "Team Building", image: "" },
      { id: "fundraisers", label: "Fundraisers", image: "" },
      { id: "fundraisers", label: "Fundraisers", image: "" },
    ],
  },
];

function CarouselGroupRow({ items, onTileClick }) {
  const ref = useRef(null);
  const [thumb, setThumb] = useState({ widthPct: 0, leftPct: 0 });
  const [visible, setVisible] = useState(false);
  const hideTimer = useRef(null);

  const updateThumb = () => {
    const el = ref.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const widthPct = Math.max((clientWidth / scrollWidth) * 100, 8);
    const maxLeft = 100 - widthPct;
    const leftPct =
      scrollWidth > clientWidth
        ? Math.min((scrollLeft / (scrollWidth - clientWidth)) * maxLeft, maxLeft)
        : 0;
    setThumb({ widthPct, leftPct });
  };

  const showThenFade = () => {
    setVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), 900);
  };

  useEffect(() => {
    updateThumb();
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      updateThumb();
      showThenFade();
    };
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(updateThumb);
    ro.observe(el);

    showThenFade();

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <Box position="relative">
      <ScrollRow ref={ref} aria-label="carousel">
        {items.map((it) => (
          <Box key={it.id} sx={{ minWidth: 0 }}>
            <Tile role="button" tabIndex={0} onClick={() => onTileClick?.(it)}>
              [Image placeholder]
            </Tile>
            <Caption>{it.label}</Caption>
          </Box>
        ))}
      </ScrollRow>

      <OverlayBar aria-hidden>
        <OverlayTrack visible={visible}>
          <OverlayThumb
            style={{ width: `${thumb.widthPct}%`, left: `${thumb.leftPct}%` }}
          />
        </OverlayTrack>
      </OverlayBar>
    </Box>
  );
}

export default function EventGroups({
  groups = DATA_DEFAULT,
  onTileClick,     
  onContactClick,  
}) {
  return (
    <SectionWrap>
      <Container maxWidth="xl">
        {groups.map((group) => {
          const isCarousel = group.id === "adult" || group.id === "school";
          return (
            <Box key={group.id} sx={{ mb: 4 }}>
              <GroupTitle>{group.title}</GroupTitle>

              {isCarousel ? (
                <CarouselGroupRow
                  items={group.items}
                  onTileClick={(item) => onTileClick?.(group.id, item)}
                />
              ) : (
                <Grid3>
                  {group.items.map((it) => (
                    <Box key={it.id}>
                      <Tile
                        role="button"
                        tabIndex={0}
                        onClick={() => onTileClick?.(group.id, it)}
                      >
                        [Image placeholder]
                      </Tile>
                      <Caption>{it.label}</Caption>
                    </Box>
                  ))}
                </Grid3>
              )}
            </Box>
          );
        })}

        <Box sx={{ display: "grid", placeItems: "center", mt: 2 }}>
          <Cta onClick={onContactClick}>Contact us to book</Cta>
        </Box>
      </Container>
    </SectionWrap>
  );
}
