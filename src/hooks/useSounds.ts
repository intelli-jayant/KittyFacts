import { useCallback, useRef } from "react";

const useBura = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSeven = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/bura.wav");
      audioRef.current.volume = 0.6;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, []);

  return playSeven;
};

const useChhi = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSeven = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/chhi.wav");
      audioRef.current.volume = 0.6;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, []);

  return playSeven;
};

 
const useName = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSeven = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/Name.wav");
      audioRef.current.volume = 0.6;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, []);

  return playSeven;
};


// const useSong = () => {
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   const playSeven = useCallback(() => {
//     if (!audioRef.current) {
//       audioRef.current = new Audio("/Salvatore.mp3");
//       audioRef.current.volume = 0.6;
//     }
//     audioRef.current.currentTime = 0;
//     audioRef.current.play().catch(() => {});
//   }, []);

//   return playSeven;
// };
const useSong = () => {
  const audio = new Audio("/Salvatore.mp3");

  return (loop = false) => {
    audio.loop = loop;
    audio.volume = 0.6;
    audio.play();
  };
};

export { useBura, useChhi, useName , useSong};