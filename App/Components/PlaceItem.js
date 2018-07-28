import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, ImageBackground, TouchableOpacity, Dimensions} from 'react-native'
import resolveAssetSource from 'resolveAssetSource'
import styles from './Styles/PlaceItemStyle'

const deviceWidth = Dimensions.get('window').width
const imageWidth = deviceWidth / 2 - 20

export default class PlaceItem extends Component {
  
  componentWillMount() {
    let source = resolveAssetSource(this.props.data.img_url);
    this.setState({width: source.width, height: source.height})
  }

  _onFindHotel=()=>{
    this.props.nav.navigate('MapHotelScreen');
  }

  render () {
    const {title, cost, img_url} = this.props.data
    
    const {width, height} = this.state;
    let imageRatio = 1
    if (width) imageRatio = height / width
    const imageHeight = imageWidth * imageRatio

    return (
      <TouchableOpacity style={styles.container} onPress={this._onFindHotel}>
        <ImageBackground 
          style={[styles.img, {width: imageWidth, height: imageHeight}]}
          imageStyle={{ borderRadius: 10}}
          resizeMode={'contain'}
          source={img_url}>
          <View style={styles.opacity_view} >
            <Text style={styles.txt_title}>{title}</Text>
            <Text style={styles.txt_detail}>From {cost}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }
}
