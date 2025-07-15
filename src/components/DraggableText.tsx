import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text as RNText,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

interface Props {
  content: string;
  color?: string;
  bounds: { x: number; y: number; width: number; height: number };
  onPress?: () => void;
}

export default function DraggableText({
  content,
  color = 'black',
  bounds,
  onPress,
}: Props) {
  const x = useSharedValue(150);
  const y = useSharedValue(150);
  const offsetX = useSharedValue(150);
  const offsetY = useSharedValue(150);
  const scale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      offsetX.value = x.value;
      offsetY.value = y.value;
    })
    .onUpdate((event) => {
      const nextX = offsetX.value + event.translationX;
      const nextY = offsetY.value + event.translationY;
      x.value = Math.max(0, Math.min(nextX, bounds.width - 100));
      y.value = Math.max(0, Math.min(nextY, bounds.height - 30));
    });

  const pinchGesture = Gesture.Pinch().onUpdate((e) => {
    scale.value = Math.max(0.5, Math.min(e.scale, 4));
  });

  const gesture = Gesture.Simultaneous(panGesture, pinchGesture);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
    position: 'absolute',
    alignItems: 'center',
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    fontSize: 24 * scale.value,
  }));

  const handleIncrease = () => {
    scale.value = Math.min(scale.value + 0.1, 4);
  };

  const handleDecrease = () => {
    scale.value = Math.max(scale.value - 0.1, 0.5);
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[animatedContainerStyle, styles.container]}>
        {/* Only wrap this with tap */}
        <GestureDetector
          gesture={Gesture.Tap()
            .maxDuration(250)
            .maxDelay(100)
            .onEnd(() => {
              if (onPress) runOnJS(onPress)();
            })}
        >
          <Animated.Text style={[styles.text, animatedTextStyle, { color }]}>
            {content}
          </Animated.Text>
        </GestureDetector>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={handleDecrease}>
            <RNText style={styles.buttonText}>–</RNText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleIncrease}>
            <RNText style={styles.buttonText}>+</RNText>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 4,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#ddd',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
