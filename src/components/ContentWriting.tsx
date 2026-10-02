import React from 'react';
import { writingServices, sampleArticle } from '../data/portfolioData';
import { BookOpen, Sparkles, ArrowRight, FileCheck, Search, Send, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export const ContentWriting: React.FC = () => {
  const getServiceIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Search className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 1:
        return <Compass className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 2:
        return <FileCheck className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 3:
        return <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 4:
        return <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      default:
        return <Send className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
    }
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="content-writing" 
      className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80 bg-[#F9F8F5] dark:bg-[#0D0F14] relative transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2 font-mono-code">
            06 · Editorial & Copywriting
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white font-serif">
            Words That Help Businesses Get Noticed.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-serif italic">
            Technical clarity meets high-retention storytelling. I write content designed to educate customers, rank on search engines, and drive conversions.
          </p>
        </motion.div>

        {/* 2-Column Split: Services Grid (Left) + Sample Writing Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: 6 Writing Services (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {writingServices.map((service, index) => (
              <div
                key={service.title}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#141720] border border-[#E7E2D8] dark:border-slate-800/90 shadow-xs hover:border-amber-400/60 dark:hover:border-amber-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
                    {getServiceIcon(index)}
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right Column: Sample Writing Showcase Card (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="h-full relative rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#141720] border border-amber-500/30 dark:border-amber-500/20 shadow-md flex flex-col justify-between">
              
              <div>
                {/* Header tag */}
                <div className="text-xs font-mono-code uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-4 font-semibold pb-3 border-b border-[#EBE6DC] dark:border-slate-800">
                  Featured Writing Sample
                </div>

                {/* Sample Headline */}
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white leading-snug">
                    "{sampleArticle.title}"
                  </h3>
                </div>

                {/* Excerpt quote */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#0E1118] border-l-4 border-amber-500 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-serif leading-relaxed mb-6">
                  "{sampleArticle.excerpt}"
                </div>

                <div className="space-y-2 mb-6 text-xs text-slate-500 dark:text-slate-400">
                  <p className="flex items-center gap-2">
                    <span className="text-amber-500 font-bold">✓</span>
                    <span>Accurate technical terminology with zero fluff</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-amber-500 font-bold">✓</span>
                    <span>Structured for SEO visibility and user readability</span>
                  </p>
                </div>
              </div>

              {/* Direct CTA button to Contact section - No popup */}
              <div>
                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-amber-600 dark:hover:bg-amber-500 text-xs sm:text-sm font-semibold transition-all duration-150 shadow-xs cursor-pointer"
                >
                  <span>Discuss Content Writing</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <div className="mt-3 text-center">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    Blogs · Landing Page Copy · Technical Guides
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
