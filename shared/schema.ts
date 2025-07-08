import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const bluetoothDevices = pgTable("bluetooth_devices", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  rssi: integer("rssi"),
  services: text("services").array(),
  lastSeen: timestamp("last_seen").notNull(),
  status: text("status").notNull(), // 'discovered', 'connected', 'failed'
});

export const scanLogs = pgTable("scan_logs", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").notNull(),
  level: text("level").notNull(), // 'INFO', 'ERROR', 'SCAN', 'FOUND', 'INIT'
  message: text("message").notNull(),
});

export const insertBluetoothDeviceSchema = createInsertSchema(bluetoothDevices).omit({
  id: true,
});

export const insertScanLogSchema = createInsertSchema(scanLogs).omit({
  id: true,
});

export type InsertBluetoothDevice = z.infer<typeof insertBluetoothDeviceSchema>;
export type BluetoothDevice = typeof bluetoothDevices.$inferSelect;
export type InsertScanLog = z.infer<typeof insertScanLogSchema>;
export type ScanLog = typeof scanLogs.$inferSelect;
