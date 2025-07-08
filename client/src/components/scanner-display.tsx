import type { BluetoothDevice } from "@shared/schema";

interface ScannerDisplayProps {
  devices: BluetoothDevice[];
  isScanning: boolean;
  isLoading: boolean;
}

export function ScannerDisplay({ devices, isScanning, isLoading }: ScannerDisplayProps) {
  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'connected':
        return 'status-connected';
      case 'failed':
        return 'status-failed';
      default:
        return 'status-scanning';
    }
  };

  const getSignalStrength = (rssi: number | null) => {
    if (!rssi) return 'N/A';
    return `${rssi} dBm`;
  };

  const getTimeSince = (lastSeen: string | Date) => {
    const now = new Date();
    const seen = new Date(lastSeen);
    const diffMs = now.getTime() - seen.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    
    if (diffSecs < 60) return `${diffSecs}s ago`;
    if (diffSecs < 3600) return `${Math.floor(diffSecs / 60)}m ago`;
    return `${Math.floor(diffSecs / 3600)}h ago`;
  };

  return (
    <div className="terminal-glow bg-darker-gray border cyber-border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-cyber-cyan text-lg">BLUETOOTH LE DEVICES</h2>
        <div className="text-xs text-matrix-green">
          {devices.length} devices detected
        </div>
      </div>
      
      {/* Scanner Radar */}
      <div className="relative w-full h-32 bg-dark-gray rounded-lg mb-4 overflow-hidden border border-matrix-green">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 border-2 border-matrix-green rounded-full animate-ping opacity-30"></div>
          <div className="absolute w-16 h-16 border-2 border-cyber-cyan rounded-full animate-pulse"></div>
          <div className="absolute w-8 h-8 border-2 border-hacker-amber rounded-full animate-pulse"></div>
        </div>
        <div className="absolute top-2 left-2 text-xs text-matrix-green">
          <div>{isScanning ? 'SCANNING...' : 'STANDBY'}</div>
        </div>
        <div className="absolute top-2 right-2 text-xs text-cyber-cyan">
          Range: <span>100m</span>
        </div>
      </div>
      
      {/* Device List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="text-center text-matrix-green py-8">
            <div className="animate-pulse">Loading devices...</div>
          </div>
        ) : devices.length === 0 ? (
          <div className="text-center text-matrix-green py-8">
            <div>No devices discovered</div>
            <div className="text-xs text-cyber-cyan mt-2">
              {isScanning ? 'Scanning for devices...' : 'Start scan to discover devices'}
            </div>
          </div>
        ) : (
          devices.map((device) => (
            <div key={device.id} className="device-entry bg-dark-gray border border-matrix-green rounded p-3 cyber-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`status-indicator ${getStatusIndicator(device.status)}`}></span>
                  <div>
                    <div className="text-matrix-green font-semibold">{device.name}</div>
                    <div className="text-xs text-cyber-cyan">{device.address}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-hacker-amber text-sm">{getSignalStrength(device.rssi)}</div>
                  <div className="text-xs text-matrix-green opacity-75">{getTimeSince(device.lastSeen)}</div>
                </div>
              </div>
              {device.services && device.services.length > 0 && (
                <div className="mt-2 text-xs text-cyber-cyan">
                  Services: {device.services.join(', ')}
                </div>
              )}
              {device.status === 'failed' && (
                <div className="mt-2 text-xs text-terminal-red">
                  Connection failed: Access denied
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
