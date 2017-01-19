import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {styles} from '../index.ios.js';

export default HealthMeter = (props) => {

    // navigator.geolocation.getCurrentPosition((geolocation) => console.log('this is geolocation', geolocation));
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Health
        </Text>
        <Text style={styles.welcome}>
          {props.health} / 100
        </Text>
      </View>
    );
};
