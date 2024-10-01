import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator, Text } from 'react-native';
import LocationScreen from './Location';
import MyCommunities from './MyCommunities';
import { fetchCommunities } from './api';
import { useUserContext } from '../context';

export default function FindCommunity() {
  const [searchCity, setSearchCity] = useState('');
  const [communities, setCommunities] = useState([]);
  const { token } = useUserContext();

  const handleCityChange = (city) => {
    setSearchCity(city);
    fetchData(city); 
  };

  const fetchData = async (city) => {
    if (city){
      try {
        const request = { token: token };
        const response = await fetchCommunities(request);
        if (!response){
          return
        }
        const filteredCommunities = response.filter(community => 
          community.city.toLowerCase().includes(city.trim().toLowerCase())
        );

        setCommunities(filteredCommunities);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <LocationScreen onCityChange={handleCityChange} />
      <Text>Search for a city</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="City Search"
        value={searchCity}
        onChangeText={handleCityChange} 
      />
      <MyCommunities communitiesList={communities} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
});
