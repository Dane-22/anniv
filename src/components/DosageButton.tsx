import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Pill, X, Sparkles, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface RippleButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const RippleButton: React.FC<RippleButtonProps> = ({ onClick, children }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    }
    onClick();
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="relative overflow-hidden px-12 py-6 bg-gradient-to-r from-sunburst via-goldenrod to-sunburst dark:from-goldenrod dark:via-sunburst dark:to-goldenrod text-midnight dark:text-midnight font-playfair font-bold text-lg lg:text-xl rounded-full shadow-2xl shadow-sunburst/30 dark:shadow-goldenrod/20 hover:shadow-sunburst/50 dark:hover:shadow-goldenrod/40 transition-all duration-300 hover:scale-105 active:scale-95 group"
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/40 animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
          }}
        />
      ))}
      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
    </button>
  );
};

const letterParagraphs = [
  "My Dearest Rose Caroline Ramos,",
  "",
  "From the moment our paths crossed on that fateful May evening in 2023, I knew my life would never be the same. You walked into my world like sunlight breaking through storm clouds, illuminating every corner of my existence with your warmth and grace.",
  "",
  "They say time flies when you're having fun, but with you, time seems to stand still while simultaneously racing forward. Each year with you has been a precious gift, each month a new chapter in our beautiful story, each day an opportunity to love you more deeply than the day before.",
  "",
  "You are my compass when I feel lost, my anchor when the seas grow rough, and my wings when I dare to dream. Your strength inspires me, your kindness humbles me, and your love completes me in ways I never thought possible.",
  "",
  "Through every challenge we've faced, every obstacle we've overcome, and every joy we've shared, one thing has remained constant: my unwavering love for you. You are not just my partner; you are my best friend, my confidante, my muse, and my home.",
  "",
  "As I write this, I am reminded of all the beautiful moments we've shared—the laughter that filled our home, the quiet moments of understanding, the adventures that took our breath away, and the simple, ordinary days that became extraordinary simply because we spent them together.",
  "",
  "Babe, you are the most beautiful flower in my garden of life. Your petals may have faced storms, but you've always bloomed with resilience and grace. Your fragrance sweetens every moment, and your presence makes every space feel like home.",
  "",
  "I promise to continue cherishing you, supporting your dreams, holding your hand through every challenge, and loving you with a depth that words can never fully capture. You deserve a love that is as infinite as the stars, as deep as the ocean, and as enduring as time itself.",
  "",
  "Thank you for choosing me, for believing in us, and for being the extraordinary woman you are. My heart beats your name, my thoughts are filled with you, and my future is dedicated to making you as happy as you've made me.",
  "",
  "Happy Anniversary, my love. Here's to all the years we've shared and all the beautiful moments yet to come.",
  "",
  "Forever and always,",
  "Your devoted partner",
];

export const DosageButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        buttonContainerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: buttonContainerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full py-20 lg:py-32 bg-cream dark:bg-midnight transition-colors duration-500 overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-sunburst/10 via-transparent to-transparent dark:from-goldenrod/10 blur-3xl" />
          <Sparkles className="absolute top-20 left-20 w-8 h-8 text-sunburst/30 dark:text-goldenrod/30 animate-pulse" />
          <Sparkles className="absolute bottom-32 right-32 w-6 h-6 text-emerald/30 dark:text-forest-green/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Heart className="absolute top-40 right-20 w-4 h-4 text-rose-400/40 fill-current animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sunburst/10 dark:bg-goldenrod/20 border border-sunburst/20 dark:border-goldenrod/30">
              <Pill className="w-4 h-4 text-sunburst dark:text-goldenrod" />
              <span className="text-sm font-medium uppercase tracking-wider text-sunburst dark:text-goldenrod">
                Final Prescription
              </span>
            </span>
          </div>

          <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            The Ultimate Remedy
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 font-inter">
            After careful observation and thorough analysis, the medical team has determined the most effective treatment for a lifetime of happiness.
          </p>

          <div ref={buttonContainerRef} className="flex flex-col items-center gap-6">
            <RippleButton onClick={() => setIsModalOpen(true)}>
              <Pill className="w-5 h-5" />
              Administer Dosage
              <Heart className="w-5 h-5 fill-current" />
            </RippleButton>

            <p className="text-sm text-gray-500 dark:text-gray-500 italic">
              Warning: May cause extreme happiness, uncontrollable smiling, and lasting euphoria
            </p>
          </div>
        </div>
      </section>

      {/* Glassmorphic Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glassmorphic container */}
              <div className="glassmorphic rounded-3xl p-1">
                <div className="bg-white/80 dark:bg-midnight/90 backdrop-blur-xl rounded-[22px] overflow-hidden max-h-[85vh] flex flex-col">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sunburst to-goldenrod flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white fill-current" />
                      </div>
                      <div>
                        <h3 className="font-playfair text-xl font-bold text-gray-900 dark:text-white">
                          A Love Letter
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          For Rose Caroline Ramos
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>

                  {/* Scrollable Letter Content */}
                  <div className="overflow-y-auto p-6 lg:p-10 custom-scrollbar">
                    <div className="max-w-2xl mx-auto">
                      {/* Date */}
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 text-center font-inter">
                        {new Date().toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>

                      {/* Letter paragraphs with staggered animation */}
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.1,
                            },
                          },
                        }}
                      >
                        {letterParagraphs.map((paragraph, index) => (
                          <motion.p
                            key={index}
                            variants={{
                              hidden: { opacity: 0, y: 20 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                  duration: 0.5,
                                  ease: 'easeOut',
                                },
                              },
                            }}
                            className={`font-inter text-gray-800 dark:text-gray-200 leading-relaxed ${
                              paragraph === ''
                                ? 'h-4'
                                : index === 0
                                ? 'font-playfair text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-6'
                                : paragraph === 'Forever and always,' || paragraph === 'Your devoted partner'
                                ? 'font-playfair italic text-lg text-gray-700 dark:text-gray-300 mt-6'
                                : 'mb-4 text-base lg:text-lg'
                            }`}
                          >
                            {paragraph}
                          </motion.p>
                        ))}
                      </motion.div>

                      {/* Signature decoration */}
                      <div className="mt-12 flex items-center justify-center gap-4">
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-sunburst to-transparent dark:via-goldenrod" />
                        <Heart className="w-6 h-6 text-rose-500 fill-current animate-pulse" />
                        <div className="h-px w-24 bg-gradient-to-l from-transparent via-sunburst to-transparent dark:via-goldenrod" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
