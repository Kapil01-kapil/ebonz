import React, { Component, } from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { Routes } from '../Constants';
import { postActions } from '../Actions/post.actions';
import { Loader } from './Loader';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';


class MyAdItem extends Component {
  _viewAdDetail(post) {
    this.props.navigation.navigate(Routes.MyAdDetail, { data: post });
  }

  _editAdDetail(post) {

    //  alert('Edit ad detail');
    //this.props.navigation.navigate(Routes.MyAdDetail,{data:post});
  }
  _deleteAd(post) {
    const { dispatch } = this.props;
    dispatch(postActions.removePost(post._id));
    //alert('delete ad detail');
    //this.props.navigation.navigate(Routes.MyAdDetail,{data:post});
  }

  onPressSold(post) {
    const { dispatch } = this.props;
    const data = { userId: post.userId, postId: post._id }
    console.log("Solddata:", data)
    dispatch(postActions.markAsSold(data));
  }

  render() {
    const post = this.props.data; 
    const { colors, posts } = this.props;   

    return (
      <View style={{ flex:1,margin:5,borderColor:colors.BASE_COLOR,borderWidth:1 }}>
        <TouchableWithoutFeedback onPress={() => { this._viewAdDetail(post) }} >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.shadow}>
              <Image source={{ uri: post.thumbnail }} style={styles.image} resizeMode="contain" />
            </View>
            <View style={{ width: '60%', marginLeft: 5 }}>
              <View
                style={{               
                  flexDirection: "row"
                }}
              >
                <View style={{flex:1}}>
                <Text style={{ fontSize: 18, color: colors.FOREGROUND_DARK }} numberOfLines={1}>{post.title}</Text></View>
                <Menu >
      <MenuTrigger><View style={{padding:5}}><Icon color={colors.BLACK} style={{transform: [{ rotate: "90deg" }]}} name="ios-more" size={20}/></View></MenuTrigger>
      <MenuOptions>  
        <MenuOption onSelect={() => this._deleteAd(post)}>
          <View style={{padding:5}}>
          <Text  style={{fontSize:16}}>Delete Ad</Text>
          </View>
        </MenuOption>
        <MenuOption onSelect={() =>this.onPressSold(post)}>
      <View style={{padding:5}}>
          <Text style={{fontSize:16}} >Mark as Sold</Text>
          </View>
        </MenuOption>
      </MenuOptions>
    </Menu>
                {/* <View style={{ flexDirection: 'row', zIndex: 10 }}>               
                  <TouchableOpacity onPress={() => { this._deleteAd(post) }}>
                    <View style={{ paddingHorizontal: 5 }}>
                      <Icon color={'red'}
                        name="ios-trash"
                        size={25}
                      /></View></TouchableOpacity>
                </View> */}
              </View>
              <View style={{ flexDirection: "row" }}><View><Text style={{ fontSize: 18, padding: 5, color: colors.HEADER }}>{post.price.display_price}</Text></View>

              </View>
              <View  >
                <Text style={{ color: colors.FOREGROUND_DARK }}>Likes : {post.likes ? post.likes : 0} Reviews :{post.reviews ? post.reviews : 0}</Text>
                <Text style={{ color: colors.FOREGROUND_DARK }}>Images :{post.images.length} Videos :{post.videos.length}</Text>
                <View style={{flexDirection:"row"}}>
                  {post.verified ?<View style={{ backgroundColor: "green", borderRadius: 80, width: 60,justifyContent:'center',alignItems:"center",marginTop:5 }}>
                    <Text style={{ color: colors.FOREGROUND_LIGHT, fontSize: 10 }}>Verified</Text></View> :
                     <View style={{ backgroundColor: 'red', padding: 5, borderRadius: 30, width: 120, paddingLeft: 15, marginTop: 5 ,justifyContent:"center",alignItems:'center'}}>
                       <Text style={{ color: colors.FOREGROUND_LIGHT, fontSize: 12 }}>Verification pending !</Text></View>}
                 
               
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}


function mapStateToProps(state) {
  const { posts, users, colors } = state;
  return {
    myposts: posts.myposts, user: users.currentUser, colors
  };
}

const connectedMyAdsPage = connect(mapStateToProps)(MyAdItem);
export { connectedMyAdsPage as MyAdItem };

const styles = StyleSheet.create({
  shadow:{
       backgroundColor:'white',
  width: '40%',
  //   borderRadius:5,  
  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  
  elevation: 3,},
image: {
  width:'100%',height:170,
//  borderRadius:5,    

},


});













