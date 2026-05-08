import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Image as ImageIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Sunflower petal clip-path variations
const petalMasks = [
  'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)',
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
  'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
];

// Placeholder image data - users can replace with actual images
const galleryImages = [
  { id: 1, alt: 'Memory 1', mask: petalMasks[0], parallaxSpeed: -50 },
  { id: 2, alt: 'Memory 2', mask: petalMasks[1], parallaxSpeed: -30 },
  { id: 3, alt: 'Memory 3', mask: petalMasks[2], parallaxSpeed: -70 },
  { id: 4, alt: 'Memory 4', mask: petalMasks[3], parallaxSpeed: -40 },
  { id: 5, alt: 'Memory 5', mask: petalMasks[0], parallaxSpeed: -60 },
  { id: 6, alt: 'Memory 6', mask: petalMasks[2], parallaxSpeed: -35 },
];

interface GalleryImageProps {
  image: typeof galleryImages[0];
  index: number;
}

const GalleryImage: React.FC<GalleryImageProps> = ({ image, index }) => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;

    // Parallax effect on scroll
    const parallaxTween = gsap.to(el.querySelector('.parallax-inner'), {
      y: image.parallaxSpeed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Fade in animation
    const fadeTween = gsap.fromTo(
      el,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      parallaxTween.kill();
      fadeTween.kill();
    };
  }, [image.parallaxSpeed]);

  return (
    <div
      ref={imageRef}
      className={`gallery-item relative overflow-hidden ${
        index % 3 === 0 ? 'col-span-2 row-span-2' : 
        index % 4 === 1 ? 'col-span-1 row-span-2' : 
        'col-span-1 row-span-1'
      }`}
      style={{
        clipPath: image.mask,
        aspectRatio: index % 3 === 0 ? '1/1' : index % 4 === 1 ? '2/3' : '1/1',
      }}
    >
      <div className="parallax-inner absolute inset-0 scale-125">
        {/* Placeholder gradient - replace with actual images */}
        <div 
          className="w-full h-full bg-gradient-to-br from-sunburst/30 via-goldenrod/20 to-emerald/30 dark:from-goldenrod/20 dark:via-sunburst/10 dark:to-forest-green/20 flex items-center justify-center group cursor-pointer transition-all duration-500 hover:scale-105"
          style={{
            backgroundImage: `url(/images/memory-${image.id}.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Fallback gradient when no image */}
          <div className="absolute inset-0 bg-gradient-to-br from-sunburst/40 via-cream to-emerald/30 dark:from-goldenrod/30 dark:via-midnight dark:to-forest-green/30" />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
            <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500" />
          </div>
        </div>
      </div>
      
      {/* Image label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-white bg-black/50 backdrop-blur-sm rounded-full">
          {image.alt}
        </span>
      </div>
    </div>
  );
};

export const EditorialGallery: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
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
      {/* Section Header */}
      <div ref={titleRef} className="max-w-6xl mx-auto px-6 lg:px-12 mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Camera className="w-6 h-6 text-emerald dark:text-forest-green" />
          <span className="text-sm font-medium uppercase tracking-widest text-emerald dark:text-forest-green">
            Imaging Archive
          </span>
        </div>
        <h2 className="font-playfair text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          Visual Memories
          <span className="block mt-2 text-sunburst dark:text-goldenrod font-light italic">
            A collection of moments, frozen in time
          </span>
        </h2>
        <p className="mt-6 text-gray-600 dark:text-gray-400 max-w-2xl font-inter">
          Each petal-shaped frame holds a precious memory, parallax-scrolled through the garden of our shared history.
        </p>
      </div>

      {/* Broken Grid Gallery */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[200px] lg:auto-rows-[250px]">
          {galleryImages.map((image, index) => (
            <GalleryImage key={image.id} image={image} index={index} />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-32 h-32 rounded-full bg-gradient-to-r from-sunburst/10 to-transparent blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-40 h-40 rounded-full bg-gradient-to-l from-emerald/10 to-transparent blur-3xl dark:from-forest-green/10" />
    </section>
  );
};
