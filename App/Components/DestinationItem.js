import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from './Styles/DestinationItemStyle'

export default class DestinationItem extends Component {
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
    const {title, hotel_count, activty_count, img_url} = this.props.data
    return (
      <TouchableOpacity style={styles.container}>
          <ImageBackground 
            style={styles.img}
            imageStyle={{ borderRadius: 10}}
            source={img_url}>
            <View style={styles.opacity_view} >
              <Text style={styles.txt_title}>{title}</Text>
              <Text style={styles.txt_detail}>{hotel_count} hotels    <Icon name="fiber-manual-record" style = {styles.icon_dot} />  {activty_count} activities </Text>
            </View>
          </ImageBackground>        
      </TouchableOpacity>
    )
  }
}
