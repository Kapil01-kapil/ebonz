import React, { Component } from "react";
import { connect } from 'react-redux';
import {Actions} from "react-native-router-flux"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,ActivityIndicator,Alert,ImageBackground,KeyboardAvoidingView
} from "react-native";
import GetLocation from 'react-native-get-location'
import Fblogin from "../../Components/FBLogIn.js";
import GoogleLogin from "../../Components/GoogleLogin";
import {TextInputBox} from '../../Components/TextInputBox'
import {Button,Container} from "../../Components";
import Images from "../../Images"
import {Routes} from "../../Constants"
import { userActions } from '../../Actions';
import firebase from "react-native-firebase";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
        this.state = {
          username: null,
          password: null,
          submitted: false,
          token:'',
          longitude: '77.27970499999999',
          latitude: '28.6604983',        
      };     
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
 })
}

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
   //alert(fcmToken);
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




  handleSubmit() {   
    this.setState({ submitted: true });

    const { username, password ,token} = this.state;

    if(username==null) 
    {
     ToastAndroid.show('Please enter your mobile number', ToastAndroid.LONG);    
     return;
   }

   if(password==null)
   {
   ToastAndroid.show('Please enter your password', ToastAndroid.LONG);   
   return;
   }   
    const { dispatch } = this.props;
    if (username && password)
     {
      const  onlyNumbers = /^[0-9]+$/;      
      const res=  onlyNumbers.test(username);
      if(res)
      {
       const uname='91'+username;  
        dispatch(userActions.login(uname, password,token));
      }  else   
      {
        dispatch(userActions.login(username, password,token));
      }
    }        
}
_navigate(screen){
  this.props.navigation.navigate(screen);
}

loginWithFacebook=(newuser)=>
{
  const {latitude,longitude} = this.state;
// alert('Hitting login with facebook',latitude,longitude);

const user = {     
  email: newuser.email ,
  profilePhoto:newuser.picture.data.url,
  accessToken:newuser.accessToken,
  longitude:longitude,
  latitude:latitude,
  loginMethod:"Facebook"  
};  
console.log({user:user});
const { dispatch } = this.props;
this.setState({ submitted: true }); 
    if (user) {
       dispatch(userActions.register(user)); 
    }    
}

loginWithGoogle=(newuser)=>
{
  const {latitude,longitude} = this.state;
// alert('Hitting login with google');

const user = {     
        email: newuser.user.email,
        loginMethod:"GOOGLE",
        name:newuser.user.name,
        accessToken:newuser.idToken,
        profilePhoto:newuser.user.photo,  
         latitude:latitude,
        longitude:longitude  
};  


const { dispatch } = this.props;
this.setState({ submitted: true }); 
    if (user) {
       dispatch(userActions.register(user)); 
    }    
}  

render() {
  const { colors } = this.props;
  return (
    <View style={{  flex: 1 }}>
      <ImageBackground style={{ flex: 1}} source={Images.BackGround}>
 <ScrollView style={{flex:1}}>
          <View style={{flex:1}}>
      <View style={{  height:140,alignItems: "center" ,justifyContent:"flex-end"}}>
        <Image source={Images.LogoName} style={styles.logo} />
      </View>
      <View style={{  padding: 20,justifyContent: 'center',flex:1 }}>
        <View style={{flex:1,width:"100%",paddingVertical:8,paddingHorizontal:10}}>
          <Text style={{fontSize:20,fontWeight:"bold"}}>Welcome back</Text>
          <Text style={{fontSize:15}}>SignIn to Continue</Text>
        </View>
        <TextInputBox
          style={{
            borderBottomColor: "black", borderBottomWidth: 1,
            paddingVertical: 5,

            borderBottomWidth: 1,
             
            
          }}
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
          placeholder="Email or mobile number"
          placeholderTextColor="black"
        />


        <TextInputBox maxLength={10}
          style={{
            borderBottomColor: "black", borderBottomWidth: 1,
            paddingVertical: 5,

            borderBottomWidth: 1,

          }}
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder="Password"
          placeholderTextColor={colors.FOREGROUND_DARK}
          placeholderTextColor="black"
          secureTextEntry={true}
        />

        <Button onPress={() => this.handleSubmit()} text="Sign In" />
        <View style={{ flexDirection: "row", paddingHorizontal:10,paddingVertical:8, justifyContent: "center", height: 10, width: "100%", top: 5 }}>
          <View style={{ height: 1, backgroundColor: "black", width: '45%' }}>
          </View>
          <View style={{  width: "10%", height: 20, bottom: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text>OR</Text>
          </View>
          <View style={{ height: 1, backgroundColor: "black", width: '45%' }}></View>
        </View>
        <View style={{  width: '100%', justifyContent: "center",  top: 20 }}>
          <GoogleLogin onPress={this.loginWithGoogle} />
          <Fblogin onPress={this.loginWithFacebook} />
        </View>
      </View>
    
    <View style={{justifyContent:"flex-end",height:90,paddingBottom:10}}>
        <View style={{ width: '100%', alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity onPress={() => { this._navigate(Routes.ForgetPassword) }}>
            <Text style={{ color: "black", textAlign: 'center', marginTop:7,fontSize:15 }}>Forget Password?</Text></TouchableOpacity>
        </View>

        <View style={{width:'100%',justifyContent:"center"}}>
                <TouchableOpacity  onPress={()=>{this._navigate(Routes.RegisterScreen)}}>
                <Text style={{color:"black",textAlign:'center',marginTop:7,fontSize:15}} >Don't have an account? SignUp</Text></TouchableOpacity></View>
      </View>
      </View>
      </ScrollView>
      </ImageBackground>
    </View>
  );
}
}
function mapStateToProps(state) {

  const { loggingIn,loggedIn } = state.authentication;
  const { alert,colors } = state; 
    return {
        loggingIn,loggedIn,alert,colors
    };  
}

const connectedLoginPage = connect(mapStateToProps)(LoginScreen);
export { connectedLoginPage as LoginScreen }; 
const styles = StyleSheet.create({

  // container: {
  //   flex: 1,
  //  // backgroundColor: colors.BASE_COLOR
  // },

  logo: {
    height: 90,
    width: "100%",
    resizeMode: "contain"


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
    borderRadius: 5
  },
  password: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 20,
    borderRadius: 5
  }
});

