# Trip Planner System - Project Requirements

## 💻 System Requirements

- Operating System: Windows 10/11, macOS, or Linux
- Node.js: Version 14 or higher
- npm: Version 6 or higher
- Expo CLI: Latest version (`npm install -g expo-cli`)
- Text Editor: Visual Studio Code (recommended)
- Mobile Device: Android/iOS with Expo Go app installed
- Emulator (optional): Android Studio or Xcode for virtual testing

---

## 📦 Project Dependencies

Install using `npm install`:

- react-native
- expo
- react-navigation
- react-native-screens
- react-native-safe-area-context
- @react-navigation/native
- @react-navigation/native-stack
- axios
- typescript
- firebase
- any other packages listed in `package.json`

---

## 🔧 Development Tools

- Visual Studio Code (with extensions like ESLint, Prettier, React Native Tools)
- Expo Go app (for mobile preview)
- Git and GitHub (for version control and collaboration)

---

## 🔥 Firebase Integration

- Firebase is used for:
  - Authentication
  - Real-time database or Firestore
  - Cloud Storage (optional)
  - Hosting (if deployed)
- You will need a **Firebase project** set up at [https://console.firebase.google.com](https://console.firebase.google.com)
- Add your Firebase config in the app (usually inside `firebaseConfig.js` or `.env` file)
- Install Firebase SDK:
  ```bash
  npm install firebase
