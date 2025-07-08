import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import type { ScanLog } from "@shared/schema";

interface TerminalLogProps {
  logs: ScanLog[];
  isLoading: boolean;
  onClearLogs: () => void;
  isClearing: boolean;
}

export function TerminalLog({ logs, isLoading, onClearLogs, isClearing }: TerminalLogProps) {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const getTypeColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'text-terminal-red';
      case 'FOUND':
        return 'text-electric-blue';
      case 'INIT':
        return 'text-hacker-amber';
      case 'SCAN':
        return 'text-matrix-green';
      default:
        return 'text-matrix-green';
    }
  };

  const formatTime = (timestamp: string | Date) => {
    return new Date(timestamp).toTimeString().split(' ')[0];
  };

  return (
    <div className="terminal-glow bg-darker-gray border cyber-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-cyber-cyan text-lg">SYSTEM LOG</h3>
        <Button
          onClick={onClearLogs}
          disabled={isClearing}
          className="text-xs text-hacker-amber hover:text-matrix-green transition-colors bg-transparent border-none p-0 h-auto"
          variant="ghost"
        >
          {isClearing ? '[CLEARING...]' : '[CLEAR]'}
        </Button>
      </div>
      
      <div ref={logRef} className="space-y-1 max-h-64 overflow-y-auto text-sm">
        {isLoading ? (
          <div className="text-matrix-green animate-pulse">Loading logs...</div>
        ) : logs.length === 0 ? (
          <div className="text-matrix-green opacity-50">No log entries</div>
        ) : (
          logs
            .slice()
            .reverse()
            .map((log) => (
              <div key={log.id} className="text-matrix-green">
                <span className="text-cyber-cyan">[{formatTime(log.timestamp)}]</span>{' '}
                <span className={getTypeColor(log.level)}>{log.level}</span>{' '}
                {log.message}
              </div>
            ))
        )}
      </div>
    </div>
  );
}
