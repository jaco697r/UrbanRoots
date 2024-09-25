import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import { createCommunity } from './api';
import { useUserContext } from '../context';
import { useNavigation } from '@react-navigation/native';
import { CheckBox } from '@rneui/themed';

export default function CreateCommunity() {
  const [city, setCity] = useState('')
  const [communityName, setCommunityName] = useState('')
  const [communityDescription, setCommunityDescription] = useState('')
  const [maxParticipants, setMaxParticipants] = useState('')
  const [minCropsPerPerson, setMinCropsPerPerson] = useState('')
  const [cycle_duration_days, setCycleDurationDays] = useState('')
  const [inviteOnly, setInviteOnly] = useState(false)

  const {token} = useUserContext()
  const navigation = useNavigation()

  const handleCreateCommunity = async () => {
    const communityData = {
      token,  
      city,
      communityName,
      communityDescription,
      max_participants: parseInt(maxParticipants, 10),
      min_kg_crops_per_person: parseFloat(minCropsPerPerson),
      cycle_duration_days: parseInt(cycle_duration_days, 10),
      inviteOnly
    }

    response = await createCommunity(communityData)

    // All this needs refactoring if we have the time - Spaghetti code. 
    // Server needs to send error codes instead
    let hasErrors = false
    console.log('RESPONSE')
    console.log(Object.keys(response).length)
    for (const [key, value] of Object.entries(response)) {
      if (typeof value === 'string' && value.includes("This field may not be blank.")) {
        console.log(`Field: ${key}, Error: ${value}`);
        Alert.alert('Required field missing', `${key}`);
        hasErrors = true;
      }
    }
  
    if (response === 'unique_name_constraint') {
      Alert.alert('Choose another name', 'A community with this name already exists.');
      hasErrors = true
    }

    if (!hasErrors) {
      Alert.alert('Congratulations', 'Community Created');
      navigation.navigate('Home')
    }

    console.log('Response length:', Object.keys(response).length);
    if  (Number(Object.keys(response).length) > 3) {
      Alert.alert('Congratulations', 'Community Created');
      navigation.navigate('Home');
    }
  }

  return (
    <View style={styles.container}>
    <Text style={styles.label}>Community Name*</Text>
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
      <Text style={styles.label}>City*</Text>
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
      <Text style={styles.label}>Cycle Duration (Days)*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter duration of a harvest cycle in days"
        keyboardType="numeric"
        value={cycle_duration_days}
        onChangeText={setCycleDurationDays}
      />
      <Text style={styles.label}>Minimum Estimated Crops per Person (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter minimum crops in kg"
        keyboardType="numeric"
        value={minCropsPerPerson}
        onChangeText={setMinCropsPerPerson}
      />

      <CheckBox
        title="Invite Only"
        checked={inviteOnly}
        onPress={() => setInviteOnly(!inviteOnly)}
        backgroundColor='#FAFFFF'
      />
      <Button title="Create Community" onPress={handleCreateCommunity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFFFF',
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
    height: 35,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5,
  }
});