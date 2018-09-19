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
      this.props.nav.navigate('TouristScreen')
    }
  }

  render () {
    const {name, count} = this.props.data
    let img_url = Images.image1

    if(name == "Hotel"){
      img_url = Images.image2
    }
    else if(name == "Restaurant"){
      img_url = Images.image3
    }
    else{
      img_url = Images.image4
    }

    return (
      <TouchableOpacity style={styles.container} onPress={this._goToPlace}>
          <ImageBackground 
            style={styles.img}
            imageStyle={{ borderRadius: 10}}
            source={img_url}>
            <View style={styles.opacity_view} >
              <Text style={styles.txt_title}>{name}</Text>
              {/* <Text style={styles.txt_detail}>{count}&nbsp;{name}s</Text> */}
            </View>
          </ImageBackground>        
      </TouchableOpacity>
    )
  }
}
