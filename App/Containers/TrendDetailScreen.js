import React, { Component } from 'react'
import { ScrollView, WebView, Text, View, ImageBackground, TouchableOpacity, Image, Linking } from 'react-native'
import { connect } from 'react-redux'
import { Images, Metrics } from '../Themes'
import NavBar from '../Components/NavBar'
import TrendAction from '../Redux/TrendRedux'
// Styles
import styles from './Styles/TrendDetailScreenStyle'
import HTML from 'react-native-render-html'
import { strings } from '../../locales/i18n';
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
  
  externalLink(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
      }
      else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render () {
    const trendDetailData = this.props.trendDetailData ? this.props.trendDetailData : []
    const {title, rating, location, detailImages, description, img_url} = trendDetailData
    let _detailImages = detailImages ? detailImages : []

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
            style={{borderWidth: 1, borderColor: 'red', width: Metrics.screenWidth - 30, height: Metrics.screenWidth * 60 / 100}}
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
          <ImageBackground style={styles.view_photo} source={{uri: img_url?img_url:""}} />
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
                <Text style={styles.txt_location_label}>{strings('global.location')}</Text>
                <Text style={styles.txt_location_detail}>{location}</Text>
              </View>
            </View>
          </View>

          <View style={styles.detail_section_part}>
            <View style={styles.description_view}>
              <Text style={styles.txt_description_label}>{strings('global.description')}</Text>              
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
