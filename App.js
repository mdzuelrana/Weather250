import { ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';


const API_KEY = "09e134341d6e7b1919ba364a8f4ed7e4";


export default function App() {

    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);

    const [loaded, setLoaded] = useState(true);

    

async function fetchWeatherData(cityName) {
  setLoaded(false);
  const currentAPI = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`;
  const forecastAPI = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`;

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentAPI),
      fetch(forecastAPI),
    ]);

    const currentJson = await currentRes.json();
    const forecastJson = await forecastRes.json();

    if (currentRes.status === 200 && forecastRes.status === 200) {
      setWeatherData(currentJson);
      setForecastData(processForecastData(forecastJson.list));
    } else {
      setWeatherData(null);
      setForecastData([]);
    }

    setLoaded(true);
  } catch (error) {
    console.log(error);
    setLoaded(true);
  }
}


    useEffect(() => {
        fetchWeatherData('Dhaka');
    }, [])
    

    if(!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='gray'  size={36} />
            </View>

        )
    }

    else if(weatherData === null) {
        return (
            <View style={styles.container}>
                <SearchBar fetchWeatherData={fetchWeatherData}/>
                <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
            </View>
        )
    }

    return (
  <ScrollView contentContainerStyle={styles.container}>
    <SearchBar fetchWeatherData={fetchWeatherData} />
    {weatherData ? (
      <>
        <Weather weatherData={weatherData} />
        <Forecast forecast={forecastData} />
      </>
    ) : (
      <Text style={styles.primaryText}>City Not Found! Try a different city</Text>
    )}
  </ScrollView>
);

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#222',
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  primaryText: {
    margin: 20,
    fontSize: 28,
    color: '#fff',
  },
});


function processForecastData(list) {
  const daily = {};

  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!daily[date]) {
      daily[date] = [];
    }
    daily[date].push(item);
  });

  // ✅ Take next 5 days (excluding today)
  const dates = Object.keys(daily).slice(1, 6); // 1 = skip today, 6 = 5 days

  return dates.map(date => {
    const dayData = daily[date];
    const temps = dayData.map(d => d.main.temp);
    const icons = dayData.map(d => d.weather[0].icon);
    const descriptions = dayData.map(d => d.weather[0].description);

    // 🗓 Format date to weekday
    const weekday = new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
    });

    return {
      date: weekday,              // "Mon", "Tue", etc.
      avgTemp: (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1),
      icon: icons[0],
      description: descriptions[0],
    };
  });
}
