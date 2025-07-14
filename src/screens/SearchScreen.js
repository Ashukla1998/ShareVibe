import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const scale = size => (width / 375) * size;

const DATA = [
  'React Native',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Expo',
  'MongoDB',
  'Firebase',
  'Express.js',
  'Tailwind CSS',
  'GraphQL',
];

const CATEGORIES = [
  { title: 'ट्रेंडिंग ट्रेंड्स', color: '#E3F2FD' },
  { title: 'भक्ति भावनाएं', color: '#FFF3E0' },
  { title: 'WhatsApp Share', color: '#E8F5E9' },
  { title: 'ईश्वर आस्था', color: '#F3E5F5' },
  { title: 'राजनीति', color: '#FFEBEE' },
  { title: 'टाइम पास', color: '#E1F5FE' },
  { title: 'लेटेस्ट अपडेट', color: '#FBE9E7' },
  { title: 'गृहशोभा', color: '#EDE7F6' },
  { title: 'फैशन कांटेंट', color: '#FFF8E1' },
  { title: 'बच्चा सीजन', color: '#E0F7FA' },
];

const Screen = ({ title }) => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim() === '') {
      setFiltered([]);
    } else {
      const result = DATA.filter((item) =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFiltered(result);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Text style={styles.header}>{title}</Text>

      <TextInput
        placeholder="Search..."
        value={query}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />

      {/* Trending Section */}
      <View style={styles.trendingContainer}>
        <Text style={styles.sectionTitle}>Trending Topics</Text>
        <FlatList
          data={['#ReactNative', '#Expo', '#UIUX', '#JavaScript', '#MobileDev', '#Frontend', '#TechNews']}
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
          contentContainerStyle={{ marginTop: 10 }} 
          data={['#ReactNative', '#Expo', '#UIUX', '#JavaScript', '#MobileDev', '#Frontend', '#TechNews']}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.trendingItem}>
              <Text style={styles.trendingText}>{item}</Text>
            </View>
          )}
        />
      </View>

      {/* Categories Section */}
      <Text style={styles.sectionTitle}>All Categories</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.gridContainer}>
          {CATEGORIES.map((category, index) => (
            <TouchableOpacity key={index} style={[styles.gridItem, { backgroundColor: category.color }]}>
              <Text style={styles.gridText}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Search Results */}
      {query.length > 0 ? (
        <FlatList
          data={filtered}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No results found</Text>
          }
          keyboardShouldPersistTaps="handled"
        />
      ) : (
        <Text style={styles.hintText}>Start typing to search...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },

  trendingContainer: {
    marginBottom: 20,
  },
  trendingItem: {
    backgroundColor: '#e6f0ff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  trendingText: {
    fontSize: 14,
    color: 'blue',
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    fontWeight: '600',
  },

  item: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: { fontSize: 16, color: '#333' },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 20 },
  hintText: { textAlign: 'center', color: '#aaa', marginTop: 20 },
});

export default function ScreenWrapper() {
  return <Screen title="Search" />;
}
