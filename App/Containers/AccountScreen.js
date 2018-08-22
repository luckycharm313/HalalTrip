import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'

// Styles
import styles from './Styles/AccountScreenStyle'
import { Images, Colors } from '../Themes'
import UserAction from '../Redux/UserRedux'

class AccountScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  _onSelectMenu = (index) => {
    switch (index) {
      case 'saved':
        this.props.navigation.navigate('SavedScreen')
        break
      case 'notification':
        this.props.navigation.navigate('NotificationScreen')
        break
      case 'logout':
        this.props.logOut()
        break
    }
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <ImageBackground style={styles.view_wallpaper} source={Images.wallpaper}>
            <View style={styles.view_avatar} >
              <Image style={styles.img_avatar} source={Images.avatar} />
            </View>
            <Text style={styles.txt_authour}>Lindsay Dune</Text>
            <Text style={styles.txt_email}>lindsay@email.com</Text>
            <TouchableOpacity style={styles.view_edit_btn} >
              <Icon name="edit" style = {styles.icon_edit} />
              <Text style={styles.txt_btn}>Edit</Text>
            </TouchableOpacity>
          </ImageBackground>
          
          <ScrollView style={styles.view_options} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.setting_option} onPress = {this._onSelectMenu.bind(this, 'saved')}>
              <Text style={styles.txt_setting}>Saved</Text>
              <Icon name="receipt" style = {styles.icon_setting} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting_option} onPress = {this._onSelectMenu.bind(this, 'notification')} >
              <Text style={styles.txt_setting}>Notifications</Text>
              <Icon name="notifications" style = {styles.icon_setting} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.setting_option} >
              <Text style={styles.txt_setting}>Coupon Code</Text>
              <Icon name="beenhere" style = {styles.icon_setting} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting_option} >
              <Text style={styles.txt_setting}>Settings</Text>
              <Icon name="receipt" style = {styles.icon_setting} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting_option} >
              <Text style={styles.txt_setting}>Privacy</Text>
              <Icon name="lock" style = {styles.icon_setting} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting_option} >
              <Text style={styles.txt_setting}>Get Help</Text>
              <Icon name="help" style = {styles.icon_setting} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting_option} >
              <Text style={styles.txt_setting}>About</Text>
              <Icon name="info" style = {styles.icon_setting} />
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.setting_option} onPress = {this._onSelectMenu.bind(this, 'logout')} >
              <Text style={styles.txt_setting}>Logout</Text>
              <Icon name="settings-power" style = {styles.icon_setting} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.setting_option} >
              <Text style={styles.txt_setting}></Text>
            </TouchableOpacity> */}
          </ScrollView>
        </View>
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
    logOut: () => dispatch(UserAction.logOut()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
