import { useCallback, useRef } from "react";

const useSeven = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSeven = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/Seven.wav");
      audioRef.current.volume = 0.3;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, []);

  return playSeven;
};

export default useSeven;
