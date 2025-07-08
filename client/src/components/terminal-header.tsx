import { useState, useEffect } from "react";

export function TerminalHeader() {
  const [currentTime, setCurrentTime] = useState(new Date().toTimeString().split(' ')[0]);
  const [initText, setInitText] = useState('');
  
  const fullText = '> Initializing Bluetooth LE Scanner...';

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toTimeString().split(' ')[0]);
    }, 1000);

    // Typing animation
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setInitText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => {
      clearInterval(timeInterval);
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <div className="terminal-glow bg-darker-gray border cyber-border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-cyber-cyan text-sm">
          <span className="animate-pulse">●</span> BLUEHACK TERMINAL v2.4.7
        </div>
        <div className="text-hacker-amber text-xs">
          {currentTime}
        </div>
      </div>
      <div className="text-xs text-matrix-green opacity-75">
        <div className="overflow-hidden whitespace-nowrap">
          {initText}
        </div>
      </div>
    </div>
  );
}
