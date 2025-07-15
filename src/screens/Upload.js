import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import EmojiCanvas from '../components/EmojiCanvas';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Upload = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <EmojiCanvas />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default Upload;
