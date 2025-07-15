import React, { useState, useRef } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import ColorPicker, {
  Preview,
  Panel1,
  HueSlider,
  OpacitySlider,
  Swatches,
  ColorPickerRef,
} from 'reanimated-color-picker';

type Props = {
  visible: boolean;
  onClose: () => void;
  onColorSelected: (color: string) => void;
};

export default function ColorPickerModal({
  visible,
  onClose,
  onColorSelected,
}: Props) {
  const [color, setColor] = useState<string>('#000000');
  const pickerRef = useRef<ColorPickerRef>(null);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header row */}
          <View style={styles.headerRow}>
            <Text style={styles.title}>🎨 Pick a Color</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Color Picker */}
          <View style={styles.pickerContainer}>
            <ColorPicker
              ref={pickerRef}
              style={styles.picker}
              value={color}
              onChangeJS={(c) => setColor(c.hex)}
              onCompleteJS={(c) => {
                onColorSelected(c.hex);
                onClose();
              }}
            >
              <Preview />
              <Panel1 />
              <HueSlider />
              <OpacitySlider />
              <Swatches />
            </ColorPicker>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    width: '90%',
    height: Platform.OS === 'ios' ? 520 : 500,
    justifyContent: 'flex-start',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  cancelText: {
    fontSize: 16,
    color: '#007AFF', // iOS-style cancel color
    fontWeight: '500',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  picker: {
    width: '100%',
    flex: 1,
  },
});
