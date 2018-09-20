import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
// Styles
import styles from './Styles/AccountScreenStyle'
import { Images, Colors } from '../Themes'
import UserAction from '../Redux/UserRedux'
import MainAction from '../Redux/MainRedux'
import Modal from "react-native-modal";
import { strings } from '../../locales/i18n';

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      multi_lang :[
        {label: strings('global.thailand'), value: 0 },
        {label: strings('global.english'), value: 1 },
        {label: strings('global.malay'), value: 2 },
      ],      
    }
  }
  
  componentWillMount(){
    this.props.loadProfile()    
  }

  _onSelectMenu = (index) => {    
    switch (index) {
      case 'saved':
        this.props.navigation.navigate('SavedScreen')
        break
      case 'notification':
        this.props.navigation.navigate('NotificationScreen')
        break
      case 'emergency':
        this.props.navigation.navigate('EmergencyContactScreen')
        break
      case 'weather':
        this.props.navigation.navigate('WeatherScreen')
        break
      case 'multiLang':
        this.setState({modalVisible: true})
        break
      case 'logout':
        this.props.logOut()
        break
    }
  }

  _onSelectLang = (index) => {
    this.setState({langIndex : index})
    this.setState({modalVisible: false})
    let lang_code = null
    switch (index) {
      case 0:
        lang_code = "th"
        break
      case 1:
        lang_code = "en"
        break
      case 2:
        lang_code = "ms"
        break
    }
    this.props.setLanguage(lang_code)
  }
  
  render () {
    userData = this.props.userData ? this.props.userData :[]
    const {avatar, displayname, email} = userData
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Modal
            animationType="fade"
            transparent={true}
            isVisible={this.state.modalVisible}
            onBackdropPress={() => this.setState({ modalVisible: false })}
            style={styles.modal}>
            <View style={styles.modalView}>
              <RadioForm
                radio_props={this.state.multi_lang}
                initial={this.props.lang}
                labelColor={Colors.primary}
                onPress={(value) => this._onSelectLang(value)}
                radioStyle={{marginBottom: 20}}
              />
            </View>
            
          </Modal>
          <ImageBackground style={styles.view_wallpaper} source={Images.wallpaper}>
            <View style={styles.view_avatar} >
              <Image style={styles.img_avatar} source={{uri: avatar==null?"":avatar}} />
            </View>
            <Text style={styles.txt_authour}>{displayname}</Text>
            <Text style={styles.txt_email}>{email}</Text>
            {/* <TouchableOpacity style={styles.view_edit_btn} >
              <Icon name="edit" style = {styles.icon_edit} />
              <Text style={styles.txt_btn}>Edit</Text>
            </TouchableOpacity> */}
          </ImageBackground>
          
          <ScrollView style={styles.view_options} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.setting_option} onPress = {this._onSelectMenu.bind(this, 'saved')}>
              <Text style={styles.txt_setting}>{strings('global.save')}</Text>
              <Icon name="receipt" style = {styles.icon_setting} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting_option} onPress = {this._onSelectMenu.bind(this, 'notification')} >
              <Text style={styles.txt_setting}>{strings('global.notification')}</Text>
              <Icon name="notifications" style = {styles.icon_setting} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting_option} onPress = {this._onSelectMenu.bind(this, 'emergency')} >
              <Text style={styles.txt_setting}>{strings('global.emergency')}</Text>
              <Icon name="warning" style = {styles.icon_setting} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting_option} onPress = {this._onSelectMenu.bind(this, 'weather')} >
              <Text style={styles.txt_setting}>{strings('global.weather')}</Text>
              <Icon name="wb-sunny" style = {styles.icon_setting} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.setting_option} onPress = {this._onSelectMenu.bind(this, 'multiLang')} >
              <Text style={styles.txt_setting}>{strings('global.multi_lang')}</Text>
              <Icon name="language" style = {styles.icon_setting} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.setting_option} >
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
              <Text style={styles.txt_setting}>{strings('global.log_out')}</Text>
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

const mapStateToProps = ({user, main}) => {
  return {
    userData : user.userData,
    lang : main.lang
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(UserAction.logOut()),
    loadProfile: () => dispatch(UserAction.loadProfile()),
    setLanguage: (lang_code) => dispatch(MainAction.setLanguage(lang_code)),    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
