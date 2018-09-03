import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, ImageBackground, Dimensions, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SignInScreenStyle'
import { Images, Colors } from '../Themes'
import SignIn from '../Components/SignIn'
import SignUp from '../Components/SignUp'
import UserAction from '../Redux/UserRedux'
import Spinkit from '../Components/Spinkit'

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeIndex : 1
    };
  }

  componentWillReceiveProps (nextProps){
      
    if(nextProps.isRegistered){
      alert("Signup successful")
      this.setState({routeIndex : 1})
    }
      
  }

  _onClickSigninTab =()=>{
    this.setState({routeIndex : 1})
  }
  
  _onClickSignupTab =()=>{
    this.setState({routeIndex : 2})
  }

  _signUp=(_username, _email, _password)=>{
    this.props.userSignup (_username, _email, _password)
  }
  
  _signIn=(_email, _password)=>{
    this.props.userLogin (_email, _password)
  }
  
  // _SignUpWithFacebook = () => {
  //   this.props.userFacebookSignup()
  // }

  // _SignUpWithGoogle =()=> {
  //   this.props.userGoogleSignup()
  // }

  _SignInWithFacebook =()=> {
    this.props.userFacebookSignup()
  }
  
  _SignInWithGoogle =()=> {
    this.props.userGoogleSignup()
  }
  
  render () {
    
    let renderTabView = null
    if(this.state.routeIndex == 1)
      renderTabView = <SignIn nav = {this.props.navigation} signIn = {(_email, _password)=>this._signIn(_email, _password)} signInWithFacebook = {this._SignInWithFacebook} signInWithGoogle = {this._SignInWithGoogle}/>
    else
      renderTabView = <SignUp signUp = {(_username, _email, _password)=>this._signUp(_username, _email, _password)} /*signUpWithFacebook = {this._SignUpWithFacebook} signUpWithGoogle = {this._SignUpWithGoogle}*//>

    return (
      <View style={styles.mainContainer}>
          <ImageBackground style={styles.header_section} source={Images.image1}>
            <View style={styles.header_txt_section}>
              <Text style={styles.header_txt_title}>Halal Trip Thailand</Text>
              <Text style={styles.header_txt_description}>Always know beautiful destinations for your trip</Text>
            </View>
            <View style={styles.tab_bar_section} >
              <TouchableOpacity onPress={this._onClickSigninTab} style={this.state.routeIndex == 1 ? styles.bar_section_active : styles.bar_section}>
                <Text style={this.state.routeIndex == 1 ? styles.txt_tab_active : styles.txt_tab}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._onClickSignupTab} style={this.state.routeIndex == 2 ? styles.bar_section_active : styles.bar_section}>
                <Text style={this.state.routeIndex == 2 ? styles.txt_tab_active : styles.txt_tab}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          
          <ScrollView style={styles.tab_body_section} >
            { renderTabView }
          </ScrollView>        
      </View>
    )
  }
}

const mapStateToProps = ({user}) => {
  return {
    isRegistered : user.isRegistered,
    isError : user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userSignup: (username, email, paswword) => dispatch(UserAction.userSignup(username, email, paswword)),
    userLogin: (email, paswword) => dispatch(UserAction.userLogin(email, paswword)),
    userGoogleSignup: () => dispatch(UserAction.userGoogleSignup()),
    userFacebookSignup: () => dispatch(UserAction.userFacebookSignup()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
