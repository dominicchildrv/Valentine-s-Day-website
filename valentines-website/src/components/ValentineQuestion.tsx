// components/ValentineQuestion.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const ValentineQuestion: React.FC = () => {
  // State for the initial Yes/No question
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const yesButtonRef = useRef<HTMLButtonElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [noButtonInitialRect, setNoButtonInitialRect] = useState<DOMRect | null>(null);
  
  // Sequence states
  const [confirmed, setConfirmed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFinalPage, setShowFinalPage] = useState(false);

  // Get window dimensions for confetti
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Capture the initial bounding rectangle of the No button.
  useEffect(() => {
    if (noButtonRef.current) {
      setNoButtonInitialRect(noButtonRef.current.getBoundingClientRect());
    }
  }, []);

  // Helper function to check whether two rectangles intersect.
  const rectsIntersect = (
    rectA: { left: number; top: number; right: number; bottom: number },
    rectB: { left: number; top: number; right: number; bottom: number }
  ) => {
    return !(
      rectA.right < rectB.left ||
      rectA.left > rectB.right ||
      rectA.bottom < rectB.top ||
      rectA.top > rectB.bottom
    );
  };

  // On hovering over the No button, generate a new position that does not overlap the Yes button.
  const handleNoHover = () => {
    if (!noButtonInitialRect || !yesButtonRef.current) return;
    const yesRect = yesButtonRef.current.getBoundingClientRect();
    let candidateX = 0;
    let candidateY = 0;
    let candidateRect;
    // Extended random range: X from -300 to 300, Y from -200 to 200.
    for (let i = 0; i < 10; i++) {
      candidateX = Math.floor(Math.random() * 600) - 300;
      candidateY = Math.floor(Math.random() * 400) - 200;
      candidateRect = {
        left: noButtonInitialRect.left + candidateX,
        top: noButtonInitialRect.top + candidateY,
        right: noButtonInitialRect.left + candidateX + noButtonInitialRect.width,
        bottom: noButtonInitialRect.top + candidateY + noButtonInitialRect.height,
      };
      if (!rectsIntersect(candidateRect, yesRect)) {
        break;
      }
    }
    setNoButtonPosition({ x: candidateX, y: candidateY });
  };

  // When the user clicks Yes, trigger the fade-out and confetti sequence.
  const handleYesClick = () => {
    setConfirmed(true);
  };

  // When confirmed and confetti is shown, after 3 seconds hide confetti and show final page.
  useEffect(() => {
    if (confirmed && showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
        setShowFinalPage(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [confirmed, showConfetti]);

  return (
    <div style={{ textAlign: 'center', position: 'relative', minHeight: '100vh' }}>
      {/* Initial Valentine Question with Yes/No buttons */}
      <AnimatePresence>
        {!confirmed && !showFinalPage && (
          <motion.div
            key="question"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <h2 style={{ fontSize: '2.5rem', color: '#d6336c' }}>
              Will you be Dominic's valentine?
            </h2>
            <div
              style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                position: 'relative',
              }}
            >
              <motion.button
                ref={yesButtonRef}
                style={{
                  backgroundColor: '#d6336c',
                  color: '#fff',
                  border: 'none',
                  padding: '1rem 2rem',
                  fontSize: '1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.1 }}
                onClick={handleYesClick}
              >
                Yes
              </motion.button>
              <motion.button
                ref={noButtonRef}
                style={{
                  backgroundColor: '#d6336c',
                  color: '#fff',
                  border: 'none',
                  padding: '1rem 2rem',
                  fontSize: '1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onMouseEnter={handleNoHover}
                animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fade-out overlay triggering confetti */}
      <AnimatePresence>
        {confirmed && !showConfetti && !showFinalPage && (
          <motion.div
            key="fadeOut"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1 }}
            onAnimationComplete={() => setShowConfetti(true)}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </AnimatePresence>

      {/* Confetti falling (covers entire screen) */}
      {showConfetti && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={500}
            gravity={0.3}
          />
        </div>
      )}

      {/* Final page with spinning heart and heartfelt message */}
      <AnimatePresence>
        {showFinalPage && (
          <motion.div
            key="finalPage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: '#ffe6f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
              zIndex: 10,
            }}
          >
            {/* Spinning Heart */}
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1.5, rotate: 360 }}
              transition={{
                duration: 1.5,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'loop',
              }}
              style={{ marginBottom: '2rem' }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="red"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: 100, height: 100 }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                         2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                         C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                         c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
            {/* Heartfelt Message */}
            <div style={{ textAlign: 'center', color: '#333', lineHeight: 1.4 }}>
              <p style={{ fontSize: '2.5rem', margin: '0.5rem', fontWeight: 'bold', color: '#d6336c' }}>
                I love you Zhirinda
              </p>
              <p style={{ fontSize: '2rem', margin: '0.5rem' }}>
                I can't wait to see you on valentines day
              </p>
              <p style={{ fontSize: '2rem', margin: '0.5rem' }}>
                I'm so lucky to have you as my valentine
              </p>
              <p style={{ fontSize: '2rem', margin: '0.5rem', fontStyle: 'italic' }}>
                Love Dominic
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ValentineQuestion;
