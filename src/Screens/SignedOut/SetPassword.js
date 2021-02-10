import React, { Component } from "react";
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,Image,
  ToastAndroid,
  TouchableOpacity,ScrollView,ImageBackground
} from "react-native";
import {userActions} from "../../Actions"
import {TextInputBox} from '../../Components/TextInputBox'
import {Button,Container} from "../../Components";
import {Routes,colorConstants} from "../../Constants"
import Images from '../../Images'

 class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { pass: null, newpass: null };
  }

  Next() {
    const { pass, newpass } = this.state;
    message = "";
    if (pass == null) {
      message = "Please enter your password";
      ToastAndroid.show(message, ToastAndroid.SHORT);
      return;
    }
    if (newpass == null) {
      message = "Please confirm your password";
      ToastAndroid.show(message, ToastAndroid.SHORT);
      return;
    }
    if (pass != newpass) {
      message = "Password not matched";
      ToastAndroid.show(message, ToastAndroid.SHORT);
      return;
    }
    const { user } = this.props;
    const data = {
      id:user.id ,   
      username:this.props.username,    
      password: pass,
     
    };  
    
     if (data) {
      try{
    this.props.setPassword(data);
      this.props.navigation.navigate(Routes.Protected); 
    }
      catch(err){console.log('Logging error from Set Password screen',err)}
       
      
     }     
   
  }
  componentDidMount(){
    //alert(this.props.username);
  }

  render() {
    const{colors}=this.props;
    console.log("colors:",colors)

    return (
      <Container>
        <ImageBackground style={{ flex: 1}} source={Images.BackGround}>
        
          
        <View style={{flex:2,alignItems:"center",justifyContent:"flex-end"}}><Image source={Images.LogoName} style={styles.logo}/></View>
           
        <View style={{flex:8,top:50,paddingVertical: 8,paddingHorizontal: 10}}> 
        

        <View style={{height:80,width:"100%",paddingVertical: 8,paddingHorizontal: 10}}><Text style={{ color:"black",fontSize:15  }}>
            Your are creating a password. This will help you
            login faster next time.
          </Text></View>
        
        <TextInputBox
            style={{borderBottomColor: "black", borderBottomWidth: 1, paddingHorizontal: 10,
            paddingVertical: 8,

            borderBottomWidth: 1,

            marginTop: 10}}
            placeholder="Enter Password"
            maxLength={30}
            onChangeText={pass => this.setState({ pass })}
            secureTextEntry={true}
            placeholderTextColor="black"        
          />
         
          <TextInputBox
          style={{borderBottomColor: "black", borderBottomWidth: 1, paddingHorizontal: 10,
          paddingVertical: 8,

          borderBottomWidth: 1,

          marginTop: 10}}
            placeholder="Confirm Password"
            maxLength={30}
            onChangeText={newpass => this.setState({ newpass })}           
            placeholderTextColor="black"
            secureTextEntry={true}          
          />

        <Button onPress={() => this.Next()} text="NEXT"/>
       
        </View>
      


          
      
          
          </ImageBackground>
          
      </Container>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.registration;
  const{colors}=state;
  return ({
      user:user,colors
  });
}

const actionCreators = {
  setPassword: userActions.setPassword
}

const connectedPasswordPage = connect(mapStateToProps,actionCreators)(SetPassword);
export { connectedPasswordPage as SetPassword }; 
const styles = StyleSheet.create({
  container: {
    

    
  },
  bottomView: {
    width: "100%",
    height: 40,
    backgroundColor: "#007ACC",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
    padding:10
  }, 
   logo:{
    height:60,
    width:'100%',
    resizeMode:'contain',
    marginTop:50
  },

  textStyle: {
    color: "black",
    fontSize: 20
  }
});
