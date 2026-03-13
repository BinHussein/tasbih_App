import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const CounterButton = ({ count, onPress, colors }) => {
  return (
    <View style={styles.outerContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[
          styles.circle,
          {
            backgroundColor: colors.surface,
            borderColor: colors.primary, // Inatumia rangi yako kuu kwa ajili ya mng'ao
            shadowColor: colors.primary
          }
        ]}
      >
        <Text style={[styles.countText, { color: colors.text }]}>{count}</Text>
        <Text style={[styles.tapText, { color: colors.subtleText }]}>Gusa Kuhesabu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 210, // Kimekuwa kikubwa zaidi kwa ajili ya urahisi wa kugusa (UX)
    height: 210,
    borderRadius: 105,
    borderWidth: 6, // Fremu imekuwa nene zaidi ili kuleta hisia ya tasbih ya kisasa
    justifyContent: 'center',
    alignItems: 'center',
    // Vivuli vilivyoimarishwa kwa ajili ya muonekano wa 3D
    shadowOpacity: 0.35,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10, 
  },
  countText: {
    fontSize: 60, // Namba imekuwa kubwa zaidi ili ionekane kwa urahisi
    fontWeight: '900',
  },
  tapText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase', // Inaleta muonekano wa kitaalamu (Multimedia style)
  }
});

export default CounterButton;