import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import Avatar from './avatar.js';
import HealthMeter from './healthmeter.js';
import Maps from './maps.js';


export default class StatsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarPic: 100,
      avatarEvol: false,
      health: 100,
      alive: true,
      totalDistance: 0,
      lastPosition: {coords: {
        latitude: 40.705255,
        longitude: -74.009149,
      }},
      healthGained: 0,
      avatarKey: 0,
      goodPlaces:
        [
          {
            //restaurant
            latitude: 40.705574,
            longitude: -74.008390,
            key: 1
          },
          {
            //gym
            latitude: 40.704543,
            longitude: -74.008904,
            key: 2
          },
          //honolulu
          {
            longitude: -157.8294444,
            latitude: 21.2827778,
            key: 1
          },
          //london
          {
            longitude: -0.1337,
            latitude: 51.50998,
            key: 2
          }
        ],

    };
  }

  componentDidMount() {
    this.healthCountdown();
    this.avatarUpdate();
    this.powerUp();
    setTimeout(() => this.setState({avatarEvol: true}), 150000000);
    navigator.geolocation.watchPosition.bind(this);
    navigator.geolocation.watchPosition(
      position => {
        this.distanceTravel(position);
      },
      error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, distanceFilter: 1, timeout: 10000}
    );
  }

  healthCountdown() {
    let healthDecrease = function() {
      let health = this.state.health - 1;
      this.setState({health});
      if (health < 1) {
        return console.log('deadhealth');
      }
      return setTimeout(healthDecrease.bind(this), 600);
    };
    setTimeout(healthDecrease.bind(this), 600);
  }

  avatarUpdate() {
    let update = function(){
      let health = this.state.health
      if (this.state.avatarKey === 1) {
        this.setState({avatarPic: 'eating'});
      } else if (this.state.avatarKey === 2){
        this.setState({avatarPic: 'workout'});
      } else if (health > 80) {
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
        this.setState({avatarPic: 0, alive: false, health: 0});
        return console.log('dead');
      }
      return setTimeout(update.bind(this), 0);
    };
    setTimeout(update.bind(this), 0);
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

  powerUp() {
    let checkLocations = function () {
    let position = this.state.lastPosition
      let inAGoodPlace = false
      let avatarKey = 0
      this.state.goodPlaces.forEach(place => {
        let lat1 = place.latitude
        let lon1 = place.longitude
        let lat2 = position.coords.latitude
        let lon2 = position.coords.longitude
        let distanceFromPlace = this.distance(lat1, lon1, lat2, lon2)
        if (distanceFromPlace < 0.00189){
          inAGoodPlace = true
          avatarKey = place.key
        }
      })
      if (inAGoodPlace && this.state.alive){
        let health = Math.min(100, this.state.health + 15)
        this.setState({health})
        inAGoodPlace = false
      }
        this.setState({avatarKey})
      return setTimeout(checkLocations.bind(this), 5000)
    }
    setTimeout(checkLocations.bind(this, 5000))
  }

  _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

  render() {
    const mapRoute = {
      component: Maps,
      title: 'Map',
      passProps: {myProp: this.state.lastPosition}
    };
    return (
      <View style={styles.container}>
        <Avatar avatar={this.state.avatarPic} avatarEvol={this.state.avatarEvol}/>
        <HealthMeter health={this.state.health} alive={this.state.alive}/>
        <Text style={styles.walkingdata}> Health Gained By Walking: {this.state.healthGained} </Text>
        <Text style={styles.walkingdistance}> Total Distance: {this.state.totalDistance.toFixed(3)} Miles</Text>
        <TouchableHighlight onPress={() => this._handleNextPress(mapRoute)}>
          <Image
            style = {styles.button}
            source={require('../images/MapButton.png')}
          />
        </TouchableHighlight>
         <TouchableHighlight onPress={() => this.setState({avatarEvol: true})}>
          <Image 
            style = {styles.button}
            source = {require('../images/evolve.png')}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

//we need to make it look prettier
//we need to make it evolve from a minion to a MING-ion
//we need to prep the presentation (good introduction, app for people to maintain a healthy lifestyle, new years resolution)

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container2: {
    flex: 2,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  avatarname: {
    fontSize: 45,
    textAlign: 'center',
    fontFamily: 'DIN Alternate'
  },
  health: {
    fontSize: 35,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Helvetica',
    color: '#39393A'
  },
  healthmeter: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 70,
    color: '#39393A'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  walkingdata: {
    fontSize: 18,
    textAlign: 'left',
    color: '#454647'
  },
  walkingdistance: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 20,
    color: '#454647'
  },
  button: {
    margin: 10
  }
});