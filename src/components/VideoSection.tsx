import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Volume2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const VideoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: videoRef.current,
            start: 'top 85%',
          },
        }
      );

      // Video container animation
      gsap.fromTo(
        videoContainerRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: videoContainerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePlayPause = async () => {
    if (videoElementRef.current && !isChanging) {
      setIsChanging(true);
      try {
        if (videoElementRef.current.paused) {
          await videoElementRef.current.play();
          setIsPlaying(true);
        } else {
          videoElementRef.current.pause();
          setIsPlaying(false);
        }
      } catch (error) {
        console.log('Video play/pause error:', error);
      } finally {
        setIsChanging(false);
      }
    }
  };

  const handleMuteToggle = () => {
    if (videoElementRef.current) {
      videoElementRef.current.muted = !videoElementRef.current.muted;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 bg-gradient-to-b from-cream dark:from-midnight to-white dark:to-gray-900 transition-colors duration-500 overflow-hidden"
    >
      {/* Section Header */}
      <div ref={videoRef} className="max-w-6xl mx-auto px-6 lg:px-12 mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Play className="w-6 h-6 text-sunburst dark:text-goldenrod" />
          <span className="text-sm font-medium uppercase tracking-widest text-sunburst dark:text-goldenrod">
            Video Memory
          </span>
        </div>
        <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          Living Moment
          <span className="block mt-2 text-emerald dark:text-forest-green font-light italic">
            Captured in motion, forever alive
          </span>
        </h2>
        <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl font-inter">
          A special moment brought to life, where time stands still yet continues to flow in an endless loop of memory.
        </p>
      </div>

      {/* Video Container */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div 
          ref={videoContainerRef}
          className="relative aspect-[9/16] max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
          onClick={handlePlayPause}
        >
          <video
            ref={videoElementRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/video/video-1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video overlay controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Play/Pause indicator */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                {isPlaying ? (
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </div>
            </div>

            {/* Mute button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMuteToggle();
              }}
              className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
            >
              <Volume2 className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Decorative frame */}
          <div className="absolute inset-0 border-4 border-white/20 rounded-3xl pointer-events-none" />
        </div>

        {/* Video description */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 font-inter italic">
            Click to play or pause • Hover for controls
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-32 h-32 rounded-full bg-gradient-to-l from-sunburst/10 to-transparent blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-40 h-40 rounded-full bg-gradient-to-r from-emerald/10 to-transparent blur-3xl dark:from-forest-green/10" />
    </section>
  );
};
