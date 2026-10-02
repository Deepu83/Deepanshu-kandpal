import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Code2, Database, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 ambient-glow pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, copy, buttons, badges (7 cols on lg) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            
            {/* Status indicator */}
            <div className="inline-flex items-center gap-2 mb-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Deepanshu Kandpal</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">Full-Stack Developer & Content Writer</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6 font-heading" style={{ textWrap: 'balance' }}>
              Building Digital Experiences <span className="text-indigo-600 dark:text-indigo-400">That Work.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
              {personalInfo.heroSubheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <button
                type="button"
                onClick={() => scrollTo('#projects')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-sm border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow transition-all duration-150 cursor-pointer"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4 text-indigo-500" />
              </button>
            </div>

            {/* Trust / Skill Badges per prompt: MERN Stack, React, Node.js, MongoDB, Python, AI */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3">
                Core Specializations
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {personalInfo.trustBadges.map((badge) => (
                  <div
                    key={badge.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors"
                  >
                    {badge.name === 'MERN Stack' && <Terminal className="w-3.5 h-3.5 text-indigo-500" />}
                    {badge.name === 'React' && <Code2 className="w-3.5 h-3.5 text-cyan-500" />}
                    {badge.name === 'Node.js' && <Cpu className="w-3.5 h-3.5 text-emerald-500" />}
                    {badge.name === 'MongoDB' && <Database className="w-3.5 h-3.5 text-green-500" />}
                    {badge.name === 'Python' && <Code2 className="w-3.5 h-3.5 text-amber-500" />}
                    {badge.name === 'AI' && <Sparkles className="w-3.5 h-3.5 text-purple-500" />}
                    <span>{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Deepanshu's Profile Photo Presentation (5 cols on lg) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer decorative backdrop border and ambient lighting */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-md opacity-80" />

              {/* Main portrait frame container */}
              <div className="relative rounded-3xl p-3 sm:p-4 bg-white/80 dark:bg-[#12151E]/90 border border-slate-200/80 dark:border-slate-800 shadow-2xl backdrop-blur-xs">
                
                {/* Photo image element */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/40 dark:border-slate-700/50 group">
                  <img
                    src={personalInfo.profileImage}
                    alt="Deepanshu Kandpal - Full-Stack Developer & Content Writer"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="eager"
                  />
                  
                  {/* Subtle vignette/contrast scrim at bottom for text overlay legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* On-image badge overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white px-3 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10">
                    <div>
                      <p className="font-semibold text-xs tracking-tight text-white">Deepanshu Kandpal</p>
                      <p className="text-[11px] text-slate-300">Full-Stack Dev & Writer</p>
                    </div>
                    <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Open for Work
                    </span>
                  </div>
                </div>

                {/* Developer snippet underneath image */}
                <div className="mt-3 px-2 py-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono-code">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    <span>dk_portfolio.tsx</span>
                  </span>
                  <span>v2026.1</span>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
