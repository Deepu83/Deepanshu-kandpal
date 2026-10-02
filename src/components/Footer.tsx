import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Content Writing', href: '#content-writing' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0D13] py-12 md:py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-slate-200 dark:border-slate-800">
          
          {/* Brand & Identity */}
          <div className="space-y-1">
            <span className="font-heading font-bold text-lg tracking-tight text-slate-900 dark:text-white select-none">
              {personalInfo.name}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {personalInfo.title}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Deepanshu Kandpal GitHub"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Deepanshu Kandpal LinkedIn"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email Deepanshu Kandpal"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Secondary Navigation Row */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="font-mono-code text-[11px]">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
