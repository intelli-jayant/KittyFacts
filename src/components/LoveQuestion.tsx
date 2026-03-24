import React, { useState, useCallback } from "react";
import FloatingHearts from "./FloatingHearts";
import useMeow from "../hooks/useMeow";
import {useChhi} from "../hooks/useSounds";

interface LoveQuestionProps {
  name: string;
  onYes: () => void;
}

const LoveQuestion: React.FC<LoveQuestionProps> = ({ name, onYes }) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [showHearts, setShowHearts] = useState(false);
  const [escaped, setEscaped] = useState(false);
  const playMeow = useMeow();
  const playChhi = useChhi();

  const handleNoHover = useCallback(() => {
    const x = (Math.random() - 0.5) * 250;
    const y = (Math.random() - 0.5) * 200;
    setNoPos({ x, y });
    setYesScale((s) => Math.min(s + 0.15, 2.2));
    setEscaped(true);
    playChhi();

  }, []);

  const handleYes = () => {
    playMeow();
    setShowHearts(true);
    setTimeout(onYes, 1200);
  };

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in relative">
      {showHearts && <FloatingHearts />}
      <div className="text-6xl animate-wiggle">🐱</div>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center">
        {name}, do you love cats? 💕
      </h2>
      <div className="flex gap-6 items-center relative min-h-[80px]">
        <button
          onClick={handleYes}
          style={{ transform: `scale(${yesScale})` }}
          className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-display font-semibold text-lg
            shadow-lg hover:shadow-xl hover:brightness-110 active:scale-95
            transition-all duration-300 z-10"
        >
          Yes 💖
        </button>
        <button
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          style={{
            transform: `translate(${noPos.x}px, ${noPos.y}px)`,
            position: escaped ? "absolute" : "relative",
          }}
          className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-display font-semibold text-lg
            shadow-md hover:shadow-lg transition-all duration-300 z-10"
        >
          No 😿
        </button>
      </div>
      <p className="text-sm text-muted-foreground italic">
        (Hint: there's only one right answer~)
      </p>
    </div>
  );
};

export default LoveQuestion;
