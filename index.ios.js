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

//-----------------------------------------------------------------------------//

// need to get gps working so we can increase health based on walking
// 
// need to get google maps integration


//-----------------------------------------------------------------------------//

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Avatar from './components/avatar.js';
import HealthMeter from './components/healthmeter.js';

export default class FitMonGo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarPic: 100,
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
      if (health > 80) {
        this.setState({avatarPic: 100});
      } else if (health > 60) {
        this.setState({avatarPic: 80});
      } else if (health > 40) {
        this.setState({avatarPic: 60});
      } else if (health > 20) {
        this.setState({avatarPic: 40});
      } else if (health > 0) {
        this.setState({avatarPic: 20});
      } else {
        this.setState({avatarPic: 0, alive: false});
        return console.log('dead');
      }
      return setTimeout(healthDecrease.bind(this), 200);
    };
    setTimeout(healthDecrease.bind(this), 200);
  }

  render() {
    return (
      <View style={styles.container}>
        <Avatar avatar={this.state.avatarPic}/>
        <HealthMeter health={this.state.health} alive={this.state.alive}/>
      </View>
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
