import React, { Component, } from 'react';
import {StyleSheet,View ,TouchableOpacity,TouchableWithoutFeedback,Image,Text} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import Images from "../Images";

class NotificationItem extends Component {

  onClose(id) {
    
    this.props.onPress(id);
 }
 NotificationTypes={
  POST_VERIFIED:'POST_VERIFIED',
  FOLLOW_SUCCESS:'FOLLOW_SUCCESS',
  POST_GETTING_EXPIRED:'POST_GETTING_EXPIRED',
  POST_REVIEWED:'POST_REVIEWED',
  POST_LIKED:'POST_LIKED',
  MESSAGE_MISSED:'MESSAGE_MISSED',
  NEW_ITEM_ARRIVED:'NEW_ITEM_ARRIVED'
  }
 render() {
   const notification = this.props.data;
   const notificationId=notification._id;
  
   const { dispatch,user,colors} = this.props;
   return (
     <View style={{ width: "100%" }}>
       <View style={{padding:10,paddingBottom:0,paddingLeft:25}}>
       {/* <TouchableOpacity  >       */}
         <View style={styles.container}>
           <View style={{ width: 25,alignItems:'center',justifyContent:'center' }}>
<View style={{position:'absolute',left:-35,top:1}}>
             {/* <Image source={{ uri: notification.icon }} style={{width:50,height:50}}/> */}
            <View style={styles.avatar}>
              <Image source={{ uri: notification.icon }}  style={{width:45,height:45,borderRadius:45,resizeMode:'cover'}}/>
            </View>
             </View>
           </View>
           <View style={{flex:1}}>
             <View
               style={{
                 justifyContent: "space-between",
                 flexDirection: "row"}}
             >

                <Text style={{ fontSize: 16,color:colors.FOREGROUND_DARK }} numberOfLines={1}>{notification.title}</Text>
              
               <TouchableOpacity onPress={()=>this.onClose(notificationId)}><Icon
                 color={colors.FOREGROUND_DARK}
                 name="ios-close"
                 size={20}
               /></TouchableOpacity>
             </View>
             <Text style={{ padding:5 }} numberOfLines={1}>{notification.description}</Text>
             <View
               style={{
                 paddingHorizontal: 5,
                 backgroundColor: "white",
                 marginTop: 5,
                 alignItems: "center",
                 flexDirection: "row"
               }}
             >
               <TouchableOpacity>
                 <View style={[styles.viewButton,{backgroundColor:colors.HEADER,borderRadius:2}]}>
                   <Text style={{color:colors.FOREGROUND_LIGHT,fontSize:9}}>View</Text>
                 </View>
               </TouchableOpacity>
             </View>
           </View>
         </View>
       {/* </TouchableOpacity> */}
     </View></View>
   );
 }
}


function mapStateToProps(state) {
    const { posts,users,colors } = state;    
    return {
      myposts:posts.myposts,user: users.currentUser,colors
    };
  }
  
  const connectedNotificationItem= connect(mapStateToProps)(NotificationItem);
  export { connectedNotificationItem as NotificationItem };

const styles = StyleSheet.create({

  container :{ 
    padding:10,
    flex: 1, 
    flexDirection: "row",
    borderRadius:3,
    backgroundColor:'white', 
    borderRadius:5,  
  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  
  elevation: 3,}
,
avatar :{ 
  height:50,
  width:50,
  borderRadius:40,
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'white',
  borderColor:'white',
  borderWidth:2,
shadowColor: "#000",
shadowOffset: {
    width: 0,
    height: 1,
},
shadowOpacity: 0.22,
shadowRadius: 2.22,

elevation: 3,},
    shadow:{
         backgroundColor:'white',
    width: '40%',   borderRadius:5,  
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,},
  image: {
    width:'100%',resizeMode:'cover',height:170,
   borderRadius:5,    
  
  },
  viewButton:{
    paddingHorizontal:20,paddingVertical:3,borderRadius:2,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3
  }
  
});







