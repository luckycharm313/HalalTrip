import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView} from 'react-native'
import styles from './Styles/SignInStyle'
import randomString from 'random-string'

import { Images, Colors } from '../Themes'
import { strings } from '../../locales/i18n';
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _email : null,
      _password : null,
      _recaptcha : null,
      captcha : null,
      isRobot : false,
    };
  }

  _confirmCaptcha =()=>{
    if(this.state.captcha == this.state._recaptcha){
      this.setState({isRobot : true})
    }
  }

  _onForgotPassword = () => {
    // this.props.nav.navigate('ForgotPasswordScreen')
  }
  _onSignIn = () => {
    if(this.state.isRobot){
      if(this.state._email == null || this.state._password == null)
        alert('Invalid Input data')
      else
        this.props.signIn(this.state._email, this.state._password)    
    }
    else{
      alert("Invalid Captcha Code")
    }    
  }

  _SignInWithFacebook (){
    this.props.signInWithFacebook()  
  }
  
  _SignInWithGoogle (){
    this.props.signInWithGoogle()
  }

  componentDidMount(){
    var captcha = randomString({
      length: 4,
      numeric: true,
      letters: true,
      special: false,
      exclude: []
    });
    this.setState({captcha})
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
          placeholder = {strings('sign.email')}
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
          placeholder = {strings('sign.password')}
          placeholderTextColor = {Colors.textHintColor}
          style = {styles.input_area}
          returnKeyType = 'go'
          selectionColor = {Colors.textHintColor}
          onChangeText = {(_password) => { this.setState({_password: _password})}}
          maxLength = {100}/>
        
        <View style={styles.view_captcha}>
          <Text style={styles.txt_captcha}>{this.state.captcha}</Text>
          <TextInput
            ref = {'recaptcha'}
            name = {'recaptcha' }
            type = {'TextInput'}
            underlineColorAndroid = {Colors.transparent}
            autoCapitalize = {'none'}
            autoCorrect = {false}
            style = {styles.input_recaptcha}
            returnKeyType = 'go'
            selectionColor = {Colors.textHintColor}
            onChangeText = {(_recaptcha) => { this.setState({_recaptcha})}}
            onSubmitEditing={()=>this._confirmCaptcha()}
            onEndEditing={()=>this._confirmCaptcha()}
            maxLength = {4}/>
        </View>

        <TouchableOpacity style={styles.btnSignIn} onPress={this._onSignIn}>
          <Text style={styles.txtSignIn}>{strings('sign.sign_in')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnForgot} onPress={this._onForgotPassword}>
          {/* <Text style={styles.txtForgot}>Forgot Password?</Text> */}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnSocial, {backgroundColor:'#3c66c4'}]} onPress={this._SignInWithFacebook.bind(this)}>
          <Image style={styles.social_icon} source={Images.facebook} resizeMode='contain' />
          <Text style={styles.social_txt}>{strings('sign.facebook_sign_in')}</Text>
          <View style={styles.hiddenView} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnSocial, {backgroundColor:'#cf4332'}]} onPress={this._SignInWithGoogle.bind(this)}>
          <Image style={styles.social_icon} source={Images.googleplus} resizeMode='contain' />
          <Text style={styles.social_txt}>{strings('sign.google_sign_in')}</Text>
          <View style={styles.hiddenView} />
        </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}
