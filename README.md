# BlueHack Terminal - Bluetooth LE Scanner

A cyberpunk-themed Bluetooth Low Energy scanner web application inspired by the movie "Hackers". Features a terminal-style interface with Matrix-inspired animations and real-time device discovery.

## Features

- 🎯 **Bluetooth LE Scanning**: Discover nearby Bluetooth devices using Web Bluetooth API
- 🖥️ **Terminal Interface**: Authentic hacker terminal aesthetics with green glow effects
- 🌧️ **Matrix Rain**: Animated background with falling characters
- 📊 **Real-time Display**: Live device discovery with signal strength and status
- 📝 **System Logging**: Color-coded log entries for all system activities
- 💾 **Data Export**: Export discovered devices to JSON/CSV formats
- 📱 **Mobile Optimized**: Responsive design for mobile and desktop

## Live Demo

[View Live Demo](https://your-project-id.web.app)

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + Firebase Functions
- **UI Library**: shadcn/ui + Tailwind CSS
- **Database**: In-memory storage (easily extensible to Firestore)
- **APIs**: Web Bluetooth API for device scanning

## Browser Compatibility

- ✅ Chrome (Desktop & Android)
- ✅ Edge (Desktop & Android) 
- ❌ Safari (Web Bluetooth not supported)
- ❌ Firefox (Web Bluetooth not supported)

**Note**: HTTPS is required for Web Bluetooth API to function.

## Local Development

### Prerequisites

- Node.js 20+
- Firebase CLI (for deployment)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bluetooth-scanner.git
cd bluetooth-scanner
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open https://localhost:5000 in Chrome or Edge

### Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and API clients
│   │   └── pages/          # Route components
├── server/                 # Development Express server
├── functions/              # Firebase Functions (production)
├── shared/                 # Shared TypeScript types
└── firebase.json           # Firebase configuration
```

## Firebase Deployment

### Initial Setup

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Create a new Firebase project:
```bash
firebase projects:create your-project-id
```

4. Update `.firebaserc` with your project ID:
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### Deploy

1. Build the application:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
firebase deploy
```

Your app will be available at: `https://your-project-id.web.app`

## Usage

1. **Open in supported browser** (Chrome/Edge with HTTPS)
2. **Click "START SCAN"** to initiate device discovery
3. **Grant permissions** when prompted for Bluetooth access
4. **View discovered devices** in the scanner display
5. **Monitor activity** in the system log
6. **Export data** using the "DUMP LOGS" button

## Security & Privacy

- All Bluetooth interactions require explicit user consent
- No device data is stored permanently (in-memory only)
- HTTPS required for all Bluetooth operations
- User can revoke device permissions at any time

## Limitations

- **Web Bluetooth API constraints**: Limited compared to native apps
- **Browser support**: Chrome/Edge only
- **Device access**: Only devices that are actively advertising
- **iOS compatibility**: Not supported due to Safari limitations

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Educational Purpose

This application is designed for educational purposes to demonstrate:
- Web Bluetooth API capabilities and limitations
- Modern React development patterns
- Firebase deployment strategies
- Cyberpunk UI design principles

**Disclaimer**: This tool is for educational and research purposes only. Always respect device privacy and obtain proper permissions before scanning.