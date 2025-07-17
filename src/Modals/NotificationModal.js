// components/NotificationModal.js

import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const { width, height } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const NotificationModal = ({ visible, onClose }) => {
  const notifications = [
    { id: 1, text: 'Your profile was viewed 10 times today.' },
    { id: 2, text: 'New follower: Alex Johnson.' },
    { id: 3, text: 'You have 3 unread messages.' },
    { id: 4, text: 'Your post has 120 new likes.' },
  ];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={scale(24)} color="#333" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.notificationList}>
            {notifications.map((item) => (
              <View key={item.id} style={styles.notificationCard}>
                <Ionicons name="notifications" size={scale(20)} color="#007AFF" />
                <Text style={styles.notificationText}>{item.text}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  modalContainer: {
    width: '100%',
    maxHeight: height * 0.6,
    backgroundColor: '#fff',
    borderRadius: scale(20),
    padding: scale(20),
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(15),
  },
  modalTitle: {
    fontSize: scale(20),
    fontWeight: 'bold',
    color: '#333',
  },
  notificationList: {
    maxHeight: height * 0.5,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f6fa',
    padding: scale(12),
    borderRadius: scale(10),
    marginBottom: scale(10),
  },
  notificationText: {
    fontSize: scale(15),
    color: '#333',
    marginLeft: scale(10),
  },
});

export default NotificationModal;
