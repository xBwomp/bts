import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBluetoothDeviceSchema, insertScanLogSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all discovered Bluetooth devices
  app.get("/api/devices", async (_req, res) => {
    try {
      const devices = await storage.getBluetoothDevices();
      res.json(devices);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch devices" });
    }
  });

  // Add or update a Bluetooth device
  app.post("/api/devices", async (req, res) => {
    try {
      const deviceData = insertBluetoothDeviceSchema.parse(req.body);
      
      // Check if device already exists
      const devices = await storage.getBluetoothDevices();
      const existingDevice = devices.find(d => d.address === deviceData.address);
      
      let device;
      if (existingDevice) {
        device = await storage.updateBluetoothDevice(deviceData.address, deviceData);
      } else {
        device = await storage.createBluetoothDevice(deviceData);
      }
      
      res.json(device);
    } catch (error) {
      res.status(400).json({ message: "Invalid device data" });
    }
  });

  // Get scan logs
  app.get("/api/logs", async (_req, res) => {
    try {
      const logs = await storage.getScanLogs();
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch logs" });
    }
  });

  // Add scan log entry
  app.post("/api/logs", async (req, res) => {
    try {
      const logData = insertScanLogSchema.parse(req.body);
      const log = await storage.createScanLog(logData);
      res.json(log);
    } catch (error) {
      res.status(400).json({ message: "Invalid log data" });
    }
  });

  // Clear scan logs
  app.delete("/api/logs", async (_req, res) => {
    try {
      await storage.clearScanLogs();
      res.json({ message: "Logs cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear logs" });
    }
  });

  // Export devices data
  app.get("/api/export/devices", async (req, res) => {
    try {
      const format = req.query.format as string || 'json';
      const devices = await storage.getBluetoothDevices();
      
      if (format === 'csv') {
        const csv = [
          'Name,Address,RSSI,Services,Last Seen,Status',
          ...devices.map(d => `"${d.name}","${d.address}",${d.rssi},"${d.services?.join(';') || ''}","${d.lastSeen}","${d.status}"`)
        ].join('\n');
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=bluetooth_devices.csv');
        res.send(csv);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=bluetooth_devices.json');
        res.json(devices);
      }
    } catch (error) {
      res.status(500).json({ message: "Export failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
