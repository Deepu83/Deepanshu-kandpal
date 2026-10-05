
// import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
// import { Project } from '../types/portfolio';
// import { X, ChevronLeft, ChevronRight, ExternalLink, Check, Maximize2, Image as ImageIcon } from 'lucide-react';
// import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// interface ProjectGalleryModalProps {
//   project: Project | null;
//   onClose: () => void;
// }

// const SWIPE_THRESHOLD = 50;

// /** Centers the active thumbnail inside its scroll strip without scrolling the page. */
// const centerThumb = (strip: HTMLDivElement | null, index: number, smooth: boolean) => {
//   const thumb = strip?.children[index] as HTMLElement | undefined;
//   if (!strip || !thumb) return;
//   const left = thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2;
//   strip.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
// };

// export const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({ project, onClose }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLightboxOpen, setIsLightboxOpen] = useState(false);
//   // Keyed by image URL (not index) so a broken image never shifts the others.
//   const [failed, setFailed] = useState<Record<string, boolean>>({});
//   const [loaded, setLoaded] = useState<Record<string, boolean>>({});

//   const reduceMotion = useReducedMotion();
//   const touchStartX = useRef<number | null>(null);
//   const stripRef = useRef<HTMLDivElement>(null);
//   const lightboxStripRef = useRef<HTMLDivElement>(null);
//   const closeBtnRef = useRef<HTMLButtonElement>(null);

//   // Reset when a different project is opened
//   useEffect(() => {
//     setCurrentImageIndex(0);
//     setIsLightboxOpen(false);
//     setFailed({});
//     setLoaded({});
//   }, [project]);

//   // Only images that haven't errored are shown, so indexes always line up.
//   const gallery = useMemo(
//     () => (project?.images ?? []).filter((src) => !failed[src]),
//     [project, failed]
//   );
//   const total = gallery.length;
//   const hasImages = total > 0;
//   const hasMultipleImages = total > 1;
//   const activeIndex = Math.min(currentImageIndex, Math.max(total - 1, 0));
//   const activeSrc = gallery[activeIndex];

//   const goPrev = useCallback(
//     () => setCurrentImageIndex((i) => (Math.min(i, total - 1) <= 0 ? total - 1 : Math.min(i, total - 1) - 1)),
//     [total]
//   );
//   const goNext = useCallback(
//     () => setCurrentImageIndex((i) => (Math.min(i, total - 1) >= total - 1 ? 0 : Math.min(i, total - 1) + 1)),
//     [total]
//   );

//   // Keyboard + scroll lock
//   useEffect(() => {
//     if (!project) return;

//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         if (isLightboxOpen) setIsLightboxOpen(false);
//         else onClose();
//       } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
//         goPrev();
//       } else if (e.key === 'ArrowRight' && hasMultipleImages) {
//         goNext();
//       }
//     };

//     const previousOverflow = document.body.style.overflow;
//     document.body.style.overflow = 'hidden';
//     window.addEventListener('keydown', handleKeyDown);
//     closeBtnRef.current?.focus({ preventScroll: true });

//     return () => {
//       document.body.style.overflow = previousOverflow;
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [project, onClose, isLightboxOpen, hasMultipleImages, goPrev, goNext]);

//   // Keep the active thumbnail in view
//   useEffect(() => {
//     centerThumb(stripRef.current, activeIndex, !reduceMotion);
//     centerThumb(lightboxStripRef.current, activeIndex, !reduceMotion);
//   }, [activeIndex, isLightboxOpen, total, reduceMotion]);

//   if (!project) return null;

//   const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim() !== '' && project.liveUrl !== '#');
//   const hasFeatures = Boolean(project.features && project.features.length > 0);

//   const markFailed = (src: string) => setFailed((prev) => ({ ...prev, [src]: true }));
//   const markLoaded = (src: string) => setLoaded((prev) => (prev[src] ? prev : { ...prev, [src]: true }));

//   // Cached images can finish before React attaches onLoad
//   const imgRef = (src: string) => (el: HTMLImageElement | null) => {
//     if (el && el.complete && el.naturalWidth > 0 && !loaded[src]) markLoaded(src);
//   };

//   const swipeHandlers = {
//     onTouchStart: (e: React.TouchEvent) => {
//       touchStartX.current = e.touches[0].clientX;
//     },
//     onTouchEnd: (e: React.TouchEvent) => {
//       if (touchStartX.current === null || !hasMultipleImages) return;
//       const delta = e.changedTouches[0].clientX - touchStartX.current;
//       touchStartX.current = null;
//       if (Math.abs(delta) < SWIPE_THRESHOLD) return;
//       if (delta > 0) goPrev();
//       else goNext();
//     },
//   };

//   const stop = (e: React.SyntheticEvent) => e.stopPropagation();

//   return (
//     <>
//       {/* 1. PROJECT DETAILS MODAL — bottom sheet on mobile, centered dialog on larger screens */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: reduceMotion ? 0 : 0.2 }}
//         className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/70 backdrop-blur-sm sm:items-center sm:p-6"
//         onClick={onClose}
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="project-gallery-modal-title"
//       >
//         <motion.div
//           initial={reduceMotion ? false : { opacity: 0, y: 32 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ type: 'spring', damping: 28, stiffness: 320 }}
//           onClick={stop}
//           className="relative flex max-h-[94dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#121522] sm:max-h-[90dvh] sm:max-w-5xl sm:rounded-3xl"
//         >
//           {/* Header */}
//           <div className="relative z-20 shrink-0 border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-[#121522]/95">
//             {/* Grab handle (mobile only) */}
//             <div className="flex justify-center pt-2.5 sm:hidden" aria-hidden="true">
//               <span className="h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-700" />
//             </div>

//             {/* <div className="flex items-start justify-between gap-4 px-4 pb-3.5 pt-2.5 sm:px-7 sm:py-5">
//              */}
//              <div className="flex items-center justify-between gap-4 px-4 pb-3.5 pt-2.5 sm:px-7 sm:py-5">
//               <div className="min-w-0">
//                 <div className="mb-0.5 font-mono-code text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
//                   Project Details
//                 </div>
//                 <h2
//                   id="project-gallery-modal-title"
//                   className="font-heading text-lg font-bold leading-tight text-slate-900 dark:text-white sm:text-2xl"
//                 >
//                   {project.title}
//                 </h2>
//               </div>
// <button
//   ref={closeBtnRef}
//   type="button"
//   onClick={onClose}
//   aria-label="Close project details"
//   className="relative z-50 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white dark:focus:ring-offset-[#121522]"
// >
//   <X
//     className="h-5 w-5"
//     strokeWidth={2.5}
//     aria-hidden="true"
//   />
// </button>
//               {/* <button
//                 ref={closeBtnRef}
//                 type="button"
//                 onClick={onClose}
//                 aria-label="Close project details"
//                 className="shrink-0 cursor-pointer rounded-xl bg-slate-100 p-2.5 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
//               >
//                 <X className="h-5 w-5" />
//               </button> */}
//             </div>
//           </div>

//           {/* Scrollable body */}
//           <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
//             <div className="grid gap-6 p-4 sm:gap-8 sm:p-7 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-10">
//               {/* GALLERY */}
//               <div className="min-w-0 lg:sticky lg:top-0 lg:self-start">
//                 {hasImages ? (
//                   <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-lg shadow-slate-900/10 dark:border-slate-800">
//                     {/* Main viewport */}
//                     <div
//                       className="group relative flex aspect-[4/3] w-full cursor-zoom-in items-center justify-center overflow-hidden bg-slate-950 sm:aspect-[16/10]"
//                       onClick={() => setIsLightboxOpen(true)}
//                       title="Click to view full-screen"
//                       {...swipeHandlers}
//                     >
//                       {/* Loading shimmer */}
//                       {!loaded[activeSrc] && (
//                         <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
//                       )}

//                       <motion.img
//                         key={activeSrc}
//                         ref={imgRef(activeSrc)}
//                         src={activeSrc}
//                         alt={`${project.title} screenshot ${activeIndex + 1}`}
//                         onLoad={() => markLoaded(activeSrc)}
//                         onError={() => markFailed(activeSrc)}
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: loaded[activeSrc] ? 1 : 0 }}
//                         transition={{ duration: reduceMotion ? 0 : 0.25 }}
//                         draggable={false}
//                         className="relative h-full w-full select-none object-contain"
//                       />

//                       {hasMultipleImages && (
//                         <>
//                           <button
//                             type="button"
//                             onClick={(e) => {
//                               stop(e);
//                               goPrev();
//                             }}
//                             aria-label="Previous screenshot"
//                             className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/10 bg-slate-900/70 p-2 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-indigo-400 sm:left-3 sm:p-2.5 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
//                           >
//                             <ChevronLeft className="h-5 w-5" />
//                           </button>
//                           <button
//                             type="button"
//                             onClick={(e) => {
//                               stop(e);
//                               goNext();
//                             }}
//                             aria-label="Next screenshot"
//                             className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/10 bg-slate-900/70 p-2 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-indigo-400 sm:right-3 sm:p-2.5 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
//                           >
//                             <ChevronRight className="h-5 w-5" />
//                           </button>
//                         </>
//                       )}

//                       {/* Overlay chips */}
//                       <div className="pointer-events-none absolute inset-x-2.5 bottom-2.5 flex items-end justify-between sm:inset-x-3 sm:bottom-3">
//                         <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-950/75 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
//                           <Maximize2 className="h-3.5 w-3.5" />
//                           <span className="hidden sm:inline">Click to enlarge</span>
//                           <span className="sm:hidden">Tap to enlarge</span>
//                         </div>
//                         {hasMultipleImages && (
//                           <div className="rounded-lg border border-white/10 bg-slate-950/75 px-2.5 py-1 font-mono-code text-xs text-white backdrop-blur-md">
//                             {activeIndex + 1} / {total}
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Thumbnails */}
//                     {hasMultipleImages && (
//                       <div
//                         ref={stripRef}
//                         className="flex items-center gap-2 overflow-x-auto border-t border-slate-800 bg-slate-900/90 p-2.5 [scrollbar-width:none] sm:gap-2.5 sm:p-3 [&::-webkit-scrollbar]:hidden"
//                       >
//                         {gallery.map((img, idx) => (
//                           <button
//                             key={img}
//                             type="button"
//                             onClick={() => setCurrentImageIndex(idx)}
//                             aria-label={`View screenshot ${idx + 1}`}
//                             aria-current={activeIndex === idx}
//                             className={`relative h-11 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all focus-visible:outline-2 focus-visible:outline-indigo-400 sm:h-12 sm:w-[4.5rem] ${
//                               activeIndex === idx
//                                 ? 'border-indigo-500 opacity-100 ring-2 ring-indigo-500/40'
//                                 : 'border-transparent opacity-55 hover:opacity-90'
//                             }`}
//                           >
//                             <img
//                               src={img}
//                               alt=""
//                               loading="lazy"
//                               onError={() => markFailed(img)}
//                               className="h-full w-full object-cover"
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <div className="flex aspect-[4/3] w-full select-none flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900/60 sm:aspect-[16/10]">
//                     <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
//                       <ImageIcon className="h-6 w-6" />
//                     </div>
//                     <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">
//                       Screenshots coming soon
//                     </h4>
//                   </div>
//                 )}
//               </div>

//               {/* DETAILS */}
//               <div className="min-w-0 space-y-6 sm:space-y-7">
//                 <section>
//                   <h3 className="mb-2 font-mono-code text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                     Project Overview
//                   </h3>
//                   <p className="text-sm font-normal leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
//                     {project.description}
//                   </p>
//                 </section>

//                 {hasFeatures && (
//                   <section>
//                     <h3 className="mb-3 font-mono-code text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                       Key Features
//                     </h3>
//                     <ul className="space-y-2.5">
//                       {project.features!.map((feature, idx) => (
//                         <li
//                           key={idx}
//                           className="flex items-start gap-3 text-sm leading-snug text-slate-700 dark:text-slate-300"
//                         >
//                           <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
//                             <Check className="h-3.5 w-3.5" strokeWidth={3} />
//                           </span>
//                           <span>{feature}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </section>
//                 )}

//                 <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60 sm:p-5">
//                   <h3 className="mb-3 font-mono-code text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
//                     Technologies Used
//                   </h3>
//                   <ul className="flex flex-wrap gap-2">
//                     {project.technologies.map((tech) => (
//                       <li
//                         key={tech}
//                         className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono-code text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
//                       >
//                         {tech}
//                       </li>
//                     ))}
//                   </ul>
//                 </section>
//               </div>
//             </div>
//           </div>

//           {/* Footer CTA — only when a real URL exists */}
//           {hasLiveUrl && (
//             <div className="shrink-0 border-t border-slate-200 bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md dark:border-slate-800 dark:bg-[#121522]/95 sm:px-7 sm:py-4">
//               <div className="flex items-center justify-between gap-4">
//                 <span className="hidden font-mono-code text-xs text-slate-400 sm:inline">Opens in a new tab</span>
//                 <a
//                   href={project.liveUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={`Open live deployed project for ${project.title} in a new tab`}
//                   className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:w-auto"
//                 >
//                   <span>Live Project</span>
//                   <ExternalLink className="h-4 w-4" />
//                 </a>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       </motion.div>

//       {/* 2. FULL-SCREEN IMAGE VIEWER / LIGHTBOX */}
//       <AnimatePresence>
//         {isLightboxOpen && hasImages && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: reduceMotion ? 0 : 0.2 }}
//             className="fixed inset-0 z-50 flex h-dvh flex-col bg-black/95 backdrop-blur-lg"
//             onClick={() => setIsLightboxOpen(false)}
//             role="dialog"
//             aria-modal="true"
//             aria-label={`${project.title} screenshots`}
//           >
//             {/* Header */}
//             <div
//               className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-white sm:px-6"
//               onClick={stop}
//             >
//               <div className="flex min-w-0 items-baseline gap-3">
//                 <span className="truncate font-heading text-sm font-semibold sm:text-base">{project.title}</span>
//                 {hasMultipleImages && (
//                   <span className="shrink-0 font-mono-code text-xs text-white/60">
//                     {activeIndex + 1} of {total}
//                   </span>
//                 )}
//               </div>

//               <button
//                 type="button"
//                 onClick={() => setIsLightboxOpen(false)}
//                 aria-label="Close full-screen image viewer"
//                 className="shrink-0 cursor-pointer rounded-xl bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-indigo-400"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>

//             {/* Image area — fills remaining space, tapping empty space closes */}
//             <div
//               className="relative flex min-h-0 flex-1 items-center justify-center p-3 sm:p-6"
//               onClick={() => setIsLightboxOpen(false)}
//               {...swipeHandlers}
//             >
//               <motion.img
//                 key={activeSrc}
//                 src={activeSrc}
//                 alt={`${project.title} full-screen screenshot ${activeIndex + 1}`}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: reduceMotion ? 0 : 0.2 }}
//                 draggable={false}
//                 onClick={stop}
//                 className="max-h-full max-w-full select-none rounded-lg object-contain shadow-2xl"
//               />

//               {hasMultipleImages && (
//                 <>
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       stop(e);
//                       goPrev();
//                     }}
//                     aria-label="Previous screenshot in viewer"
//                     className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/20 bg-black/60 p-2.5 text-white shadow-xl transition hover:scale-105 hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-indigo-400 sm:left-5 sm:p-3"
//                   >
//                     <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       stop(e);
//                       goNext();
//                     }}
//                     aria-label="Next screenshot in viewer"
//                     className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/20 bg-black/60 p-2.5 text-white shadow-xl transition hover:scale-105 hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-indigo-400 sm:right-5 sm:p-3"
//                   >
//                     <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Thumbnail strip */}
//             {hasMultipleImages && (
//               <div
//                 ref={lightboxStripRef}
//                 className="flex shrink-0 items-center gap-2 overflow-x-auto border-t border-white/10 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center"
//                 onClick={stop}
//               >
//                 {gallery.map((img, idx) => (
//                   <button
//                     key={img}
//                     type="button"
//                     onClick={() => setCurrentImageIndex(idx)}
//                     aria-label={`View screenshot ${idx + 1}`}
//                     aria-current={activeIndex === idx}
//                     className={`h-9 w-14 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-all focus-visible:outline-2 focus-visible:outline-indigo-400 sm:h-10 sm:w-16 ${
//                       activeIndex === idx
//                         ? 'border-indigo-500 opacity-100 ring-2 ring-indigo-500/50'
//                         : 'border-transparent opacity-50 hover:opacity-80'
//                     }`}
//                   >
//                     <img src={img} alt="" className="h-full w-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Project } from '../types/portfolio';
import { X, ChevronLeft, ChevronRight, ExternalLink, Check, Maximize2, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface ProjectGalleryModalProps {
  project: Project | null;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 50;

/** Centers the active thumbnail inside its scroll strip without scrolling the page. */
const centerThumb = (strip: HTMLDivElement | null, index: number, smooth: boolean) => {
  const thumb = strip?.children[index] as HTMLElement | undefined;
  if (!strip || !thumb) return;
  const left = thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2;
  strip.scrollTo({ left, behavior: smooth ? 'smooth' : 'auto' });
};

export const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({ project, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  // Keyed by image URL (not index) so a broken image never shifts the others.
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});

  const reduceMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const lightboxStripRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Reset when a different project is opened
  useEffect(() => {
    setCurrentImageIndex(0);
    setIsLightboxOpen(false);
    setFailed({});
    setLoaded({});
  }, [project]);

  // Only images that haven't errored are shown, so indexes always line up.
  const gallery = useMemo(
    () => (project?.images ?? []).filter((src) => !failed[src]),
    [project, failed]
  );
  const total = gallery.length;
  const hasImages = total > 0;
  const hasMultipleImages = total > 1;
  const activeIndex = Math.min(currentImageIndex, Math.max(total - 1, 0));
  const activeSrc = gallery[activeIndex];

  const goPrev = useCallback(
    () => setCurrentImageIndex((i) => (Math.min(i, total - 1) <= 0 ? total - 1 : Math.min(i, total - 1) - 1)),
    [total]
  );
  const goNext = useCallback(
    () => setCurrentImageIndex((i) => (Math.min(i, total - 1) >= total - 1 ? 0 : Math.min(i, total - 1) + 1)),
    [total]
  );

  // Keyboard + scroll lock
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) setIsLightboxOpen(false);
        else onClose();
      } else if (e.key === 'ArrowLeft' && hasMultipleImages) {
        goPrev();
      } else if (e.key === 'ArrowRight' && hasMultipleImages) {
        goNext();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeBtnRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, isLightboxOpen, hasMultipleImages, goPrev, goNext]);

  // Keep the active thumbnail in view
  useEffect(() => {
    centerThumb(stripRef.current, activeIndex, !reduceMotion);
    centerThumb(lightboxStripRef.current, activeIndex, !reduceMotion);
  }, [activeIndex, isLightboxOpen, total, reduceMotion]);

  if (!project || typeof document === 'undefined') return null;

  const hasLiveUrl = Boolean(project.liveUrl && project.liveUrl.trim() !== '' && project.liveUrl !== '#');
  const hasFeatures = Boolean(project.features && project.features.length > 0);

  const markFailed = (src: string) => setFailed((prev) => ({ ...prev, [src]: true }));
  const markLoaded = (src: string) => setLoaded((prev) => (prev[src] ? prev : { ...prev, [src]: true }));

  // Cached images can finish before React attaches onLoad
  const imgRef = (src: string) => (el: HTMLImageElement | null) => {
    if (el && el.complete && el.naturalWidth > 0 && !loaded[src]) markLoaded(src);
  };

  const swipeHandlers = {
    onTouchStart: (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchStartX.current === null || !hasMultipleImages) return;
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      if (delta > 0) goPrev();
      else goNext();
    },
  };

  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  const content = (
    <>
      {/* 1. PROJECT DETAILS MODAL — bottom sheet on mobile, centered dialog on larger screens */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
        className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/70 backdrop-blur-sm sm:items-center sm:p-6"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-gallery-modal-title"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          onClick={stop}
          className="relative mt-4 flex max-h-[calc(100dvh-1rem)] w-full flex-col overflow-hidden rounded-t-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#121522] sm:mt-0 sm:max-h-[calc(100dvh-3rem)] sm:max-w-5xl sm:rounded-3xl"
        >
          {/* Header */}
          <div className="relative z-20 shrink-0 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-[#121522]">
            {/* Grab handle (mobile only) */}
            <div className="flex justify-center pt-2.5 sm:hidden" aria-hidden="true">
              <span className="h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>

            <div className="flex items-center justify-between gap-4 px-4 pb-3.5 pt-2.5 sm:px-7 sm:py-5">
              <div className="min-w-0">
                <div className="mb-0.5 font-mono-code text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Project Details
                </div>
                <h2
                  id="project-gallery-modal-title"
                  className="font-heading text-lg font-bold leading-tight text-slate-900 dark:text-white sm:text-2xl"
                >
                  {project.title}
                </h2>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600 shadow-sm transition-all duration-200 hover:scale-105 hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white dark:focus-visible:ring-offset-[#121522]"
              >
                <X className="h-5 w-5" strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <div className="grid gap-6 p-4 sm:gap-8 sm:p-7 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-10">
              {/* GALLERY */}
              <div className="min-w-0 lg:sticky lg:top-0 lg:self-start">
                {hasImages ? (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-lg shadow-slate-900/10 dark:border-slate-800">
                    {/* Main viewport */}
                    <div
                      className="group relative flex aspect-[4/3] w-full cursor-zoom-in items-center justify-center overflow-hidden bg-slate-950 sm:aspect-[16/10]"
                      onClick={() => setIsLightboxOpen(true)}
                      title="Click to view full-screen"
                      {...swipeHandlers}
                    >
                      {/* Loading shimmer */}
                      {!loaded[activeSrc] && (
                        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
                      )}

                      <motion.img
                        key={activeSrc}
                        ref={imgRef(activeSrc)}
                        src={activeSrc}
                        alt={`${project.title} screenshot ${activeIndex + 1}`}
                        onLoad={() => markLoaded(activeSrc)}
                        onError={() => markFailed(activeSrc)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: loaded[activeSrc] ? 1 : 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.25 }}
                        draggable={false}
                        className="relative h-full w-full select-none object-contain"
                      />

                      {hasMultipleImages && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              stop(e);
                              goPrev();
                            }}
                            aria-label="Previous screenshot"
                            className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/10 bg-slate-900/70 p-2 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-indigo-400 sm:left-3 sm:p-2.5 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              stop(e);
                              goNext();
                            }}
                            aria-label="Next screenshot"
                            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/10 bg-slate-900/70 p-2 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-indigo-400 sm:right-3 sm:p-2.5 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                        </>
                      )}

                      {/* Overlay chips */}
                      <div className="pointer-events-none absolute inset-x-2.5 bottom-2.5 flex items-end justify-between sm:inset-x-3 sm:bottom-3">
                        <div className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-slate-950/75 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md">
                          <Maximize2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Click to enlarge</span>
                          <span className="sm:hidden">Tap to enlarge</span>
                        </div>
                        {hasMultipleImages && (
                          <div className="rounded-lg border border-white/10 bg-slate-950/75 px-2.5 py-1 font-mono-code text-xs text-white backdrop-blur-md">
                            {activeIndex + 1} / {total}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Thumbnails */}
                    {hasMultipleImages && (
                      <div
                        ref={stripRef}
                        className="flex items-center gap-2 overflow-x-auto border-t border-slate-800 bg-slate-900/90 p-2.5 [scrollbar-width:none] sm:gap-2.5 sm:p-3 [&::-webkit-scrollbar]:hidden"
                      >
                        {gallery.map((img, idx) => (
                          <button
                            key={img}
                            type="button"
                            onClick={() => setCurrentImageIndex(idx)}
                            aria-label={`View screenshot ${idx + 1}`}
                            aria-current={activeIndex === idx}
                            className={`relative h-11 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all focus-visible:outline-2 focus-visible:outline-indigo-400 sm:h-12 sm:w-[4.5rem] ${
                              activeIndex === idx
                                ? 'border-indigo-500 opacity-100 ring-2 ring-indigo-500/40'
                                : 'border-transparent opacity-55 hover:opacity-90'
                            }`}
                          >
                            <img
                              src={img}
                              alt=""
                              loading="lazy"
                              onError={() => markFailed(img)}
                              className="h-full w-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] w-full select-none flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900/60 sm:aspect-[16/10]">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                      Screenshots coming soon
                    </h4>
                  </div>
                )}
              </div>

              {/* DETAILS */}
              <div className="min-w-0 space-y-6 sm:space-y-7">
                <section>
                  <h3 className="mb-2 font-mono-code text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Project Overview
                  </h3>
                  <p className="text-sm font-normal leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
                    {project.description}
                  </p>
                </section>

                {hasFeatures && (
                  <section>
                    <h3 className="mb-3 font-mono-code text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Key Features
                    </h3>
                    <ul className="space-y-2.5">
                      {project.features!.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm leading-snug text-slate-700 dark:text-slate-300"
                        >
                          <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/60 sm:p-5">
                  <h3 className="mb-3 font-mono-code text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Technologies Used
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 font-mono-code text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>

          {/* Footer CTA — only when a real URL exists */}
          {hasLiveUrl && (
            <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] dark:border-slate-800 dark:bg-[#121522] sm:px-7 sm:py-4">
              <div className="flex items-center justify-between gap-4">
                <span className="hidden font-mono-code text-xs text-slate-400 sm:inline">Opens in a new tab</span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live deployed project for ${project.title} in a new tab`}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/25 transition-colors hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:w-auto"
                >
                  <span>Live Project</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* 2. FULL-SCREEN IMAGE VIEWER / LIGHTBOX */}
      <AnimatePresence>
        {isLightboxOpen && hasImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-[110] flex h-dvh flex-col bg-black/95 backdrop-blur-lg"
            onClick={() => setIsLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} screenshots`}
          >
            {/* Header */}
            <div
              className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] text-white sm:px-6"
              onClick={stop}
            >
              <div className="flex min-w-0 items-baseline gap-3">
                <span className="truncate font-heading text-sm font-semibold sm:text-base">{project.title}</span>
                {hasMultipleImages && (
                  <span className="shrink-0 font-mono-code text-xs text-white/60">
                    {activeIndex + 1} of {total}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close full-screen image viewer"
                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-indigo-400"
              >
                <X className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>

            {/* Image area — fills remaining space, tapping empty space closes */}
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center p-3 sm:p-6"
              onClick={() => setIsLightboxOpen(false)}
              {...swipeHandlers}
            >
              <motion.img
                key={activeSrc}
                src={activeSrc}
                alt={`${project.title} full-screen screenshot ${activeIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
                draggable={false}
                onClick={stop}
                className="max-h-full max-w-full select-none rounded-lg object-contain shadow-2xl"
              />

              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      stop(e);
                      goPrev();
                    }}
                    aria-label="Previous screenshot in viewer"
                    className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/20 bg-black/60 p-2.5 text-white shadow-xl transition hover:scale-105 hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-indigo-400 sm:left-5 sm:p-3"
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      stop(e);
                      goNext();
                    }}
                    aria-label="Next screenshot in viewer"
                    className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full border border-white/20 bg-black/60 p-2.5 text-white shadow-xl transition hover:scale-105 hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-indigo-400 sm:right-5 sm:p-3"
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {hasMultipleImages && (
              <div
                ref={lightboxStripRef}
                className="flex shrink-0 items-center gap-2 overflow-x-auto border-t border-white/10 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center"
                onClick={stop}
              >
                {gallery.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setCurrentImageIndex(idx)}
                    aria-label={`View screenshot ${idx + 1}`}
                    aria-current={activeIndex === idx}
                    className={`h-9 w-14 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-all focus-visible:outline-2 focus-visible:outline-indigo-400 sm:h-10 sm:w-16 ${
                      activeIndex === idx
                        ? 'border-indigo-500 opacity-100 ring-2 ring-indigo-500/50'
                        : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  // Portal to <body> so no parent stacking context can put the navbar above the modal
  return createPortal(content, document.body);
};