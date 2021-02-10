import React, { Component } from "react";

import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,TouchableOpacity,
  ToastAndroid,Platform,ActivityIndicator,ImageBackground
} from "react-native";

import {TextInputBox} from '../../Components/TextInputBox'
import { Button,Container} from "../../Components";
import Images from "../../Images"
import {Routes, alertConstants,colorConstants} from "../../Constants"
import { userActions } from '../../Actions';
import GetLocation from 'react-native-get-location'
import { Actions } from "react-native-router-flux";
import firebase from "react-native-firebase";

 class RegisterScreen extends Component {
  constructor(props) {
    super(props);   
    this.state={
      mobile:"",      
      longitude: '77.27970499999999',
      latitude: '28.6604983', 
      token:'',   
      submitted: false,
  } 
  }

   GotoSocialLogin() {
    this.props.navigation.navigate(Routes.SocialLogin);
  }

componentDidMount(){ 
  this.checkPermission();
   GetLocation.getCurrentPosition({
  enableHighAccuracy: true,
  timeout: 15000,
})
.then(location => {  
  this.setState({latitude:location.latitude,longitude:location.longitude})
})
.catch(error => {
  const { code, message } = error;
  console.warn(code, message);
})}

checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
      this.getFcmToken();
  } else {
      this.requestPermission();
  }
 }
 
 getFcmToken = async () => {
  const fcmToken = await firebase.messaging().getToken();
  if (fcmToken) {  
   // alert(fcmToken);
   this.setState({token:fcmToken});
  } else {
    alert('Failed', 'No token received');
  }
 }
 
 requestPermission = async () => {
   try{
 await firebase.messaging().requestPermission();
   }catch(error){
     console.log(error);
   }
  }
 

   async Submit() {
    const {mobile,token,latitude,longitude} = this.state;
    if(mobile==null) 
    {
     ToastAndroid.show('Please Enter Mobile Number', ToastAndroid.LONG);    
     return;
   }
  if(mobile.length<10) {
   ToastAndroid.show('Please  Enter Your Correct Mobile Number', ToastAndroid.LONG);   
   return;
  }   
 
  var user={}
  const  onlyNumbers = /^[0-9]+$/;      
      const res=  onlyNumbers.test(username);
      if(res)
      {
      //  const uname='91'+username;  
      //   dispatch(userActions.login(uname, password,token));

      user = {   
        mobile:'91'+ mobile ,   
        latitude:latitude,
        longitude:longitude,
        loginMethod:"MOBILE"
      }; 
      }  else   
      {
        user = {   
          mobile: mobile ,   
          latitude:latitude,
          longitude:longitude,
          loginMethod:"EMAIL"
        }; 
      }
  // const user = {   
  //   mobile:'91'+ mobile ,   
  //   latitude:latitude,
  //   longitude:longitude,
  //   loginMethod:"MOBILE"
  // }; 

  this.setState({ submitted: true }); 
      if (mobile) {
     this.props.register(user,token);   
         //this.props.navigation.navigate(Routes.OTPScreen,{username:mobile});       
      }    
  }

  
   
  render() {    
    const {  registering ,alert,colors } = this.props;
    { if(registering)
      return(<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>  
        <ActivityIndicator size="large" color="#0000ff" />
      <Text>Registering. Please wait</Text>
      </View>);}
   

    return (
      <Container >
        <ImageBackground style={{ flex: 1}} source={Images.BackGround}>
        {/* <View style={{  flex: 2, alignItems: "center" ,justifyContent:"flex-end"}}>
          <Image source={Images.LogoName} style={styles.logo} />
        </View> */}

        <View style={{flex:1}}>
         <View style={{  flex:2,alignItems: "center" ,justifyContent:"flex-end"}}>
          <Image source={Images.LogoName} style={styles.logo} />
         </View>

         <View style={{flex:6,paddingVertical: 8,paddingHorizontal:10,top:25}}> 
         <View style={{height:60,width:"100%",paddingVertical:8,paddingHorizontal:10}}>
          <Text style={{fontSize:20,fontWeight:"bold"}}>Welcome</Text>
          <Text style={{fontSize:15}}>SignUp to Continue</Text>
        </View>
        <View style={{marginTop:15}}>
        <TextInputBox maxLength={10} 
            style={{ 
              paddingVertical:8,               
              borderBottomWidth:1,
              borderBottomColor:"black",
               }} 
              value={this.state.mobile} 
              onChangeText={mobile => this.setState({ mobile })}
              keyboardType={"numeric"}
              placeholder="Enter your mobile number"
              placeholderTextColor="black"
              
              /></View>
        
       
        <Button onPress={()=>this.Submit()} text="Sign Up" />
        
        <TouchableOpacity  onPress={()=>{this.props.navigation.navigate(Routes.LoginScreen)}}><Text style={{color:'black',fontSize:16,textAlign:'center',marginTop:30}} >Already have an account? SignIn</Text></TouchableOpacity></View>
      </View>
        </ImageBackground>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { registering,registered,user } = state.registration;
 const {alert,colors}=state;
 
  return {
    registering,registered, alert,colors
   
  };
}
const actionCreators = {
  register: userActions.register
}
const connectedRegisterScreen = connect(mapStateToProps,actionCreators)(RegisterScreen);
export { connectedRegisterScreen as RegisterScreen }; 

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "white"
  // },

  logo: {
    height: 90,
    width: "100%",
    resizeMode: "contain",
    
  },

  heading: {
    marginTop: 5,
    color: "black",
    textAlign: "center"
  },
  dropdownContainer: {
    backgroundColor: "white",
    width: 60,
    marginTop: 20,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5
  },

  mobiletxt: {
    marginTop: 5,
    color: "black",
    textAlign: "left",
    marginTop: 60,
    fontSize: 18
  },
  newview: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
  },
  textinput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 20,
    borderRadius: 5,

  }
});
