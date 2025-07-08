# Bluetooth LE Scanner Application

## Overview

This is a full-stack web application that provides a cyberpunk-themed Bluetooth Low Energy (BLE) scanner interface. The application allows users to scan for and discover nearby Bluetooth devices through a terminal-style UI with Matrix-inspired visual effects.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend:

- **Frontend**: React-based SPA with TypeScript, using Vite for development and building
- **Backend**: Express.js REST API server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for data persistence
- **Styling**: Tailwind CSS with shadcn/ui components for consistent UI design
- **Build System**: Vite for frontend bundling, esbuild for backend compilation

## Key Components

### Frontend Architecture
- **React 18** with TypeScript for type safety
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and caching
- **shadcn/ui** component library built on Radix UI primitives
- **Tailwind CSS** for utility-first styling with custom cyberpunk theme
- **Web Bluetooth API** integration for browser-based device scanning

### Backend Architecture
- **Express.js** server with TypeScript
- **RESTful API** design with structured endpoints
- **In-memory storage** with interface for future database integration
- **Middleware** for request logging and error handling
- **CORS and security** considerations for web deployment

### Database Schema
The application uses Drizzle ORM with PostgreSQL, defining two main entities:

1. **bluetooth_devices**: Stores discovered BLE devices with metadata
   - Device name, MAC address, RSSI signal strength
   - Service UUIDs, connection status, last seen timestamp

2. **scan_logs**: System activity logging
   - Timestamped log entries with severity levels
   - Scan events, device discoveries, errors

### UI/UX Design
- **Cyberpunk aesthetic** with Matrix-inspired green terminal colors
- **Responsive design** that works on desktop and mobile
- **Real-time updates** through polling and optimistic UI updates
- **Terminal-style logging** with animated text effects
- **Status indicators** for scan state and device connectivity

## Data Flow

1. **Device Scanning**: User initiates scan through control panel
2. **Web Bluetooth**: Browser requests device access via Web Bluetooth API
3. **Device Discovery**: Found devices sent to backend via POST /api/devices
4. **Data Persistence**: Devices stored in database with metadata
5. **Real-time Updates**: Frontend polls for updated device lists
6. **Log Management**: All activities logged to system log endpoint

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL database driver optimized for serverless
- **drizzle-orm**: Type-safe ORM with schema migrations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI component primitives
- **class-variance-authority**: Type-safe component variants

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing pipeline

### Browser APIs
- **Web Bluetooth API**: Direct device scanning (requires HTTPS)
- **Service Worker**: For potential offline functionality

## Deployment Strategy

The application is configured for multiple deployment scenarios:

### Development
- Vite dev server with HMR for frontend
- Node.js/tsx for backend development
- In-memory storage for rapid prototyping

### Production (Firebase)
- Static assets built with Vite and served via Firebase Hosting
- Express server running on Firebase Functions
- In-memory storage (can be extended to Firestore)
- Automatic HTTPS (required for Web Bluetooth API)
- Optimized for serverless deployment

### Firebase Configuration
- `firebase.json`: Hosting and Functions configuration
- `functions/`: Firebase Functions backend code
- Automatic routing from `/api/**` to Functions
- SPA routing for frontend paths

### Database Setup
- Currently using in-memory storage for demo purposes
- Drizzle ORM ready for database integration
- Can be extended to use Firestore for persistence

## Changelog
- July 08, 2025: Initial setup with cyberpunk-themed Bluetooth LE scanner
- July 08, 2025: Added Firebase deployment configuration and documentation

## User Preferences

Preferred communication style: Simple, everyday language.