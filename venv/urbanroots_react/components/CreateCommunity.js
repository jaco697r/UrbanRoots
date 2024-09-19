import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { createCommunity } from './api';
import { useUserContext } from '../context';

export default function CreateCommunity() {
  const [city, setCity] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [minCropsPerPerson, setMinCropsPerPerson] = useState('');

  const {token} = useUserContext()

  const handleCreateCommunity = () => {
    const communityData = {
      token,  
      city,
      communityName,
      communityDescription,
      max_participants: parseInt(maxParticipants, 10),
      min_kg_crops_per_person: parseFloat(minCropsPerPerson),
    };
    console.log("Community data: ", communityData);
    createCommunity(communityData)
  };

  return (
    <View style={styles.container}>
    <Text style={styles.label}>Community Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Community Name"
        value={communityName}
        onChangeText={setCommunityName}
      />
    <Text style={styles.label}>Description</Text>
    <TextInput
        style={styles.input}
        placeholder="Description"
        value={communityDescription}
        onChangeText={setCommunityDescription}
      />
      <Text style={styles.label}>City</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the city"
        value={city}
        onChangeText={setCity}
      />
      <Text style={styles.label}>Max Participants</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter maximum participants"
        keyboardType="numeric"
        value={maxParticipants}
        onChangeText={setMaxParticipants}
      />
      <Text style={styles.label}>Minimum Crops per Person (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter minimum crops in kg"
        keyboardType="numeric"
        value={minCropsPerPerson}
        onChangeText={setMinCropsPerPerson}
      />
      <Button title="Create Community" onPress={handleCreateCommunity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#56a64b',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  }
});