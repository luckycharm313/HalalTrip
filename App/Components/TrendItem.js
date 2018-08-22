import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import styles from './Styles/TrendItemStyle'

export default class TrendItem extends Component {
  _goToTrendDetail =()=>{
    this.props.nav.navigate('TrendDetailScreen', {trendId : this.props.data.id});
  }

  render () {
    const {title, img_url} = this.props.data
    return (
      <TouchableOpacity style={styles.container} onPress={this._goToTrendDetail}>
          <ImageBackground 
            style={styles.img}
            imageStyle={{ borderRadius: 10}}
            source={{uri: img_url==null?"":img_url}}>
            <View style={styles.opacity_view} >
              <Text style={styles.txt_title}>{title}</Text>
              {/* <Text style={styles.txt_detail}>{description}</Text> */}
            </View>
          </ImageBackground>        
      </TouchableOpacity>
    )
  }
}
