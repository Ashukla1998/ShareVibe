import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface Props {
  emoji: string;
}

export default function DraggableEmoji({ emoji }: Props) {
  const startX = useSharedValue(100);
  const startY = useSharedValue(100);

  const translateX = useSharedValue(100);
  const translateY = useSharedValue(100);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Save current position when gesture starts
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      // Move by the gesture translation plus start offset
      translateX.value = startX.value + event.translationX;
      translateY.value = startY.value + event.translationY;
    })
    .onEnd(() => {
      // Optional: spring animation when gesture ends
      translateX.value = withSpring(translateX.value);
      translateY.value = withSpring(translateY.value);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    position: 'absolute',
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[animatedStyle, styles.emojiContainer]}>
        <Text style={styles.emoji}>{emoji}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  emojiContainer: {
    zIndex: 10,
  },
  emoji: {
    fontSize: 40,
  },
});
