import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Helper: background gradient based on weather condition
const getGradient = (condition) => {
  switch (condition) {
    case 'Clear':
      return ['#56ccf2', '#2f80ed']; // blue sky
    case 'Rain':
      return ['#373B44', '#4286f4']; // dark rain
    case 'Clouds':
      return ['#bdc3c7', '#2c3e50']; // cloudy
    case 'Snow':
      return ['#83a4d4', '#b6fbff']; // snowy light
    case 'Thunderstorm':
      return ['#141E30', '#243B55']; // stormy
    case 'Drizzle':
      return ['#89f7fe', '#66a6ff']; // light rain
    case 'Mist':
    case 'Haze':
    case 'Fog':
      return ['#757f9a', '#d7dde8']; // foggy/gray
    default:
      return ['#43cea2', '#185a9d']; // fallback
  }
};

const Weather = ({ weatherData }) => {
  const { name, main, weather, wind } = weatherData;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
  const gradient = getGradient(weather[0].main);

  return (
    <LinearGradient colors={gradient} style={{ ...styles.container, borderRadius: 12, width: '90%' }}>

      <Text style={styles.city}>{name}</Text>
      <Image source={{ uri: iconUrl }} style={styles.icon} />
      <Text style={styles.temp}>{main.temp}°C</Text>
      <Text style={styles.desc}>{weather[0].description}</Text>
      <View style={styles.details}>
        <Text style={styles.detail}>Humidity: {main.humidity}%</Text>
        <Text style={styles.detail}>Wind Speed: {wind.speed} m/s</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    borderRadius: 12,
    width: '100%',
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  icon: {
    width: 120,
    height: 120,
  },
  temp: {
    fontSize: 42,
    color: '#fff',
    marginVertical: 8,
  },
  desc: {
    fontSize: 20,
    fontStyle: 'italic',
    textTransform: 'capitalize',
    color: '#f0f0f0',
  },
  details: {
    marginTop: 20,
  },
  detail: {
    fontSize: 18,
    color: '#f1f1f1',
    marginTop: 6,
  },
});

export default Weather;
