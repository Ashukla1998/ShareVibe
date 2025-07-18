// import React, { useState } from 'react';
// import {
//   View,
//   Image,
//   StyleSheet,
//   TextInput,
//   Dimensions,
//   TouchableOpacity,
//   Text,
//   Platform,
//   KeyboardAvoidingView,
//   ScrollView,
//   Alert,
// } from 'react-native';
// import { launchImageLibrary,launchCamera } from 'react-native-image-picker';
// import EmojiPicker, { EmojiType } from 'rn-emoji-keyboard';
// import DraggableEmoji from './DraggableEmoji';
// import DraggableText from './DraggableText';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import ColorPickerModal from '../Modals/ColorPickerModal';
// import Video from 'react-native-video';



// const { width, height } = Dimensions.get('window');

// type EmojiItem = {
//   id: number;
//   emoji: string;
// };

// export default function EmojiCanvas() {
//   const insets = useSafeAreaInsets();
//   const [mediaUri, setMediaUri] = useState<string | null>(null);
//   const [mediaType, setMediaType] = useState<'photo' | 'video' | null>(null);
//   const [text, setText] = useState('');
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [emojis, setEmojis] = useState<EmojiItem[]>([]);
//   const [texts, setTexts] = useState<{ id: number; content: string; color: string }[]>([]);
//   const [canvasLayout, setCanvasLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
//   const [editingTextId, setEditingTextId] = useState<number | null>(null);
//   const [showColorPicker, setShowColorPicker] = useState(false);
//   const [isTextInputVisible, setIsTextInputVisible] = useState(false);


//   const handleColorChange = (color: string) => {
//     if (editingTextId !== null) {
//       setTexts((prev) =>
//         prev.map((textItem) =>
//           textItem.id === editingTextId ? { ...textItem, color } : textItem
//         )
//       );
//       setEditingTextId(null);
//     }
//   };

//   const pickMedia = () => {
//     launchImageLibrary({ mediaType: 'mixed' }, (response) => {
//       const asset = response.assets?.[0];
//       if (asset?.uri) {
//         setMediaUri(asset.uri);
//         setMediaType(asset.type?.startsWith('video') ? 'video' : 'photo');
//       }
//     });
//   };

//   const captureMediaWithCamera = async () => {
//   launchCamera(
//     {
//       mediaType: 'mixed',
//       saveToPhotos: true,
//       cameraType: 'back',
//     },
//     (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled camera picker');
//       } else if (response.errorCode) {
//         console.error('Camera error:', response.errorMessage);
//         Alert.alert('Camera Error', response.errorMessage || 'Something went wrong');
//       } else {
//         const asset = response.assets?.[0];
//         if (asset?.uri) {
//           setMediaUri(asset.uri);
//           setMediaType(asset.type?.startsWith('video') ? 'video' : 'photo');
//         }
//       }
//     }
//   );
// };



//   const trimVideo = async (videoUri: string) => {
//     Alert.alert("you pressed trim");
//   };

//   const handleEmojiSelect = (emojiObj: EmojiType) => {
//     setEmojis((prev) => [...prev, { id: Date.now(), emoji: emojiObj.emoji }]);
//     setShowEmojiPicker(false);
//   };

//   const resetCanvas = () => {
//     setEmojis([]);
//     setTexts([]);
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       {mediaUri ? (
//         <>
//           {/* WhatsApp-style Top Bar */}
//           <View style={styles.topBar}>
//             {isTextInputVisible ? (
//               <>
//                 <TextInput
//                   placeholder="Type text..."
//                   placeholderTextColor="#888"
//                   style={styles.statusInput}
//                   value={text}
//                   onChangeText={setText}
//                 />
//                 <TouchableOpacity
//                   onPress={() => {
//                     if (text.trim()) {
//                       setTexts((prev) => [
//                         ...prev,
//                         { id: Date.now(), content: text.trim(), color: '#000000' },
//                       ]);
//                       setText('');
//                       setIsTextInputVisible(false);
//                     }
//                   }}
//                   style={styles.sendButton}
//                 >
//                   <Text style={styles.buttonText}>➕</Text>
//                 </TouchableOpacity>
//               </>
//             ) : (
//               <TouchableOpacity
//                 onPress={() => setIsTextInputVisible(true)}
//                 style={styles.sendButton}
//               >
//                 <Text style={styles.buttonText}>➕</Text>
//               </TouchableOpacity>
//             )}

//             <TouchableOpacity onPress={() => setShowEmojiPicker(true)} style={styles.emojiButton}>
//               <Text style={{ fontSize: 24 }}>😊</Text>
//             </TouchableOpacity>
//             {mediaType === 'video' && (
//               <TouchableOpacity
//                 onPress={() => trimVideo(mediaUri)}
//                 style={styles.trimButton}
//               >
//                 <Text style={{ fontSize: 20 }}>✂️</Text>
//               </TouchableOpacity>
//             )}
//             <TouchableOpacity onPress={resetCanvas} style={styles.trashButton}>
//               <Text style={{ fontSize: 22 }}>🗑️</Text>
//             </TouchableOpacity>
//           </View>

//           <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//             {/* Canvas */}
//             <View style={styles.canvas} onLayout={(event) => setCanvasLayout(event.nativeEvent.layout)}>
//               {mediaUri && mediaType === 'photo' && (
//                 <Image source={{ uri: mediaUri }} style={styles.image} />
//               )}

//               {mediaUri && mediaType === 'video' && (
//                 <Video
//                   source={{ uri: mediaUri }}
//                   style={styles.image}
//                   resizeMode="cover"
//                   repeat
//                   controls
//                   paused={false}
//                 />
//               )}

//               {canvasLayout &&
//                 emojis.map((e) => (
//                   <DraggableEmoji key={e.id} emoji={e.emoji} bounds={canvasLayout} />
//                 ))}
//               {canvasLayout &&
//                 texts.map((item) => (
//                   <DraggableText
//                     key={item.id}
//                     content={item.content}
//                     color={item.color}
//                     bounds={canvasLayout}
//                     onPress={() => {
//                       setEditingTextId(item.id);
//                       setShowColorPicker(true);
//                     }}
//                   />
//                 ))}
//             </View>
//           </ScrollView>
//         </>
//       ) : (
//         // Initial view: pick image screen
//         <View style={styles.centeredContainer}>
//           <Text style={styles.logo}>🖼️</Text>
//           <Text style={styles.title}>Pick an Media</Text>
//           <TouchableOpacity onPress={pickMedia} style={styles.pickImageButton}>
//             <Text style={styles.buttonText}>Select Media</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={captureMediaWithCamera} style={[styles.pickImageButton, { backgroundColor: '#34C759' }]}>
//             <Text style={styles.buttonText}>📷 Capture Media</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Emoji Picker */}
//       <EmojiPicker
//         open={showEmojiPicker}
//         onEmojiSelected={handleEmojiSelect}
//         onClose={() => setShowEmojiPicker(false)}
//       />

//       {/* Color Picker for Text Edit */}
//       <ColorPickerModal
//         visible={showColorPicker}
//         onClose={() => {
//           setShowColorPicker(false);
//           setEditingTextId(null);
//         }}
//         onColorSelected={handleColorChange}
//       />
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   statusInput: {
//     flex: 1,
//     fontSize: 16,
//     paddingHorizontal: 12,
//     paddingVertical: Platform.OS === 'ios' ? 10 : 6,
//     backgroundColor: '#f1f1f1',
//     borderRadius: 20,
//     marginRight: 8,
//   },
//   sendButton: {
//     padding: 8,
//     backgroundColor: '#34C759',
//     borderRadius: 20,
//     marginRight: 8,
//   },
//   emojiButton: {
//     padding: 6,
//     marginRight: 8,
//   },
//   trashButton: {
//     padding: 6,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   canvas: {
//     flex: 1,
//     minHeight: height * 0.6,
//     backgroundColor: '#eee',
//     position: 'relative',
//     margin: 10,
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'cover',
//     position: 'absolute',
//   },
//   centeredContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fafafa',
//   },
//   pickImageButton: {
//     marginTop: 20,
//     backgroundColor: '#007AFF',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   title: {
//     fontSize: 22,
//     marginTop: 10,
//     fontWeight: '500',
//     color: '#333',
//   },
//   logo: {
//     fontSize: 60,
//   },
//   trimButton: {
//     padding: 6,
//     marginRight: 8,
//   },

// });

import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Text,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import EmojiPicker, { EmojiType } from 'rn-emoji-keyboard';
import Video from 'react-native-video';
import Sound from 'react-native-sound';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ColorPickerModal from '../Modals/ColorPickerModal';
import BackgroundMusicPicker from '../Modals/BackgroundMusicPicker'; // We will create this next

const { width, height } = Dimensions.get('window');

type EmojiItem = {
  id: number;
  emoji: string;
};

export default function EmojiCanvas() {
  const insets = useSafeAreaInsets();
  
  Sound.setCategory('Playback');
  // Media state
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'photo' | 'video' | null>(null);

  // Emoji + text overlays
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojis, setEmojis] = useState<EmojiItem[]>([]);
  const [texts, setTexts] = useState<{ id: number; content: string; color: string }[]>([]);

  // Text color editing
  const [editingTextId, setEditingTextId] = useState<number | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isTextInputVisible, setIsTextInputVisible] = useState(false);

  // Music picker
  const [showMusicModal, setShowMusicModal] = useState(false);
  const [selectedMusicUri, setSelectedMusicUri] = useState<string | null>(null);

  // Sound player
  const [musicPlayer, setMusicPlayer] = useState<Sound | null>(null);

  // Handle music play
  // const playMusic = (uri: string) => {
  //   if (musicPlayer) {
  //     musicPlayer.stop(() => musicPlayer.release());
  //   }

  //   const sound = new Sound(uri, '', (error: Error | null) => {
  //     if (error) {
  //       console.log('Error loading music:', error);
  //       return;
  //     }
  //     sound.play();
  //     setMusicPlayer(sound);
  //   });
  // };
  const playMusic = (uri: string) => {
  console.log('Loading music from URI:', uri);

  if (musicPlayer) {
    console.log('Stopping previous player...');
    musicPlayer.stop(() => musicPlayer.release());
  }

  const sound = new Sound(uri, '', (error) => {
    if (error) {
      console.log('Error loading music:', error.message);
      return;
    }

    console.log('Playing music...');
    sound.setNumberOfLoops(-1); // loop forever
    sound.play((success) => {
      if (!success) {
        console.log('Playback failed due to audio decoding errors');
      } else {
        console.log('Playback finished');
      }
    });

    setMusicPlayer(sound);
  });
};


  // Effect to start music when uri changes
  useEffect(() => {
    if (selectedMusicUri) {
      playMusic(selectedMusicUri);

      return () => {
        if (musicPlayer) {
          musicPlayer.stop(() => musicPlayer.release());
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMusicUri]);

  

  // Media pick from gallery
  const pickMedia = () => {
    launchImageLibrary({ mediaType: 'mixed' }, (response) => {
      const asset = response.assets?.[0];
      if (asset?.uri) {
        setMediaUri(asset.uri);
        setMediaType(asset.type?.startsWith('video') ? 'video' : 'photo');
      }
    });
  };

  // Capture media with camera
  const captureMediaWithCamera = () => {
    launchCamera(
      {
        mediaType: 'mixed',
        saveToPhotos: true,
        cameraType: 'back',
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
        } else if (response.errorCode) {
          Alert.alert('Camera Error', response.errorMessage || 'Something went wrong');
        } else {
          const asset = response.assets?.[0];
          if (asset?.uri) {
            setMediaUri(asset.uri);
            setMediaType(asset.type?.startsWith('video') ? 'video' : 'photo');
          }
        }
      }
    );
  };

  // Trim video placeholder
  const trimVideo = (videoUri: string) => {
    Alert.alert('Trim video pressed', `Video URI: ${videoUri}`);
  };

  // Emoji selected handler
  const handleEmojiSelect = (emojiObj: EmojiType) => {
    setEmojis((prev) => [...prev, { id: Date.now(), emoji: emojiObj.emoji }]);
    setShowEmojiPicker(false);
  };

  // Reset canvas content
  const resetCanvas = () => {
    setEmojis([]);
    setTexts([]);
    setMediaUri(null);
    setMediaType(null);
    setSelectedMusicUri(null);
    if (musicPlayer) {
      musicPlayer.stop(() => musicPlayer.release());
      setMusicPlayer(null);
    }
  };

  // Color change for text
  const handleColorChange = (color: string) => {
    if (editingTextId !== null) {
      setTexts((prev) =>
        prev.map((textItem) =>
          textItem.id === editingTextId ? { ...textItem, color } : textItem
        )
      );
      setEditingTextId(null);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {mediaUri ? (
        <>
          <View style={styles.topBar}>
            {isTextInputVisible ? (
              <>
                <TextInput
                  placeholder="Type text..."
                  placeholderTextColor="#888"
                  style={styles.statusInput}
                  value={text}
                  onChangeText={setText}
                />
                <TouchableOpacity
                  onPress={() => {
                    if (text.trim()) {
                      setTexts((prev) => [
                        ...prev,
                        { id: Date.now(), content: text.trim(), color: '#000000' },
                      ]);
                      setText('');
                      setIsTextInputVisible(false);
                    }
                  }}
                  style={styles.sendButton}
                >
                  <Text style={styles.buttonText}>➕</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => setIsTextInputVisible(true)}
                style={styles.sendButton}
              >
                <Text style={styles.buttonText}>➕</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => setShowEmojiPicker(true)} style={styles.emojiButton}>
              <Text style={{ fontSize: 24 }}>😊</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowMusicModal(true)} style={styles.emojiButton}>
              <Text style={{ fontSize: 20 }}>🎶</Text>
            </TouchableOpacity>

            {mediaType === 'video' && (
              <TouchableOpacity onPress={() => trimVideo(mediaUri)} style={styles.trimButton}>
                <Text style={{ fontSize: 20 }}>✂️</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={resetCanvas} style={styles.trashButton}>
              <Text style={{ fontSize: 22 }}>🗑️</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.canvas}>
              {mediaType === 'photo' && <Image source={{ uri: mediaUri }} style={styles.image} />}
              {mediaType === 'video' && (
                <Video
                  source={{ uri: mediaUri }}
                  style={styles.image}
                  resizeMode="cover"
                  repeat
                  controls
                  paused={false}
                />
              )}
              {/* You can add draggable emoji and text components here */}
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={styles.centeredContainer}>
          <Text style={styles.logo}>🖼️</Text>
          <Text style={styles.title}>Pick a Media</Text>
          <TouchableOpacity onPress={pickMedia} style={styles.pickImageButton}>
            <Text style={styles.buttonText}>Select Media</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={captureMediaWithCamera}
            style={[styles.pickImageButton, { backgroundColor: '#34C759' }]}
          >
            <Text style={styles.buttonText}>📷 Capture Media</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Emoji Picker */}
      <EmojiPicker
        open={showEmojiPicker}
        onEmojiSelected={handleEmojiSelect}
        onClose={() => setShowEmojiPicker(false)}
      />

      {/* Color Picker Modal */}
      <ColorPickerModal
        visible={showColorPicker}
        onClose={() => {
          setShowColorPicker(false);
          setEditingTextId(null);
        }}
        onColorSelected={handleColorChange}
      />

      {/* Music picker modal */}
      <BackgroundMusicPicker
        visible={showMusicModal}
        onClose={() => setShowMusicModal(false)}
        onTrackSelected={(uri) => setSelectedMusicUri(uri)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  statusInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    marginRight: 8,
  },
  sendButton: {
    padding: 8,
    backgroundColor: '#34C759',
    borderRadius: 20,
    marginRight: 8,
  },
  emojiButton: {
    padding: 6,
    marginRight: 8,
  },
  trashButton: {
    padding: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  canvas: {
    flex: 1,
    minHeight: height * 0.6,
    backgroundColor: '#eee',
    position: 'relative',
    margin: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  pickImageButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    marginTop: 10,
    fontWeight: '500',
    color: '#333',
  },
  logo: {
    fontSize: 60,
  },
  trimButton: {
    padding: 6,
    marginRight: 8,
  },
});
