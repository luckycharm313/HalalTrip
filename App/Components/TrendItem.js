import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import styles from './Styles/TrendItemStyle'

export default class TrendItem extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    const {title, detail, img_url} = this.props.data
    return (
      <TouchableOpacity style={styles.container}>
          <ImageBackground 
            style={styles.img}
            imageStyle={{ borderRadius: 10}}
            source={img_url}>
            <View style={styles.opacity_view} >
              <Text style={styles.txt_title}>{title}</Text>
              <Text style={styles.txt_detail}>{detail}</Text>
            </View>
          </ImageBackground>        
      </TouchableOpacity>
    )
  }
}
