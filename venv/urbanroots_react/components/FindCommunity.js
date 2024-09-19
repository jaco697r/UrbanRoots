import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function FindCommunity() {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>UrbanRoots</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#a3eb4b', // Bright green color
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#5c401b', // Dark brownish color for title text
    fontWeight: 'bold',
  },
  menuIcon: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'lightgrey',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
});