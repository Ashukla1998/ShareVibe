import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

type BackgroundMusicPickerProps = {
  visible: boolean;
  onClose: () => void;
  onTrackSelected: (uri: string) => void;
};

const musicTracks = [
  {
    id: 1,
    name: 'Jazz Background',
    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 2,
    name: 'Relaxing Piano',
    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 3,
    name: 'Upbeat Tune',
    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

export default function BackgroundMusicPicker({
  visible,
  onClose,
  onTrackSelected,
}: BackgroundMusicPickerProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Select Background Music</Text>
          <ScrollView style={{ flex: 1 }}>
            {musicTracks.map(({ id, name, uri }) => (
              <TouchableOpacity
                key={id}
                style={styles.trackButton}
                onPress={() => {
                  onTrackSelected(uri);
                  onClose();
                }}
              >
                <Text style={styles.trackName}>{name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={{ color: '#fff', fontWeight: '600' }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    width: width * 0.8,
    height: height * 0.5,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  trackButton: {
    paddingVertical: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  trackName: {
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
});
