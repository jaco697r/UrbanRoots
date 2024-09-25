import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../context';
import { fetchCommunities } from './api';
import { useFocusEffect } from '@react-navigation/native';

export default function MyCommunities({ communitiesList }) {
    const navigation = useNavigation();
    const [communities, setCommunities] = useState(communitiesList || []);
    const [loading, setLoading] = useState(true); 
    const { token } = useUserContext();
  
    const fetchData = async () => {
      setLoading(true);
      try {
        const request = { token: token };
        const data = await fetchCommunities(request);
        setCommunities(data);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };
  
    useFocusEffect(
      useCallback(() => {
        if (!communitiesList || communitiesList.length === 0) {  
          fetchData();
        } else {
          setLoading(false);  
        }
      }, [communitiesList])
    );
  
    if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  
    if (!communities || communities.length === 0) {
      return (
        <View style={styles.centered}>
          <Text>No communities found.</Text>
        </View>
      );
    }
  
    const renderCommunityItem = (item) => {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('My Community Item', { community: item })}
        >
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ddd' }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text style={{ color: '#555' }}>{item.city}</Text>
            <Text style={{ color: item.is_creator ? 'green' : 'red' }}>
              {item.is_creator ? 'Owner' : ''}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };
  
    return (
      <FlatList
        data={communities}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderCommunityItem(item)}
      />
    );
  }
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
