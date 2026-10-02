import React from 'react';
import { servicesData } from '../data/portfolioData';
import { Code2, PenTool, Check, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServicesProps {
  onSelectService?: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const handleDiscuss = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0E1017]/60">
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
            02 · Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
            Dual-threat expertise: Full-Stack Code & High-Impact Writing
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Whether you need a full-scale web application from scratch or crisp content that explains your value, I deliver production-ready outcomes.
          </p>
        </motion.div>

        {/* Two Main Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {servicesData.map((service, index) => {
            const isWebDev = service.id === 'web-dev';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-slate-800/90 shadow-sm hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-300"
              >
                <div>
                  {/* Service Icon & Label */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/60 shadow-xs">
                      {isWebDev ? <Code2 className="w-6 h-6" /> : <PenTool className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-mono-code text-slate-400 dark:text-slate-500">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Service Title & Subtitle */}
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                    {service.description}
                  </p>

                  {/* Bullet points breakdown */}
                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 mb-8">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-4">
                      What I Deliver
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {service.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div>
                  <button
                    type="button"
                    onClick={() => handleDiscuss(service.title)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white text-sm font-semibold transition-all duration-150 cursor-pointer shadow-xs group-hover:bg-indigo-600 dark:group-hover:bg-indigo-600"
                  >
                    <span>Discuss Your Project</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
