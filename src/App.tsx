import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { ContentWriting } from './components/ContentWriting';
import { WhyWorkWithMe } from './components/WhyWorkWithMe';
import { Process } from './components/Process';
import { CtaSection } from './components/CtaSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

function PortfolioApp() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedService, setSelectedService] = useState('Web Development');

  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'services',
      'skills',
      'projects',
      'experience',
      'content-writing',
      'contact',
    ];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the entry with the highest intersection ratio or topmost visible
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        // Sort by bounding client top nearest to 0
        visibleEntries.sort(
          (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
        );
        setActiveSection(visibleEntries[0].target.id);
      }
    };

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0, 0.2, 0.5],
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleSelectService = (serviceTitle: string) => {
    if (serviceTitle.toLowerCase().includes('content')) {
      setSelectedService('Content Writing');
    } else {
      setSelectedService('Web Development');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0B0D13] text-slate-800 dark:text-slate-100 transition-colors duration-300">
      <Navbar activeSection={activeSection} />
      
      <main className="flex-1">
        <Hero />
        <About />
        <Services onSelectService={handleSelectService} />
        <Skills />
        <Projects />
        <Experience />
        <ContentWriting />
        <WhyWorkWithMe />
        <Process />
        <CtaSection />
        <Contact initialProjectType={selectedService} />
      </main>

      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
