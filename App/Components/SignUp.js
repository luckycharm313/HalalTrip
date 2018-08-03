import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView} from 'react-native'
import styles from './Styles/SignUpStyle'

import { Images, Colors } from '../Themes'

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _name : null,
      _email : null,
      _password : null,
    };
  }

  _signUp =() =>{
    if(this.state._name == null || this.state._email == null || this.state._password == null)
      alert('Invalid Input data')
    else
      this.props.signUp(this.state._name, this.state._email, this.state._password)
  }

  _SignUpWithFacebook (){
    this.props.signUpWithFacebook()
  }
  
  _SignUpWithGoogle (){
    this.props.signUpWithGoogle()
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
        <TextInput
          ref = {'name'}
          name = {'Name' }
          type = {'TextInput'}
          underlineColorAndroid = {Colors.transparent}
          autoCapitalize = {'none'}
          autoCorrect = {false}
          placeholder = {'Name'}
          placeholderTextColor = {Colors.textHintColor}
          style = {styles.input_area}
          returnKeyType = 'go'
          selectionColor = {Colors.textHintColor}
          onChangeText = {(_name) => { this.setState({_name: _name})}}
          maxLength = {100}/>

        <TextInput
          ref = {'email'}
          name = {'Email' }
          type = {'TextInput'}
          underlineColorAndroid = {Colors.transparent}
          validators = {'isEmail'}
          autoCapitalize = {'none'}
          autoCorrect = {false}
          placeholder = {'Email'}
          placeholderTextColor = {Colors.textHintColor}
          style = {styles.input_area}
          returnKeyType = 'go'
          selectionColor = {Colors.textHintColor}
          onChangeText = {(_email) => { this.setState({_email: _email})}}
          maxLength = {100}/>
        
        <TextInput
          ref = {'password'}
          name = {'Password' }
          underlineColorAndroid = {Colors.transparent}
          autoCapitalize = {'none'}
          autoCorrect = {false}
          placeholder = {'Password'}
          placeholderTextColor = {Colors.textHintColor}
          style = {styles.input_area}
          returnKeyType = 'go'
          secureTextEntry={true}
          selectionColor = {Colors.textHintColor}
          onChangeText = {(_password) => { this.setState({_password: _password})}}
          maxLength = {100}/>
        
        <TouchableOpacity style={styles.btnSignIn} onPress={this._signUp}>
          <Text style={styles.txtSignIn}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.policy_section}>
          <Text style={styles.text_policy}>By clicking Sign up, you will create an account and agree to ours Terms of Service and Privacy Policy</Text>
        </View>

        <TouchableOpacity style={[styles.btnSocial, {backgroundColor:'#3c66c4'}]} onPress={this._SignUpWithFacebook.bind(this)}>
          <Image style={styles.social_icon} source={Images.facebook} resizeMode='contain' />
          <Text style={styles.social_txt}>Signup with Facebook</Text>
          <View style={styles.hiddenView} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnSocial, {backgroundColor:'#cf4332'}]} onPress={this._SignUpWithGoogle.bind(this)}>
          <Image style={styles.social_icon} source={Images.googleplus} resizeMode='contain' />
          <Text style={styles.social_txt}>Signup with Google</Text>
          <View style={styles.hiddenView} />
        </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}
