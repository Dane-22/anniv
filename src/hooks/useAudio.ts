import { useState, useCallback, useRef, useEffect } from 'react';

interface UseAudioReturn {
  isPlaying: boolean;
  hasInteracted: boolean;
  toggleAudio: () => void;
  setUserInteracted: () => void;
}

export const useAudio = (audioSrc: string): UseAudioReturn => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(audioSrc);
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSrc]);

  const setUserInteracted = useCallback(() => {
    setHasInteracted(true);
  }, []);

  const toggleAudio = useCallback(() => {
    if (!audioRef.current || !hasInteracted) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, [isPlaying, hasInteracted]);

  return { isPlaying, hasInteracted, toggleAudio, setUserInteracted };
};
