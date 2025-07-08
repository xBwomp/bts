export function checkBluetoothSupport(): boolean {
  return 'bluetooth' in navigator && typeof navigator.bluetooth?.requestDevice === 'function';
}

export async function requestBluetoothDevice(): Promise<BluetoothDevice> {
  if (!checkBluetoothSupport()) {
    throw new Error('Web Bluetooth API not supported in this browser');
  }

  try {
    // Request device with general filters - Web Bluetooth requires user interaction
    const device = await navigator.bluetooth.requestDevice({
      // Accept all devices
      acceptAllDevices: true,
      optionalServices: [
        'battery_service',
        'device_information',
        'generic_access',
        'generic_attribute',
        'heart_rate',
        'human_interface_device',
      ]
    });

    return device;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'NotFoundError') {
        throw new Error('No Bluetooth device selected');
      } else if (error.name === 'SecurityError') {
        throw new Error('Bluetooth access denied - HTTPS required');
      } else if (error.name === 'NotSupportedError') {
        throw new Error('Bluetooth not supported on this device');
      }
    }
    throw new Error('Failed to request Bluetooth device');
  }
}

export async function connectToDevice(device: BluetoothDevice): Promise<BluetoothRemoteGATTServer> {
  if (!device.gatt) {
    throw new Error('GATT not available on this device');
  }

  try {
    const server = await device.gatt.connect();
    return server;
  } catch (error) {
    throw new Error('Failed to connect to device');
  }
}

export async function getDeviceServices(server: BluetoothRemoteGATTServer): Promise<string[]> {
  try {
    const services = await server.getPrimaryServices();
    return services.map(service => service.uuid);
  } catch (error) {
    console.error('Failed to get device services:', error);
    return [];
  }
}
