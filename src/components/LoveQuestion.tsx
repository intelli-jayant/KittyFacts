import React, { useState, useCallback } from "react";
import FloatingHearts from "./FloatingHearts";
import useMeow from "../hooks/useMeow";
import {useWoof} from "../hooks/useSounds";

interface LoveQuestionProps {
  name: string;
  onCat: () => void; 
  onDog: () => void;
}

const LoveQuestion: React.FC<LoveQuestionProps> = ({ name, onCat , onDog }) => {
  const [showHearts, setShowHearts] = useState(false);
  const playMeow = useMeow();
  const playWoof = useWoof();
 



  const handleCat = () => {
    playMeow();
    setShowHearts(true);
    setTimeout(onCat, 1200);
  };

  const handleDog = () => {
    playWoof();
    setShowHearts(true);
    setTimeout(onDog, 1200);
  };

  return (
    <div className="flex flex-col items-center gap-8 animate-fade-in relative">
      {showHearts && <FloatingHearts />}
      <div className="text-6xl animate-wiggle">🐱</div>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center">
        {name}, are you a ....
      </h2>
      <div className="flex gap-6 items-center relative min-h-[80px]">
        <button
          onClick={handleCat}
          className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-display font-semibold text-lg
            shadow-lg hover:shadow-xl hover:brightness-110 active:scale-95
            transition-all duration-300 z-10"
        >
          Cat Person 🐈
        </button>
        <button
          onClick={handleDog}
          className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-display font-semibold text-lg
            shadow-lg hover:shadow-xl hover:brightness-110 active:scale-95
            transition-all duration-300 z-10"
        >
          Dog Person 🐕
        </button>
      </div>
      <p className="text-sm text-muted-foreground italic">
        (Hint: there's only one right answer~)
      </p>
    </div>
  );
};

export default LoveQuestion;
