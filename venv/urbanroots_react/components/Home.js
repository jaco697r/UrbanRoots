import { useState } from 'react';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function HomeScreen() { 
    const navigation = useNavigation();
 
  return (
    <View style={styles.container}>

      <View style={styles.body}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Find Community')}>
          <Text style={styles.buttonText} >Find Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Create Community')}>
          <Text style={styles.buttonText}>Create Community</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('My Communities')}>
          <Text style={styles.buttonText} >My Communities</Text>
        </TouchableOpacity>
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
    backgroundColor:  '#a3eb4b', // Bright green color
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
  body: {
    flex: 1,
    justifyContent:  'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'lightgrey',
    padding: 20,
    borderRadius:  10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity:  0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
});  