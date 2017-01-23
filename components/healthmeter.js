import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import {styles} from './statspage.js';

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
        <View >
          <Text style={styles.health}>
            Health
          </Text>
          <Text style={styles.healthmeter}>
            {this.state.health} / 100
          </Text>
        </View>
      );
  }

}
