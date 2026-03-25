import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Overview from './sections/Overview';
import Method from './sections/Method';
import Architecture from './sections/Architecture';
import Experiments from './sections/Experiments';
import Footer from './sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize smooth scroll behavior
    const ctx = gsap.context(() => {
      // Refresh ScrollTrigger on load
      ScrollTrigger.refresh();
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Overview />
        <Method />
        <Architecture />
        <Experiments />
      </main>
      <Footer />
    </div>
  );
}

export default App;
