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
  bounds: { x: number; y: number; width: number; height: number };
}

export default function DraggableEmoji({ emoji, bounds }: Props) {
  const startX = useSharedValue(100);
  const startY = useSharedValue(100);
  const translateX = useSharedValue(100);
  const translateY = useSharedValue(100);

  const scale = useSharedValue(1);

  const size = 40;

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((event) => {
      const nextX = startX.value + event.translationX;
      const nextY = startY.value + event.translationY;

      translateX.value = Math.max(0, Math.min(nextX, bounds.width - size * scale.value));
      translateY.value = Math.max(0, Math.min(nextY, bounds.height - size * scale.value));
    })
    .onEnd(() => {
      translateX.value = withSpring(translateX.value);
      translateY.value = withSpring(translateY.value);
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      // Smooth scale update with spring
      scale.value = withSpring(Math.max(0.5, Math.min(e.scale, 4)));
    });

  const gesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    position: 'absolute',
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[animatedStyle, styles.emojiContainer]}>
        <Text style={[styles.emoji]}>{emoji}</Text>
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
