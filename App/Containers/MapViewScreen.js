import React, { Component } from 'react'
import { ScrollView, Platform, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
// Styles
import styles from './Styles/MapViewScreenStyle'
import NavBar from '../Components/NavBar'
import { Metrics, Images } from '../Themes'
import getDirections from 'react-native-google-maps-directions'

class MapViewScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };

  constructor(props) {
    super(props)
    const {navigation} = this.props
    const { state : {params}} = navigation

    this.state = {
      street_lat : params.street_lat,
      street_lng : params.street_lng,
      title : params.title,
      latitude :null,
      longitude: null,
      error:null,
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         console.log(position);
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );
  }
  _onDirection = () =>{
    const {street_lat, street_lng, latitude, longitude} = this.state
    const data = {
      source: {
       latitude: latitude,
       longitude: longitude
     },
     destination: {
        latitude: parseFloat(street_lat),
        longitude: parseFloat(street_lng)
     },
     params: [
       {
         key: "travelmode",
         value: "driving"        // may be "walking", "bicycling" or "transit" as well
       },
       {
         key: "dir_action",
         value: "navigate"       // this instantly initializes navigation using the given travel mode 
       }
      ]
    }

    getDirections(data)
  }
  
  render () {
    const {street_lat, street_lng, title, latitude, longitude} = this.state
    let mapMarker = null

    if(latitude && longitude){
      mapMarker = (
        <MapView
            style={{height : (Platform.OS === 'ios') ? Metrics.screenHeight-20 : Metrics.screenHeight}}
            provider={ PROVIDER_GOOGLE }
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922 + (0.0922 / 0.2),
              longitudeDelta: 0.0421 + (0.0421/ 0.2),
            }}
            compassStyle={{
              bottom: 10,
              left: 10,
            }}
            showsCompass={true}
            liteMode={true}
            showsUserLocation={ true }
            followsUserLocation={ true }
            toolbarEnabled={ true }
            loadingEnabled={ true }
            zoomEnabled={true}
          >
          <MapView.Marker
              coordinate={{
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
              }}
              pinColor={'#c8ef0a'}
              // title={"Your Location"}
          />
          <MapView.Marker
              coordinate={{
                latitude: parseFloat(street_lat),
                longitude: parseFloat(street_lng)
              }}
              title={title}
          />
        </MapView>
      )
    }
    return (
      <View style = {styles.mainContainer}>
          <ScrollView style={styles.container}>
            <View style = {styles.navbar}>
              <NavBar nav = {this.props.navigation} />
            </View>
            <View style = {styles.map_view}>              
              {mapMarker}             
            </View>
            <TouchableOpacity style={styles.direct_view} onPress={this._onDirection}>
              <Image 
                  style={styles.icon_map}
                  source={Images.icon_map}
                  resizeMode='cover'/>
            </TouchableOpacity>
          </ScrollView>
        </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapViewScreen)
