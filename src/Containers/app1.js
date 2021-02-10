/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  Alert,
  StatusBar,
} from 'react-native';


import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      error: null,
    };
  }

  async componentDidMount() {
    this._configureGoogleSignIn();
    await this._getCurrentUser();
  }

  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId:'370765160274-cmod6qmv433748gli9a7lp6dijgag5ki.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }
  async _getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo, error: null });
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in:)' : error.message;
      this.setState({
        error: new Error(errorMessage),
      });
    }
  }

  render() {
    const { userInfo } = this.state;
    console.log(userInfo);
    const body = userInfo ? this.renderUserInfo(userInfo) : this.renderSignInButton();
    return (
      <View style={[styles.container, {flex: 1}]}>
        {this.renderIsSignedIn()}
        {this.renderGetCurrentUser()}
        {this.renderGetTokens()}
        {this.renderSignInButton()}
        {body}
        <Button onPress={this._signIn} title="Log in" />
      </View>
    );
  }

  renderIsSignedIn() {
    return (
      <Button
        onPress={async () => {
          const isSignedIn = await GoogleSignin.isSignedIn();
          Alert.alert(String(isSignedIn));
        }}
        title="is user signed in?"
      />
    );
  }

  renderGetCurrentUser() {
    return (
      <Button
        onPress={async () => {
          const userInfo = await GoogleSignin.getCurrentUser();
          Alert.alert('current user', userInfo ? JSON.stringify(userInfo.user) : 'null');
        }}
        title="get current user"
      />
    );
  }

  renderGetTokens() {
    return (
      <Button
        onPress={async () => {
          const isSignedIn = await GoogleSignin.getTokens();
          Alert.alert('tokens', JSON.stringify(isSignedIn));
        }}
        title="get tokens"
      />
    );
  }

  renderUserInfo(userInfo) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
          Welcome {userInfo.user.name}
        </Text>
        <Text>Your user info: {JSON.stringify(userInfo.user)}</Text>

        <Button onPress={this._signOut} title="Log out" />
        {this.renderError()}
      </View>
    );
  }

  renderSignInButton() {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Auto}
          onPress={this._signIn}
        />
        {this.renderError()}
      </View>
    );
  }

  renderError() {
    const { error } = this.state;
    if (!error) {
      return null;
    }
    const text = `${error.toString()} ${error.code ? error.code : ''}`;
    return <Text>{text}</Text>;
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo, error: null });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
        this.setState({
          error,
        });
      }
    }
  };

  _signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      this.setState({ userInfo: null, error: null });
    } catch (error) {
      this.setState({
        error,
      });
    }
  };
}




const styles = StyleSheet.create({
  scrollView: {
   // backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    //backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    //color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
   // color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    //color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
