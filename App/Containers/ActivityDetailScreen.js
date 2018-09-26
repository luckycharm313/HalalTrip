import React, { Component } from 'react'
import { ScrollView, Text, View, ImageBackground, TouchableOpacity, Image, FlatList, Linking } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import StarRating from 'react-native-star-rating';
import HTML from 'react-native-render-html'

import { Images, Colors, Metrics } from '../Themes'
import NavBar from '../Components/NavBar'
import ActivityAction from '../Redux/ActivityRedux'
// Styles
import styles from './Styles/ActivityDetailScreenStyle'

import { strings } from '../../locales/i18n';
import Modal from "react-native-modal";

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
      modalVisible: false,
      starCount : 0,
    }
  }

  componentWillMount(){
    this.props.getActivityDetail(this.state.activityId)
  }
  
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
    let id = this.props.activityDetailData.id
    let rate = this.state.starCount
    this.props.setActivityRate(id, rate)
  }

  componentWillReceiveProps(nextProps){
    const activityDetailData = nextProps.activityDetailData? nextProps.activityDetailData:[]
    const {rating} = activityDetailData
    const _rating = Number.parseFloat(rating)
    this.setState({starCount : _rating})    
  }
  
  render () {
    const activityDetailData = this.props.activityDetailData ? this.props.activityDetailData : []
    const {title, rating, location, detailImages, description, img_url} = activityDetailData
    let _detailImages = detailImages ? detailImages : []
    let _rating = Number.parseFloat(rating)
    
    const _renderers = {
      img: (htmlAttribs, children, passProps) => {
        return (
          <Image
            source={{uri: htmlAttribs.src?htmlAttribs.src:"", width: Metrics.screenWidth - 30, height: Metrics.screenWidth * 60 / 100}}
            style={{marginVertical : 10}}
            {...passProps} />)
      },
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
          <ImageBackground style={styles.view_photo} source={{uri: img_url==null?"":img_url}} />
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
                starSize = {25}
                selectedStar={() => this._onGiveRating()}
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
                <Text style={styles.txt_location_label}>{strings('global.location')}</Text>
                <Text style={styles.txt_location_detail}>{location}</Text>
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
                onLinkPress={(evt, href) => this.externalLink(href)}
                />
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
    setActivityRate : (id, rate) => dispatch(ActivityAction.setActivityRate(id, rate)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetailScreen)
