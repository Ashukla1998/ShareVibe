import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StaticScreen = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>Welcome to the {title} screen.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10, color: '#6200EE' },
  subtitle: { fontSize: 18, color: '#555' },
});

export default StaticScreen;
