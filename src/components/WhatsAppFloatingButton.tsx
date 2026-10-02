import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.179-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.676-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.232-.244-.587-.493-.507-.677-.516-.175-.008-.376-.01-.576-.01-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.508 0 1.48 1.077 2.909 1.228 3.109.15.2 2.12 3.238 5.137 4.542.718.31 1.279.496 1.716.635.721.23 1.378.197 1.9.12.581-.087 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.125-.276-.201-.576-.351zM12.04 2C6.516 2 2.03 6.486 2.03 12.01c0 1.97.572 3.805 1.564 5.358L2 22.04l4.821-1.55c1.495.894 3.242 1.408 5.219 1.408 5.524 0 10.01-4.486 10.01-10.01C22.05 6.486 17.564 2 12.04 2zm0 18.293c-1.745 0-3.364-.53-4.71-1.438l-.337-.225-2.862.92.936-2.79-.247-.369a8.232 8.232 0 0 1-1.31-4.381c0-4.57 3.717-8.287 8.287-8.287 4.57 0 8.287 3.717 8.287 8.287 0 4.57-3.717 8.283-8.251 8.283z" />
  </svg>
);

export const WhatsAppFloatingButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center gap-3">
      {/* Optional Hover Tooltip / Badge */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="hidden sm:flex items-center px-3 py-1.5 rounded-lg bg-slate-900/90 dark:bg-slate-800/95 text-white text-xs font-medium shadow-md backdrop-blur-xs border border-white/10 whitespace-nowrap pointer-events-none"
          >
            <span>Chat on WhatsApp</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        href={personalInfo.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Deepanshu on WhatsApp (+91 8057509308)"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg hover:shadow-xl shadow-[#25D366]/30 transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 cursor-pointer"
      >
        {/* Subtle ambient pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping opacity-60 pointer-events-none" />

        <WhatsAppIcon className="w-7 h-7 fill-white transition-transform duration-200 group-hover:scale-105 relative z-10" />
      </motion.a>
    </div>
  );
};
