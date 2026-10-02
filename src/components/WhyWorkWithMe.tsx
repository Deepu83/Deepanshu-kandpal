import React from 'react';
import { whyWorkWithMeData } from '../data/portfolioData';
import { Layout, Cpu, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhyWorkWithMe: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'layout':
        return <Layout className="w-6 h-6 text-indigo-500" />;
      case 'cpu':
        return <Cpu className="w-6 h-6 text-emerald-500" />;
      case 'message-square':
        return <MessageSquare className="w-6 h-6 text-amber-500" />;
      case 'clock':
        return <Clock className="w-6 h-6 text-cyan-500" />;
      default:
        return <Layout className="w-6 h-6 text-indigo-500" />;
    }
  };

  return (
    <section className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80">
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
            07 · Collaboration Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
            Why Work With Me
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            A reliable partner committed to practical software craftsmanship, clear communication, and straightforward execution.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyWorkWithMeData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-slate-800 shadow-xs hover:border-indigo-400/50 dark:hover:border-indigo-500/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center mb-6">
                  {getIcon(item.icon)}
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-300 font-mono-code">
                Principle 0{index + 1}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

