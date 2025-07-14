import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ActivityScreen from './ActivityScreen';
import SettingsModal from '../Modals/Setting';

const { width } = Dimensions.get('window');
const scale = (size) => (width / 375) * size;

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [settingModal, setSettingModal] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Notification Icon */}
        <TouchableOpacity
          style={styles.notificationIcon}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="notifications-outline" size={scale(28)} color="#007AFF" />
        </TouchableOpacity>

        {/* Settings Icon */}
        <TouchableOpacity
          style={styles.settingIcon}
          onPress={() => setSettingModal(true)}
        >
          <Ionicons name="settings-outline" size={scale(28)} color="#007AFF" />
        </TouchableOpacity>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/women/68.jpg' }}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>

        {/* Name and Username */}
        <Text style={styles.name}>Jane Doe</Text>
        <Text style={styles.username}>@janedoe</Text>

        {/* Bio */}
        <Text style={styles.bio}>
          Designer, traveler, and coffee enthusiast. Exploring the world one pixel at a time.
        </Text>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>150</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3.4K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>180</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.editButton]}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.followButton]}>
            <Text style={[styles.buttonText, { color: '#fff' }]}>Follow</Text>
          </TouchableOpacity>
        </View>

        {/* Modal for Notifications */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ fontSize: scale(18), color: '#007AFF' }}>Close</Text>
            </TouchableOpacity>
            <ActivityScreen />
          </SafeAreaView>
        </Modal>

        {/* Settings Modal */}
        {settingModal && (
          <SettingsModal onClose={() => setSettingModal(false)} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingTop: scale(60),
    paddingBottom: scale(30),
  },
  notificationIcon: {
    position: 'absolute',
    top: scale(50),
    right: scale(20),
    zIndex: 15,
  },
  settingIcon: {
    position: 'absolute',
    top: scale(100),
    right: scale(20),
    zIndex: 15,
  },
  avatarContainer: {
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    borderRadius: scale(75),
    marginBottom: scale(20),
  },
  avatar: {
    width: scale(150),
    height: scale(150),
    borderRadius: scale(75),
  },
  name: {
    fontSize: scale(28),
    fontWeight: '700',
    color: '#222',
  },
  username: {
    fontSize: scale(16),
    color: '#777',
    marginVertical: scale(6),
  },
  bio: {
    fontSize: scale(16),
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: scale(40),
    lineHeight: scale(22),
    marginBottom: scale(30),
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    backgroundColor: '#f0f0f0',
    borderRadius: scale(15),
    paddingVertical: scale(20),
    paddingHorizontal: scale(15),
    marginBottom: scale(30),
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: scale(20),
    fontWeight: '700',
    color: '#222',
  },
  statLabel: {
    fontSize: scale(14),
    color: '#666',
    marginTop: scale(4),
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: scale(14),
    borderRadius: scale(25),
    alignItems: 'center',
    marginHorizontal: scale(5),
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#555',
    backgroundColor: '#fff',
  },
  followButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: scale(16),
    fontWeight: '600',
    color: '#555',
  },
  closeButton: {
    padding: scale(15),
    alignItems: 'flex-end',
    backgroundColor: '#f9f9f9',
  },
});

export default ProfileScreen;
