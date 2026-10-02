import React from 'react';
import { ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const CtaSection: React.FC = () => {
  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 ambient-glow opacity-80 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
      >
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Ready for your next challenge</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading mb-6" style={{ textWrap: 'balance' }}>
          Have an idea? <span className="text-indigo-600 dark:text-indigo-400">Let's build it.</span>
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-normal">
          Whether you need a website, web application or high-quality content, let's discuss your project.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={scrollToContact}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-sm border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow transition-all duration-150 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-indigo-500" />
            <span>Contact Me</span>
          </button>
        </div>

      </motion.div>
    </section>
  );
};
