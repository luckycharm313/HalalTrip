import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, ImageBackground} from 'react-native'
import styles from './Styles/CategoryItemStyle'
import { Images } from '../Themes'
export default class CategoryItem extends Component {
  
  _goToPlace =()=>{
    if(this.props.data.name == "Hotel"){
      this.props.nav.navigate('HotelScreen')
    }
    else if(this.props.data.name == "Restaurant"){
      this.props.nav.navigate('RestaurantScreen')
    }
    else{
      this.props.nav.navigate('PlaceScreen')
    }
  }

  render () {
    const {name, count} = this.props.data
    const img_url = Images.image1

    return (
      <TouchableOpacity style={styles.container} onPress={this._goToPlace}>
          <ImageBackground 
            style={styles.img}
            imageStyle={{ borderRadius: 10}}
            source={img_url}>
            <View style={styles.opacity_view} >
              <Text style={styles.txt_title}>{name}</Text>
              <Text style={styles.txt_detail}>{count}&nbsp;{name}s</Text>
            </View>
          </ImageBackground>        
      </TouchableOpacity>
    )
  }
}
