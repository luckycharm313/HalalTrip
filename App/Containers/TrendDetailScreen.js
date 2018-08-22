import React, { Component } from 'react'
import { ScrollView, Text, View, ImageBackground, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { Images, Colors } from '../Themes'
import NavBar from '../Components/NavBar'
import TrendAction from '../Redux/TrendRedux'
// Styles
import styles from './Styles/TrendDetailScreenStyle'

class TrendDetailScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };
  
  constructor(props) {
    super(props)
    const {navigation} = this.props
    const { state : {params}} = navigation

    this.state = {
      trendId : params.trendId,
    }
  }
  
  componentWillMount(){
    this.props.getTrendDetail(this.state.trendId)
  }

  render () {
    const trendDetailData = this.props.trendDetailData ? this.props.trendDetailData : []
    const {title, rating, location, detailImages, description, img_url} = trendDetailData
    let _detailImages = detailImages ? detailImages : []

    return (
      <View style={styles.mainContainer}>
        <ScrollView style = {styles.container}>
          <View style = {styles.navbar}>
            <NavBar nav = {this.props.navigation} />
          </View>
          <ImageBackground style={styles.view_photo} source={{uri: img_url==null?"":img_url}} />
          <View style={styles.title_location_section}>
            <View style={styles.hotel_title_view}>
              <Text style={styles.txt_hotel_title}>{title}</Text>
            </View>
            <View style={styles.filter_section}>
              <View style={styles.description_view}>
                <ScrollView horizontal={true} style={styles.filter_image_section} showsHorizontalScrollIndicator={false}>
                  {
                    _detailImages.map(element => (
                      <Image style={styles.img_filter} source={{uri: element==null?"":element}} key={element}/>
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

const mapStateToProps = ({trend}) => {
  return {
    trendDetailData : trend.trendDetailData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTrendDetail: (trendId) => dispatch(TrendAction.getTrendDetail(trendId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendDetailScreen)
