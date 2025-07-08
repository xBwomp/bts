import { useCallback, useRef } from "react";
import { checkBluetoothSupport, requestBluetoothDevice } from "@/lib/bluetooth-api";

export function useBluetooth() {
  const scanningRef = useRef(false);
  const isBluetoothSupported = checkBluetoothSupport();

  const scanForDevices = useCallback(async (onDeviceFound: (device: BluetoothDevice) => void) => {
    if (!isBluetoothSupported) {
      throw new Error('Web Bluetooth API not supported');
    }

    scanningRef.current = true;

    try {
      const device = await requestBluetoothDevice();
      if (device && scanningRef.current) {
        onDeviceFound(device);
      }
    } catch (error) {
      scanningRef.current = false;
      throw error;
    }
  }, [isBluetoothSupported]);

  const stopScanning = useCallback(() => {
    scanningRef.current = false;
  }, []);

  return {
    isBluetoothSupported,
    scanForDevices,
    stopScanning,
  };
}
