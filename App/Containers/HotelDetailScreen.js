import React, { Component } from 'react'
import { ScrollView, WebView, Text, View, ImageBackground, TouchableOpacity, Image, Linking, FlatList } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import StarRating from 'react-native-star-rating';
import HTML from 'react-native-render-html'

import HotelAction from '../Redux/HotelRedux'
// Styles
import styles from './Styles/HotelDetailScreenStyle'
import { Images, Colors, Metrics } from '../Themes'
import NavBar from '../Components/NavBar'
import HotelItem from '../Components/HotelItem'
import Modal from "react-native-modal";
import InfiniteScroll from 'react-native-infinite-scroll'
import { strings } from '../../locales/i18n';

class HotelDetailScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };
  
  constructor(props) {
    super(props)
    const {navigation} = this.props
    const { state : {params}} = navigation

    this.state = {
      hotelId : params.hotelId,
      modalVisible: false,
      hotelTotalData :[],
      tempHotelData:[],
      pageHotel: 0,
      starCount : 0,
      filterData : ['Breakfast included', '2 Beds', 'Bookable', 'Free Cancellation'],
      filterImage : [Images.image1, Images.image2, Images.image3, Images.image4, Images.image1, Images.image3, ],
    }
  }

  componentWillMount(){
    this.props.getHotelDetail(this.state.hotelId)
  }

  _onMapView =()=>{
    this.props.navigation.navigate('MapViewScreen',{
      street_lat : this.props.hotelDetailData.street_lat, 
      street_lng : this.props.hotelDetailData.street_lng,
      title : this.props.hotelDetailData.title
    });
  }

  _moreComponentRender = (element) =>{
    return(
      <TouchableOpacity style={styles.view_more_component}>
        <Text style={styles.txt_more_component}>{element}</Text>
      </TouchableOpacity>
    )
  }
  _renderHotelItem = ({item}) => (
    <HotelItem
      data = {item}
      nav = {this.props.navigation}
    />
  )
  
  externalLink(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
      }
      else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }
  
  _onGiveRating =()=>{
    this.setState({modalVisible: true})
  }

  onStarRatingPress = (rating)=> {
    this.setState({
      starCount: rating
    });
  }

  _onModalCancel =()=>{
    this.setState({modalVisible: false})
  }
  _onModalOK =()=>{
    this.setState({modalVisible: false})
    let id = this.props.hotelDetailData.id
    let rate = this.state.starCount
    this.props.setRate(id, rate)
  }

  componentWillReceiveProps(nextProps){
    const hotelDetailData = nextProps.hotelDetailData? nextProps.hotelDetailData:[]
    const hotelTotalData = nextProps.hotelTotalData? nextProps.hotelTotalData:[]
    const {rating} = hotelDetailData
    const _rating = Number.parseFloat(rating)
    this.setState({starCount : _rating})
    
    if(hotelTotalData.length>0){
      this.setState({hotelTotalData})

      let _temp=[]
      hotelTotalData.forEach(function (value, index) {
        if(index < 2){
          _temp.push(value)
        }
      });
      this.setState({tempHotelData:_temp})
    }    
  }

  loadMoreSimilarHotels =()=>{
    var _rd = this.state.hotelTotalData
    var _pg = this.state.pageHotel
    _pg++

    let _temp=[]
    _rd.forEach(function (value, index) {
      if(index < (_pg+1)*2){
        _temp.push(value)
      }
    })
    if(_temp.length > 0){      
      this.setState({tempHotelData:_temp})
      this.setState({pageHotel: _pg})
    }
  }

  render () {
    const __data = this.props.hotelDetailData ? this.props.hotelDetailData : []
    const {title, rating, location, detailImages, description, img_url, amenity} = __data
    let _detailImages = detailImages ? detailImages : []
    let _amenity = amenity ? amenity : []
    let _rating = Number.parseFloat(rating)
    let similarHotelView = null
    if(this.props.hotelTotalData.length > 0){
      similarHotelView = (
        <View style={styles.reviews_section}>
          <Text style={[styles.txt_description_label,{marginBottom : 15}]}>{strings('hotel.similar_hotel')}</Text>
          {/* <InfiniteScroll
              horizontal={true}
              onLoadMoreAsync={this.loadMoreSimilarHotels}
              distanceFromEnd={10}> */}
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.hotelTotalData}
                renderItem={this._renderHotelItem}
                keyExtractor={(item, index) => index.toString()}
              />
          {/* </InfiniteScroll>           */}
        </View>
      )
    }

    let amentityView = null
    if(_amenity.length > 0 ){
      amentityView = (
        <View style={styles.description_view}>
          <Text style={styles.txt_description_label}>{strings('hotel.amenities')}</Text>
          <ScrollView horizontal={true} style={styles.description_view} showsHorizontalScrollIndicator={false}>
            {
              _amenity.map(element => (
                <Text style={styles.txt_amenity} key={element}>{element}</Text>
              ))
            }
          </ScrollView>    
        </View>          
      )
    }
    const _renderers = {
      img: (htmlAttribs, children, passProps) => {
        return (
          <Image
            source={{uri: htmlAttribs.src?htmlAttribs.src:"", width: Metrics.screenWidth - 30, height: Metrics.screenWidth * 60 / 100}}
            style={{marginVertical : 10}}
            {...passProps} />)
      },
      iframe: (htmlAttribs, children, passProps)=>{
        return(
          <WebView
            style={{width: Metrics.screenWidth - 30, height: Metrics.screenWidth * 60 / 100}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{uri: htmlAttribs.src?htmlAttribs.src:""}}
          />
        )
      }
    }

    return (
      <View style={styles.mainContainer}>
        <ScrollView style = {styles.container}>
          <View style = {styles.navbar}>
            <NavBar nav = {this.props.navigation} />
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            isVisible={this.state.modalVisible}
            onBackdropPress={() => this.setState({ modalVisible: false })}
            style={styles.modal}>
            <View style={styles.modalView}>
              <View style={styles.modal_section}>
                <Text style={styles.modal_title_text}>Please rate to the {title}</Text>
              </View>
              <View style={styles.modal_section}>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={this.state.starCount}
                    fullStarColor={Colors.primary}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    starSize = {25}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                  />
              </View>
              <View style={styles.modal_section_btn}>
                <TouchableOpacity style={styles.modal_btn_cancel} onPress={this._onModalCancel}>
                  <Text style={styles.modal_btn_txt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modal_btn_ok} onPress={this._onModalOK}>
                  <Text style={styles.modal_btn_txt}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <ImageBackground style={styles.view_photo} source={{uri: img_url?img_url:""}}>
            {/* <View style={styles.photo_action}> 
              <View style={styles.photo_number}>
                <Text style={styles.txt_number}>1/5</Text>
              </View>
              <TouchableOpacity style={styles.photo_btn}>
                <Icon name="apps" style = {styles.icon_all} />
                <Text style={styles.txt_btn}>View All Photo</Text>
              </TouchableOpacity>
            </View> */}
          </ImageBackground>

          <View style={styles.title_location_section}>
            <TouchableOpacity style={styles.hotel_review_view} onPress={this._onGiveRating}>
              <Text style={styles.txt_review}>{rating} Stars Hotel</Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={_rating}
                fullStarColor={Colors.primary}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                starSize = {25}
                selectedStar={() => this._onGiveRating()}
              />           
            </TouchableOpacity>
            <View style={styles.hotel_title_view}>
              <Text style={styles.txt_hotel_title}>{title}</Text>
            </View>
            <View style={styles.hotel_location_view}>
              <View style={styles.hotel_location_section}>
                <Text style={styles.txt_location_label}>{strings('global.location')}</Text>
                <Text style={styles.txt_location_detail}>{location}</Text>
                {/* <TouchableOpacity style={styles.btn_nearby}>
                  <Text style={styles.txt_nearby}>Explore Nearby</Text>
                </TouchableOpacity> */}
              </View>
              <View style={styles.hotel_location_map}>
                {/* <ImageBackground style={styles.img_map} source={Images.map_default} imageStyle = {{borderRadius : 40 }}>
                  <Icon name="location-on" style = {styles.icon_map} />
                </ImageBackground> */}
                <TouchableOpacity style={styles.btn_action} onPress={this._onMapView}>
                  <Icon name="location-on" style = {styles.icon_action} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* <View style={styles.rating_section}>
            <View style={styles.rating_view}>
              <Text style={styles.txt_rating}>8.8</Text>
              <View style={styles.comment_section}>
                <Text style={styles.txt_comment}>Very Good</Text>
                <Text style={styles.txt_count_review}>947 reviews</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={styles.txt_review_rating}>See reviews</Text>
            </TouchableOpacity>
          </View> */}

          <View style={styles.detail_section_part}>
            <View style={styles.description_view}>
              <Text style={styles.txt_description_label}>{strings('global.description')}</Text>              
              <HTML
                html={description}
                renderers={_renderers}
                onLinkPress={(evt, href) => this.externalLink(href)}
                />
            </View>
            {amentityView}
          </View>

          <View style={styles.filter_section}>
            <View style={styles.description_view}>
              {/* <Text style={styles.txt_description_label}>Filter</Text>
              <ScrollView horizontal={true} style={styles.description_view} showsHorizontalScrollIndicator={false}>
                {
                  this.state.filterData.map(element => (
                    <Text style={styles.txt_filter}>{element}</Text>
                  ))
                }
              </ScrollView> */}
              {/* <ScrollView horizontal={true} style={styles.filter_image_section} showsHorizontalScrollIndicator={false}>
                {
                  _detailImages.map(element => (
                    <Image style={styles.img_filter} source={{uri: element==null?"":element}} key={element}/>
                  ))
                }
              </ScrollView> */}
              {/* <View style={styles.description_filter_view}>
                <Text style={styles.txt_filter}>
                  <Image style={styles.img_shape} source={Images.icon_shape}/> 
                  &nbsp;&nbsp;30&nbsp;
                  <Image style={styles.img_square_meters} source={Images.icon_square_meters}/>
                </Text>
                <Text style={styles.txt_filter}>
                  <Image style={styles.img_shape} source={Images.icon_bed}/> 
                  &nbsp;&nbsp;1 Double Bed
                </Text>
              </View>
              <View style={styles.room_section}>
                <Text style={styles.room_title}>Standard Family Room</Text>
                <View style={styles.room_spec_view}>
                  <Text style={styles.txt_room}>
                    <Image style={styles.img_room_icon} source={Images.icon_food}/> 
                    &nbsp;&nbsp;Breakfast Included
                  </Text>
                  <Text style={styles.txt_room}>
                    <Image style={styles.img_room_icon} source={Images.icon_image}/> 
                    &nbsp;&nbsp;Ocean View
                  </Text>
                </View>
                <View style={styles.room_spec_view}>
                  <Text style={styles.txt_room}>
                    <Image style={styles.img_room_icon} source={Images.icon_wifi}/> 
                    &nbsp;&nbsp;Free Wifi
                  </Text>
                  <Text style={styles.txt_room}>
                    <Image style={styles.img_room_icon} source={Images.icon_water}/> 
                    &nbsp;&nbsp;Hot Water
                  </Text>
                </View>
                <View style={styles.booking_section}>
                  <View style={styles.cost_view}>
                    <Text style={styles.txt_cost}>$239 per night</Text>
                    <Text style={styles.txt_cost_label}>Today's best offer!</Text>
                  </View>
                  <View style={styles.btn_booking}>
                    <Text style={styles.txt_booking}>Book Now</Text>
                  </View>
                </View>
              </View> 
              <View style={styles.more_compoent_btn}>
                {this._moreComponentRender("Show more 5 rooms")}
              </View>*/}
            </View>          
          </View>

          {/* <View style={styles.reviews_section}>
            <Text style={styles.txt_description_label}>Reviews</Text>
            <View style={styles.reviews_view}>
              <Image style={styles.img_review} source={Images.image1}/> 
              <View style={styles.reviews_user}>
                <Text style={styles.txt_review_label}>Sri Wedari Soekarno</Text>
                <Text style={styles.txt_review_date}>May 2018</Text>
              </View>            
            </View>
            <Text style={styles.reviews_detail}>
              Absolutely perfect! Best sea house in earth, this is a gated property, architects, neighborhood live next door. You will find feeling..
            </Text>
            <View style={styles.more_compoent_btn}>
              {this._moreComponentRender("Read all 237 reviews")}
            </View>
          </View> */}

          {/* <View style={styles.reviews_section}>
            <Text style={styles.txt_description_label}>More Options</Text>
            <TouchableOpacity style={styles.option_view}>
              <Text style={styles.txt_more_option}>Popular Attractions Nearby</Text>
              <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option_view}>
              <Text style={styles.txt_more_option}>Hotel Policies</Text>
              <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option_view}>
              <Text style={styles.txt_more_option}>Important Information</Text>
              <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
            </TouchableOpacity>
          </View> */}
          {similarHotelView}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({hotel}) => {
  return {
    hotelDetailData : hotel.hotelDetailData,
    hotelTotalData : hotel.hotelTotalData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHotelDetail: (hotelId) => dispatch(HotelAction.getHotelDetail(hotelId)),
    setRate : (id, rate) => dispatch(HotelAction.setRate(id, rate)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetailScreen)
