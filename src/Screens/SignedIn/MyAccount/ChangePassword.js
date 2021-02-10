import React, { Component, } from 'react';
import {StyleSheet,Text, View,ScrollView,TouchableOpacity,TextInput} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
import {Header} from '../../../Components/Header'
import { connect } from 'react-redux';
import { Button, NumberBox, TextBox } from "../../../Components"
import { userActions } from "../../../Actions";
//import { TouchableOpacity } from 'react-native-gesture-handler';
 class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      oldPassword:"",
      password:"",
      username:"",
    };
  }
  onNextPress(){
    const {user}=this.props;
    console.log("HelloUser:",user.id);
    const { dispatch } = this.props;
    const {oldPassword,password}=this.state;
    
     const NewPassword={id:user.id,oldPassword,password}  
    if(NewPassword){
      dispatch(userActions.changePassword(NewPassword))
    }


  }
  render() {

    return (
  
      
    <View style={styles.container}>             
    <ScrollView>    

     
    <Text style={{color:'black',fontSize:22,textAlign:'center',marginTop:20}} >Please enter your password</Text>
    <View style={{padding:20}}>  
    {/* <TextInput secureTextEntry={true} placeholder="UserName" style={styles.txtinput} onChangeText={(username) => this.setState({username})} value={this.state.username}/>   */}
    <TextInput secureTextEntry={true} placeholder="Current password" style={styles.txtinput} onChangeText={(oldPassword) => this.setState({oldPassword})} value={this.state.oldPassword}/>
    <TextInput secureTextEntry={true} placeholder="New password" style={styles.txtinput} onChangeText={(newPassword) => this.setState({newPassword})} value={this.state.newPassword}/>
    <TextInput secureTextEntry={true} placeholder="Confirm new password" style={styles.txtinput} onChangeText={(password) => this.setState({password})} value={this.state.password} />
    </View>
</ScrollView>

<Button onPress={() => this.onNextPress()} text="NEXT" />
         
    </View>



    );
  }





}

function mapStateToProps(state) {
   const { users } = state;
  var user;
   user = users.currentUser;
 

    const { loggingIn } = state.authentication;
    console.log('Logging state from Register Screen');
    console.log(state);
    console.log('Logging state end from Register Screen');
    
    return {
        loggingIn,user:user
    };
  }
  
  const connectedChangePage = connect(mapStateToProps)(ChangePassword);
  export { connectedChangePage as ChangePassword }; 

const styles = StyleSheet.create({
    container: {
        flex:1,
         backgroundColor: 'white',    
       },
     
       txtinput:{
         height:40,
         backgroundColor:'#EBEEEF',
         width:'100%',
         borderBottomColor:'black',
         borderBottomWidth:1,
         marginTop:40
       },
       view:{
         height:40,
         width:'100%',
         padding:5,
         borderBottomWidth:.5,
         borderBottomColor:'black',
         flexDirection:'row',
         justifyContent:'space-between',
         alignItems:'center'
       },
     
       button: {
           height:40,width:'100%',
           backgroundColor:'#007ACC',
           justifyContent:'center',
           alignItems:'center',
         position: 'absolute',
         bottom:0
       },
       view1:{
           height:120,
           width:'100%',
           flexDirection:'row',
           alignItems:'center',
           padding:30,
           justifyContent:'space-between',
           borderBottomColor:'#383838',
           borderBottomWidth:.5
         },
         view2:{
           height:100,
           width:100,
           backgroundColor:'white',
           borderRadius:50,
           justifyContent:'center',
           alignItems:'center',
           borderColor:'black',
           borderWidth:1
         },
     
         view3:{
             flexDirection:'column',
             justifyContent:'center',
             padding:10,
             marginLeft:50
         },
         view4:{
              flexDirection:'row',
              height:60,
              flex:5,
              padding:20,
              justifyContent:'center',
              alignItems:'center',
              borderBottomColor:'#383838',
              borderBottomWidth:.5
             },
             view5:{
                 flexDirection:'column',
                 flex:3
             },
             view6:{
                
                 height:60,
                width:'100%',
                
              padding:20,
                 justifyContent:'center',
                 borderBottomColor:'#383838',
                 borderBottomWidth:.5
             },
         man:{
             height:100,
             width:100,
             borderRadius:100,
            borderColor:'black',
            borderWidth:1
         },
         text1:{
           fontSize:20,
           fontWeight:'bold',
           color:'black'
         },
         text2:{
             color:'black',
             fontWeight:'bold',
             fontSize:18
         },
     
         text3:{
             color:'#007ACC'
         },
         text4:{
             fontSize:15,
             fontWeight:'bold',
             color:'black'
         },
     
         text6:{
                 color:'#2A65EA',
                 fontWeight:"bold",
                
                 
         },
     
         text5:{
             color:'#2A65EA',
             fontWeight:'bold'
         },
       logo:{
         height:50,
         width:'100%',
         resizeMode:'contain',
         marginTop:60
     
       },
       heading:{
         marginTop:5,
         color:'black',
         textAlign:'center'
       },
       Signup:{
         marginTop:5,
         color:'black',
         textAlign:'left',
         marginTop:60,
         fontSize:18
       },
       img:{
         height:25,
         width: 25,
         flex:1,
         resizeMode:'contain',
       },
       img1:{
         height:15,
         width: 15,
         
         resizeMode:'contain',
       },
       img2:{
             height:25,width:25
       },
       imgnew:{
         height:25,
         width: 25,
         
         resizeMode:'contain',
       },
       modal: {
         flex: 1,
         
         backgroundColor: 'white',
         
      },
      scene: {
       flex: 1,
       backgroundColor:'pink'
     
     },

  
});







