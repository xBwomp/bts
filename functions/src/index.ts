import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

// Initialize Express app
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// In-memory storage for demo purposes
// In production, you'd want to use Firestore
let devices: any[] = [];
let logs: any[] = [];
let deviceIdCounter = 1;
let logIdCounter = 1;

// Routes
app.get("/api/devices", (req, res) => {
  const sortedDevices = devices.sort((a, b) => 
    new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
  );
  res.json(sortedDevices);
});

app.post("/api/devices", (req, res) => {
  try {
    const deviceData = req.body;
    
    // Check if device already exists
    const existingDeviceIndex = devices.findIndex(d => d.address === deviceData.address);
    
    if (existingDeviceIndex >= 0) {
      // Update existing device
      devices[existingDeviceIndex] = {
        ...devices[existingDeviceIndex],
        ...deviceData,
      };
      res.json(devices[existingDeviceIndex]);
    } else {
      // Create new device
      const device = {
        ...deviceData,
        id: deviceIdCounter++,
      };
      devices.push(device);
      res.json(device);
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid device data" });
  }
});

app.get("/api/logs", (req, res) => {
  const sortedLogs = logs.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  res.json(sortedLogs);
});

app.post("/api/logs", (req, res) => {
  try {
    const logData = req.body;
    const log = {
      ...logData,
      id: logIdCounter++,
      timestamp: new Date(logData.timestamp),
    };
    logs.push(log);
    res.json(log);
  } catch (error) {
    res.status(400).json({ message: "Invalid log data" });
  }
});

app.delete("/api/logs", (req, res) => {
  logs = [];
  res.json({ message: "Logs cleared" });
});

app.get("/api/export/devices", (req, res) => {
  try {
    const format = (req.query.format as string) || 'json';
    
    if (format === 'csv') {
      const csv = [
        'Name,Address,RSSI,Services,Last Seen,Status',
        ...devices.map(d => `"${d.name}","${d.address}",${d.rssi || 'N/A'},"${d.services?.join(';') || ''}","${d.lastSeen}","${d.status}"`)
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

// Export the Express app as a Firebase Function
export const api = functions.https.onRequest(app);