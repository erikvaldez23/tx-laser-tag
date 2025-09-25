import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
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
    primary: { main: "#339c5e" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
