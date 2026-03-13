import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const CategoryScreen = ({ categories, onSelect, colors }) => {
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.title, { color: colors.text }]}>Makundi ya Adhkar</Text>
      <Text style={[styles.subtitle, { color: colors.subtleText }]}>
        Chagua kundi la dhikr kulingana na hitaji lako la sasa.
      </Text>

      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          activeOpacity={0.8}
          style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}
          onPress={() => onSelect(cat)}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: colors.primary }]}>{cat.title}</Text>
            <Text style={{ fontSize: 20 }}>🕌</Text>
          </View>
          <Text style={[styles.cardDesc, { color: colors.subtleText }]}>
            {cat.description}
          </Text>
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>
              {cat.items.length} Dhikr
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: '900', marginBottom: 8 },
  subtitle: { fontSize: 14, marginBottom: 25, lineHeight: 20 },
  card: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardTitle: { fontSize: 19, fontWeight: '800' },
  cardDesc: { fontSize: 13, lineHeight: 18, marginBottom: 12 },
  badge: { alignSelf: 'flex-start', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.05)' },
  badgeText: { fontSize: 11, fontWeight: '700' }
});

export default CategoryScreen;