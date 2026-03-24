import React from "react";

const FloatingHearts: React.FC = () => {
  const hearts = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    left: `${20 + Math.random() * 60}%`,
    delay: `${i * 0.2}s`,
  }));

  return (
    <>
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute animate-heart-float text-2xl pointer-events-none"
          style={{ left: h.left, bottom: "40%", animationDelay: h.delay }}
        >
          💖
        </span>
      ))}
    </>
  );
};

export default FloatingHearts;
