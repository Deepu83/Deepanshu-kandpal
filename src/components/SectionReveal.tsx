import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface SectionRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  delay = 0,
  yOffset = 24,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const FadeInStagger: React.FC<{
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}> = ({ children, className = '', stagger = 0.08 }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}> = ({ children, className = '', yOffset = 20 }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
