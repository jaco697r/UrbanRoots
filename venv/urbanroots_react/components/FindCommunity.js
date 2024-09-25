import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import LocationScreen from './Location';
import MyCommunities from './MyCommunities';

export default function FindCommunity() {
  const [searchCity, setSearchCity] = useState('');
  const [communities, setCommunities] = useState([]);

  const handleCityChange = (city) => {
    setSearchCity(city);
    fetchCommunities(city); 
  };

  const fetchCommunities = (city) => {
    const fetchedCommunities = [
      { id: 1, name: 'Community A', city: 'New York', is_creator: true },
      { id: 2, name: 'Community B', city: 'New York', is_creator: false },
      { id: 3, name: 'Community C', city: 'Aalborg', is_creator: true },
    ];

    const filteredCommunities = fetchedCommunities.filter(community =>
      community.city.toLowerCase().includes(city.toLowerCase())
    );

    setCommunities(filteredCommunities);
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
