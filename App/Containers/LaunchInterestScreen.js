import React, { Component } from 'react'
import { TouchableOpacity, Text, Image, View, ImageBackground, FlatList, ScrollView} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LaunchInterestScreenStyle'
import { Images } from '../Themes'

class LaunchInterestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data1 : ['History', 'Sport', 'Art', 'Entertainment', 'Outdoor'],
      data2 : ['Music', 'Social', 'Nightlife', 'Concerts', 'Health'],
      data3 : ['Submarine', 'Shopping', 'Walking', 'Museum', 'Cinema']
    };
  }
  _onClickNext = () => {
    this.props.navigation.navigate('SignInScreen')
  }

  activityComponet = (title) => {
    return (
      <TouchableOpacity style={styles.activityComponet} key={title}>
        <Text style={styles.txt_activity}>{title}</Text>
      </TouchableOpacity>
    )
  }
  render () {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground
          style={styles.bg_container}
          source={Images.image1}>
           <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex : 1}} >
              <View style={styles.title_section}>
                <Text style={styles.txt_place_title}>Choose your interest</Text>
                <Text style={styles.txt_place_description}>Which type of activity are you interested in?</Text>
              </View>
              
              <View>
                <ScrollView horizontal={true} style={styles.interested_section}>
                  <View style={styles.place_section}>
                    <View style={styles.interested_line}>
                      {this.state.data1.map(element => (
                          this.activityComponet(element)
                        ))}
                    </View>
                    <View style={styles.interested_line}>
                      {this.state.data2.map(element => (
                          this.activityComponet(element)
                        ))}
                    </View>
                    <View style={styles.interested_line}>
                      {this.state.data3.map(element => (
                          this.activityComponet(element)
                        ))}
                    </View>
                  </View>
                </ScrollView>
              </View>
              
              <View style={styles.bottom_section}>
                <View style={styles.oval_section}>
                  <Image style={styles.oval_image_first_child} source = {Images.oval_deactive} resizeMode='contain' />
                  <Image style={styles.oval_image} source = {Images.oval_deactive} resizeMode='contain' />
                  <Image style={styles.oval_image} source = {Images.oval_active} resizeMode='contain' />
                </View>
                <TouchableOpacity onPress={this._onClickNext} style={styles.btn_skip}>
                  <Text style={styles.txt_skip}>Get started</Text>
                </TouchableOpacity>
              </View>
           </View>
        </ImageBackground>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchInterestScreen)
