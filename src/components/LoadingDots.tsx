import React from "react";

const LoadingDots: React.FC = () => (
  <div className="flex items-center justify-center gap-2 py-8">
    <span className="text-3xl bounce-dot">🐱</span>
    <span className="text-3xl bounce-dot">🐶</span>
    <span className="text-3xl bounce-dot">🐱</span>
  </div>
);

export default LoadingDots;
