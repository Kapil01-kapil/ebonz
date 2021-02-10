/*This is th Example of google Sign in*/
import React from "react";
import { StyleSheet, Text, View, Alert,Image } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes
} from "react-native-google-signin";
import Images from '../Images'
import { TouchableOpacity } from "react-native-gesture-handler";
export default class GoogleLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: ""
    };
  }
  componentDidMount() {
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
      // Repleace with your webClientId generated from Firebase console
      webClientId:"370765160274-cmod6qmv433748gli9a7lp6dijgag5ki.apps.googleusercontent.com"
    });
  }
  _signIn = async () => {
  
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true
      });
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info --> ", userInfo);
      this.props.onPress(userInfo);
      this.setState({ userInfo: userInfo });
    } catch (error) {
      console.log("Message", error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Signing In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play Services Not Available or Outdated");
      } else {
        console.log("Some Other Error Happened");
      }
    }
  };
  _getCurrentUser = async () => {
    //May be called eg. in the componentDidMount of your main component.
    //This method returns the current user
    //if they already signed in and null otherwise.
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      console.error(error);
    }
  };
  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  _revokeAccess = async () => {
    //Remove your application from the user authorized applications.
    try {
      await GoogleSignin.revokeAccess();
      console.log("deleted");
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (  
<View  style={styles.container}>
  {/* <GoogleSigninButton
   style={{ height: 50,width:50,padding:0 }}
   size={GoogleSigninButton.Size.Icon}
  color={GoogleSigninButton.Color.Light}
  onPress={this._signIn}
  /> */}
  <GoogleSigninButton
  style={{ width: '100%', height: 50,borderRadius:5 }}
  size={GoogleSigninButton.Size.Wide}
  color={GoogleSigninButton.Color.Light}
  onPress={this._signIn}
/>
  </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding:5
  }
});
