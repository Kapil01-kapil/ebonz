import React, { Component } from "react";
import { connect } from 'react-redux';
import {Actions} from "react-native-router-flux"
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ToastAndroid,ImageBackground
} from "react-native";
import {TextInputBox} from '../../Components/TextInputBox'
import {Button,Container} from "../../Components";
import Images from "../../Images"
import {Routes} from "../../Constants"
import { userActions } from '../../Actions';

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
        this.state = {
          username: "",         
          submitted: false       
      };     
  }
  handleSubmit() {  
     
    this.setState({ submitted: true });

    const { username } = this.state;

    if(username=="") 
    {
     ToastAndroid.show('Please enter your mobile number', ToastAndroid.LONG);    
     return;
   } 
    const { dispatch } = this.props;
  
    if (username )
     {
      const  onlyNumbers = /^[0-9]+$/;      
      const isMobile=  onlyNumbers.test(username);
      let data="";

      if(isMobile)      
         data='91'+username;    
          
      dispatch(userActions.forgetPassword(data));
      
      //  Actions.Protected({type:'reset'});             
    }        
}

_navigate(screen){
  this.props.navigation.navigate(screen);
}


 


render() {      
  const {colors}=this.props
   return (
     <Container style={{ backgroundColor:"white",flex:1}}>
       <ImageBackground style={{ flex: 1}} source={Images.BackGround}>
      
       <View style={{flex:2,alignItems:"center",justifyContent:"flex-end"}}>
         <Image source={Images.LogoName} style={styles.logo} /></View>
        

        <View style={{flex:8,top:50,paddingVertical: 8,paddingHorizontal: 10}}>           
         <TextInputBox maxLength={10} 
         style={styles.textinput} 
          value={this.state.username}
          onChangeText={username => this.setState({ username })}          
          placeholder="Email or mobile number"
          placeholderTextColor="black"
          />    
         
        
        <Button onPress={() => this.handleSubmit()} text="NEXT" />        
       
       
        </View>

    
       
       </ImageBackground>
       </Container>
   );
 }
}
function mapStateToProps(state) {

  const { loggingIn,loggedIn } = state.authentication;
const  {colors}=state;
    return {
        loggingIn,loggedIn,colors
    };  
}

const connectedForgetPassword = connect(mapStateToProps)(ForgetPassword);
export { connectedForgetPassword as ForgetPassword }; 
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
     borderBottomWidth: 1,
    borderBottomColor: "black",
    marginTop: 20,
    
    
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
