# AREA Platform - Mobile Client

## Overview

React Native mobile application for iOS and Android.

### Features

- ✅ Cross-platform (iOS & Android)
- ✅ TypeScript for type safety
- ✅ React Navigation
- ✅ Modern UI components
- ✅ Offline support (AsyncStorage)
- ✅ API integration

## Quick Start

```bash
cd mobile

# Install dependencies
npm install

# Start dev server
npm run start

# For iOS
npm run ios

# For Android
npm run android
```

## Project Structure

```
mobile/
├── src/
│   ├── App.tsx              # Main app component
│   ├── screens/             # Screen components
│   ├── components/          # Reusable components
│   ├── navigation/          # Navigation setup
│   ├── services/            # API client
│   ├── hooks/               # Custom hooks
│   └── utils/               # Utility functions
├── android/                 # Android native code
├── ios/                     # iOS native code
├── package.json
├── tsconfig.json
├── babel.config.js
└── metro.config.js
```

## Development

### Android

```bash
# Install Android SDK
# Open android/ directory in Android Studio

# Run
npm run android

# Debug
npm run android -- --help
```

### iOS

```bash
# Install dependencies
cd ios && pod install && cd ..

# Run
npm run ios

# Build
npm run ios -- --configuration Release
```

## Testing

```bash
npm run test
npm run test:watch
npm run test:coverage
```

## Debugging

- React Native Debugger
- Chrome DevTools
- Android Studio Debugger
- Xcode Debugger

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md)

## License

MIT - See [LICENSE](../LICENSE)
