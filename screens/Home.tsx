import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  Animated,
  ActivityIndicator,
  Text,
  Pressable,
  StyleSheet,
  View,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackNavigatorParamsList} from '../App';

export type ScreenNavigationProp =
  NativeStackNavigationProp<StackNavigatorParamsList>;

const Home: React.FC = () => {
  const [country, setCountry] = useState<string>('');
  const [input, setInput] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<ScreenNavigationProp>();
  const moveText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (country !== '') {
      moveTextTop();
    } else if (country === '') {
      moveTextBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onFocusHandler = () => {
    if (country !== '') {
      moveTextTop();
    }
  };

  const onBlurHandler = () => {
    if (country === '') {
      moveTextBottom();
    }
  };

  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -33],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
    textDecorationColor: '#000',
  };

  const handleSubmit = useCallback(() => {
    setCountry('');
    setInput(false);
    setLoading(true);
    // console.log('Fired');
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then(response => response.json())
      .then(res => {
        console.log(res[0].flags.png);
        navigation.navigate('Country', {
          flag: res[0].flags.png,
          capital: res[0].capital[0],
          population: res[0].population,
          latitude: res[0].latlng[0],
          longitude: res[0].latlng[1],
        });
      })
      .catch(err => {
        console.log(err);
        navigation.navigate('NotFound');
      })
      .finally(() => setLoading(false));
  }, [country, navigation]);

  return (
    <View style={styles.background}>
      <View style={styles.contentWrapper}>
        <Animated.View style={[styles.animatedStyle, animStyle]}>
          <Text style={styles.label}>Enter Country</Text>
        </Animated.View>
        <TextInput
          style={styles.textInputBox}
          value={country}
          onChangeText={(text: string): void => {
            setCountry(text);
            setInput(true);
          }}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
        <Pressable
          style={
            input === true
              ? [styles.submitButton, styles.enabledSubmitButton]
              : [styles.submitButton, styles.disabledSubmitButton]
          }
          onPress={handleSubmit}
          disabled={input ? false : true}>
          <Text>Submit</Text>
        </Pressable>
        {loading && (
          <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color="#51359f" />
          </View>
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  contentWrapper: {
    flex: 1,
    // paddingVertical: 60,
    paddingHorizontal: 60,
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInputBox: {
    height: 50,
    width: 250,
    backgroundColor: '#e2e2e2',
    marginHorizontal: 10,
    marginVertical: 50,
    borderColor: '#a3a1a1',
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    color: '#000',
  },

  submitButton: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginBottom: 40,
  },

  enabledSubmitButton: {
    backgroundColor: '#51359f',
  },

  disabledSubmitButton: {
    backgroundColor: '#abaaaa',
    textDecorationColor: '#747474',
  },

  activityIndicator: {
    backgroundColor: '#d9d9d9',
    paddingBottom: 30,
  },

  label: {
    color: '#6a6a6a',
    fontSize: 14,
  },

  animatedStyle: {
    position: 'relative',
    // justifyContent: 'center',
    top: 80,
    right: 65,
    borderRadius: 90,
    zIndex: 10000,
  },
});
