import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import MapView from 'react-native-maps';


const styles = StyleSheet.create({
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

export default class Maps extends Component {
  constructor(props) {
    super(props);
    console.log('this is props ********', props.myProp);
    this.state = {
      coordinate: new MapView.AnimatedRegion({
        latitude: props.myProp.coords.latitude,
        longitude: props.myProp.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
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

  // onRegionChange(region) {
  //   this.state.region.setValue(region);
  // }

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView.Animated
          style={{flex: 1}}
          initialRegion={this.state.coordinate}
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


// export default Maps = (props) => {
//   return (
//     <View style={{flex: 1}}>
//       <MapView.Animated style={{flex: 1}} initialRegion={{
//                 latitude: 40.705255,
//                 longitude: -74.009149,
//                 latitudeDelta: 0.0922,
//                 longitudeDelta: 0.0421,
//               }}
//       />
//     </View>
//   );
// };
