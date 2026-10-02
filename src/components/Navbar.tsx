import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Content Writing', href: '#content-writing' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#0B0D13]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 shadow-xs'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Scroll Progress Bar at very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Pure text-based wordmark brand */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, '#home')}
          className="group text-base sm:text-lg font-bold font-heading tracking-tight text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 select-none"
          aria-label="Deepanshu Kandpal - Home"
        >
          <span>Deepanshu Kandpal</span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"
          aria-label="Primary Navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`px-3 py-1.5 rounded-md text-xs xl:text-sm transition-all duration-150 whitespace-nowrap ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50/70 dark:bg-indigo-950/40'
                    : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Actions - Theme Toggle, CTA, Mobile Menu Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* CTA Button */}
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500 dark:text-white transition-all duration-150 shadow-xs hover:shadow cursor-pointer whitespace-nowrap"
          >
            <span>Let's Work Together</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation overlay / drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-[#0E1118]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in fade-in duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 mt-2">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-xs"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
