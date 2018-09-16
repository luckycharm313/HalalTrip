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
import RestaurantList from '../Components/RestaurantList'
import TouristHList from '../Components/TouristHList'

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
      place_lat : params.place_lat,
      place_lng : params.place_lng,
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
  
  _renderRestaurantItem = ({item}) => (
    <RestaurantList
      data = {item}
      nav ={this.props.navigation}
    />
  )
  
  _renderTouristItem = ({item}) => (
    <TouristHList
      data = {item}
      nav ={this.props.navigation}
    />
  )


  render () {
    const placeHotelData = this.props.placeHotelData ? this.props.placeHotelData : []
    const hotelData = placeHotelData.hotelData? placeHotelData.hotelData:[]
        
    const placeRestaurantData = this.props.placeRestaurantData ? this.props.placeRestaurantData : []
    const restaurantData = placeRestaurantData.restaurantData? placeRestaurantData.restaurantData:[]
    
    const placeTouristData = this.props.placeTouristData ? this.props.placeTouristData : []
    const touristData = placeTouristData.touristData? placeTouristData.touristData:[]

    let location = [...hotelData, ...restaurantData, ...touristData]
    let hotelView = null
    let restaurantView = null
    let touristView = null

    if(hotelData.length > 0){
      hotelView =( <View style={styles.section}>
                    <View style={styles.section_header}>
                      <Text style={styles.txtSectionTitle}>Find hotel in {this.state.placeTitle}</Text>
                      {/* <TouchableOpacity style={styles.more_area}>
                        <Text style={styles.txtLabelSm}>Hide info</Text>
                      </TouchableOpacity> */}
                    </View>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={hotelData}
                        renderItem={this._renderHotelItem}
                        keyExtractor={(item, index) => index.toString()}
                      />
                  </View>)
    }

    if(restaurantData.length > 0 ){
      restaurantView = 
          (<View style={styles.section}>
            <View style={styles.section_header}>
              <Text style={styles.txtSectionTitle}>Find restaurant in {this.state.placeTitle}</Text>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={restaurantData}
                renderItem={this._renderRestaurantItem}
                keyExtractor={(item, index) => index.toString()}
              />
          </View>)
    }
    
    if(touristData.length > 0 ){
      touristView = 
          (<View style={styles.section}>
            <View style={styles.section_header}>
              <Text style={styles.txtSectionTitle}>Find tourist in {this.state.placeTitle}</Text>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={touristData}
                renderItem={this._renderTouristItem}
                keyExtractor={(item, index) => index.toString()}
              />
          </View>)
    }
    console.log("location => ", location)
    let mapViewMarker = null
    if(location.length > 0){
      mapViewMarker = (
        location.map((element, index) => {
          return(
            <View key={index}>
            <MapView.Marker
              title ={element['title']}
              coordinate={ {
                latitude : parseFloat(element['street_lat']),
                longitude: parseFloat(element['street_lng']),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421, }}
            />  
            </View>
          )                  
        })
      )
    }

    const {place_lat, place_lng} = this.state

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
                  latitude: parseFloat(place_lat),
                  longitude: parseFloat(place_lng),
                  latitudeDelta: 0.0922 + (0.0922 / 0.7),
                  longitudeDelta: 0.0421 + (0.0421/ 0.7),
                }}
                zoomEnabled = {true}
                showsUserLocation={ true }
              >
              {
               mapViewMarker
              }                
              </MapView>
            </View>
            <View style={styles.body_section}>
              {touristView}       
              {restaurantView}       
              {hotelView}       
            </View>
          </ScrollView>
        </View>
    )
  }
}

const mapStateToProps = ({place}) => {
  return {
    placeHotelData : place.placeHotelData,
    placeRestaurantData : place.placeRestaurantData,
    placeTouristData : place.placeTouristData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHotelByPlace: (placeId) => dispatch(PlaceAction.getHotelByPlace(placeId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapHotelScreen)
