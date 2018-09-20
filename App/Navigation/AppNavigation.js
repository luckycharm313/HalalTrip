import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Platform, View, Text, TouchableOpacity} from "react-native"
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation'
import WeatherScreen from '../Containers/WeatherScreen'
import EmergencyContactScreen from '../Containers/EmergencyContactScreen'
import SearchResultScreen from '../Containers/SearchResultScreen'
import TouristDetailScreen from '../Containers/TouristDetailScreen'
import TouristScreen from '../Containers/TouristScreen'
import ReloadScreen from '../Containers/ReloadScreen'
import MapViewScreen from '../Containers/MapViewScreen'
import ActivitySavedDetailScreen from '../Containers/ActivitySavedDetailScreen'
import TrendDetailScreen from '../Containers/TrendDetailScreen'
import ActivityDetailScreen from '../Containers/ActivityDetailScreen'
import RestaurantPlaceScreen from '../Containers/RestaurantPlaceScreen'
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
import { strings } from '../../locales/i18n';

const HomeStack = StackNavigator({
  HomeScreen: { screen: HomeScreen },  
}, {
  headerMode: 'none',
});

const PlaceStack = StackNavigator({
  PlaceScreen: { screen: PlaceScreen },  
}, {
  headerMode: 'none',
});

const HotelStack = StackNavigator({
  HotelScreen: { screen: HotelScreen },  
}, {
  headerMode: 'none',
});

const RestaurantStack = StackNavigator({
  RestaurantScreen: { screen: RestaurantScreen },  
}, {
  headerMode: 'none',
});

const AccountStack = StackNavigator({
  AccountScreen: { screen: AccountScreen },  
}, {
  headerMode: 'none',
});

const mainNavigator = TabNavigator({
  Home: { screen: HomeStack},
  Place : { screen: PlaceStack },
  Hotel : { screen: HotelStack },
  Restaurant : { screen: RestaurantStack },
  Account : { screen: AccountStack },
},
{
  tabBarComponent: (props) => {
    console.log('props.naviagtion =', props)
    return  (
      <View style={{
        height: 50,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        borderColor: Colors.grey,
        borderTopWidth: 1,
        shadowColor: Colors.grey,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      }}>
        {
          props.navigation.state.routes.map((route, index) => {
              const color = props.navigation.state.index == index ? Colors.primary : Colors.grey
              let _view = null
              switch(index){
                case 0:
                  _view = (
                    <TouchableOpacity style={{alignItems: 'center', width :60}}       
                      onPress={() => {props.jumpToIndex(index)}}>
                      <Icon name="home" style = {{fontSize : Metrics.icons.medium }} color={color}/>
                      <Text style={{fontSize: 10, color: color}}>{strings('global.home')}</Text>
                    </TouchableOpacity>
                  )
                  break;
                case 1:
                  _view = (
                    <TouchableOpacity style={{alignItems: 'center', width :60}}       
                      onPress={() => {props.jumpToIndex(index)}}>
                      <Icon name="account-balance" style = {{fontSize : Metrics.icons.medium }} color={color}/>
                      <Text style={{fontSize: 10, color: color}}>{strings('global.place')}</Text>
                    </TouchableOpacity>
                  )
                  break;
                case 2:
                  _view = (
                    <TouchableOpacity style={{alignItems: 'center', width :60}}       
                      onPress={() => {props.jumpToIndex(index)}}>
                      <Icon name="widgets" style = {{fontSize : Metrics.icons.medium }} color={color}/>
                      <Text style={{fontSize: 10, color: color}}>{strings('global.hotel')}</Text>
                    </TouchableOpacity>
                  )
                  break;
                case 3:
                  _view = (
                    <TouchableOpacity style={{alignItems: 'center', width :60}}       
                      onPress={() => {props.jumpToIndex(index)}}>
                      <Icon name="local-dining" style = {{fontSize : Metrics.icons.medium }} color={color}/>
                      <Text style={{fontSize: 10, color: color}}>{strings('global.restaurant')}</Text>
                    </TouchableOpacity>
                  )
                  break;
                case 4:
                  _view = (
                    <TouchableOpacity style={{alignItems: 'center', width :60}}       
                      onPress={() => {props.jumpToIndex(index)}}>
                      <Icon name="person" style = {{fontSize : Metrics.icons.medium }} color={color}/>
                      <Text style={{fontSize: 10, color: color}}>{strings('global.account')}</Text>
                    </TouchableOpacity>
                  )
                  break;
              }

              return _view
            }
          )
        }
      </View>
    )
  },
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
  WeatherScreen: { screen: WeatherScreen },
  EmergencyContactScreen: { screen: EmergencyContactScreen },
  ActivityDetailScreen: { screen: ActivityDetailScreen },
  TrendDetailScreen: { screen: TrendDetailScreen },
  TouristDetailScreen: { screen: TouristDetailScreen },
  TouristScreen: { screen: TouristScreen },
  SearchResultScreen: { screen: SearchResultScreen },
  
  MapHotelScreen: { screen: MapHotelScreen },

  HotelDetailScreen: { screen: HotelDetailScreen },

  CuisinesScreen: { screen: CuisinesScreen },
  RestaurantDetailScreen: { screen: RestaurantDetailScreen },  

  NotificationScreen: { screen: NotificationScreen },
  SavedScreen: { screen: SavedScreen },
  RestaurantSavedDetailScreen: { screen: RestaurantSavedDetailScreen },
  HotelSavedDetailScreen: { screen: HotelSavedDetailScreen },
  ActivitySavedDetailScreen: { screen: ActivitySavedDetailScreen },

  ReloadScreen: { screen: ReloadScreen },
  MapViewScreen: { screen: MapViewScreen },
  RestaurantPlaceScreen: { screen: RestaurantPlaceScreen },
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
