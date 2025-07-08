import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ControlPanelProps {
  isScanning: boolean;
  onToggleScan: () => void;
  scanMode: string;
  onScanModeChange: (mode: string) => void;
  onExportData: () => void;
  isExporting: boolean;
}

export function ControlPanel({
  isScanning,
  onToggleScan,
  scanMode,
  onScanModeChange,
  onExportData,
  isExporting
}: ControlPanelProps) {
  return (
    <div className="terminal-glow bg-darker-gray border cyber-border rounded-lg p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Scan Control */}
        <div className="space-y-2">
          <label className="text-cyber-cyan text-sm">SCAN CONTROL</label>
          <Button
            onClick={onToggleScan}
            className={`w-full py-2 px-4 rounded transition-all duration-300 cyber-border ${
              isScanning
                ? 'bg-dark-gray border-terminal-red text-terminal-red hover:bg-terminal-red hover:text-deep-black'
                : 'bg-dark-gray border-matrix-green text-matrix-green hover:bg-matrix-green hover:text-deep-black'
            }`}
            variant="outline"
          >
            <span className={`status-indicator ${isScanning ? 'status-scanning' : 'status-connected'} mr-2`}></span>
            {isScanning ? 'STOP SCAN' : 'START SCAN'}
          </Button>
        </div>
        
        {/* Connection Mode */}
        <div className="space-y-2">
          <label className="text-cyber-cyan text-sm">MODE</label>
          <Select value={scanMode} onValueChange={onScanModeChange}>
            <SelectTrigger className="w-full bg-dark-gray border border-matrix-green text-matrix-green cyber-border focus:ring-2 focus:ring-matrix-green">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-dark-gray border border-matrix-green text-matrix-green">
              <SelectItem value="PASSIVE SCAN">PASSIVE SCAN</SelectItem>
              <SelectItem value="ACTIVE SCAN">ACTIVE SCAN</SelectItem>
              <SelectItem value="DEEP PROBE">DEEP PROBE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Export Data */}
        <div className="space-y-2">
          <label className="text-cyber-cyan text-sm">EXPORT</label>
          <Button
            onClick={onExportData}
            disabled={isExporting}
            className="w-full bg-dark-gray border border-electric-blue text-electric-blue py-2 px-4 rounded hover:bg-electric-blue hover:text-deep-black transition-all duration-300"
            variant="outline"
          >
            {isExporting ? 'DUMPING...' : 'DUMP LOGS'}
          </Button>
        </div>
      </div>
    </div>
  );
}
