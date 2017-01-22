import React from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import {styles} from '../index.ios.js';

export default Avatar = (props) => {
  let avatar = {
    100: require('../images/minions/avatar_100.jpg'),
    80: require('../images/minions/avatar_80.jpg'),
    60: require('../images/minions/avatar_60.jpg'),
    40: require('../images/minions/avatar_40.jpg'),
    20: require('../images/minions/avatar_20.jpg'),
    0: require('../images/minions/avatar_0.jpg'),
    eating: require('../images/minions/avatar_eating.jpg'),
    workout: require('../images/minions/avatar_workout.jpg'),
  };

    // navigator.geolocation.getCurrentPosition((geolocation) => console.log('this is geolocation', geolocation));
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Avatar
        </Text>
        <Image source={avatar[props.avatar]}/>
      </View>
    );
};
