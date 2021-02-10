import React, { Component } from "react";
import {connect} from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,ActivityIndicator,Alert,ImageBackground
} from "react-native";
import Images from "../../Images";
import { userActions } from '../../Actions';

import {TextInputBox} from '../../Components/TextInputBox'
import {Button,Container} from "../../Components";
import {Routes,colorConstants} from "../../Constants"
class OTPScreen extends Component {
constructor(props) {
    super(props);
    this.state={otp:null,username:null,submitted:false}
}

 handleSubmit(){

    const {otp,username} = this.state; 
  
      if(otp==null) 
      {
        ToastAndroid.show('Please Enter OTP', ToastAndroid.LONG);  return;      
     }
  
    if(otp.length<6) {
      ToastAndroid.show('Please  Enter Your Correct OTP', ToastAndroid.LONG);    return;   
    }   
    const { dispatch } = this.props;
    const data = {     
      username:username ,       
      verificationCode: otp     
    };  
     if (data) {
    this.props.verifyOTP(data);
    }      
    };

   componentDidMount(){
    username = this.props.username; 
    //alert(username);
     this.setState({username:username});
     
   }

   render() {
    const {verifying, verified,alert } = this.props;
    const{colors}=this.props;
 { if(verifying)
  return(<View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>  
    <ActivityIndicator size="large" color="#0000ff" />
  <Text>Verifying. Please wait</Text>
  </View>);



}
    return (
      
  
      <Container style={{ backgroundColor:colors.BASE_COLOR}}> 
        <ImageBackground style={{ flex: 1}} source={Images.BackGround}>
        <View style={{flex:2,alignItems:"center",justifyContent:"flex-end"}}><Image source={Images.LogoName} style={styles.logo}/></View>
           
      
        <View style={{flex:8,top:50,paddingVertical: 8,paddingHorizontal: 10}}> 
        
        
        <TextInputBox placeholder="Enter Your OTP" maxLength={6}  onChangeText={(otp) => this.setState({otp})} keyboardType={'numeric'} style={styles.txtinput} placeholderTextColor="black"/>
       
        <Button onPress={()=>this.handleSubmit()} text="Next" /></View>
        {/* <Text style={styles.textStyle}>NEXT</Text> */}
           

      
        
        </ImageBackground>
        </Container>

    );
  }
}
function mapStateToProps(state) {
  const { user } = state.registration; 
  const {colors}=state;
  return {
      user,colors
  };
}
const actionCreators = {
  verifyOTP: userActions.verifyOTP
}
const connectedOTPScreen = connect(mapStateToProps,actionCreators)(OTPScreen);
export { connectedOTPScreen as OTPScreen };

const styles = StyleSheet.create({
  // container: {
  //  flex:1,
  //   backgroundColor: 'white',    
  // },
  txtinput:{
     height:40,
     width:'100%',
    borderBottomColor:'black',
    borderBottomWidth:1,
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
    height: 90,
    width: "100%",
    resizeMode: "contain"
  },

  heading:{
    marginTop:5,
    color:'black',
    textAlign:'center'
  },

  
});



