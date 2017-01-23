import React, {Component} from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import MapView from 'react-native-maps';

export default class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinate: new MapView.AnimatedRegion({
        latitude: props.myProp.coords.latitude,
        longitude: props.myProp.coords.longitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      }),
      markers: [
        {
          latlng: {
            latitude: 40.705575,
            longitude: -74.008390,
          },
          title: 'sweetgreen',
          description: 'healthy restaurant',
          image: require('../images/minions/mapicons/banana.jpg'),
          key: 1
        },
        {
          latlng: {
            latitude: 40.704544,
            longitude: -74.008904,
          },
          title: 'Complete Body',
          description: 'gym',
          image: require('../images/minions/mapicons/gym.jpg'),
          key: 2
        },
      ]
    };
  }

componentDidMount() {
    navigator.geolocation.watchPosition.bind(this);
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({coordinate: new MapView.AnimatedRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
      })});
      },
      error => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000}
    );
}

componentWillUnmount() {
  navigator.geolocation.clearWatch(this.watchID);
}

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView.Animated
          style={{flex: 1}}
          region={this.state.coordinate}
        >
          <MapView.Marker.Animated coordinate={this.state.coordinate} image={require('../images/minions/mapicons/minion.jpg')}/>
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              image={marker.image}
            />
          ))}
        </MapView.Animated>
      </View>
    );
  }

}