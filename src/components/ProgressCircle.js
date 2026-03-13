import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const ProgressCircle = ({ count, target, colors }) => {
  const progress = target > 0 ? Math.min((count / target) * 100, 100) : 0;

  return (
    <View style={styles.wrapper}>
      <AnimatedCircularProgress
        size={230}
        width={16}
        fill={progress}
        rotation={0}
        tintColor={colors.primary}
        backgroundColor={colors.border}
        lineCap="round"
      >
        {() => (
          <Text style={[styles.progressText, { color: colors.text }]}>{`${count} / ${target}`}</Text>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 18
  },
  progressText: {
    fontSize: 24,
    fontWeight: '700'
  }
});

export default ProgressCircle;