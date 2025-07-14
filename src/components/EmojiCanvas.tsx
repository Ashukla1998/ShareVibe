import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import EmojiPicker, { EmojiType } from 'rn-emoji-keyboard';
import DraggableEmoji from './DraggableEmoji';
import DraggableText from './DraggableText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type EmojiItem = {
  id: number;
  emoji: string;
};

export default function EmojiCanvas() {
  const insets = useSafeAreaInsets();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojis, setEmojis] = useState<EmojiItem[]>([]);
  const [texts, setTexts] = useState<{ id: number; content: string }[]>([]);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      const asset = response.assets?.[0];
      if (asset?.uri) setImageUri(asset.uri);
    });
  };

  const handleEmojiSelect = (emojiObj: EmojiType) => {
    setEmojis((prev) => [...prev, { id: Date.now(), emoji: emojiObj.emoji }]);
    setShowEmojiPicker(false);
  };

  return (
    <View style={{ flex: 1 ,paddingBottom: insets.bottom}}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        <Button title="Pick Image" onPress={pickImage} />
        <Button title="Add Emoji" onPress={() => setShowEmojiPicker(true)} />
      </View>

      {/* Text Input */}
      <View style={styles.textBar}>
        <TextInput
          placeholder="Type something..."
          style={styles.textInput}
          value={text}
          onChangeText={setText}
        />
        <Button
          title="Add"
          onPress={() => {
            if (text.trim()) {
              setTexts((prev) => [...prev, { id: Date.now(), content: text.trim() }]);
              setText('');
            }
          }}
        />
      </View>

      {/* Canvas */}
      <View style={styles.canvas}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        {emojis.map((e) => (
          <DraggableEmoji key={e.id} emoji={e.emoji} />
        ))}
        {texts.map((item, index) => (
          <DraggableText key={`text-${index}`} content={item.content} />
        ))}
      </View>

      {/* Emoji Picker */}
      <EmojiPicker
        open={showEmojiPicker}
        onEmojiSelected={handleEmojiSelect}
        onClose={() => setShowEmojiPicker(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
  },
  textBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    gap: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  canvas: {
    flex: 1,
    backgroundColor: '#eee',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
