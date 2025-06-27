import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

export default function Forecast({ forecast }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Next 5 Days Forecast</Text>
      <FlatList
        data={forecast}
        keyExtractor={item => item.date}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${item.icon}@2x.png`,
              }}
              style={styles.icon}
            />
            <Text style={styles.temp}>{item.avgTemp}°C</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff20',
    padding: 10,
    marginHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  date: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 6,
  },
  temp: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  desc: {
    fontSize: 14,
    textTransform: 'capitalize',
    color: '#eee',
    textAlign: 'center',
    maxWidth: 100,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
