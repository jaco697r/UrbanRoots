import React from 'react';
import { useState, useEffect, useCallback  } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { fetchCommunities } from './api';
import { useUserContext } from '../context';
import { useFocusEffect } from '@react-navigation/native'; 

export default function MyCommunities() { 
    // const navigation = useNavigation()
    const [communities, setCommunities] = useState([])
    const [loading, setLoading] = useState(true)
    const {token} = useUserContext()

    const fetchData = async () => {
        try {
        const request = { 'token': token };
        const data = await fetchCommunities(request);
        console.log('DATA', data);
        setCommunities(data);
        } catch (error) {
        console.error('Error fetching data:', error);
        } finally {
        setLoading(false);
        }
    };

    useFocusEffect(
    useCallback(() => {
        setLoading(true);
        fetchData();
    }, [token])
    );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderCommunityItem = ({ item }) => (
    <View style={styles.communityItem}>
      <Text style={styles.communityName}>{item.name}</Text>
      <Text style={styles.communityCity}>{item.city}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={communities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCommunityItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  communityItem: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 8,
  },
  communityName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  communityCity: {
    fontSize: 14,
    color: '#555',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

