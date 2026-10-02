import React from 'react';
import { experienceData } from '../data/portfolioData';
import { CheckCircle2, Building2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 font-mono-code">
            05 · Experience & Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
            Professional Experience & Hands-On Engineering
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Real-world full-stack development and database engineering experience building production systems and relational database solutions.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 border-l border-slate-200 dark:border-slate-800 space-y-12 max-w-4xl">
          {experienceData.map((item, index) => {
            const isPrimary = item.isPrimary;

            return (
              <motion.div 
                key={item.company} 
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                
                {/* Timeline Indicator Dot */}
                <div 
                  className={`absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 rounded-full border-2 transition-transform duration-200 group-hover:scale-125 ${
                    isPrimary 
                      ? 'bg-indigo-600 dark:bg-indigo-500 border-white dark:border-[#0B0D13] ring-4 ring-indigo-500/20' 
                      : 'bg-white dark:bg-[#0B0D13] border-slate-400 dark:border-slate-600'
                  }`} 
                />

                {/* Card Container - Cognoscent is visually prominent */}
                <div 
                  className={`p-6 sm:p-8 rounded-2xl transition-all duration-200 ${
                    isPrimary
                      ? 'bg-white dark:bg-[#121522] border-2 border-indigo-500/40 dark:border-indigo-500/35 shadow-lg shadow-indigo-500/5 ring-1 ring-indigo-500/20'
                      : 'bg-white dark:bg-[#121520] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  
                  {/* Top Meta Row: Company Name, Role Type & Duration */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${isPrimary ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                        {item.company}
                      </span>
                      {isPrimary && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold font-mono-code border border-indigo-200 dark:border-indigo-900/60">
                          <Sparkles className="w-3 h-3" />
                          <span>Primary Role</span>
                        </span>
                      )}
                      {!isPrimary && item.type && (
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-semibold font-mono-code border border-slate-200 dark:border-slate-700">
                          {item.type}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-lg text-xs font-mono-code font-bold ${
                        isPrimary
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {item.period}
                      </span>
                    </div>
                  </div>

                  {/* Role Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-heading mb-2">
                    {item.role}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>

                  {/* Key Areas of Focus */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 font-mono-code">
                      Key Areas of Focus
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {item.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isPrimary ? 'text-indigo-600 dark:text-indigo-400' : 'text-emerald-500'}`} />
                          <span className="font-medium">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
