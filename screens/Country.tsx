import React, {useCallback} from 'react';
import {View, Image, Text, StyleSheet, Pressable} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

import {ScreenNavigationProp} from './Home';
import {StackNavigatorParamsList} from '../App';

type CountryScreenRouteProp = RouteProp<StackNavigatorParamsList, 'Country'>;

const Country = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<CountryScreenRouteProp>();
  const {flag, capital, population, latitude, longitude} = route.params;
  // console.log(flag);
  const capitalSubmitHandler = useCallback(() => {
    const access_key = 'fb7b50d5e280cd791a507b1228a50e26';
    console.log('Pressed');
    fetch(
      `http://api.weatherstack.com/current?access_key=${access_key}&query=${capital}`,
    )
      .then(response => response.json())
      .then(res => {
        // console.log(res.current.weather_icons[0]);
        navigation.navigate('Weather', {
          weather_icon: res.current.weather_icons,
          temperature: res.current.temperature,
          precipitation: res.current.precip,
          wind_speed: res.current.wind_speed,
        });
      })
      .catch(err => {
        console.log(err);
        navigation.navigate('NotFound');
      });
  }, [capital, navigation]);

  return (
    <View style={styles.countryPage}>
      <View style={styles.titleWrapper}>
        <Text style={styles.countryPageTitle}>Country Details</Text>
      </View>
      <Image style={styles.countryFlag} source={{uri: `${flag}`}} />
      <Text style={styles.countryInfoText}>Capital : {capital}</Text>
      <Text style={styles.countryInfoText}>
        Country's Population : {population}
      </Text>
      <Text style={styles.countryInfoText}>Latitude : {latitude}</Text>
      <Text style={styles.countryInfoText}>Longitude : {longitude}</Text>
      <Pressable
        style={styles.capitalWeatherButton}
        onPress={capitalSubmitHandler}>
        <Text style={styles.capitalWeatherText}>Capital Weather</Text>
      </Pressable>
    </View>
  );
};

export default Country;

const styles = StyleSheet.create({
  countryPage: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: '#d9d9d9',
  },

  titleWrapper: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
  },

  countryPageTitle: {
    color: 'black',
    fontWeight: '500',
    fontSize: 23,
  },

  countryInfoText: {
    paddingVertical: 15,
    color: 'black',
    fontSize: 18,
  },

  countryFlag: {
    height: 230,
    width: 230,
    marginVertical: 20,
    resizeMode: 'stretch',
  },

  capitalWeatherButton: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#51359f',
    marginTop: 10,
  },

  capitalWeatherText: {
    fontSize: 15,
    fontWeight: '500',
  },
});
