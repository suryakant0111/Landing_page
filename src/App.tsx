import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import VideoSection from './components/VideoSection';
import ManufacturePage from './components/ManufacturePage';
import ClickSpark from './components/ui/ClickSpark';
import ContactSection from './components/ContactSection';
import ScrollToTopButton from './components/ScrollToTopButton';

// Wrapper to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Animation variants for page transitions
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
    },
  },
};

// Animation component for page transitions
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="initial"
    animate="enter"
    exit="exit"
    variants={pageVariants}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen">
      <ClickSpark
        sparkColor="#000"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <>
                <PageTransition>
                  <HeroSection />
                  <VideoSection />
                  <AboutSection />
                </PageTransition>
                <PageTransition>
                  <ManufacturePage />
                </PageTransition>
                <PageTransition>
                  <ContactSection />
                </PageTransition>
                <ScrollToTopButton />
              </>
            }
          />
          {/* Add more routes as needed */}
        </Routes>
      </AnimatePresence>
    </div>
  );
}

// Wrap App with Router
function Root() {
  return (
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  );
}

export default Root;
