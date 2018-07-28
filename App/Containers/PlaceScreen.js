import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
// import Masonry from 'react-native-masonry';
// Styles
import styles from './Styles/PlaceScreenStyle'
import { Images } from '../Themes'
import PlaceItem from '../Components/PlaceItem'
class PlaceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [
        {
          title : 'Yala',
          cost : '$93',
          img_url : Images.image1,
        },
        {
          title : 'Pattani',
          cost : '$13',
          img_url : Images.image2,
        },
        {
          title : 'Narathiwat',
          cost : '$73',
          img_url : Images.image1,
        },
        {
          title : 'Phuket',
          cost : '$73',
          img_url : Images.image3,
        },
        {
          title : 'Krabi',
          cost : '$73',
          img_url : Images.image2,
        },
        {
          title : 'Satun',
          cost : '$73',
          img_url : Images.image4,
        },
        {
          title : 'Songkla',
          cost : '$73',
          img_url : Images.image3,
        },
        {
          title : 'Bangkok',
          cost : '$73',
          img_url : Images.image2,
        },
        {
          title : 'Chiang Mai',
          cost : '$73',
          img_url : Images.image1,
        },
      ],
    }
  }
  _renderPlaceItem=(element)=>{
    return(<PlaceItem data ={element} nav = {this.props.navigation} />)
  }

  render () {
    return (
      <ScrollView style={[styles.mainContainer, styles.container]}>
        <View style={styles.row_view}>
          <View style={styles.col_md_6}>
            {
              this.state.data.map((element, index) => {
                if (index % 2 == 1) return null;
                return this._renderPlaceItem(element)   
              })
            }
          </View>
          <View style={styles.col_md_6}>
            {
              this.state.data.map((element, index) => {
                if (index % 2 == 0) return null;
                return this._renderPlaceItem(element)   
              })
            }
          </View>
        </View>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaceScreen)
