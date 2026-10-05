
import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { ProjectGalleryModal } from './ProjectGalleryModal';
import { ArrowUpRight, Check, Image as ImageIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

/** Features shown on the card. The full list is always available in the modal. */
const MAX_CARD_FEATURES = 3;

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="projects"
      className="border-t border-slate-200/80 bg-slate-50/40 py-14 dark:border-slate-800/80 dark:bg-[#0E1017]/40 sm:py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-3xl sm:mb-14 lg:mb-16"
        >
          <div className="mb-2 font-mono-code text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            04 · Selected Works
          </div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 dark:text-white min-[400px]:text-3xl sm:text-4xl">
            Full-Stack Applications & Systems
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 sm:mt-4 sm:text-base lg:text-lg">
            Real-world applications engineered with modern frontend frameworks, scalable backends, database
            integration, and clean code.
          </p>
        </motion.div>

        {/* Projects Grid: 1 column until lg, then 2 */}
        <div className="grid grid-cols-1 items-stretch gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-10">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              reduceMotion={Boolean(reduceMotion)}
              onViewProject={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectGalleryModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  reduceMotion: boolean;
  onViewProject: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, reduceMotion, onViewProject }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const images = project.images || [];
  const coverSrc = images[0];
  const showCover = Boolean(coverSrc) && !imageFailed;

  const features = project.features ?? [];
  const visibleFeatures = features.slice(0, MAX_CARD_FEATURES);
  const hiddenCount = features.length - visibleFeatures.length;

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group/card flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-indigo-500/40 hover:shadow-xl dark:border-slate-800 dark:bg-[#121522] dark:hover:border-indigo-500/30 sm:rounded-3xl"
    >
      {/* Preview — one real button, so it's keyboard and screen-reader friendly */}
      <button
        type="button"
        onClick={onViewProject}
        aria-label={`Open ${project.title} gallery and details`}
        className="group/preview relative block w-full cursor-pointer overflow-hidden border-b border-slate-200 bg-slate-900 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-800"
      >
        {/* Browser-style frame bar */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 bg-slate-100 px-3 py-2 text-xs dark:border-slate-800 dark:bg-[#0B0D13] sm:gap-3 sm:px-4 sm:py-2.5">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-400 dark:bg-rose-500/80" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400 dark:bg-amber-500/80" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 dark:bg-emerald-500/80" />
          </div>

          <div className="min-w-0 max-w-[200px] flex-1 truncate rounded-md border border-slate-200 bg-white px-3 py-0.5 text-center font-mono-code text-[11px] text-slate-500 dark:border-slate-800 dark:bg-[#161922] dark:text-slate-400">
            {project.id}.app
          </div>

          <div className="hidden shrink-0 font-mono-code text-[11px] font-medium text-indigo-500 min-[380px]:block">
            {images.length > 0 ? `Gallery (${images.length})` : 'Showcase'}
          </div>
        </div>

        {/* Screen */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-[#0D1017] md:aspect-[2/1] lg:aspect-[16/10]">
          {showCover ? (
            <img
              src={coverSrc}
              alt=""
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/preview:scale-105 motion-reduce:transition-none motion-reduce:group-hover/preview:scale-100"
            />
          ) : (
            <div className="flex h-full w-full select-none flex-col items-center justify-center bg-slate-100 p-6 text-slate-500 dark:bg-slate-900/60 sm:p-8">
              <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500 dark:bg-indigo-950/60">
                <ImageIcon className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Screenshots coming soon
              </span>
            </div>
          )}

          {/* Hover / keyboard-focus overlay (hidden on touch, where the button below does the job) */}
          <div className="pointer-events-none absolute inset-0 hidden flex-col items-center justify-center bg-slate-950/70 p-6 text-center opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover/preview:opacity-100 group-focus-visible/preview:opacity-100 [@media(hover:hover)]:flex">
            <h4 className="mb-2 font-heading text-lg font-bold text-white">{project.title}</h4>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md">
              <span>View Project</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </button>

      {/* Info */}
      <div className="flex flex-1 flex-col p-5 sm:p-7 lg:p-8">
        <h3 className="mb-2 font-heading text-lg font-bold leading-snug text-slate-900 dark:text-white min-[400px]:text-xl sm:text-2xl">
          <button
            type="button"
            onClick={onViewProject}
            className="cursor-pointer text-left transition-colors hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:hover:text-indigo-400"
          >
            {project.title}
          </button>
        </h3>

        <p className="mb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:mb-6">
          {project.description}
        </p>

        {visibleFeatures.length > 0 && (
          <div className="mb-5 sm:mb-6">
            <div className="mb-2.5 font-mono-code text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Key Features
            </div>
            <ul className="space-y-2">
              {visibleFeatures.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="min-w-0">{feature}</span>
                </li>
              ))}
            </ul>
            {hiddenCount > 0 && (
              <button
                type="button"
                onClick={onViewProject}
                className="mt-2.5 cursor-pointer pl-7 text-xs font-medium text-indigo-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-indigo-400"
              >
                +{hiddenCount} more in details
              </button>
            )}
          </div>
        )}

        {/* Technologies */}
        <div className="mb-6 border-t border-slate-100 pt-4 dark:border-slate-800/80">
          <div className="mb-2.5 font-mono-code text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Technologies Used
          </div>
          <ul className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono-code text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Single primary action, pinned to the bottom so cards line up */}
        <button
          type="button"
          onClick={onViewProject}
          aria-label={`View project details for ${project.title}`}
          className="mt-auto inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-slate-800 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500"
        >
          <span>View Project</span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </motion.article>
  );
};