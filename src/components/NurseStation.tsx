import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Stethoscope, Quote, Star, Award, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const NurseStation: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance animation
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
          },
        }
      );

      // Quote mark animation
      gsap.fromTo(
        '.quote-mark',
        { opacity: 0, scale: 0, rotation: -45 },
        {
          opacity: 0.1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: 0.3,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald/10 to-transparent rounded-full blur-3xl dark:from-forest-green/10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-sunburst/10 to-transparent rounded-full blur-3xl dark:from-goldenrod/10" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 dark:bg-forest-green/20 border border-emerald/20 dark:border-forest-green/30 mb-6">
            <Stethoscope className="w-4 h-4 text-emerald dark:text-forest-green" />
            <span className="text-sm font-medium uppercase tracking-wider text-emerald dark:text-forest-green">
              Nurse Station
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div
          ref={cardRef}
          className="relative bg-white dark:bg-gray-900/50 rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-100 dark:border-gray-800 backdrop-blur-sm"
        >
          {/* Large quote mark */}
          <Quote className="quote-mark absolute top-8 left-8 w-24 h-24 text-sunburst/10 dark:text-goldenrod/10" />

          {/* Card Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sunburst to-goldenrod flex items-center justify-center shadow-lg">
              <span className="text-2xl font-playfair font-bold text-white">M</span>
            </div>
            <div>
              <h3 className="font-playfair text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                Shift Lead Mochi, RN
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-inter">
                Head of Cardiac Care Unit
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 text-sunburst dark:text-goldenrod fill-current"
                />
              ))}
            </div>
          </div>

          {/* Pull Quote */}
          <blockquote className="relative z-10">
            <p className="font-playfair text-2xl lg:text-3xl xl:text-4xl leading-relaxed text-gray-800 dark:text-gray-200 italic text-center px-4 lg:px-12">
              "Patient <span className="text-sunburst dark:text-goldenrod font-semibold not-italic">Rose Caroline Ramos</span> remains the brightest sun in the system.
              <span className="block mt-4 text-xl lg:text-2xl text-gray-600 dark:text-gray-400">
                Recommend: <span className="text-emerald dark:text-forest-green font-medium not-italic">Lifetime dosage of love.</span>
              </span>
            </p>
          </blockquote>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-700" />
            <div className="w-2 h-2 rounded-full bg-sunburst dark:bg-goldenrod" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-700" />
          </div>

          {/* Card Footer */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald dark:text-forest-green" />
              <span>Board Certified</span>
            </div>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-700">|</span>
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-sunburst dark:text-goldenrod" />
              <span>Specialist in Heart Matters</span>
            </div>
            <span className="hidden sm:inline text-gray-300 dark:text-gray-700">|</span>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-current" />
              <span>Purr-fessional Caregiver</span>
            </div>
          </div>
        </div>

        {/* Patient Status Card */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Heart Rate', value: '∞ BPM', status: 'Eternal', color: 'text-rose-500' },
            { label: 'Happiness Level', value: '100%', status: 'Optimal', color: 'text-sunburst dark:text-goldenrod' },
            { label: 'Love Saturation', value: 'Maximum', status: 'Overflow', color: 'text-emerald dark:text-forest-green' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-sunburst/30 dark:hover:border-goldenrod/30 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                {stat.label}
              </p>
              <p className={`font-playfair text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Status: {stat.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

