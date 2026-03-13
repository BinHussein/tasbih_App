import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PresetButtons = ({ presets, selectedPreset, onSelect, colors }) => {
  return (
    <View style={styles.container}>
      {presets.map((preset, index) => {
        // Use both name and target to check for active state
        const isActive = selectedPreset?.name === preset.name && selectedPreset?.target === preset.target;

        return (
          <TouchableOpacity
            key={`${preset.name}-${index}`} // Unique key using name and index
            onPress={() => onSelect(preset)}
            style={[
              styles.button,
              {
                backgroundColor: isActive ? colors.primary : colors.surface,
                borderColor: colors.border
              }
            ]}
          >
            <Text 
              numberOfLines={1} 
              style={[styles.name, { color: isActive ? '#fff' : colors.text }]}
            >
              {preset.name}
            </Text>
            <Text style={[styles.target, { color: isActive ? '#fff' : colors.subtleText }]}>
              {preset.target}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 20
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 10,
    alignItems: 'center',
    overflow: 'hidden' // Ensures text doesn't bleed out
  },
  name: {
    fontSize: 11, // Slightly smaller to accommodate custom longer names
    fontWeight: '700'
  },
  target: {
    fontSize: 12,
    marginTop: 4
  }
});

export default PresetButtons;