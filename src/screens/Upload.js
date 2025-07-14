import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import EmojiCanvas from '../components/EmojiCanvas';

const Upload = () => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <EmojiCanvas />
    </SafeAreaProvider>
  );
};

export default Upload;
