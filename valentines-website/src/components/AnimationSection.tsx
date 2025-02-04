// components/AnimationSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

const AnimationSection: React.FC = () => {
  return (
    <section className="animation-section">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{ width: 100, height: 100, margin: '0 auto' }}
      >
        <svg viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                   4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
                   14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                   6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>
      <p>Enjoy the loving spin of our heart!</p>
    </section>
  );
};

export default AnimationSection;
