import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommunityDetail = ({ route }) => {
  const { community } = route.params;

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
        <Text style={styles.label}>Role:</Text>
        <Text style={[styles.info, { color: community.is_creator ? 'green' : 'red' }]}>
          {community.is_creator ? 'Owner' : ''}
        </Text>
      </View>
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