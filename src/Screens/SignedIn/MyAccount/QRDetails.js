import React, { Component, } from 'react';
import {StyleSheet,Text, View,Dimensions } from 'react-native';

import { connect } from 'react-redux';

class QRDetails extends Component {
constructor(props) {
    super(props);  
}
     
  render() {
    return (  
          <View style={styles.container}>   
<Text>Followers & Following</Text>      

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
  
  const connectedQRDetailsPage = connect(mapStateToProps)(QRDetails);
  export { connectedQRDetailsPage as QRDetails }; 


const styles = StyleSheet.create({
  container: {
   flex:1,
    backgroundColor: 'white',    
  }
  
});







