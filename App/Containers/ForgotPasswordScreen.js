import React, { Component } from 'react'
import { TextInput, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'
// Styles
import styles from './Styles/ForgotPasswordScreenStyle'
import { Colors } from '../Themes'

class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _email : null
    };
  }

  render () {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.navbar}>
            <TouchableOpacity style={styles.backIcon} onPress = {() => goBack()}>
              <Icon name="arrow-back" style = {styles.icon_back}/>
            </TouchableOpacity>
            <Text style={styles.screen_title}>Forgot Password</Text>
            <View style={{width : 40}}>
            </View>
          </View>
            
          <View style={styles.body_section}>
            <Text style={styles.description_txt}>
              Enter your email and will send you instruction on how to reset it
            </Text>
            <TextInput
              ref = {'email'}
              name = {'Email' }
              type = {'TextInput'}
              underlineColorAndroid = {Colors.transparent}
              autoCapitalize = {'none'}
              autoCorrect = {false}
              placeholder = {'Email'}
              placeholderTextColor = {Colors.textHintColor}
              style = {styles.input_area}
              returnKeyType = 'go'
              selectionColor = {Colors.textHintColor}
              onChangeText = {(_email) => { this.setState({_email: _email})}}
              onChange = {this._onChangeEmail}
              maxLength = {100}/>

              <TouchableOpacity style={styles.btnSignIn}>
                <Text style={styles.txtSignIn}>Send</Text>
              </TouchableOpacity>
          </View>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
