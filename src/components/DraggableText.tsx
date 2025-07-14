import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

interface Props {
  content: string;
}

export default function DraggableText({ content }: Props) {
  const x = useSharedValue(150);
  const y = useSharedValue(150);

  const offsetX = useSharedValue(150);
  const offsetY = useSharedValue(150);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      offsetX.value = x.value;
      offsetY.value = y.value;
    })
    .onUpdate((event) => {
      x.value = offsetX.value + event.translationX;
      y.value = offsetY.value + event.translationY;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
    position: 'absolute',
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[animatedStyle, styles.container]}>
        <Text style={styles.text}>{content}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
});
