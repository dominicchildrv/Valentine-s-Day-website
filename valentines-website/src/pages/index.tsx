// pages/index.tsx
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ValentineQuestion from '../components/ValentineQuestion';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Valentine&apos;s Day Surprise</title>
        <meta name="description" content="A special Valentine&apos;s Day website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AnimatePresence>
        {!started && (
          <motion.div
            className={styles.splashContainer}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            <h1 className={styles.splashTitle}>Happy Valentines!</h1>
            <motion.div
              className={styles.splashHeart}
              initial={{ scale: 2, rotate: 0 }}
              animate={{
                scale: 2,
                rotate: 360,
                transition: { repeat: Infinity, duration: 10, ease: 'linear' }
              }}
              exit={{
                scale: 1,
                y: -100,
                rotate: 0,
                transition: { duration: 1 }
              }}
            >
              <svg viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                         2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                         C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                         c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
            <motion.button
              className={styles.startButton}
              onClick={() => setStarted(true)}
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              Start
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {started && (
        <motion.div
          className={styles.mainContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.8 } }}
        >
          <ValentineQuestion />
        </motion.div>
      )}
    </div>
  );
};

export default Home;
