import React, { useState } from "react";
import { useName } from "../hooks/useSounds";

interface NameScreenProps {
  onContinue: (name: string) => void;
}

const NameScreen: React.FC<NameScreenProps> = ({ onContinue }) => {
  const [name, setName] = useState("");
  const playName = useName();

  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in">
      <div className="text-7xl animate-float">🐱</div>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center">
        Welcome, Cutie! 🌸
      </h1>
      <p className="text-lg text-muted-foreground text-center font-body">
        Before we start, tell me your name~
      </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name here... ✨"
        className="w-72 px-5 py-3 rounded-full border-2 border-primary/40 bg-card text-foreground text-center text-lg font-body
          focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-300
          placeholder:text-muted-foreground/60"
        onKeyDown={(e) => e.key === "Enter" && name.trim() && onContinue(name.trim())}
      />
      <button
        onClick={() => { playName(); name.trim() && onContinue(name.trim()); }}
        disabled={!name.trim()}
        className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-display font-semibold text-lg
          shadow-lg hover:shadow-xl hover:scale-110 active:scale-95
          transition-all duration-300 animate-pulse-glow
          disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none"
      >
        Continue 🐾
      </button>
    </div>
  );
};

export default NameScreen;
