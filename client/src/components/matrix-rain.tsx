import { useEffect, useRef } from "react";

export function MatrixRain() {
  const matrixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createMatrixRain = () => {
      if (!matrixRef.current) return;
      
      const chars = '01ブルートゥースABCDEF0123456789';
      
      // Clear existing characters
      matrixRef.current.innerHTML = '';
      
      for (let i = 0; i < 50; i++) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDelay = Math.random() * 20 + 's';
        char.style.animationDuration = (Math.random() * 10 + 10) + 's';
        matrixRef.current.appendChild(char);
      }
    };

    createMatrixRain();
    
    // Refresh matrix characters periodically
    const interval = setInterval(createMatrixRain, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return <div ref={matrixRef} className="matrix-bg" />;
}
