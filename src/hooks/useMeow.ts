import { useCallback, useRef } from "react";

const useMeow = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playMeow = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/meow.wav");
      audioRef.current.volume = 0.3;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, []);

  return playMeow;
};

export default useMeow;
