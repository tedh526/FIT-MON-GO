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

let defaultLast = { coords:
     { speed: -1,
       longitude: -122.426417,
       latitude: 37.785834,
       accuracy: 5,
       heading: -1,
       altitude: 0,
       altitudeAccuracy: -1 },
    timestamp: 1484942236017.157 }


export default class FitMonGo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarPic: 100,
      health: 50,
      alive: true,
      totalDistance: 0,
      lastPosition: 'unknown',
      healthGained: 0,
    };
  }


  componentDidMount() {
    this.healthCountdown();
    navigator.geolocation.watchPosition.bind(this)
    navigator.geolocation.watchPosition(
      position => this.distanceTravel(position),
      error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000}
    )
    //.bind(this)
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
      return setTimeout(healthDecrease.bind(this), 60000);
    };
    setTimeout(healthDecrease.bind(this), 60000);
  }

  distanceTravel(position){

    if (this.state.lastPosition.coords) {
      //setup positioning for distance
      let lat1 = this.state.lastPosition.coords.latitude
      let lon1 = this.state.lastPosition.coords.longitude
      let lat2 = position.coords.latitude
      let lon2 = position.coords.longitude

      //calculate distance and update state
      let distance = this.distance(lat1, lon1, lat2, lon2)
      let totalDistance = this.state.totalDistance + distance
      // totalDistance = Number((totalDistance).toFixed(3))
      this.setState({totalDistance})

      //update health
      if (this.state.alive) {
        let health = Math.min(100, this.state.health + parseInt((distance * 15000000)))
        this.setState({healthGained: parseInt(distance * 15)})
        this.setState({health})
     }
    }

    this.setState({lastPosition: position})

    //increase the health
    
  }

  distance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    return dist
  }

  render() {
    return (
      <View style={styles.container}>
        <Avatar avatar={this.state.avatarPic}/>
        <HealthMeter health={this.state.health} alive={this.state.alive}/>
        <Text style={styles.welcome}> Health Gained: {this.state.healthGained} </Text>
        <Text style={styles.welcome}> Total Distance: {this.state.totalDistance} </Text>
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
