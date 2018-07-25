import React, { Component } from 'react'
import { TouchableOpacity, Text, Image, View, ImageBackground, FlatList} from 'react-native'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'
import PlaceWithBottomName from '../Components/PlaceWithBottomName'

export default class LaunchScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data : [
        {
          title : 'Yala',
          img_url : Images.image1,
        },
        {
          title : 'Pattani',
          img_url : Images.image2,
        },
        {
          title : 'Narathiwat',
          img_url : Images.image3,
        },
        {
          title : 'Phuket',
          img_url : Images.image4,
        },
        {
          title : 'Krabi',
          img_url : Images.image1,
        },
      ]
    };
  }

  _renderItem = ({item}) => (
    <PlaceWithBottomName
      data = {item}
    />
  )

  _onClickNext = () => {
    this.props.navigation.navigate('LaunchInterestScreen')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground
          style={styles.bg_container}
          source={Images.image1}>
           <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex : 1}} >
              <View style={styles.skip_section}>
                <TouchableOpacity onPress={this._onClickSkip} style={styles.btn_skip}>
                  <Text style={styles.txt_skip}>Skip</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.title_section}>
                <Text style={styles.txt_place_title}>Choose a wonderful place</Text>
                <Text style={styles.txt_place_description}>Find the best place you want and enjoy your trip with your lover</Text>
              </View>
              <View style={styles.place_section}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.state.data}
                  renderItem={this._renderItem}
                  keyExtractor={(item, index) => index}
                />
              </View>
              <View style={styles.bottom_section}>
                <View style={styles.oval_section}>
                  <Image style={styles.oval_image_first_child} source = {Images.oval_active} resizeMode='contain' />
                  <Image style={styles.oval_image} source = {Images.oval_deactive} resizeMode='contain' />
                  <Image style={styles.oval_image} source = {Images.oval_deactive} resizeMode='contain' />
                </View>
                <TouchableOpacity onPress={this._onClickNext} style={styles.btn_skip}>
                  <Text style={styles.txt_skip}>Next</Text>
                </TouchableOpacity>
              </View>
           </View>
        </ImageBackground>
      </View>
    )
  }
}
