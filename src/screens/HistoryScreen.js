import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

const HistoryItem = ({ item, colors }) => (
  <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
    <View style={styles.cardHeader}>
      <Text style={[styles.title, { color: colors.primary }]}>{item.name}</Text>
      <View style={[styles.statusBadge, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.primary, fontSize: 10, fontWeight: '800' }}>DONE</Text>
      </View>
    </View>
    
    <View style={styles.metaRow}>
      <View style={styles.metaItem}>
        <Text style={[styles.metaLabel, { color: colors.subtleText }]}>Lengo</Text>
        <Text style={[styles.metaValue, { color: colors.text }]}>{item.target}</Text>
      </View>
      <View style={styles.metaItem}>
        <Text style={[styles.metaLabel, { color: colors.subtleText }]}>Jumla ya Gusa</Text>
        <Text style={[styles.metaValue, { color: colors.text }]}>{item.totalTaps}</Text>
      </View>
    </View>

    <Text style={[styles.date, { color: colors.subtleText }]}>
      🗓️ {new Date(item.completedAt).toLocaleString('sw-TZ', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })}
    </Text>
  </View>
);

const HistoryScreen = ({ history, colors }) => {
  // Takwimu za haraka
  const stats = useMemo(() => {
    const totalSessions = history.length;
    const totalTaps = history.reduce((sum, item) => sum + item.totalTaps, 0);
    return { totalSessions, totalTaps };
  }, [history]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.heading, { color: colors.text }]}>Historia ya Dhikr</Text>
      
      {/* Sehemu ya Takwimu (Useful Stats Dashboard) */}
      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>{stats.totalSessions}</Text>
          <Text style={[styles.statLabel, { color: colors.subtleText }]}>Sessions</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
          <Text style={[styles.statNumber, { color: colors.primary }]}>{stats.totalTaps}</Text>
          <Text style={[styles.statLabel, { color: colors.subtleText }]}>Total Taps</Text>
        </View>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.subtleText }]}>Bado haujakamilisha dhikr yoyote leo.</Text>
            <Text style={{ fontSize: 40, marginTop: 10 }}>📿</Text>
          </View>
        }
        renderItem={({ item }) => <HistoryItem item={item} colors={colors} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    gap: 12
  },
  statBox: {
    flex: 1,
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    elevation: 2
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '900'
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2
  },
  listContent: {
    paddingBottom: 40,
    gap: 12
  },
  card: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    elevation: 1
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    flex: 1
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#ccc'
  },
  metaItem: {
    alignItems: 'flex-start'
  },
  metaLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  metaValue: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 2
  },
  date: {
    marginTop: 12,
    fontSize: 12,
    fontWeight: '500'
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center'
  }
});

export default HistoryScreen;