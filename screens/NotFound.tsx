import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from './Home';

const NotFound: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const buttonHandler = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.errorStatusCode}>404</Text>
      <Text style={styles.errorText}>Page not found</Text>
      <Pressable style={styles.toHomeButton} onPress={buttonHandler}>
        <Text>Back To Home</Text>
      </Pressable>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 170,
    paddingHorizontal: 50,
    textAlign: 'center',
    alignItems: 'center',
  },

  errorStatusCode: {
    fontSize: 150,
    color: '#9f3535',
  },

  errorText: {
    fontSize: 40,
    color: 'black',
  },

  toHomeButton: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#9f3535',
    marginTop: 50,
  },
});
