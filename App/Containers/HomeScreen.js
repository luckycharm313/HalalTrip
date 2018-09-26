import React, { Component } from 'react'
import { ScrollView, Text, TextInput, ImageBackground, TouchableOpacity, View, FlatList, Dimensions} from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import Icon from 'react-native-vector-icons/MaterialIcons'

// Styles
import MainAction from '../Redux/MainRedux'
import styles from './Styles/HomeScreenStyle'
import { Images, Colors } from '../Themes'
import CategoryItem from '../Components/CategoryItem'
import HotelItem from '../Components/HotelItem'
import ActivityItem from '../Components/ActivityItem'
import DestinationItem from '../Components/DestinationItem'
import TrendItem from '../Components/TrendItem'
import Redeem from '../Components/Redeem'
import FreeCredit from '../Components/FreeCredit'
import Spinkit from '../Components/Spinkit'
import InfiniteScroll from 'react-native-infinite-scroll'
import SearchAction from '../Redux/SearchRedux'
import { strings } from '../../locales/i18n';

import OneSignal from 'react-native-onesignal'
import StartupActions from '../Redux/StartupRedux'
let obj = null;

class HomeScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      searchKey: null,
      hotelData:[],
      tempHotelData:[],
      hotelPage: 0,
    };
  }

  // _discoverDestinations = () => (
  //   this.props.navigation.navigate('PlaceScreen')
  // )
  
  _seeAllPlaces = () => (
    this.props.navigation.navigate('PlaceScreen')
  )
  
  _seeAllHotels = () => (
    this.props.navigation.navigate('HotelScreen')
  )
  
  _renderCategoryItem = ({item}) => (
    <CategoryItem
      data = {item}
      nav={this.props.navigation}
    />
  )

  _renderHotelItem = ({item}) => (
    <HotelItem
      nav={this.props.navigation}
      data = {item}
    />
  )
  
  _renderActivityItem = ({item}) => (
    <ActivityItem
      data = {item}
      nav={this.props.navigation}
    />
  )
  
  _renderDestinationItem = ({item}) => (
    <DestinationItem
      data = {item}
      nav={this.props.navigation}
    />
  )
  
  _renderTrendItem = ({item}) => (
    <TrendItem
      data = {item}
      nav={this.props.navigation}
    />
  )

  componentWillMount(){
    obj = this;
    OneSignal.init("180a6e93-3a86-42de-813d-282a113a4fc3");
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure()

    this.props.loadData()
  }
  
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    const {payload} = notification
    const {body} = payload
    console.log("Notification received: ", notification);
    console.log("Notification body: ", body);
    console.log("Notification object: ", obj);
    obj.props.receivedNotification(body)
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
  console.log('Device info: ', device);
  }

  componentWillReceiveProps(nextProps){
    // hotel
    const hotelData = nextProps.hotelTotalData ? nextProps.hotelTotalData : []
        
    if(hotelData.length>0){
      this.setState({hotelData})

      let tempHotelData=[]
      hotelData.forEach(function (value, index) {
        if(index < 2){
          tempHotelData.push(value)
        }
      });
      this.setState({tempHotelData})
    }
  }

  _onSearch = ()=>{
    this.props.searchData(this.state.searchKey)
  }

  loadMoreHotel =()=>{
    var _rd = this.state.hotelData
    var _pg = this.state.hotelPage
    _pg++

    let _temp=[]
    _rd.forEach(function (value, index) {
      if(index < (_pg+1)*2){
        _temp.push(value)
      }
    })
    if(_temp.length > 0){      
      this.setState({tempHotelData:_temp})
      this.setState({hotelPage: _pg})
    }
  }

  render () {    

    const categoryData = this.props.categoryData ? this.props.categoryData:[]
    const hotelTotalData = this.props.hotelTotalData ? this.props.hotelTotalData:[]
    const activityTotalData = this.props.activityTotalData ? this.props.activityTotalData:[]
    const placeTotalData = this.props.placeTotalData ? this.props.placeTotalData:[]
    const trendTotalData = this.props.trendTotalData ? this.props.trendTotalData:[]

    let categoryView = null
    if( categoryData.length > 0){
      categoryView = (
        <View style={styles.section}>
          <Text style={styles.txtSectionTitle}>{strings('global.categories')}</Text>
          <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categoryData}
              renderItem={this._renderCategoryItem}
              keyExtractor={(item, index) => index.toString()}
            />
        </View>
      )
    }
    
    let hotelView = null
    if( hotelTotalData.length > 0){
      hotelView = (
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.txtSectionTitle}>{strings('global.destination')}</Text>
            <TouchableOpacity style={styles.more_area} onPress={this._seeAllHotels}>
              <Text style={styles.txtLabelSm}>{strings('global.see_all')}</Text>
              <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
            </TouchableOpacity>
          </View>
          {/* <InfiniteScroll
              horizontal={true}
              onLoadMoreAsync={this.loadMoreHotel}
              distanceFromEnd={1}> */}
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.hotelData}
                renderItem={this._renderHotelItem}
                keyExtractor={(item, index) => index.toString()}                
              />
          {/* </InfiniteScroll> */}
          
        </View>
      )
    }
    
    let activityView = null
    if( activityTotalData.length > 0){
      activityView = (
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.txtSectionTitle}>{strings('home.popular_activity')}</Text>
            {/* <TouchableOpacity style={styles.more_area}>
              <Text style={styles.txtLabelSm}>See all</Text>
              <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
            </TouchableOpacity> */}
          </View>
          <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={activityTotalData}
              renderItem={this._renderActivityItem}
              keyExtractor={(item, index) => index.toString()}
            />
        </View>
      )
    }
    
    let placeView = null
    if( placeTotalData.length > 0){
      placeView = (
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.txtSectionTitle}>{strings('global.cities')}</Text>
            <TouchableOpacity style={styles.more_area} onPress={this._seeAllPlaces}>
              <Text style={styles.txtLabelSm}>{strings('global.see_all')}</Text>
              <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
            </TouchableOpacity>
          </View>
          <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={placeTotalData}
              renderItem={this._renderDestinationItem}
              keyExtractor={(item, index) => index.toString()}
            />
        </View>
      )
    }
    
    let trendView = null
    if( trendTotalData.length > 0){
      trendView = (
        <View style={styles.section}>
          <View style={styles.section_header}>
            <Text style={styles.txtSectionTitle}>{strings('home.trending_now')}</Text>
            {/* <TouchableOpacity style={styles.more_area}>
              <Text style={styles.txtLabelSm}>See all</Text>
              <Icon name="keyboard-arrow-right" style = {styles.icon_arrow_sm} />
            </TouchableOpacity> */}
          </View>
          <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={trendTotalData}
              renderItem={this._renderTrendItem}
              keyExtractor={(item, index) => index.toString()}
            />
        </View>
      )
    }
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.container}>
            <ImageBackground style={styles.header_section} source={Images.image1}>
              <View style={styles.header_txt_section}>
                <Text style={styles.header_txt_title}>{strings('home.explore_world')}</Text>
                <Text style={styles.header_txt_description}>{strings('home.discover')}</Text>
                {/* <TouchableOpacity style={styles.btnDiscover} onPress={this._discoverDestinations}>
                  <Text style={styles.txtDiscover}>Discover destinations</Text>
                  <Icon name="keyboard-arrow-right" style = {styles.icon_arrow} />
                </TouchableOpacity> */}                
              </View>
              <View style={styles.search_view}>
                <TextInput
                    ref = {'search_text'}
                    name = {'Search' }
                    type = {'TextInput'}
                    underlineColorAndroid = {Colors.transparent}
                    autoCapitalize = {'none'}
                    autoCorrect = {false}
                    placeholder = {strings('home.search')}
                    placeholderTextColor = {Colors.textHintColor}
                    style = {styles.input_area}
                    returnKeyType = 'go'
                    selectionColor = {Colors.textHintColor}
                    onChangeText = {(searchKey) => { this.setState({searchKey})}}
                    maxLength = {100}/>
                <TouchableOpacity style={styles.btnSearch} onPress={this._onSearch}>
                  <Icon name="search" style = {styles.icon_search} />
                </TouchableOpacity>
              </View>
            </ImageBackground>
            {categoryView}
            {placeView}
            {hotelView}
            {activityView}
            {trendView}
{/*             
            <View style={styles.deactive_section}>
              <Redeem />
            </View>

            <View style={styles.deactive_section}>
              <FreeCredit />
            </View> */}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({main, category, hotel, place, activity, trend}) => {
  return {
    errorMsg : main.errorMsg,
    categoryData : category.categoryData,
    hotelTotalData : hotel.hotelTotalData,
    placeTotalData : place.placeTotalData,
    activityTotalData : activity.activityTotalData,
    trendTotalData : trend.trendTotalData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: () => dispatch(MainAction.loadData()),
    searchData: (searchKey) => dispatch(SearchAction.searchData(searchKey)),
    receivedNotification: (notification) => dispatch(StartupActions.receivedNotification(notification))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
