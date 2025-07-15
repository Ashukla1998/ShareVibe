import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  StatusBar,
  TextInput,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import posts from '../../data/posts';
import Post from '../components/Post';
import ActivityScreen from './ActivityScreen';

const { width, height } = Dimensions.get('window');
const scale = (size) => (width / 375) * size;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const trendingTopics = [
    '#ReactNative',
    '#MobileDev',
    '#JavaScript',
    '#UIUX',
    '#TechNews',
    '#Frontend',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.searchWrapper}>
          <Icon name="search-outline" size={width * 0.05} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.notificationButton}>
          <Icon name="notifications-outline" size={scale(24)} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Trending Tags */}
      <View style={styles.trendingContainer}>
        <Text style={styles.trendingTitle}>Trending Topics</Text>
        <FlatList
          data={trendingTopics}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.trendingItem}>
              <Text style={styles.trendingText}>{item}</Text>
            </View>
          )}
        />
        <FlatList
          data={trendingTopics}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{paddingTop:5}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.trendingItem}>
              <Text style={styles.trendingText}>{item}</Text>
            </View>
          )}
        />
      </View>

      {/* Posts */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.postList}
      />

      {/* Modal for Activity */}
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={{ fontSize: scale(18), color: '#007AFF' }}>Close</Text>
          </TouchableOpacity>
          <ActivityScreen />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0',paddingTop:30},
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.015,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.03,
    borderRadius: 25,
    height: height * 0.06,
    elevation: 2,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  searchIcon: { marginRight: width * 0.02 },
  searchInput: { flex: 1, fontSize: width * 0.045, color: '#333' },
  notificationButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 999,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  trendingContainer: {
    marginTop: 10,
    marginHorizontal: width * 0.04,
  },
  trendingTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  trendingItem: {
    backgroundColor: '#e6f0ff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginRight: 10,
  },
  trendingText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  postList: {
    paddingBottom: 100,
    paddingHorizontal: width * 0.025,
  },
  closeButton: {
    padding: scale(16),
    alignItems: 'flex-end',
  },
});
