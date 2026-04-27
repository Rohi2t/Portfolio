import { useState, useEffect, useCallback } from 'react';
import Preloader from './sections/Preloader';
import Header from './sections/Header';
import Footer from './sections/Footer';
import Menu from './sections/Menu';
import Hero from './sections/Hero';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Education from './sections/Education';
import Contact from './sections/Contact';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [loaded]);

  return (
    <div className="bg-base min-h-screen">
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}

      <Header />
      <Footer />

      {/* Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed bottom-[40px] right-[40px] z-[70] w-14 h-14 rounded-full bg-elevated border border-[#333] flex items-center justify-center font-mono text-[0.65rem] text-text-primary hover:border-accent hover:text-accent transition-colors duration-300"
      >
        {menuOpen ? 'CLOSE' : 'MENU'}
      </button>

      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main>
        <div id="hero">
          <Hero />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="education">
          <Education />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App;
