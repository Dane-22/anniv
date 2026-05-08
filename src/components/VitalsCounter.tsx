import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { Heart, Calendar, Clock } from 'lucide-react';
import { useVitalsCounter } from '../hooks/useVitalsCounter';

gsap.registerPlugin(TextPlugin);

interface CounterUnitProps {
  value: number;
  label: string;
}

const CounterUnit: React.FC<CounterUnitProps> = ({ value, label }) => {
  const valueRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    if (valueRef.current && value !== prevValue.current) {
      // Roll animation using GSAP TextPlugin
      gsap.to(valueRef.current, {
        duration: 0.3,
        ease: 'power2.out',
        onStart: () => {
          gsap.to(valueRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.15,
            ease: 'power2.in',
            onComplete: () => {
              if (valueRef.current) {
                valueRef.current.textContent = String(value).padStart(2, '0');
              }
              gsap.fromTo(
                valueRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.15, ease: 'power2.out' }
              );
            },
          });
        },
      });
      prevValue.current = value;
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center p-4 lg:p-6">
      <span
        ref={valueRef}
        className="font-playfair text-4xl lg:text-6xl font-bold text-sunburst dark:text-goldenrod tabular-nums"
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="mt-2 text-sm lg:text-base font-inter uppercase tracking-widest text-gray-600 dark:text-gray-400">
        {label}
      </span>
    </div>
  );
};

export const VitalsCounter: React.FC = () => {
  const { years, months, days, hours, minutes, seconds } = useVitalsCounter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Stagger in counter units
      gsap.fromTo(
        '.counter-unit',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-cream dark:bg-midnight transition-colors duration-500 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-sunburst/5 to-transparent dark:from-goldenrod/5" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-emerald dark:text-forest-green animate-pulse" />
            <span className="text-sm font-medium uppercase tracking-widest text-emerald dark:text-forest-green">
              Vitals Monitor
            </span>
          </div>
          <h2
            ref={titleRef}
            className="font-playfair text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white"
          >
            Time Elapsed Since
            <span className="block mt-2 text-sunburst dark:text-goldenrod">
              May 12, 2023
            </span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">The Beginning of Forever</span>
          </div>
        </div>

        {/* Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="counter-unit bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-sunburst/50 dark:hover:border-goldenrod/50 transition-all duration-300">
            <CounterUnit value={years} label="Years" />
          </div>
          <div className="counter-unit bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-sunburst/50 dark:hover:border-goldenrod/50 transition-all duration-300">
            <CounterUnit value={months} label="Months" />
          </div>
          <div className="counter-unit bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-sunburst/50 dark:hover:border-goldenrod/50 transition-all duration-300">
            <CounterUnit value={days} label="Days" />
          </div>
          <div className="counter-unit bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-sunburst/50 dark:hover:border-goldenrod/50 transition-all duration-300">
            <CounterUnit value={hours} label="Hours" />
          </div>
          <div className="counter-unit bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-sunburst/50 dark:hover:border-goldenrod/50 transition-all duration-300">
            <CounterUnit value={minutes} label="Minutes" />
          </div>
          <div className="counter-unit bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-sunburst/50 dark:hover:border-goldenrod/50 transition-all duration-300">
            <CounterUnit value={seconds} label="Seconds" />
          </div>
        </div>

        {/* Live indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="relative">
            <div className="w-3 h-3 bg-emerald dark:bg-forest-green rounded-full animate-pulse" />
            <div className="absolute inset-0 w-3 h-3 bg-emerald dark:bg-forest-green rounded-full animate-ping opacity-75" />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Live Update</span>
          </div>
        </div>
      </div>
    </section>
  );
};
