import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ProjectGalleryModal } from './ProjectGalleryModal';
import { ArrowUpRight, Check, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/40 dark:bg-[#0E1017]/40">
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
            04 · Selected Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-heading">
            Full-Stack Applications & Systems
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Real-world applications engineered with modern frontend frameworks, scalable backends, database integration, and clean code.
          </p>
        </motion.div>

        {/* Projects Grid: 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onViewProject={() => handleOpenProject(project)}
            />
          ))}
        </div>

      </div>

      {/* Dedicated Project Details & Image Gallery Modal */}
      <ProjectGalleryModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewProject: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onViewProject }) => {
  const [isHovered, setIsHovered] = useState(false);
  const images = project.images || [];
  const hasImages = images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-[#121522] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-indigo-500/40 dark:hover:border-indigo-500/30 transition-all duration-300 overflow-hidden"
    >
      <div>
        {/* Project Preview Area */}
        <div 
          onClick={onViewProject}
          className="relative w-full overflow-hidden bg-slate-900 border-b border-slate-200 dark:border-slate-800 cursor-pointer"
        >
          {/* Top Browser / Window Frame Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-[#0B0D13] border-b border-slate-200/80 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 dark:bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 dark:bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500/80 inline-block" />
            </div>

            <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white dark:bg-[#161922] border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-mono-code max-w-[200px] truncate">
              <span>{project.id}.app</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-mono-code text-indigo-500 font-medium">
              <span>{hasImages ? `Gallery (${images.length})` : 'Showcase'}</span>
            </div>
          </div>

          {/* Main Visual Screen */}
          <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100 dark:bg-[#0D1017]">
            {hasImages ? (
              <img
                src={images[0]}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              // Clean, non-technical placeholder when screenshots are not yet added
              <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-100 dark:bg-slate-900/60 text-slate-500 select-none">
                <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 flex items-center justify-center mb-2.5">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Screenshots coming soon
                </span>
              </div>
            )}

            {/* Hover Actions Overlay */}
            <div 
              className={`absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-200 flex flex-col items-center justify-center p-6 text-center ${
                isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <h4 className="text-white font-heading font-bold text-lg mb-2">
                {project.title}
              </h4>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-md">
                <span>View Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>

          </div>
        </div>

        {/* Project Information */}
        <div className="p-6 sm:p-8">
          
          <h3 
            onClick={onViewProject}
            className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white mb-2.5 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 font-mono-code">
                Key Features
              </div>
              <ul className="space-y-2">
                {project.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies Used */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 mb-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-mono-code">
              Technologies Used
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {project.technologies.map((tech, tIdx) => (
                <span key={tech} className="inline-flex items-center gap-2">
                  <span className="font-mono-code font-medium">{tech}</span>
                  {tIdx < project.technologies.length - 1 && (
                    <span className="text-slate-300 dark:text-slate-700 font-bold">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ONLY ONE MAIN BUTTON: "View Project" */}
      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
        <button
          type="button"
          onClick={onViewProject}
          aria-label={`View project details for ${project.title}`}
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-500 text-xs sm:text-sm font-semibold transition-all duration-150 shadow-xs cursor-pointer hover:shadow"
        >
          <span>View Project</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

    </motion.div>
  );
};
