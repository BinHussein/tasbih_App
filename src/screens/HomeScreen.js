import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import ProgressCircle from '../components/ProgressCircle';
import CounterButton from '../components/CounterButton';

const HomeScreen = ({
  selectedDhikr,
  count,
  streak,
  onCounterPress,
  onReset,
  onBack,
  colors,
  themePreference,
  onThemePreferenceChange
}) => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [localTarget, setLocalTarget] = useState(selectedDhikr.target);
  const [editingTarget, setEditingTarget] = useState(selectedDhikr.target.toString());

  // Hakikisha target inasomeka upya dhikr ikibadilika
  useEffect(() => {
    setLocalTarget(selectedDhikr.target);
    setEditingTarget(selectedDhikr.target.toString());
  }, [selectedDhikr]);

  const saveTarget = () => {
    const newTarget = parseInt(editingTarget);
    if (newTarget > 0) {
      setLocalTarget(newTarget);
      setEditModalVisible(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ alignItems: 'center' }}>
      
      {/* Navigation & Streak */}
      <View style={styles.topRow}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={{ color: colors.primary, fontWeight: '700' }}>← Rudi</Text>
        </TouchableOpacity>
        <View style={[styles.streakBadge, { backgroundColor: colors.surface }]}>
          <Text style={{ color: colors.primary, fontWeight: '800', fontSize: 12 }}>🔥 {streak} DAY STREAK</Text>
        </View>
      </View>

      {/* Eneo la Dhikr (Content) */}
      <View style={[styles.dhikrCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.dhikrName, { color: colors.primary }]}>{selectedDhikr.name}</Text>
        
        <Text style={[styles.arabicText, { color: colors.text }]}>
          {selectedDhikr.arabic}
        </Text>
        
        <Text style={[styles.transliteration, { color: colors.text }]}>
          "{selectedDhikr.transliteration}"
        </Text>
        
        <Text style={[styles.meaning, { color: colors.subtleText }]}>
          <Text style={{ fontWeight: '700' }}>Maana: </Text>{selectedDhikr.meaning}
        </Text>
        
        {selectedDhikr.source && (
          <Text style={[styles.source, { color: colors.primary }]}>
            Chanzo: {selectedDhikr.source}
          </Text>
        )}
      </View>

      {/* Progress & Counter */}
      <View style={styles.counterSection}>
        <ProgressCircle count={count} target={localTarget} colors={colors} />
        <CounterButton count={count} onPress={onCounterPress} colors={colors} />
      </View>

      {/* Actions */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={[styles.smallButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={onReset}
        >
          <Text style={[styles.buttonText, { color: colors.subtleText }]}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.smallButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => setEditModalVisible(true)}
        >
          <Text style={[styles.buttonText, { color: colors.primary }]}>Set Idadi</Text>
        </TouchableOpacity>
      </View>

      {/* Theme Selection */}
      <View style={styles.themeRow}>
        {['system', 'light', 'dark'].map((option) => {
          const isActive = themePreference === option;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.themeButton, { backgroundColor: isActive ? colors.primary : colors.surface, borderColor: colors.border }]}
              onPress={() => onThemePreferenceChange(option)}
            >
              <Text style={{ color: isActive ? '#fff' : colors.text, fontSize: 10, fontWeight: '600' }}>
                {option.toUpperCase()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Modal ya ku-set idadi (Target) */}
      <Modal visible={isEditModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Weka Idadi ya Tasbih</Text>
            <Text style={{ color: colors.subtleText, marginBottom: 10 }}>Unataka kusoma mara ngapi?</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              value={editingTarget}
              onChangeText={setEditingTarget}
              keyboardType="numeric"
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setEditModalVisible(false)} style={styles.modalBtn}>
                <Text style={{ color: colors.subtleText }}>Ghairi</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveTarget} style={[styles.modalBtn, { backgroundColor: colors.primary, borderRadius: 8 }]}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>Hifadhi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={{ height: 100 }} /> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  topRow: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
  backButton: { padding: 8 },
  streakBadge: { paddingVertical: 5, paddingHorizontal: 12, borderRadius: 15 },
  dhikrCard: { width: '90%', padding: 20, borderRadius: 20, borderWidth: 1, alignItems: 'center', marginBottom: 20 },
  dhikrName: { fontSize: 18, fontWeight: '800', marginBottom: 15, textAlign: 'center' },
  arabicText: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 15, lineHeight: 40 },
  transliteration: { fontSize: 14, fontStyle: 'italic', textAlign: 'center', marginBottom: 10 },
  meaning: { fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 15 },
  source: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
  counterSection: { alignItems: 'center', marginBottom: 10 },
  actionRow: { flexDirection: 'row', gap: 12, marginTop: 10 },
  smallButton: { borderRadius: 10, borderWidth: 1, paddingVertical: 8, paddingHorizontal: 20 },
  buttonText: { fontWeight: '700', fontSize: 14 },
  themeRow: { flexDirection: 'row', gap: 6, marginTop: 20 },
  themeButton: { borderWidth: 1, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 10 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', padding: 25, borderRadius: 20 },
  modalTitle: { fontSize: 18, fontWeight: '800', marginBottom: 5 },
  input: { borderWidth: 1, borderRadius: 10, padding: 12, fontSize: 18, textAlign: 'center', marginVertical: 15 },
  modalButtons: { flexDirection: 'row', justifyContent: 'flex-end', gap: 15 },
  modalBtn: { paddingVertical: 10, paddingHorizontal: 15 }
});

export default HomeScreen;