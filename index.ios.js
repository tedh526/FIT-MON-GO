/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
      {/*<View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>*/}

//setInterval
// while(this.state.health > 0) {
//   this.state.health -= 1;
//   setTimeout(15000);
// }


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import HealthMeter from './components/healthmeter.js';

export default class FitMonGo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      health: 100,
      alive: true
    };
  }


  componentDidMount() {
    this.healthCountdown();
  }

  healthCountdown() {
    let healthDecrease = function() {
      let health = this.state.health - 1;
      this.setState({health});
      if (health === 0) {
        this.setState({alive: false});
        return console.log('dead');
      }
      return setTimeout(healthDecrease.bind(this), 5000);
    };
    setTimeout(healthDecrease.bind(this), 5000);
  }

  render() {
    return (
      <HealthMeter health={this.state.health}/>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('FitMonGo', () => FitMonGo);
