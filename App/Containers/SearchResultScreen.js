import React, { Component } from 'react'
import { Text, View, ImageBackground, TouchableOpacity, Image, Linking, FlatList } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../Components/NavBar'
import InfiniteScroll from 'react-native-infinite-scroll'
import HotelList from '../Components/HotelList'
import TouristVList from '../Components/TouristVList'
import RestaurantAllList from '../Components/RestaurantAllList'
import styles from './Styles/SearchResultScreenStyle'
import SearchAction from '../Redux/SearchRedux'

class SearchResultScreen extends Component {
  static navigationOptions = {
    tabBarVisible: false,
  };
  constructor(props) {
    super(props)
    this.state = {
      pageIndex: 0,
      searchResult : [],
      tempSearchResult : [],
    }
  }
  
  componentWillMount(){
    const searchResult = this.props.searchResult?this.props.searchResult:[]
    if(searchResult.length>0){
      this.setState({searchResult})

      let tempSearchResult=[]
      searchResult.forEach(function(value, index){
        if(index <  6 ){
          tempSearchResult.push(value)
        }
      })

      this.setState({tempSearchResult})
    }
  }

  loadMore =()=>{
    var _rd = this.state.searchResult
    var _pg = this.state.pageIndex
    _pg++

    let _temp=[]
    _rd.forEach(function (value, index) {
      if(index < (_pg+1)*6){
        _temp.push(value)
      }
    })
    if(_temp.length > 0){      
      this.setState({tempSearchResult:_temp})
      this.setState({pageIndex: _pg})
    }
  }

  _renderData = ({item})=> {
    const type = item.postType
    let itemView = null;
    switch (type) {
        case "Hotel":
            itemView = (<HotelList data = {item} nav ={this.props.navigation} />)
            break;
        case "Restaurant":
            itemView= (<RestaurantAllList data = {item} nav ={this.props.navigation} />)
            break;
        case "Tourist":
            itemView = (<TouristVList data = {item} nav ={this.props.navigation} />)
            break;        
    }
    return itemView
  }

  render () {
    return (
      <InfiniteScroll 
        style={styles.container}
        horizontal={true}
        onLoadMoreAsync={this.loadMore}
        distanceFromEnd={10}>
        <View style = {styles.container}>
          <View style = {styles.navbar}>
            <NavBar nav = {this.props.navigation} />
          </View>

          <View style = {styles.searchResult}>
            <FlatList
              data={this.state.tempSearchResult}
              renderItem={this._renderData}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>          
        </View>
      </InfiniteScroll>
    )
  }
}

const mapStateToProps = ({search}) => {
  return {
    searchResult : search.searchResult
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultScreen)
