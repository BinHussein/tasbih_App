# Tasbih Counter App (Expo + React Native)

A clean, modern Tasbih counter app with dhikr presets, progress tracking, dark mode, haptic feedback, and session history.

## Features

- **Dhikr Presets**
  - SubhanAllah (33)
  - Alhamdulillah (33)
  - Allahu Akbar (34)
  - Selecting a preset resets counter to `0` and updates target.
- **Tap Feedback**
  - Uses `expo-haptics` for light impact feedback on each tap.
  - Falls back to React Native `Vibration` if haptics is unavailable.
- **Dark Mode + Theme Preference**
  - Detects system theme with `useColorScheme`.
  - Supports `system`, `light`, and `dark` modes.
  - Persists preference with AsyncStorage.
- **Circular Progress**
  - Animated circular progress toward selected dhikr target.
  - Live progress text in the center (`count / target`).
- **Dhikr History**
  - Stores completed sessions when target is reached.
  - Each history item includes:
    - Dhikr name
    - Target count
    - Completion date
    - Total taps

## Project Structure

```text
src
 ├── components
 │     ├── CounterButton.js
 │     ├── ProgressCircle.js
 │     └── PresetButtons.js
 │
 ├── screens
 │     ├── HomeScreen.js
 │     └── HistoryScreen.js
 │
 ├── storage
 │     └── dhikrStorage.js
 │
 ├── theme
 │     └── theme.js
 │
 └── App.js
```

## Dependencies

- `expo-haptics`
- `react-native-svg`
- `react-native-circular-progress`
- `@react-native-async-storage/async-storage`

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start Expo:

   ```bash
   npx expo start
   ```

3. Run on device/emulator using Expo Go or simulator options.

## Notes

If dependency installation fails in restricted environments (e.g., private registry rules), run the same commands in a network-enabled local setup.