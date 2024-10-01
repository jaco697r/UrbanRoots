import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { joinCommunity } from './api';
import { leaveCommunity } from './api';
import { useUserContext } from '../context';
import { useNavigation } from '@react-navigation/native';

const CommunityDetail = ({ route }) => {
  const { community } = route.params
  const { token, user } = useUserContext()
  // const {communityJoined, setCommunityJoined } = useState()
  const navigation = useNavigation()

  async function handleJoinCommunity(){
    const data = {community_id: community.id, token: token}
    response = await joinCommunity(data)
    if (response.status == 401){
      Alert.alert('You have already joined this community', ``)
    }
    if (response.status == 400){
      Alert.alert('Something went wrong', ``)
    }
    if (response.status == 200){
      Alert.alert('Congratulations', `You joined ${community.name}`)
      navigation.navigate('Find Community'); 
    }

    console.log(request.status)
  }

  async function handleLeaveCommunity(){
    const data = {community_id: community.id, token: token}
    response = await leaveCommunity(data)
    if (response.status == 401){
      Alert.alert('Could not find user in community', ``)
    }
    if (response.status == 400){
      Alert.alert('Something went wrong', ``)
    }
    if (response.status == 200){
      Alert.alert('Goodbye', `You left ${community.name}`)
      navigation.navigate('Home'); 
    }

    console.log(request.status)
  }

  const isUserInCommunity = community.members.includes(user.username);
  console.log('USER!')
  console.log(user)

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{community.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>City:</Text>
        <Text style={styles.info}>{community.city}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.info}>{community.description}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Duration Days:</Text>
        <Text style={styles.info}>{community.cycle_duration_days}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Members:</Text>
        <Text style={styles.info}>{community.members.join(', ')}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Role:</Text>
        <Text style={[styles.info, { color: community.is_creator ? 'green' : 'red' }]}>
          {community.is_creator ? 'Owner' : ''}
        </Text>
      </View>
    {!community.is_creator && !isUserInCommunity &&(
      <View style={styles.buttonContainer}>
        <Button title="Join Community" onPress={handleJoinCommunity} />
      </View>
    )}
    {isUserInCommunity &&(
      <View style={styles.buttonContainer}>
        <Button title="Leave Community" onPress={handleLeaveCommunity} />
      </View>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
    width: '50%',
  },
  info: {
    fontSize: 18,
    fontWeight: '400',
    color: '#333',
  },
});

export default CommunityDetail;