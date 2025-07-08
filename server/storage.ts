import { bluetoothDevices, scanLogs, type BluetoothDevice, type InsertBluetoothDevice, type ScanLog, type InsertScanLog } from "@shared/schema";

export interface IStorage {
  // Bluetooth devices
  getBluetoothDevices(): Promise<BluetoothDevice[]>;
  createBluetoothDevice(device: InsertBluetoothDevice): Promise<BluetoothDevice>;
  updateBluetoothDevice(address: string, updates: Partial<InsertBluetoothDevice>): Promise<BluetoothDevice | undefined>;
  
  // Scan logs
  getScanLogs(): Promise<ScanLog[]>;
  createScanLog(log: InsertScanLog): Promise<ScanLog>;
  clearScanLogs(): Promise<void>;
}

export class MemStorage implements IStorage {
  private devices: Map<string, BluetoothDevice>;
  private logs: Map<number, ScanLog>;
  private currentDeviceId: number;
  private currentLogId: number;

  constructor() {
    this.devices = new Map();
    this.logs = new Map();
    this.currentDeviceId = 1;
    this.currentLogId = 1;
  }

  async getBluetoothDevices(): Promise<BluetoothDevice[]> {
    return Array.from(this.devices.values()).sort((a, b) => 
      new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
    );
  }

  async createBluetoothDevice(insertDevice: InsertBluetoothDevice): Promise<BluetoothDevice> {
    const device: BluetoothDevice = {
      ...insertDevice,
      id: this.currentDeviceId++,
    };
    this.devices.set(device.address, device);
    return device;
  }

  async updateBluetoothDevice(address: string, updates: Partial<InsertBluetoothDevice>): Promise<BluetoothDevice | undefined> {
    const existingDevice = this.devices.get(address);
    if (!existingDevice) return undefined;
    
    const updatedDevice: BluetoothDevice = {
      ...existingDevice,
      ...updates,
    };
    this.devices.set(address, updatedDevice);
    return updatedDevice;
  }

  async getScanLogs(): Promise<ScanLog[]> {
    return Array.from(this.logs.values()).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  async createScanLog(insertLog: InsertScanLog): Promise<ScanLog> {
    const log: ScanLog = {
      ...insertLog,
      id: this.currentLogId++,
    };
    this.logs.set(log.id, log);
    return log;
  }

  async clearScanLogs(): Promise<void> {
    this.logs.clear();
  }
}

export const storage = new MemStorage();
