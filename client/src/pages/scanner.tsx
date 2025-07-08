import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { MatrixRain } from "@/components/matrix-rain";
import { TerminalHeader } from "@/components/terminal-header";
import { ControlPanel } from "@/components/control-panel";
import { ScannerDisplay } from "@/components/scanner-display";
import { TerminalLog } from "@/components/terminal-log";
import { useBluetooth } from "@/hooks/use-bluetooth";
import { apiRequest } from "@/lib/queryClient";
import type { BluetoothDevice, ScanLog } from "@shared/schema";

export default function Scanner() {
  const queryClient = useQueryClient();
  const [isScanning, setIsScanning] = useState(false);
  const [scanMode, setScanMode] = useState("PASSIVE SCAN");
  
  const { isBluetoothSupported, scanForDevices, stopScanning } = useBluetooth();

  // Fetch devices from server
  const { data: devices = [], isLoading: devicesLoading } = useQuery<BluetoothDevice[]>({
    queryKey: ["/api/devices"],
    refetchInterval: isScanning ? 2000 : false,
  });

  // Fetch logs from server
  const { data: logs = [], isLoading: logsLoading } = useQuery<ScanLog[]>({
    queryKey: ["/api/logs"],
    refetchInterval: 1000,
  });

  // Add device mutation
  const addDeviceMutation = useMutation({
    mutationFn: async (device: Omit<BluetoothDevice, 'id'>) => {
      return await apiRequest('POST', '/api/devices', device);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/devices"] });
    },
  });

  // Add log mutation
  const addLogMutation = useMutation({
    mutationFn: async (log: Omit<ScanLog, 'id'>) => {
      return await apiRequest('POST', '/api/logs', log);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/logs"] });
    },
  });

  // Clear logs mutation
  const clearLogsMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('DELETE', '/api/logs');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/logs"] });
    },
  });

  // Export data mutation
  const exportDataMutation = useMutation({
    mutationFn: async (format: 'json' | 'csv') => {
      const response = await fetch(`/api/export/devices?format=${format}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bluetooth_devices.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    },
  });

  const addLog = (level: string, message: string) => {
    addLogMutation.mutate({
      timestamp: new Date(),
      level,
      message,
    });
  };

  const handleToggleScan = async () => {
    if (isScanning) {
      stopScanning();
      setIsScanning(false);
      addLog('SCAN', 'Device discovery stopped');
    } else {
      if (!isBluetoothSupported) {
        addLog('ERROR', 'Web Bluetooth API not supported in this browser');
        return;
      }

      try {
        setIsScanning(true);
        addLog('SCAN', 'Starting BLE device discovery...');
        
        await scanForDevices((device) => {
          addDeviceMutation.mutate({
            name: device.name || 'UNKNOWN_DEVICE',
            address: device.id,
            rssi: null, // Web Bluetooth API doesn't provide RSSI
            services: [], // Services would be populated after connection
            lastSeen: new Date(),
            status: 'discovered',
          });
          
          addLog('FOUND', `Device discovered: ${device.name || 'UNKNOWN_DEVICE'}`);
        });
      } catch (error) {
        setIsScanning(false);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        addLog('ERROR', `Scan failed: ${errorMessage}`);
      }
    }
  };

  const handleExportData = () => {
    exportDataMutation.mutate('json');
    addLog('INFO', 'Device data exported to JSON');
  };

  const handleClearLogs = () => {
    clearLogsMutation.mutate();
  };

  // Initialize the app
  useEffect(() => {
    addLog('INIT', 'BlueHack Terminal initialized');
    if (isBluetoothSupported) {
      addLog('INFO', 'Web Bluetooth API ready');
    } else {
      addLog('ERROR', 'Web Bluetooth API not supported (Chrome/Edge required)');
    }
  }, [isBluetoothSupported]);

  return (
    <div className="min-h-screen bg-deep-black text-matrix-green overflow-x-hidden">
      <MatrixRain />
      
      {/* Scan Line Effect */}
      <div className="scan-line"></div>
      
      <div className="relative z-20 min-h-screen p-4">
        <TerminalHeader />
        
        <ControlPanel
          isScanning={isScanning}
          onToggleScan={handleToggleScan}
          scanMode={scanMode}
          onScanModeChange={setScanMode}
          onExportData={handleExportData}
          isExporting={exportDataMutation.isPending}
        />
        
        <ScannerDisplay
          devices={devices}
          isScanning={isScanning}
          isLoading={devicesLoading}
        />
        
        <TerminalLog
          logs={logs}
          isLoading={logsLoading}
          onClearLogs={handleClearLogs}
          isClearing={clearLogsMutation.isPending}
        />
        
        <div className="mt-6 text-center text-xs text-matrix-green opacity-50">
          <div>BlueHack Terminal - Educational Bluetooth Scanner</div>
          <div>⚠️ Web Bluetooth API limitations apply - HTTPS required</div>
        </div>
      </div>
    </div>
  );
}
