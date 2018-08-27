import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
// Styles
import styles from './Styles/MapViewScreenStyle'
import NavBar from '../Components/NavBar'

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
    }
  }

  render () {
    const {street_lat, street_lng, title} = this.state
    return (
      <View style = {styles.mainContainer}>
          <ScrollView style={styles.container}>
            <View style = {styles.navbar}>
              <NavBar nav = {this.props.navigation} />
            </View>
            <View style = {styles.map_view}>
              <MapView
                style={{flex : 1}}
                provider={ PROVIDER_GOOGLE }
                initialRegion={{
                  latitude: parseFloat(street_lat?street_lat:''),
                  longitude: parseFloat(street_lng?street_lng:''),
                  latitudeDelta: 0.0922 + (0.0922 / 0.7),
                  longitudeDelta: 0.0421 + (0.0421/ 0.7),
                }}
                zoomEnabled = {true}
                showsUserLocation={ true }
              >
                <MapView.Marker
                  title ={title}
                  coordinate={ {
                    latitude: parseFloat(street_lat),
                    longitude: parseFloat(street_lng),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421, }}
                />  
              </MapView>
            </View>
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
