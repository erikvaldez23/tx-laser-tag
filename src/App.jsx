import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider, Box } from "@mui/material";
import "./App.css";

// Key Components
import Topbar from "./components/key-components/Topbar"
import Footer from "./components/key-components/Footer";

// Landing Page
import Hero from "./components/landing/Hero";
import Intro from "./components/landing/Intro";
import About from "./components/landing/About";
import Offer from "./components/landing/Offer";
import Apply from "./components/landing/Apply";

// Sub Pages
import AboutPage from "./components/sub-pages/about/About";
import EventsPage from "./components/sub-pages/events/Events"
import ExperiencePage from "./components/sub-pages/experience/Experience"

const theme = createTheme({
  palette: {
    primary: { main: "#f2c230" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{  background: `
  /* soft neutral sheen */
  radial-gradient(1200px 700px at 78% 22%, #ffffff12 0%, #ffffff00 60%),
  radial-gradient(900px 600px at 18% 82%, #ffffff0e 0%, #ffffff00 55%),
  linear-gradient(125deg, #ffffff14 0%, #ffffff00 36%, #ffffff12 68%, #ffffff08 100%),

  /* ✨ subtle yellow accents (ffd24a) */
  radial-gradient(900px 650px at 68% 28%, rgba(255,210,74,0.055) 0%, rgba(255,210,74,0.00) 55%),
  radial-gradient(700px 520px at 22% 78%, rgba(255,210,74,0.045) 0%, rgba(255,210,74,0.00) 60%),
  linear-gradient(100deg, rgba(255,210,74,0.035) 0%, rgba(255,210,74,0.00) 35%, rgba(255,210,74,0.05) 60%, rgba(255,210,74,0.00) 100%),

  /* structural greys */
  radial-gradient(1100px 900px at 64% 40%, #282f38 0%, transparent 62%),
  radial-gradient(950px 820px at 30% 72%, #21262d 0%, transparent 60%),
  linear-gradient(180deg, #1a1d21 0%, #141619 100%)`
}}>
      <Router>
        {/* <ScrollToTop behavior="auto" /> */}
        <Topbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
              <Hero />
              <Intro />
              <About />
              <Offer />
              <Apply />
                {/* <HeroClark />
                <Quote />
                <Events2 />
                <ImpactPillars />
                <CTA /> */}
              </>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
        </Routes>
        <Footer />
      </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
