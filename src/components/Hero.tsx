import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { Volume2, VolumeX, Moon, Sun, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLottie } from 'lottie-react';

gsap.registerPlugin(TextPlugin);

// Lottie animation data for heartbeat ECG morphing to sunflower
const heartbeatAnimation = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 180,
  w: 400,
  h: 400,
  nm: "Heartbeat Sunflower",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "ECG Line",
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [200, 200, 0], ix: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: { a: 0, k: [100, 100, 100], ix: 6 }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "sh",
              ks: {
                a: 1,
                k: [
                  {
                    i: { x: 0.833, y: 0.833 },
                    o: { x: 0.167, y: 0.167 },
                    t: 0,
                    s: [
                      {
                        i: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        o: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        v: [[-120, 0], [-80, 0], [-60, 0], [-40, -40], [-20, 40], [0, 0], [20, 0], [40, -30], [60, 30], [80, 0], [120, 0]],
                        c: false
                      }
                    ]
                  },
                  {
                    t: 90,
                    s: [
                      {
                        i: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        o: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
                        v: [[0, -80], [23, -35], [76, -25], [47, 10], [59, 65], [0, 40], [-59, 65], [-47, 10], [-76, -25], [-23, -35], [0, -80]],
                        c: true
                      }
                    ]
                  }
                ]
              }
            },
            {
              ty: "st",
              c: { a: 0, k: [1, 0.843, 0, 1], ix: 3 },
              o: { a: 0, k: 100, ix: 4 },
              w: { a: 0, k: 4, ix: 5 },
              lc: 2,
              lj: 2,
              ml: 4,
              nm: "Stroke"
            }
          ]
        }
      ],
      ip: 0,
      op: 180,
      st: 0
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Center Circle",
      sr: 1,
      ks: {
        o: { a: 1, k: [{ t: 0, s: [0] }, { t: 60, s: [100] }], ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [200, 200, 0], ix: 2 },
        a: { a: 0, k: [0, 0, 0], ix: 1 },
        s: { a: 1, k: [{ t: 60, s: [0, 0, 100] }, { t: 120, s: [100, 100, 100] }], ix: 6 }
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0], ix: 2 },
              s: { a: 0, k: [60, 60], ix: 3 }
            },
            {
              ty: "fl",
              c: { a: 0, k: [0.855, 0.647, 0.125, 1], ix: 4 },
              o: { a: 0, k: 100, ix: 5 },
              r: 1,
              nm: "Fill"
            }
          ]
        }
      ],
      ip: 0,
      op: 180,
      st: 0
    }
  ]
};

interface HeroProps {
  isPlaying: boolean;
  hasInteracted: boolean;
  toggleAudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ isPlaying, hasInteracted, toggleAudio }) => {
  const { isDark, toggleTheme } = useTheme();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { View } = useLottie({
    animationData: heartbeatAnimation,
    loop: true,
    autoplay: true,
    className: 'w-full h-full'
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Masked text reveal animation
      gsap.fromTo(
        titleRef.current,
        { 
          backgroundSize: '0% 100%',
          opacity: 0,
          y: 50
        },
        { 
          backgroundSize: '100% 100%',
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          delay: 0.5
        }
      );

      // Stagger in top bar elements
      gsap.fromTo(
        '.top-bar-item',
        { opacity: 0, y: -20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'power2.out',
          delay: 0.2
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-cream dark:bg-midnight transition-colors duration-500"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-sunburst/20 via-transparent to-emerald/20 dark:from-goldenrod/10 dark:to-forest-green/10" />
      </div>

      {/* Top Bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-4 lg:px-12 lg:py-6">
        <div className="top-bar-item flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald dark:text-forest-green animate-pulse" />
          <span className="text-sm font-medium tracking-wider uppercase text-gray-700 dark:text-gray-300">
            Portal Status: <span className="text-emerald dark:text-forest-green">Active</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            className="top-bar-item p-3 rounded-full bg-white/80 dark:bg-black/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-sunburst dark:hover:border-goldenrod transition-all duration-300 group"
            aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
          >
            {isPlaying ? (
              <Volume2 className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-sunburst dark:group-hover:text-goldenrod transition-colors" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-500 dark:text-gray-500 group-hover:text-sunburst dark:group-hover:text-goldenrod transition-colors" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="top-bar-item p-3 rounded-full bg-white/80 dark:bg-black/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-sunburst dark:hover:border-goldenrod transition-all duration-300 group"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-goldenrod group-hover:rotate-180 transition-transform duration-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 group-hover:rotate-12 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 lg:py-20">
        {/* Lottie Animation Container */}
        <div className="w-64 h-64 lg:w-80 lg:h-80 mb-8">
          {View}
        </div>

        {/* Title with masked text reveal */}
        <h1
          ref={titleRef}
          className="font-playfair text-5xl lg:text-7xl xl:text-8xl font-bold text-center tracking-tight"
          style={{
            background: isDark 
              ? 'linear-gradient(135deg, #DAA520 0%, #FFD700 50%, #228B22 100%)' 
              : 'linear-gradient(135deg, #FFD700 0%, #DAA520 50%, #10B981 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '0% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          THE ROSE REPORT
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg lg:text-xl text-gray-600 dark:text-gray-400 font-inter max-w-2xl text-center">
          A Comprehensive Analysis of Enduring Love
        </p>

        {/* Decorative elements */}
        <div className="mt-12 flex items-center gap-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-sunburst to-transparent dark:via-goldenrod" />
          <div className="w-2 h-2 rounded-full bg-sunburst dark:bg-goldenrod animate-pulse" />
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-sunburst to-transparent dark:via-goldenrod" />
        </div>
      </div>

      {/* Audio interaction hint */}
      {!hasInteracted && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500 animate-pulse">
            Click anywhere to enable audio experience
          </p>
        </div>
      )}
    </section>
  );
};
