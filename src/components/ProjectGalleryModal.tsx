import React, { useState, useEffect } from 'react';
import { Project } from '../types/portfolio';
import { X, ChevronLeft, ChevronRight, ExternalLink, Check, Maximize2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectGalleryModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<number, boolean>>({});

  // Reset states when opening a different project
  useEffect(() => {
    setCurrentImageIndex(0);
    setIsLightboxOpen(false);
    setImageErrorMap({});
  }, [project]);

  const images = project?.images || [];
  const validImages = images.filter((_, idx) => !imageErrorMap[idx]);
  const hasImages = validImages.length > 0;
  const hasMultipleImages = validImages.length > 1;

  // Handle ESC key and arrow keys
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight' && hasMultipleImages) {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, isLightboxOpen, hasMultipleImages, images.length]);

  if (!project) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleImageError = (index: number) => {
    setImageErrorMap((prev) => ({ ...prev, [index]: true }));
  };

  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim() !== '' && project.liveUrl !== '#');

  return (
    <>
      {/* 1. PROJECT DETAILS MODAL */}
      <div
        className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-gallery-modal-title"
      >
        <div
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#121522] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Sticky Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 dark:bg-[#121522]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="text-[11px] font-mono-code uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-semibold mb-0.5">
                Project Details
              </div>
              <h2 id="project-gallery-modal-title" className="text-xl sm:text-2xl font-bold font-heading text-slate-900 dark:text-white">
                {project.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 space-y-8">
            
            {/* LARGE PROJECT IMAGE / GALLERY */}
            {hasImages ? (
              <div className="rounded-2xl bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-md">
                
                {/* Main Large Carousel Viewport (Clickable for Fullscreen Lightbox) */}
                <div 
                  className="relative aspect-16/10 w-full overflow-hidden flex items-center justify-center bg-slate-950 cursor-zoom-in group"
                  onClick={() => setIsLightboxOpen(true)}
                  title="Click to view full-screen"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={images[currentImageIndex]}
                      alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                      onError={() => handleImageError(currentImageIndex)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full h-full object-contain"
                    />
                  </AnimatePresence>

                  {/* Previous / Next Navigation Arrows */}
                  {hasMultipleImages && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous screenshot"
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md shadow-lg border border-white/10 transition-all cursor-pointer hover:scale-105"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next screenshot"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md shadow-lg border border-white/10 transition-all cursor-pointer hover:scale-105"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Image Counter Badge */}
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-slate-950/80 text-white text-xs font-mono-code backdrop-blur-md border border-white/10">
                        {currentImageIndex + 1} / {images.length}
                      </div>
                    </>
                  )}

                  {/* Fullscreen Zoom Hint */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-slate-950/80 text-white text-xs font-medium backdrop-blur-md border border-white/10 flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Click to enlarge</span>
                  </div>
                </div>

                {/* Thumbnails Row Underneath */}
                {hasMultipleImages && (
                  <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2.5 overflow-x-auto">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentImageIndex(idx)}
                        aria-label={`View screenshot ${idx + 1}`}
                        className={`relative shrink-0 w-16 h-11 sm:w-20 sm:h-13 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          currentImageIndex === idx
                            ? 'border-indigo-500 scale-105 opacity-100 ring-2 ring-indigo-500/40'
                            : 'border-transparent opacity-60 hover:opacity-90'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${project.title} thumbnail ${idx + 1}`}
                          onError={() => handleImageError(idx)}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Clean, Non-Technical State when images are not yet provided */
              <div className="flex flex-col items-center justify-center p-12 aspect-16/10 w-full rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center select-none">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  Screenshots coming soon
                </h4>
              </div>
            )}

            {/* PROJECT DESCRIPTION */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-mono-code">
                Project Overview
              </h3>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            {/* KEY FEATURES */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 font-mono-code">
                  Key Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* TECHNOLOGIES USED */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 font-mono-code">
                Technologies Used
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                {project.technologies.map((tech, idx) => (
                  <span key={tech} className="inline-flex items-center gap-3">
                    <span className="font-mono-code font-medium">{tech}</span>
                    {idx < project.technologies.length - 1 && (
                      <span className="text-slate-300 dark:text-slate-600">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* LIVE PROJECT BUTTON (Rendered ONLY if a real URL is provided) */}
            {hasLiveUrl && (
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live deployed project for ${project.title} in a new tab`}
                  className="inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                >
                  <span>Live Project</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <span className="text-xs text-slate-400 font-mono-code">
                  Opens in a new tab
                </span>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* 2. FULL-SCREEN IMAGE VIEWER / LIGHTBOX */}
      <AnimatePresence>
        {isLightboxOpen && hasImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-lg"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Top Lightbox Header */}
            <div 
              className="flex items-center justify-between text-white pb-3 border-b border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="font-heading font-semibold text-sm sm:text-base text-white">
                  {project.title}
                </span>
                {hasMultipleImages && (
                  <span className="text-xs text-white/60 font-mono-code">
                    ({currentImageIndex + 1} of {images.length})
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close full-screen image viewer"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Central Lightbox Image View */}
            <div 
              className="relative my-auto flex items-center justify-center w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[currentImageIndex]}
                alt={`${project.title} full-screen screenshot`}
                className="max-h-[78vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
              />

              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous screenshot in viewer"
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-xl transition-all cursor-pointer hover:scale-105"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next screenshot in viewer"
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 shadow-xl transition-all cursor-pointer hover:scale-105"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            {hasMultipleImages && (
              <div 
                className="flex items-center justify-center gap-2 pt-3 border-t border-white/10 overflow-x-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-14 h-9 sm:w-16 sm:h-10 rounded-md overflow-hidden border-2 transition-all cursor-pointer ${
                      currentImageIndex === idx
                        ? 'border-indigo-500 scale-105 ring-2 ring-indigo-500/50'
                        : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
