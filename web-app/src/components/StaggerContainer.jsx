'use client';

import { motion } from 'framer-motion';

// Container for staggered animations of child elements
export default function StaggerContainer({ children, className = '', delay = 0.05 }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: delay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Item to be used inside StaggerContainer
export function StaggerItem({ children, className = '' }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
