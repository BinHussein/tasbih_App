import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const DhikrSelectionScreen = ({ category, onSelect, onBack, colors }) => {
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={styles.content}
    >
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 16 }}>← Rudi Nyuma</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>{category.title}</Text>
      <Text style={[styles.subtitle, { color: colors.subtleText }]}>Chagua dhikr unayotaka kusoma sasa.</Text>

      {category.items.map((item) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.7}
          style={[styles.listButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => onSelect(item)}
        >
          <View style={styles.itemInfo}>
            <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.itemTrans, { color: colors.subtleText }]} numberOfLines={1}>
              {item.transliteration}
            </Text>
          </View>
          <View style={[styles.targetCircle, { backgroundColor: colors.primary }]}>
            <Text style={styles.targetText}>{item.target}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  backButton: { marginBottom: 20, paddingVertical: 5 },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 8 },
  subtitle: { fontSize: 14, marginBottom: 25 },
  listButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 12,
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  itemTrans: { fontSize: 12, fontStyle: 'italic' },
  targetCircle: { width: 35, height: 35, borderRadius: 17.5, justifyContent: 'center', alignItems: 'center', marginLeft: 15 },
  targetText: { color: '#fff', fontSize: 12, fontWeight: '800' }
});

export default DhikrSelectionScreen;