import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import {StackNavigatorParamsList} from '../App';

type WeatherScreenRouteProp = RouteProp<StackNavigatorParamsList, 'Weather'>;

const Weather: React.FC = () => {
  const route = useRoute<WeatherScreenRouteProp>();
  const {weather_icon, temperature, precipitation, wind_speed} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.weatherPageTitle}>Weather Details</Text>
      <View style={styles.weatherInfoWrapper}>
        <Image style={styles.weatherIcon} source={{uri: `${weather_icon}`}} />
        <Text style={styles.pageText}>Temperatue : {temperature} °C</Text>
        <Text style={styles.pageText}>Precipitation : {precipitation} %</Text>
        <Text style={styles.pageText}>Wind Speed : {wind_speed} kmph</Text>
      </View>
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 70,
    backgroundColor: '#d9d9d9',
    flex: 1,
  },

  weatherPageTitle: {
    color: 'black',
    fontWeight: '500',
    fontSize: 25,
    paddingVertical: 20,
    textAlign: 'center',
  },

  weatherInfoWrapper: {
    paddingVertical: 100,
    paddingHorizontal: 10,
  },

  pageText: {
    color: 'black',
    paddingVertical: 20,
    fontSize: 20,
  },

  weatherIcon: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 30,
  },
});
