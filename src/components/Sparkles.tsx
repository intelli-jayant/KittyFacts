import React from "react";

interface SparklesProps {
  count?: number;
}

const Sparkles: React.FC<SparklesProps> = ({ count = 8 }) => {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    size: 8 + Math.random() * 12,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute animate-sparkle text-primary"
          style={{
            left: s.left,
            top: s.top,
            animationDelay: s.delay,
            fontSize: s.size,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
};

export default Sparkles;
