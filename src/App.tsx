import React, { useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThemeProvider } from './context/ThemeContext';
import { useAudio } from './hooks/useAudio';
import { Hero } from './components/Hero';
import { VitalsCounter } from './components/VitalsCounter';
import { EditorialGallery } from './components/EditorialGallery';
import { VideoSection } from './components/VideoSection';
import { NurseStation } from './components/NurseStation';
import { DosageButton } from './components/DosageButton';

gsap.registerPlugin(ScrollTrigger);

const AppContent: React.FC = () => {
  const { isPlaying, hasInteracted, toggleAudio, setUserInteracted } = useAudio('/audio/Baby,_I_do_-_Juris__Lyrics_(128k).mp3');

  const handleUserInteraction = useCallback(() => {
    if (!hasInteracted) {
      setUserInteracted();
    }
  }, [hasInteracted, setUserInteracted]);

  useEffect(() => {
    // Add global click listener for audio interaction requirement
    const handleClick = () => handleUserInteraction();
    document.addEventListener('click', handleClick, { once: true });

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleUserInteraction]);

  return (
    <div className="min-h-screen bg-cream dark:bg-midnight transition-colors duration-500">
      <main>
        <Hero 
          isPlaying={isPlaying} 
          hasInteracted={hasInteracted} 
          toggleAudio={toggleAudio} 
        />
        <VitalsCounter />
        <EditorialGallery />
        <VideoSection />
        <NurseStation />
        <DosageButton />
      </main>

      {/* Footer */}
      <footer className="w-full py-8 bg-gray-100 dark:bg-black/50 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <p className="font-playfair text-lg text-gray-700 dark:text-gray-300">
            The Rose Report
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-500 font-inter">
            Est. May 12, 2023 • Perpetually Updated with Love
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald dark:bg-forest-green animate-pulse" />
            <span className="text-xs text-gray-400 dark:text-gray-600">
              All systems nominal
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
