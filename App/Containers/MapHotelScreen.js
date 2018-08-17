import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, ScrollView, Image} from 'react-native'
import { connect } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import PlaceAction from '../Redux/PlaceRedux'
// Styles
import styles from './Styles/MapHotelScreenStyle'
import { Images } from '../Themes'
import NavBar from '../Components/NavBar'
import HotelItem from '../Components/HotelItem'

class MapHotelScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };

  constructor(props) {
    super(props)
    const {navigation} = this.props
    const { state : {params}} = navigation

    this.state = {
      placeId : params.placeId,
      placeTitle : params.placeTitle,
    }
  }
  componentWillMount(){
    this.props.getHotelByPlace(this.state.placeId)
  }

  _renderHotelItem = ({item}) => (
    <HotelItem
      data = {item}
      nav ={this.props.navigation}
    />
  )


  render () {
    const placeCategoryData = this.props.placeCategoryData ? this.props.placeCategoryData : []
    const hotelData = placeCategoryData.hotelData? placeCategoryData.hotelData:[]
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
                  latitude: 51.532083540964,
                  longitude: -0.10918060010135,
                  latitudeDelta: 0.0922 + (0.0922 / 0.7),
                  longitudeDelta: 0.0421 + (0.0421/ 0.7),
                }}
                zoomEnabled = {true}
                showsUserLocation={ true }
              >
              {
                hotelData.map((element, index) => {
                  return(
                    <MapView.Marker
                      title ={element['title']}
                      coordinate={ {
                        latitude : parseFloat(element['street_lat']),
                        longitude: parseFloat(element['street_lng']),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421, }}
                    />  
                  )                  
                })
              }                
              </MapView>
            </View>
            <View style={styles.body_section}>
              <View style={styles.section}>
                <View style={styles.section_header}>
                  <Text style={styles.txtSectionTitle}>Find hotel in {this.state.placeTitle}</Text>
                  <TouchableOpacity style={styles.more_area}>
                    <Text style={styles.txtLabelSm}>Hide info</Text>
                  </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={hotelData}
                    renderItem={this._renderHotelItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
              </View>
            </View>
          </ScrollView>
        </View>
    )
  }
}

const mapStateToProps = ({place}) => {
  return {
    placeCategoryData : place.placeCategoryData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHotelByPlace: (placeId) => dispatch(PlaceAction.getHotelByPlace(placeId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapHotelScreen)
