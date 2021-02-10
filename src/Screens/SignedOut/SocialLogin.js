import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  ToastAndroid
} from "react-native";
import Logo from "../../Images/Logo.png";
import Fblogin from "../../Components/FBLogIn.js";
import GoogleLogin from "../../Components/GoogleLogin";
import { userActions } from '../../Actions';
export default class SocialLogin extends Component {

  constructor(props) {
    super(props);
  
    // reset login status
     //   this.props.dispatch(userActions.logout());

        this.state = {
          longitude: '77.27970499999999',
          latitude: '28.6604983',  
       submitted:false
      };     
  }
  
  loginWithFacebook=(newuser)=>
  {
    const {latitude,longitude} = this.state;
   alert('Hitting login with facebook',latitude,longitude);
 
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
   alert('Hitting login with google');
 
  const user = {     
          email: newuser.user.email,
          loginMethod:"GOOGLE",
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
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image source={Logo} style={styles.logo} />         
          <View style={{ padding: 10 }}>
            <Text style={styles.Signup}>Signup with Social Media</Text>
            <GoogleLogin onPress={this.loginWithGoogle} />
            <Fblogin onPress={this.loginWithFacebook} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;  
  return {
      loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(SocialLogin);
export { connectedLoginPage as SocialLogin }; 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  logo: {
    height: 50,
    width: "100%",
    resizeMode: "contain",
    marginTop: 60
  },
  heading: {
    marginTop: 5,
    color: "black",
    textAlign: "center"
  },
  Signup: {
    marginTop: 5,
    color: "black",
    textAlign: "left",
    marginTop: 60,
    fontSize: 18
  }
});
