import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Switch,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const indianLanguages = [
  'Hindi', 'English', 'Bengali', 'Telugu', 'Marathi', 'Tamil',
  'Urdu', 'Gujarati', 'Kannada', 'Odia', 'Malayalam', 'Punjabi',
  'Assamese', 'Maithili', 'Santali', 'Kashmiri', 'Nepali',
  'Gondi', 'Sindhi', 'Dogri',
];

const SettingsModal = ({ onClose }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('English');
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const renderLanguageItem = ({ item }) => {
    const isSelected = item === language;
    return (
      <TouchableOpacity
        style={[
          styles.languageOption,
          isSelected && styles.languageOptionSelected,
        ]}
        onPress={() => {
          setLanguage(item);
          setLanguageModalVisible(false);
        }}
      >
        <Text style={[
          styles.languageText,
          isSelected && styles.languageTextSelected
        ]}>
          {item}
        </Text>
        {isSelected && (
          <Ionicons name="checkmark" size={scale(20)} color="#007AFF" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* Main Settings Modal */}
      <Modal transparent animationType="slide" onRequestClose={onClose}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>Settings</Text>

            {/* Language Option */}
            <TouchableOpacity
              style={styles.row}
              onPress={() => setLanguageModalVisible(true)}
            >
              <Text style={styles.label}>Language</Text>
              <Text style={styles.value}>{language}</Text>
            </TouchableOpacity>

            {/* Theme Toggle */}
            <View style={styles.row}>
              <Text style={styles.label}>Theme</Text>
              <View style={styles.themeToggle}>
                <Ionicons
                  name={isDarkMode ? 'moon' : 'sunny'}
                  size={scale(20)}
                  color={isDarkMode ? '#333' : '#007AFF'}
                  style={{ marginRight: scale(8) }}
                />
                <Switch
                  trackColor={{ false: '#ccc', true: '#007AFF' }}
                  thumbColor={isDarkMode ? '#fff' : '#f4f3f4'}
                  ios_backgroundColor="#ccc"
                  onValueChange={toggleTheme}
                  value={isDarkMode}
                />
              </View>
            </View>

            {/* Placeholder Option */}
            <View style={styles.row}>
              <Text style={styles.label}>Other</Text>
              <Text style={styles.value}>Custom</Text>
            </View>

            <Pressable style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Language Modal */}
      {isLanguageModalVisible && (
        <Modal
          transparent
          visible={isLanguageModalVisible}
          animationType="fade"
          onRequestClose={() => setLanguageModalVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.languageModal}>
              <Text style={styles.title}>Choose Language</Text>
              <FlatList
                data={indianLanguages}
                renderItem={renderLanguageItem}
                keyExtractor={(item) => item}
                style={{ maxHeight: height * 0.5 }}
                showsVerticalScrollIndicator={false}
              />

              <Pressable
                style={[
                  styles.closeButton,
                  { marginTop: scale(10), backgroundColor: '#bbb' }
                ]}
                onPress={() => setLanguageModalVisible(false)}
              >
                <Text style={[styles.closeText, { color: '#333' }]}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default SettingsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: scale(12),
    padding: scale(20),
    elevation: 6,
  },
  title: {
    fontSize: scale(20),
    fontWeight: '700',
    color: '#333',
    marginBottom: scale(20),
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: scale(16),
    color: '#555',
  },
  value: {
    fontSize: scale(16),
    color: '#007AFF',
    fontWeight: '500',
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: scale(20),
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: scale(25),
    paddingVertical: scale(12),
    borderRadius: scale(25),
  },
  closeText: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '600',
  },
  languageModal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: scale(12),
    padding: scale(20),
    alignItems: 'center',
    elevation: 8,
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale(12),
    paddingHorizontal: scale(15),
    marginVertical: scale(5),
    width: '100%',
    borderRadius: scale(10),
    backgroundColor: '#f9f9f9',
    elevation: 2,
  },
  languageOptionSelected: {
    backgroundColor: '#e6f0ff',
  },
  languageText: {
    fontSize: scale(16),
    color: '#333',
  },
  languageTextSelected: {
    color: '#007AFF',
    fontWeight: '700',
  },
});
