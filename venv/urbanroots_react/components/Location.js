import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function LocationScreen({ onCityChange }) {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission for GPS denied');
            return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
        });

        if (reverseGeocode.length > 0) {
            const { city } = reverseGeocode[0];
            setCity(city);
        }

        if (onCityChange) {
          onCityChange(city);
        }
        })();
    }, []);

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  if (location === null || city === null) {
    return <Text>Loading..</Text>;
  }

  return (
     <View style={{ padding: 20 }}>
      <Text>User's current location: </Text>
      <Text>Latitude: {location.coords.latitude}</Text>
      <Text>Longitude: {location.coords.longitude}</Text>
      <Text>City: {city}</Text>
    </View>
  );
}