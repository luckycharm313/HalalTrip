import React, { Component } from 'react'
import { ScrollView, Text, View, ImageBackground, TouchableOpacity, Image, FlatList, Platform } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import StarRating from 'react-native-star-rating';
import { Images, Colors, Metrics } from '../Themes'
import NavBar from '../Components/NavBar'
import ActivityAction from '../Redux/ActivityRedux'
// Styles
import styles from './Styles/ActivitySavedDetailScreenStyle'
import { strings } from '../../locales/i18n';
import HTML from 'react-native-render-html'

class ActivitySavedDetailScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };
  
  constructor(props) {
    super(props)
    const {navigation} = this.props
    const { state : {params}} = navigation

    this.state = {
      activityId : params.activityId,
    }
  }

  componentWillMount(){
    this.props.getSavedActivityDetail(this.state.activityId)
  }

  render () {
    const savedActivityDetailData = this.props.savedActivityDetailData ? this.props.savedActivityDetailData : []
    const {title, rating, location, detailImages, description, img_url} = savedActivityDetailData
    let _detailImages = detailImages ? JSON.parse(detailImages) : []
    let _rating = Number.parseFloat(rating)
    
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
          <ImageBackground style={styles.view_photo} source={{uri : Platform.OS === 'android' ? 'file://' + img_url : '' + img_url}} />
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
                starSize = {15}
              />
              <Text style={styles.txt_review}>{rating}</Text>
            </View>
            <View style={styles.hotel_title_view}>
              <Text style={styles.txt_hotel_title}>{title}</Text>
            </View>
            {/* <View style={styles.filter_section}>
              <View style={styles.description_view}>
                <ScrollView horizontal={true} style={styles.filter_image_section} showsHorizontalScrollIndicator={false}>
                  {
                    _detailImages.map(element => (
                      <Image style={styles.img_filter} source={{uri :Platform.OS === 'android' ? 'file://' + element : '' + element}} key={element}/>
                    ))
                  }
                </ScrollView>
              </View>          
            </View> */}
            <View style={styles.hotel_location_view}>
              <View style={styles.hotel_location_section}>
                <Text style={styles.txt_location_label}>{strings('global.location')}</Text>
                <HTML
                  html={description}
                  renderers={_renderers}
                // onLinkPress={(evt, href) => this.externalLink(href)}
                />
                {/* <Text style={styles.txt_location_detail}>{location}</Text> */}
              </View>
            </View>
          </View>

          <View style={styles.detail_section_part}>
            <View style={styles.description_view}>
              <Text style={styles.txt_description_label}>{strings('global.description')}</Text>              
              <Text style={styles.txt_description_detail} >{description}</Text>
            </View>
          </View>          
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({activity}) => {
  return {
    savedActivityDetailData : activity.savedActivityDetailData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSavedActivityDetail: (activityId) => dispatch(ActivityAction.getSavedActivityDetail(activityId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitySavedDetailScreen)
