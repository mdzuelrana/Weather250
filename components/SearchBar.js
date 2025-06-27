import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

export default function SearchBar({ fetchWeatherData }) {
  const [cityName, setCityName] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={cityName}
        onChangeText={text => setCityName(text)}
      />
      <Button title="Search" onPress={() => fetchWeatherData(cityName)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    width: 200,
    marginRight: 10,
    fontSize: 16,
  },
});
