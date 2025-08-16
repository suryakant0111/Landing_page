import React, { useEffect, useRef } from 'react';

export const MetallicText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Create the metallic effect
    const text = textRef.current;
    text.style.background = 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 30%, #e2e8f0 60%, #94a3b8 100%)';
    text.style.backgroundSize = '200% auto';
    text.style.backgroundClip = 'text';
    text.style.webkitBackgroundClip = 'text';
    text.style.webkitTextFillColor = 'transparent';
    text.style.animation = 'metallicShine 3s linear infinite';
    
    // Add keyframes for the animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes metallicShine {
        0% { background-position: 0% center; }
        100% { background-position: 200% center; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <span 
      ref={textRef}
      className="inline-block"
    >
      {children}
    </span>
  );
};

export default MetallicText;
