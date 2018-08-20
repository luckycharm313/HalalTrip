import React, { Component } from 'react'
import { ScrollView, Text, View, ImageBackground, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import StarRating from 'react-native-star-rating';
import { Images, Colors } from '../Themes'
import NavBar from '../Components/NavBar'
import ActivityAction from '../Redux/ActivityRedux'
// Styles
import styles from './Styles/ActivityDetailScreenStyle'

class ActivityDetailScreen extends Component {

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
    this.props.getActivityDetail(this.state.activityId)
  }

  render () {
    const activityDetailData = this.props.activityDetailData ? this.props.activityDetailData : []
    const {title, rating, location, detailImages, description, img_url} = activityDetailData
    let _detailImages = detailImages ? detailImages : []
    let _rating = Number.parseFloat(rating)
    
    return (
      <View style={styles.mainContainer}>
        <ScrollView style = {styles.container}>
          <View style = {styles.navbar}>
            <NavBar nav = {this.props.navigation} />
          </View>
          <ImageBackground style={styles.view_photo} source={{uri : img_url}} />
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
            <View style={styles.filter_section}>
              <View style={styles.description_view}>
                <ScrollView horizontal={true} style={styles.filter_image_section} showsHorizontalScrollIndicator={false}>
                  {
                    _detailImages.map(element => (
                      <Image style={styles.img_filter} source={{uri :element}} key={element}/>
                    ))
                  }
                </ScrollView>
              </View>          
            </View>
            <View style={styles.hotel_location_view}>
              <View style={styles.hotel_location_section}>
                <Text style={styles.txt_location_label}>Location</Text>
                <Text style={styles.txt_location_detail}>{location}</Text>
              </View>
            </View>
          </View>

          <View style={styles.detail_section_part}>
            <View style={styles.description_view}>
              <Text style={styles.txt_description_label}>Description</Text>              
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
    activityDetailData : activity.activityDetailData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getActivityDetail: (activityId) => dispatch(ActivityAction.getActivityDetail(activityId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetailScreen)
