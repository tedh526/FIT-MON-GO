import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import {styles} from '../index.ios.js';

export default class HealthMeter extends Component{

  constructor(props){
    super(props)
    this.state = props
  }

  componentWillReceiveProps(nextprops){
    this.setState(nextprops)
  }

  render(){
      return (
        <View style={{marginTop: 150}}>
          <Text style={styles.welcome}>
            Health
          </Text>
          <Text style={styles.welcome}>
            {this.state.health} / 100
          </Text>
        </View>
      );
  }

}
