'use client';

import { motion } from 'framer-motion';

// Reusable animated button component with tap and hover effects
export default function AnimatedButton({ children, className = '', onClick, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
