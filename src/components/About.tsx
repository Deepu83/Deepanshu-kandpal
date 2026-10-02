import React from 'react';
import { aboutContent, personalInfo } from '../data/portfolioData';
import { CheckCircle2, Code, Layers, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80 relative">
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
            01 · About Me
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
            Engineering solid software, communicating with precision.
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Bio narrative */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed"
          >
            <p className="font-medium text-slate-800 dark:text-slate-200 text-lg sm:text-xl leading-relaxed">
              {aboutContent.lead}
            </p>
            {aboutContent.paragraphs.map((para, index) => (
              <p key={index} className="text-slate-600 dark:text-slate-400">
                {para}
              </p>
            ))}

            {/* Quick Principles */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-1.5 text-sm">
                  <Code className="w-4 h-4 text-indigo-500" />
                  <span>Full-Stack Discipline</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Clean frontend components backed by structured REST endpoints, database schemas, and clean state.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white mb-1.5 text-sm">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span>Content Accuracy</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Technical copy, blogs, and documentation written from an engineer's perspective, optimized for SEO.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => scrollTo('#services')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer"
              >
                <span>Explore my core services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Right: Profile snapshot & stats */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#11141E] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              
              {/* Compact portrait avatar */}
              <div className="flex items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <img
                  src={personalInfo.profileImage}
                  alt="Deepanshu Kandpal Profile"
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover object-top border-2 border-indigo-500 shadow-xs"
                />
                <div>
                  <h3 className="font-heading font-bold text-slate-900 dark:text-white text-base">
                    {personalInfo.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {personalInfo.title}
                  </p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {personalInfo.location}
                  </p>
                </div>
              </div>

              {/* Core Strengths Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Key Capabilities
                </h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Responsive React & Next.js user interfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Node.js / Express backend REST APIs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>MongoDB & SQL database modeling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>SEO-driven tech articles and conversion copy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Modern styling with Tailwind CSS & animations</span>
                  </li>
                </ul>
              </div>

              {/* Status footer inside card */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Working hours: Flexible</span>
                <span className="text-emerald-500 font-medium">Fast Turnaround</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
