import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView} from 'react-native'
import styles from './Styles/SignInStyle'

import { Images, Colors } from '../Themes'

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _email : null,
      _password : null,
    };
  }

  _onForgotPassword = () => {
    // this.props.nav.navigate('ForgotPasswordScreen')
  }
  _onSignIn = () => {
    if(this.state._email == null || this.state._password == null)
      alert('Invalid Input data')
    else
      this.props.signIn(this.state._email, this.state._password)    
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
        <TextInput
          ref = {'email'}
          name = {'Email' }
          type = {'TextInput'}
          underlineColorAndroid = {Colors.transparent}
          autoCapitalize = {'none'}
          autoCorrect = {false}
          placeholder = {'Email'}
          validators = {'isEmail'}
          placeholderTextColor = {Colors.textHintColor}
          style = {styles.input_area}
          returnKeyType = 'go'
          selectionColor = {Colors.textHintColor}
          onChangeText = {(_email) => { this.setState({_email: _email})}}
          maxLength = {100}/>
        
        <TextInput
          ref = {'password'}
          name = {'Password' }
          secureTextEntry={true}
          underlineColorAndroid = {Colors.transparent}
          autoCapitalize = {'none'}
          autoCorrect = {false}
          placeholder = {'Password'}
          placeholderTextColor = {Colors.textHintColor}
          style = {styles.input_area}
          returnKeyType = 'go'
          selectionColor = {Colors.textHintColor}
          onChangeText = {(_password) => { this.setState({_password: _password})}}
          maxLength = {100}/>
        
        <TouchableOpacity style={styles.btnSignIn} onPress={this._onSignIn}>
          <Text style={styles.txtSignIn}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnForgot} onPress={this._onForgotPassword}>
          <Text style={styles.txtForgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnSocial, {backgroundColor:'#3c66c4'}]}>
          <Image style={styles.social_icon} source={Images.facebook} resizeMode='contain' />
          <Text style={styles.social_txt}>Signin with Facebook</Text>
          <View style={styles.hiddenView} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnSocial, {backgroundColor:'#cf4332'}]}>
          <Image style={styles.social_icon} source={Images.googleplus} resizeMode='contain' />
          <Text style={styles.social_txt}>Signin with Google</Text>
          <View style={styles.hiddenView} />
        </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}
