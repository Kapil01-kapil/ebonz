import React, { Component } from "react";
import {connect} from "react-redux";
import {
  StyleSheet,
  Text,
  View, 
  TouchableOpacity,
  Image,
 ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {BottomTabNavigater} from '../../../Components/BottomTabNavigater'
import { notificationActions } from "../../../Actions";
import firebase from "react-native-firebase";
import {NotificationItem,Container} from "../../../Components"
import { Loader } from "../../../Components/Loader";


class Notifications extends Component {
constructor(props) {
    super(props);
    
}

onCancel=(id)=> {
  console.log( id);
 // alert(id);
   const { dispatch,user} = this.props;
   console.log("user:",user)
  const data={userId:user.id,notificationId:id};

 dispatch(notificationActions.deleteNotifications(data))
}
componentDidMount(){
  const { dispatch ,user} = this.props;
  dispatch(notificationActions.getAll(user.id));
  
  this.messageListener();
}  

messageListener = async () => {
  this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      // const notif = new firebase.notifications.Notification()
      // .setNotificationId('notificationId')
      // .setTitle('My notification title')
      // .setBody('My notification body')
      // .setData({
      //   key1: 'value1',
      //   key2: 'value2',
      // });
      // firebase.notifications().displayNotification(notif);
      //alert(title, body);
    //  Notification.show();
  });
 
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
     // alert(title, body);
  });
 
  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
     // alert(title, body);
  }
 
  this.messageListener = firebase.messaging().onMessage((message) => {
    console.log(JSON.stringify(message));
  });
 }
 

componentWillUnmount() {
  this.notificationListener();
  const { user,notifications,dispatch} = this.props;
  const notificationId=notifications&&notifications.length>0&&notifications.map((notification,i) =>{
    return notification._id ;
  });

  const data={user:user.id,NotificationId:notificationId}
 dispatch(notificationActions.readNotifications(data));  
 }

  render() {
   
    const {notifications,dispatch ,user,colors,loading}=this.props;
    const  notificationItems=dispatch&&user&&notifications&& notifications.length>0&&notifications.map((notification,i) => {
      console.log("NotificationItems:",notificationItems)
      return (        
        <NotificationItem  data={notification} key={i}  onPress={this.onCancel}   />
      )
    });
    return (
      
        <Container style={{backgroundColor:colors.BACKGROUND}}>
          
    {notificationItems?<ScrollView>
          <View style={{width: "100%",marginBottom:60}}>
            <View style={{ padding: 5,flexDirection: "column"}}>
           {notificationItems}
           </View>
          </View>
          </ScrollView>:(loading&&<Loader size="small"></Loader> )} 
        <BottomTabNavigater {...this.props}/>
       </Container>

   );
  }
}

function mapStateToProps(state) {
  const { notifications,users,colors } = state;     
  return {
    notifications:notifications.all,loading:notifications.loading,user: users.currentUser,colors
  };
}


const connectedNotificationScreen = connect(mapStateToProps)(Notifications);
export { connectedNotificationScreen as Notifications };

const styles = StyleSheet.create({
  container: {
   flex:1,
    backgroundColor: 'white',    
  },
  txtinput:{
    height:40,
    width:'100%',
    borderColor:'black',
    borderWidth:1,
    marginTop:20
  },

  bottomView:{
    width: '100%', 
    height: 40, 
    backgroundColor: '#007ACC', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop:150,
  },

  textStyle:{
    color: 'black',
    fontSize:20,
    
  },

  logo:{
    height:50,
    width:'100%',
    resizeMode:'contain',
    marginTop:20
  },

  heading:{
    marginTop:5,
    color:'black',
    textAlign:'center'
  },

  
});

