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
export default class SocialSignUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.heading}>A short description about the app </Text>

          <View style={{ padding: 10 }}>
            <Text style={styles.Signup}>Signup with Social Media</Text>

            <GoogleLogin />
            <Fblogin />
          </View>
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  console.log('Logging state from Register Screen');
  console.log(state);
  console.log('Logging state end from Register Screen');
  
  return {
      loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(SocialSignUp);
export { connectedLoginPage as SocialSignUp }; 
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
