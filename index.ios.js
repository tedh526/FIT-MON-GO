
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
import Avatar from './components/avatar.js';
import HealthMeter from './components/healthmeter.js';
import Maps from './components/maps.js';
import StatsPage from './components/statspage.js';


export default class FitMonGo extends Component {

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: StatsPage,
          title: 'Stats Page'
        }}
        style={{flex: 1}}
      />

    );
  }
}


AppRegistry.registerComponent('FitMonGo', () => FitMonGo);

