import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = '@tasbih_history';
const THEME_KEY = '@tasbih_theme_preference';
const STREAK_KEY = '@tasbih_streak_data'; // New key for tracking daily usage
const PRESETS_KEY = '@tasbih_custom_presets'; // New key for user-edited dhikr

/**
 * --- HISTORY & SESSIONS ---
 */
export const saveCompletedSession = async (session) => {
  const existing = await getDhikrHistory();
  const updated = [session, ...existing];
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  await updateStreak(); // Update streak every time a session is completed
};

export const getDhikrHistory = async () => {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

/**
 * --- STREAK LOGIC ---
 */
export const updateStreak = async () => {
  try {
    const raw = await AsyncStorage.getItem(STREAK_KEY);
    let data = raw ? JSON.parse(raw) : { currentStreak: 0, lastDate: null };
    
    const today = new Date().toLocaleDateString();
    
    if (data.lastDate === today) return; // Already counted today

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toLocaleDateString();

    if (data.lastDate === yesterdayStr) {
      data.currentStreak += 1;
    } else {
      data.currentStreak = 1; // Streak broken, start new
    }

    data.lastDate = today;
    await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to update streak", e);
  }
};

export const getStreakData = async () => {
  const raw = await AsyncStorage.getItem(STREAK_KEY);
  return raw ? JSON.parse(raw) : { currentStreak: 0, lastDate: null };
};

/**
 * --- CUSTOM PRESETS ---
 */
export const saveCustomPresets = async (presets) => {
  await AsyncStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
};

export const getCustomPresets = async (defaultPresets) => {
  const raw = await AsyncStorage.getItem(PRESETS_KEY);
  return raw ? JSON.parse(raw) : defaultPresets;
};

/**
 * --- THEME PREFERENCE ---
 */
export const saveThemePreference = async (preference) => {
  await AsyncStorage.setItem(THEME_KEY, preference);
};

export const getThemePreference = async () => {
  const preference = await AsyncStorage.getItem(THEME_KEY);
  return preference || 'system';
};