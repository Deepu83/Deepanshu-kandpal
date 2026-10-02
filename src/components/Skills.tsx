import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';
import { 
  Code, 
  Server, 
  Database, 
  Wrench, 
  Sparkles, 
  Terminal, 
  Cpu, 
  CheckCircle, 
  Layers 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredCategories = activeTab === 'all' 
    ? skillsData 
    : skillsData.filter((cat) => cat.id === activeTab);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'frontend':
        return <Code className="w-5 h-5 text-indigo-500" />;
      case 'backend':
        return <Server className="w-5 h-5 text-emerald-500" />;
      case 'database':
        return <Database className="w-5 h-5 text-amber-500" />;
      case 'tools':
        return <Wrench className="w-5 h-5 text-purple-500" />;
      default:
        return <Layers className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2 font-mono-code">
              03 · Technical Stack
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
              Categorized Skills & Tooling
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              A comprehensive view of the tools, languages, and frameworks I use to build scalable web applications.
            </p>
          </div>

          {/* Interactive Category Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Skills
            </button>
            {skillsData.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  activeTab === cat.id
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-slate-800/90 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                    {getCategoryIcon(category.id)}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  {category.description}
                </p>

                {/* Skills List */}
                <div className="space-y-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-colors"
                    >
                      <span className="font-medium text-xs sm:text-sm text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {skill.name}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-indigo-500 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom pill-free metadata */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400 font-mono-code">
                {category.skills.length} core technologies
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
