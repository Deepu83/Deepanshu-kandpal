import React from 'react';
import { processSteps } from '../data/portfolioData';
import { motion } from 'framer-motion';

export const Process: React.FC = () => {
  return (
    <section className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0E1017]/60">
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
            08 · Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
            A Transparent 4-Step Process
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            From initial concept to deployment, every stage is structured to eliminate friction and ensure quality.
          </p>
        </motion.div>

        {/* 4 Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Step Number */}
                <div className="text-3xl sm:text-4xl font-extrabold font-heading text-indigo-600 dark:text-indigo-400 mb-4 font-mono-code">
                  {step.number}
                </div>

                <div className="text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300 font-semibold mb-1">
                  {step.tagline}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading mb-3">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Progress Line */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
                <span>Phase {step.number}</span>
                <span className="w-8 h-0.5 bg-indigo-500/40 rounded-full"></span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

