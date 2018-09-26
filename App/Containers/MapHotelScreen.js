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
import InfiniteScroll from 'react-native-infinite-scroll'
import { strings } from '../../locales/i18n';

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
      hotelData:[],
      tempHotelData:[],
      hotelPage: 0,
      restaurantData:[],
      tempRestaurantData:[],
      restaurantPage: 0,
      touristData:[],
      tempTouristData:[],
      touristPage: 0,

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

  componentWillReceiveProps(nextProps){
    // hotel
    const placeHotelData = nextProps.placeHotelData ? nextProps.placeHotelData : []
    const hotelData = placeHotelData.hotelData? placeHotelData.hotelData:[]
    
    if(hotelData.length>0){
      this.setState({hotelData})

      let tempHotelData=[]
      hotelData.forEach(function (value, index) {
        if(index < 2){
          tempHotelData.push(value)
        }
      });
      this.setState({tempHotelData})
    }
    //tourist
    const placeTouristData = nextProps.placeTouristData ? nextProps.placeTouristData : []
    const touristData = placeTouristData.touristData? placeTouristData.touristData:[]
    
    if(touristData.length>0){
      this.setState({touristData})

      let tempTouristData=[]
      touristData.forEach(function (value, index) {
        if(index < 3){
          tempTouristData.push(value)
        }
      });
      this.setState({tempTouristData})
    }
    // restaurant
    const placeRestaurantData = nextProps.placeRestaurantData ? nextProps.placeRestaurantData : []
    const restaurantData = placeRestaurantData.restaurantData? placeRestaurantData.restaurantData:[]
    
    if(restaurantData.length>0){
      this.setState({restaurantData})

      let tempRestaurantData=[]
      restaurantData.forEach(function (value, index) {
        if(index < 3){
          tempRestaurantData.push(value)
        }
      });
      this.setState({tempRestaurantData})
    }
  }

  loadMoreTourist =()=>{
    var _rd = this.state.touristData
    var _pg = this.state.touristPage
    _pg++

    let _temp=[]
    _rd.forEach(function (value, index) {
      if(index < (_pg+1)*3){
        _temp.push(value)
      }
    })
    if(_temp.length > 0){      
      this.setState({tempTouristData:_temp})
      this.setState({touristPage: _pg})
    }
  }

  loadMoreRestaurant =()=>{
    var _rd = this.state.restaurantData
    var _pg = this.state.restaurantPage
    _pg++

    let _temp=[]
    _rd.forEach(function (value, index) {
      if(index < (_pg+1)*3){
        _temp.push(value)
      }
    })
    if(_temp.length > 0){      
      this.setState({tempRestaurantData:_temp})
      this.setState({restaurantPage: _pg})
    }
  }
  
  loadMoreHotel =()=>{
    var _rd = this.state.hotelData
    var _pg = this.state.hotelPage
    _pg++

    let _temp=[]
    _rd.forEach(function (value, index) {
      if(index < (_pg+1)*2){
        _temp.push(value)
      }
    })
    if(_temp.length > 0){      
      this.setState({tempHotelData:_temp})
      this.setState({hotelPage: _pg})
    }
  }

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
                      <Text style={styles.txtSectionTitle}>{strings('global.hotel')} in {this.state.placeTitle}</Text>
                      {/* <TouchableOpacity style={styles.more_area}>
                        <Text style={styles.txtLabelSm}>Hide info</Text>
                      </TouchableOpacity> */}
                    </View>
                    {/* <InfiniteScroll
                      horizontal={true}
                      onLoadMoreAsync={this.loadMoreHotel}
                      distanceFromEnd={10}> */}
                      <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.state.hotelData}
                        renderItem={this._renderHotelItem}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    {/* </InfiniteScroll>                     */}
                  </View>)
    }

    if(restaurantData.length > 0 ){
      restaurantView = 
          (<View style={styles.section}>
            <View style={styles.section_header}>
              <Text style={styles.txtSectionTitle}>{strings('global.restaurant')} in {this.state.placeTitle}</Text>
            </View>
            {/* <InfiniteScroll
              horizontal={true}
              onLoadMoreAsync={this.loadMoreRestaurant}
              distanceFromEnd={10}> */}
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.restaurantData}
                renderItem={this._renderRestaurantItem}
                keyExtractor={(item, index) => index.toString()}
              />
            {/* </InfiniteScroll>             */}
          </View>)
    }
    
    if(touristData.length > 0 ){
      touristView = 
          (<View style={styles.section}>
            <View style={styles.section_header}>
              <Text style={styles.txtSectionTitle}>{strings('global.tourist')} in {this.state.placeTitle}</Text>
            </View>
            {/* <InfiniteScroll
              horizontal={true}
              onLoadMoreAsync={this.loadMoreTourist}
              distanceFromEnd={10}> */}
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.touristData}
                renderItem={this._renderTouristItem}
                keyExtractor={(item, index) => index.toString()}
              />
            {/* </InfiniteScroll>             */}
          </View>)
    }
    
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
