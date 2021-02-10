import React, { Component } from "react";
import {
  StyleSheet,
  View,Text ,TouchableOpacity, ToastAndroid 
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Routes } from "../Constants";
import { connect } from "react-redux";
import { userActions } from "../Actions";
const iconsize = 32;
const iconcolor = "red";

class TabIcon extends Component
{   
  render(){
    const {name,icon,screen,onPress,selected,color}=this.props;
    return(
      <TouchableOpacity onPress={onPress}>
    <View style={{justifyContent:'center',alignContent:'center'}}> 
      <Icon style={{textAlign:'center'}}
      name={icon}
      size={iconsize}
      color={color}
    />
    <Text style={{color:color,textAlign:'center',fontSize:10}}>{name}</Text>
    </View></TouchableOpacity>);
  }
}

class BottomTabNavigater extends Component {
 constructor(props)
 {
   super(props);
   this.state={selectedTab:Routes.HomeScreen}
 }
componentDidMount()
{
  const {user,dispatch} =this.props;
  if (user) {
  dispatch(userActions.get());
}
}

navigateToGallery(){

 const {user}=this.props;

  if(user&&user.name!=null&&user.email!=null&&user.phone!=null&&user.aadhar!=null&&user.thumbnail!=null)
  this.props.navigation.navigate(Routes.GalleryScreen);
  else {
    ToastAndroid.show('Please complete your profile first!',ToastAndroid.TOP)
      this.props.navigation.navigate(Routes.EditProfile);
    }
}
  _navigate(screen){
    this.setState({selectedTab:screen});   
    this.props.navigation.navigate(screen);
  }
  render() {
    const {colors}=this.props;
    return(
    <View style={[styles.container,{backgroundColor:colors.BACKGROUND}]}>

      <View style><TabIcon name="Home" icon="ios-home" color={colors.HEADER} onPress={()=>this._navigate(Routes.HomeScreen)} /></View>
      <View style={{right:10}}><TabIcon name="My Ads" icon="ios-document" color={colors.HEADER} onPress={()=>this._navigate(Routes.MyAds)}  /></View>
     <View style={{alignItems:'center'}}>
     <View style={[styles.sellButton, {backgroundColor:colors.HEADER}]}>
        {/* <TabIcon name="Sell" icon="ios-camera" selectedColor={colors.BASE_COLOR} selected={(this.selectedTab==Routes.GalleryScreen)?true:false} onPress={()=>this._navigate(Routes.GalleryScreen)} /> */}
    
        <TouchableOpacity onPress={()=>this.navigateToGallery()}>
    <View style={{justifyContent:'center',alignContent:'center'}}> 
      <Icon style={{textAlign:'center'}}
      name="ios-camera"
      size={40}
      color={colors.BACKGROUND}
    />
    <Text style={{color:colors.BACKGROUND,textAlign:'center',fontSize:10}}>Sell</Text>
    </View></TouchableOpacity>
  
    </View>
    </View>
    <View style={{left:10}}><TabIcon name="Chats" icon="ios-chatbubbles" color={colors.HEADER} onPress={()=>this._navigate(Routes.AllChats)}/></View>
    <View><TabIcon name="Favorites" icon="ios-heart" color={colors.HEADER} onPress={()=>this._navigate(Routes.Favorites)}/></View>
      </View>
    );    
  }
}

function mapStateToProps(state) {
  const { alert,colors,users } = state;
  var user;

  user = users.currentUser;
  return {
    alert,colors,user
  };
}

const connectedBottomTabNavigaterScreen = connect(mapStateToProps)(
  BottomTabNavigater
);
export { connectedBottomTabNavigaterScreen as BottomTabNavigater };

const styles = StyleSheet.create({


  container: {    
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical:5,
  backgroundColor:"yellow",
  
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,    
    elevation: 24,
  },
  sellButton:{borderRadius:100,width:70,height:70,position:'absolute',padding:10,bottom:-22,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.32,
  shadowRadius: 5.46,
  
  elevation: 9,
  
}
});
