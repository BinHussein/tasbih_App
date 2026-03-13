import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, useColorScheme } from 'react-native';
import * as Haptics from 'expo-haptics';
import * as SplashScreen from 'expo-splash-screen';
import * as KeepAwake from 'expo-keep-awake';
import { useAudioPlayer } from 'expo-audio'; // Mpya: Kwa ajili ya SDK 54

// Import Screens
import CategoryScreen from './screens/CategoryScreen';
import DhikrSelectionScreen from './screens/DhikrSelectionScreen';
import HomeScreen from './screens/HomeScreen';
import HistoryScreen from './screens/HistoryScreen';

// Import Storage Logic
import {
  getDhikrHistory,
  getThemePreference,
  saveCompletedSession,
  saveThemePreference,
  getStreakData
} from './storage/dhikrStorage';
import { resolveTheme } from './theme/theme';

// Data ya Adhkar iliyopangwa kwa Categories
const ADHKAR_CATEGORIES = [
  {
    id: '1',
    title: 'Adhkar za Kutaka Ulinzi',
    description: 'Ngome dhidi ya majini, hasadi, na shari za viumbe.',
    items: [
      { id: '1-1', name: 'Ayat al-Kursi', arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...', transliteration: 'Allahu la ilaha illa Huwal Hayyul Qayyum...', meaning: 'Allah, hapana mungu ila Yeye, Aliye Hai daima, Msimamia kila kitu. Husinzia wala halali...', source: 'Sahih Bukhari', target: 1 },
      { id: '1-2', name: 'Kinga Dhidi ya Kila Kitu', arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاء...', transliteration: 'Bismillahilladhi la yadurru ma’asmihi shay’un...', meaning: 'Kwa jina la Allah ambaye hakidhuru pamoja na jina Lake kitu chochote...', source: 'Abi Dawood', target: 3 },
      { id: '1-3', name: 'Kujikinga na Shari ya Viumbe', arabic: 'أَعُوذُ بِكَلِمَاتِ اللهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', transliteration: 'A’udhu bikalimatillahi tammati min sharri ma khalaq', meaning: 'Najikinga kwa maneno ya Allah yaliyotimia kutokana na shari ya alichokiumba.', source: 'Sahih Muslim', target: 3 },
      { id: '1-4', name: 'Shari ya Shetani (Kutoka Nyumbani)', arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', transliteration: 'Bismillahi tawakkaltu ‘ala Allah, la hawla wala quwwata...', meaning: 'Kwa jina la Allah, namtegemea Allah, hapana hila wala nguvu...', source: 'Sunan Abi Dawood', target: 1 },
      { id: '1-5', name: 'Kinga ya Asubuhi na Jioni', arabic: 'حَسْبِيَ اللَّهُ لا إِلَهَ إِلا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ', transliteration: 'Hasbiyallahu la ilaha illa Huwa...', meaning: 'Allah ananitosha, hapana mungu ila Yeye, Kwake nimetawakali...', source: 'Sunan Abi Dawood', target: 7 }
    ]
  },
  {
    id: '2',
    title: 'Adhkar za Hofu na Huzuni',
    description: 'Hutumika kutuliza moyo unapoingia wasiwasi au dhiki.',
    items: [
      { id: '2-1', name: 'Dua ya Nabii Yunus', arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ', transliteration: 'La ilaha illa Anta subhanaka inni kuntu minadh-dhalimin', meaning: 'Hapana mungu isipokuwa Wewe, umetakasika, hakika mimi nilikuwa...', source: 'Quran (21:87)', target: 100 },
      { id: '2-2', name: 'Hazina ya Peponi', arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', transliteration: 'La hawla wala quwwata illa billah', meaning: 'Hapana hila wala nguvu isipokuwa kwa msaada wa Allah.', source: 'Bukhari & Muslim', target: 100 },
      { id: '2-3', name: 'Kutaka Msaada wa Allah', arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ', transliteration: 'Ya Hayyu Ya Qayyum, bi-rahmatika astaghith', meaning: 'Ee Aliye Hai daima, Msimamia kila kitu, kwa rehema Zako naomba msaada.', source: 'Sunan Tirmidhi', target: 3 },
      { id: '2-4', name: 'Kujikinga na Unyonge', arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ...', transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazan...', meaning: 'Ee Allah! Najikinga Kwako dhidi ya masikitiko na huzuni...', source: 'Sahih Bukhari', target: 1 },
      { id: '2-5', name: 'Kutegemea Rehema za Allah', arabic: 'اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ', transliteration: 'Allahumma rahmataka arju fala takilni ila nafsi...', meaning: 'Ee Allah! Rehema Zako ndizo ninazozitarajia...', source: 'Abu Dawood', target: 1 }
    ]
  },
  {
    id: '3',
    title: 'Kumtaka Msamaha (Istighfar)',
    description: 'Dua za kutubu na kurejea kwa Allah kwa unyenyekevu.',
    items: [
      { id: '3-1', name: 'Sayyidul Istighfar', arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ...', transliteration: 'Allahumma Anta Rabbi la ilaha illa Anta...', meaning: 'Ee Allah! Wewe ni Mola wangu, hapana mungu ila Wewe...', source: 'Sahih Bukhari', target: 1 },
      { id: '3-2', name: 'Istighfar ya Kila Siku', arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', transliteration: 'Astaghfirullah wa atubu ilayh', meaning: 'Namuomba Allah msamaha na narejea (natubu) Kwake.', source: 'Sahih Bukhari', target: 70 },
      { id: '3-3', name: 'Msamaha Mkuu', arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لا إِلَهَ إِلا هُوَ الْحَيُّ الْقَيُّومُ...', transliteration: 'Astaghfirullahal \'Adhim al-ladhi la ilaha illa Huwa...', meaning: 'Namuomba msamaha Allah Mkuu, ambaye hapana mungu ila Yeye...', source: 'Abu Dawood', target: 3 }
    ]
  },
  {
    id: '4',
    title: 'Kumtukuza Allah (Tasbih)',
    description: 'Maneno mepesi ulimini lakini mazito kwenye mizani.',
    items: [
      { id: '4-1', name: 'Maneno Mapendwa', arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ', transliteration: 'Subhanallahi wa bihamdihi, Subhanallahil ‘Adhim', meaning: 'Ametakasika Allah na sifa njema ni Zake, Ametakasika Allah Mkuu.', source: 'Sahih Bukhari', target: 100 },
      { id: '4-2', name: 'Kufutiwa Madhambi', arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', transliteration: 'Subhanallahi wa bihamdihi', meaning: 'Ametakasika Allah na sifa njema ni Zake.', source: 'Sahih Muslim', target: 100 },
      { id: '4-3', name: 'Dhikri Nzito Kuliko Zote', arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ...', transliteration: 'Subhanallahi wa bihamdihi, \'adada khalqihi...', meaning: 'Ametakasika Allah kwa idadi ya viumbe Vyake...', source: 'Sahih Muslim', target: 3 }
    ]
  }
];

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const systemScheme = useColorScheme();
  const [activeTab, setActiveTab] = useState('home');
  const [activeView, setActiveView] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDhikr, setSelectedDhikr] = useState(null);
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [themePreference, setThemePreference] = useState('system');
  const [appIsReady, setAppIsReady] = useState(false);

  // Matumizi ya AudioPlayer kwa SDK 54
  // HAKIKISHA: Faili click.wav lipo ndani ya assets/sound_effects/
  const audioPlayer = useAudioPlayer(require('../assets/sound_effects/click.wav'));

  const { colors } = useMemo(() => resolveTheme(themePreference, systemScheme), [themePreference, systemScheme]);

  useEffect(() => {
    if (appIsReady) {
      KeepAwake.activateKeepAwakeAsync();
    }
    return () => KeepAwake.deactivateKeepAwake();
  }, [appIsReady]);

  useEffect(() => {
    const init = async () => {
      try {
        const [storedHistory, storedTheme, storedStreak] = await Promise.all([
          getDhikrHistory(),
          getThemePreference(),
          getStreakData(),
          new Promise(resolve => setTimeout(resolve, 2000))
        ]);
        setHistory(storedHistory);
        setThemePreference(storedTheme);
        setStreak(storedStreak.currentStreak);
      } catch (e) { console.warn(e); } finally { setAppIsReady(true); }
    };
    init();
  }, []);

  useEffect(() => { if (appIsReady) SplashScreen.hideAsync(); }, [appIsReady]);

  const handleCounterPress = async () => {
    // Cheza Sauti kwa kutumia expo-audio
    if (audioPlayer) {
      audioPlayer.seekTo(0); // Rudi mwanzo wa sauti
      audioPlayer.play();
    }

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const nextCount = count + 1;
    setCount(nextCount);
    
    if (nextCount === selectedDhikr.target) {
      const session = {
        id: `${Date.now()}`,
        name: selectedDhikr.name,
        target: selectedDhikr.target,
        completedAt: new Date().toISOString(),
        totalTaps: nextCount
      };
      await saveCompletedSession(session);
      setHistory(prev => [session, ...prev]);
      const streakData = await getStreakData();
      setStreak(streakData.currentStreak);
    }
  };

  const renderHomeView = () => {
    switch (activeView) {
      case 'categories':
        return <CategoryScreen categories={ADHKAR_CATEGORIES} onSelect={(cat) => { setSelectedCategory(cat); setActiveView('selection'); }} colors={colors} />;
      case 'selection':
        return <DhikrSelectionScreen category={selectedCategory} onSelect={(dhikr) => { setSelectedDhikr(dhikr); setCount(0); setActiveView('counter'); }} onBack={() => setActiveView('categories')} colors={colors} />;
      case 'counter':
        return <HomeScreen selectedDhikr={selectedDhikr} count={count} streak={streak} onCounterPress={handleCounterPress} onReset={() => setCount(0)} onBack={() => setActiveView('selection')} colors={colors} themePreference={themePreference} onThemePreferenceChange={async (pref) => { setThemePreference(pref); await saveThemePreference(pref); }} />;
      default: return null;
    }
  };

  if (!appIsReady) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {activeTab === 'home' ? renderHomeView() : <HistoryScreen history={history} colors={colors} />}

      <View style={[styles.bottomTabs, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <TouchableOpacity style={styles.tabButton} onPress={() => { setActiveTab('home'); setActiveView('categories'); }}>
          <Text style={[styles.tabText, { color: activeTab === 'home' ? colors.primary : colors.subtleText }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('history')}>
          <Text style={[styles.tabText, { color: activeTab === 'history' ? colors.primary : colors.subtleText }]}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bottomTabs: { flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, paddingVertical: 15 },
  tabButton: { flex: 1, alignItems: 'center' },
  tabText: { fontWeight: '700', fontSize: 16 }
});