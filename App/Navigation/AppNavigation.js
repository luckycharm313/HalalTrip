import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Platform} from "react-native"
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation'
import HotelSavedDetailScreen from '../Containers/HotelSavedDetailScreen'
import RestaurantSavedDetailScreen from '../Containers/RestaurantSavedDetailScreen'
import NotificationScreen from '../Containers/NotificationScreen'
import SavedScreen from '../Containers/SavedScreen'
import RestaurantDetailScreen from '../Containers/RestaurantDetailScreen'
import CuisinesScreen from '../Containers/CuisinesScreen'
import HotelDetailScreen from '../Containers/HotelDetailScreen'

import MapHotelScreen from '../Containers/MapHotelScreen'
import AccountScreen from '../Containers/AccountScreen'
import RestaurantScreen from '../Containers/RestaurantScreen'
import HotelScreen from '../Containers/HotelScreen'
import PlaceScreen from '../Containers/PlaceScreen'
import HomeScreen from '../Containers/HomeScreen'
import ForgotPasswordScreen from '../Containers/ForgotPasswordScreen'
import SignInScreen from '../Containers/SignInScreen'
import LaunchInterestScreen from '../Containers/LaunchInterestScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'
import { Colors, Metrics, Fonts } from '../Themes/'

const HomeStack = StackNavigator({
  HomeScreen: { screen: HomeScreen },
}, {
  headerMode: 'none',
  navigationOptions: {
    tabBarIcon: ({tintColor}) => <Icon name="home" style = {{color : tintColor, fontSize : Metrics.icons.medium }}/>,
  } 
});

const PlaceStack = StackNavigator({
  PlaceScreen: { screen: PlaceScreen },
  MapHotelScreen: { screen: MapHotelScreen },
}, {
  headerMode: 'none',
  navigationOptions: {
    tabBarIcon: ({tintColor}) => <Icon name="account-balance" style = {{color : tintColor, fontSize : Metrics.icons.medium }}/>,
  }
});

const HotelStack = StackNavigator({
  HotelScreen: { screen: HotelScreen },
  HotelDetailScreen: { screen: HotelDetailScreen },
}, {
  headerMode: 'none',
  navigationOptions: {
    tabBarIcon: ({tintColor}) => <Icon name="widgets" style = {{color : tintColor, fontSize : Metrics.icons.medium }}/>,
  }
});

const RestaurantStack = StackNavigator({
  RestaurantScreen: { screen: RestaurantScreen },
  CuisinesScreen: { screen: CuisinesScreen },
  RestaurantDetailScreen: { screen: RestaurantDetailScreen },
}, {
  headerMode: 'none',
  navigationOptions: {
    tabBarIcon: ({tintColor}) => <Icon name="local-dining" style = {{color : tintColor, fontSize : Metrics.icons.medium }}/>,
  }
});

const AccountStack = StackNavigator({
  AccountScreen: { screen: AccountScreen },
  NotificationScreen: { screen: NotificationScreen },
  SavedScreen: { screen: SavedScreen },
  RestaurantSavedDetailScreen: { screen: RestaurantSavedDetailScreen },
  HotelSavedDetailScreen: { screen: HotelSavedDetailScreen },
}, {
  headerMode: 'none',
  navigationOptions: {
    tabBarIcon: ({tintColor}) => <Icon name="person" style = {{color : tintColor, fontSize : Metrics.icons.medium }}/>,
  }
});

const mainNavigator = TabNavigator({
  Home: { screen: HomeStack},
  Place : { screen: PlaceStack },
  Hotel : { screen: HotelStack },
  Restaurant : { screen: RestaurantStack },
  Account : { screen: AccountStack },
},
{
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: Platform.OS !== 'ios' ? false : true,
  swipeEnabled: false,
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.grey,
  },  
})

const PrimaryNav = StackNavigator({  
  ForgotPasswordScreen: { screen: ForgotPasswordScreen },
  SignInScreen: { screen: SignInScreen },
  LaunchInterestScreen: { screen: LaunchInterestScreen },
  LaunchScreen: { screen: LaunchScreen },
  mainNavigator: mainNavigator,
  }, {
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
    navigationOptions: {
      headerStyle: styles.header,
      lazy: false,
    }
})
export default PrimaryNav
