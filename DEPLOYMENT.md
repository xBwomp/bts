# Firebase Deployment Guide

## Manual Git Setup & Deployment Steps

Since our current environment doesn't support Git operations, you'll need to manually set up the repository and deploy to Firebase. Here's the complete step-by-step process:

## Step 1: Download Project Files

1. Download all project files from your current Replit environment
2. Create a new folder on your local machine for the project

## Step 2: Initialize Git Repository

```bash
# Navigate to your project folder
cd bluetooth-scanner

# Initialize Git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Bluetooth LE Scanner with cyberpunk theme"

# Add remote repository (replace with your GitHub/GitLab URL)
git remote add origin https://github.com/yourusername/bluetooth-scanner.git

# Push to remote
git push -u origin main
```

## Step 3: Firebase Setup

### Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Login and Initialize
```bash
# Login to Firebase
firebase login

# Create new Firebase project (or use existing)
firebase projects:create your-project-id

# Update .firebaserc with your project ID
```

### Update Project Configuration
Edit `.firebaserc`:
```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

## Step 4: Deploy to Firebase

### Build and Deploy
```bash
# Install dependencies
npm install

# Build the application
npm run build

# Install Functions dependencies
cd functions
npm install
npm run build
cd ..

# Deploy to Firebase
firebase deploy
```

## Step 5: Enable HTTPS (Required for Web Bluetooth)

Firebase Hosting automatically provides HTTPS, which is required for the Web Bluetooth API to function.

Your app will be available at: `https://your-project-id.web.app`

## Project Structure for Firebase

```
├── dist/                   # Built frontend (auto-generated)
├── functions/              # Firebase Functions
│   ├── src/
│   │   └── index.ts       # API endpoints
│   ├── package.json       # Functions dependencies
│   └── tsconfig.json      # TypeScript config
├── firebase.json          # Firebase configuration
├── .firebaserc           # Project configuration
└── [rest of project files]
```

## Environment Variables (Optional)

For production deployments, you may want to add environment variables:

```bash
# Set Firebase config
firebase functions:config:set app.env="production"

# Deploy with new config
firebase deploy --only functions
```

## Troubleshooting

### Common Issues:

1. **Web Bluetooth not working**: Ensure you're accessing via HTTPS
2. **Functions not deploying**: Check Node.js version (20+ required)
3. **CORS errors**: Make sure Firebase Functions include CORS middleware

### Testing Locally:

```bash
# Serve locally with Firebase emulators
firebase serve

# Or run the development server
npm run dev
```

## Security Considerations

- Web Bluetooth requires HTTPS (Firebase provides this automatically)
- User consent is required for all Bluetooth operations
- No sensitive data is stored (all in-memory for demo)
- Consider adding Firestore for persistent storage in production

## Next Steps

1. **Custom Domain**: Add your own domain in Firebase Console
2. **Analytics**: Enable Firebase Analytics for usage tracking
3. **Performance**: Monitor performance with Firebase Performance
4. **Database**: Replace in-memory storage with Firestore for persistence

## Support

If you encounter issues:
1. Check Firebase Console for deployment logs
2. Use `firebase logs` to view function logs
3. Test locally with `firebase serve` before deploying