import React, { Component } from 'react'
import { ScrollView, Text, View, ImageBackground, TouchableOpacity, Image, WebView,Platform } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import StarRating from 'react-native-star-rating';
import ViewMoreText from 'react-native-view-more-text'

import HotelAction from '../Redux/HotelRedux'
// Styles
import styles from './Styles/HotelSavedDetailScreenStyle'
import { Images, Colors, Metrics } from '../Themes'
import NavBar from '../Components/NavBar'
import HotelItem from '../Components/HotelItem'
import { strings } from '../../locales/i18n';
import HTML from 'react-native-render-html'

class HotelSavedDetailScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };
  
  constructor(props) {
    super(props)
    const {navigation} = this.props
    const { state : {params}} = navigation

    this.state = {
      hotelId : params.hotelId,
      filterData : ['Breakfast included', '2 Beds', 'Bookable', 'Free Cancellation'],
      filterImage : [Images.image1, Images.image2, Images.image3, Images.image4, Images.image1, Images.image3, ],
    }
  }

  componentWillMount(){
    this.props.getSavedHotelDetail(this.state.hotelId)
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

  render () {
    const __data = this.props.hotelSavedDetailData ? this.props.hotelSavedDetailData : []
    const {title, rating, location, detailImages, description, img_url, amenity} = __data
    let _detailImages = detailImages ? JSON.parse(detailImages) : []
    let _amenity = amenity ? JSON.parse(amenity) : []
    let _rating = Number.parseFloat(rating)
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
          <ImageBackground style={styles.view_photo} source={{uri : Platform.OS === 'android' ? 'file://' + img_url : '' + img_url}}>
            
          </ImageBackground>

          <View style={styles.title_location_section}>
            <View style={styles.hotel_review_view}>
              
              <StarRating
                disabled={false}
                maxStars={5}
                rating={_rating}
                fullStarColor={Colors.primary}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                starSize = {20}
              />
              <Text style={styles.txt_review}>{rating}</Text>
            </View>
            <View style={styles.hotel_title_view}>
              <Text style={styles.txt_hotel_title}>{title}</Text>
            </View>
            <View style={styles.hotel_location_view}>
              <View style={styles.hotel_location_section}>
                <Text style={styles.txt_location_label}>{strings('global.location')}</Text>
                <Text style={styles.txt_location_detail}>{location}</Text>
              </View>
              <View style={styles.hotel_location_map}>
                <TouchableOpacity style={styles.btn_action}>
                  <Icon name="location-on" style = {styles.icon_action} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.detail_section_part}>
            <View style={styles.description_view}>
              <Text style={styles.txt_description_label}>{strings('global.description')}</Text>              
              {/* <Text style={styles.txt_description_detail} >{description}</Text> */}
              <HTML
                html={description}
                renderers={_renderers}
                // onLinkPress={(evt, href) => this.externalLink(href)}
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
              <ScrollView horizontal={true} style={styles.filter_image_section} showsHorizontalScrollIndicator={false}>
                {
                  _detailImages.map(element => (
                    <Image style={styles.img_filter} source={{uri :Platform.OS === 'android' ? 'file://' + element : '' + element}} key={element}/>
                  ))
                }
              </ScrollView>             
            </View>          
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({hotel}) => {
  return {
    hotelSavedDetailData : hotel.hotelSavedDetailData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSavedHotelDetail: (hotelId) => dispatch(HotelAction.getSavedHotelDetail(hotelId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HotelSavedDetailScreen)
