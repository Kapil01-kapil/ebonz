import React, { Component, } from 'react';
import {StyleSheet, View,TextInput,Text} from 'react-native';
import { connect } from 'react-redux';

 class TextInputBox extends Component {


  render() {
    
 const {colors}=this.props;

    return (
     <View style={{padding:10}}>      
      <TextInput  style={[styles.textinput,{borderBottomColor:colors.FOREGROUND_DARK}]}  {...this.props} ></TextInput>
 
</View>
    );
  }


}


function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    console.log('Logging state from Register Screen');
    console.log(state);
    console.log('Logging state end from Register Screen');
    const {colors}=state;
    return {
        loggingIn,colors
    };
  }
  
  const connectedHeaderPage = connect(mapStateToProps)(TextInputBox);
  export { connectedHeaderPage as TextInputBox }; 

const styles = StyleSheet.create({
    textinput:{
     
     paddingHorizontal:10,
     paddingVertical:8,
      
     borderBottomWidth:1,
     borderBottomColor:"white",
      marginTop:10
  },
});







