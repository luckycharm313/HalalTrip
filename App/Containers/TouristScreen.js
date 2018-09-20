import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
// Styles
import styles from './Styles/TouristScreenStyle'
import TouristAction from '../Redux/TouristRedux'
import TouristVList from '../Components/TouristVList'
import InfiniteScroll from 'react-native-infinite-scroll'
import NavBar from '../Components/NavBar'
import { strings } from '../../locales/i18n';
class TouristScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      touristData:[],
      tempTouristData:[],
      touristPage: 0,
    }
  }

  static navigationOptions = {
    tabBarVisible: false,
  };
  
  componentWillMount(){
    this.props.loadTouristData()
  }

  _renderTouristItem = ({item}) => (
    <TouristVList
      data = {item}
      nav={this.props.navigation}
    />
  )

  componentWillReceiveProps(nextProps){
    //tourist
    const touristData = nextProps.touristTotalData ? nextProps.touristTotalData : []
        
    if(touristData.length>0){
      this.setState({touristData})

      let tempTouristData=[]
      touristData.forEach(function (value, index) {
        if(index < 6){
          tempTouristData.push(value)
        }
      });
      this.setState({tempTouristData})
    }
  }

  loadMoreTourist =()=>{
    var _rd = this.state.touristData
    var _pg = this.state.touristPage
    _pg++

    let _temp=[]
    _rd.forEach(function (value, index) {
      if(index < (_pg+1)*6){
        _temp.push(value)
      }
    })
    if(_temp.length > 0){      
      this.setState({tempTouristData:_temp})
      this.setState({touristPage: _pg})
    }
  }

  render () {
    const touristTotalData = this.props.touristTotalData ? this.props.touristTotalData : []
    let allTourist = null
    if(touristTotalData.length > 0){
      allTourist = (
        <View style={styles.hotel_list_section}>
          <Text style={styles.header_txt_title_md}>{strings('global.tourist')}</Text>
          <View style={styles.hotel_list_view}>
            <FlatList
              data={this.state.tempTouristData}
              renderItem={this._renderTouristItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      )
    }

    return (
      <InfiniteScroll
        horizontal={false}
        onLoadMoreAsync={this.loadMoreTourist}
        distanceFromEnd={10}
        style={styles.mainContainer}>
        <View style={styles.container}>
          <View style = {styles.navbar}>
            <NavBar nav = {this.props.navigation} />
          </View>
          {/* <View style={styles.header_section}>
            <View style={styles.label_section}>
              <Text style={styles.header_txt_title}>Tourist Attraction</Text>
            </View>            
          </View> */}
          {allTourist}
        </View>
      </InfiniteScroll>
    )
  }
}

const mapStateToProps = ({tourist}) => {
  return {
    touristTotalData : tourist.touristTotalData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadTouristData: () => dispatch(TouristAction.loadTouristData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TouristScreen)
