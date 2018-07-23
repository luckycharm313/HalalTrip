import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/PlaceWithBottomNameStyle'

export default class PlaceWithBottomName extends Component {
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
    const {title, img_url} = this.props.data
    return (
      <TouchableOpacity style={styles.container}>
        <Image 
          style={styles.place_img}
          source={img_url}
          resizeMode='cover'/>
        <Text style={styles.place_title}>{title}</Text>
      </TouchableOpacity>
    )
  }
}
