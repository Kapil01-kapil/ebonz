import React, { Component, } from 'react';
import {StyleSheet,Text, View,  Image, ScrollView,TouchableOpacity} from 'react-native';
import Images from '../../../Images' 
import { connect } from 'react-redux';
import {Container} from '../../../Components'
import {userActions} from '../../../Actions'
import { Actions } from 'react-native-router-flux';

 class SettingScreen extends Component {




     back(){
        this.props.navigation.navigate('MyAccount');
     }

     noti()
     {
        this.props.navigation.navigate('NotificationScreen');
     }

     Privacy()
     {
        this.props.navigation.navigate('Privacy');
     }

     ChangePassword()
     {
         this.props.navigation.navigate('ChangePassword');
     }
     Logout()
     {      
      this.props.logout(); 
      Actions.Public({type:'reset'}); 
     }
   
  render() {
    const  {colors}=this.props;

    return (
  
          <Container> 
          <ScrollView style={{padding:10}}>           
            <TouchableOpacity onPress={()=>this.noti()} >
            <View style={styles.view} >
            <View style={styles.viewColumn1}>
            <Text style={[styles.text,{color:colors.FOREGROUND_DARK}]} >Notifications</Text>
            <Text>Recommendations and Special Communications</Text>
            </View>
            <Image source={Images.next} style={styles.img1}/>
            </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=>this.Privacy()} >
            <View style={styles.view} >
            <View style={styles.viewColumn1}>
            <Text style={[styles.text,{color:colors.FOREGROUND_DARK}]}>Privacy</Text>
            <Text>Phone number visibility</Text>
            </View>
            <Image source={Images.next} style={styles.img1}/>
            </View>
            </TouchableOpacity> */}

            <TouchableOpacity onPress={()=>this.ChangePassword()} >
            <View style={styles.view} >
            <View style={styles.viewColumn1}>
            <Text style={[styles.text,{color:colors.FOREGROUND_DARK}]}>Change Password</Text>
            <Text>Change your password</Text>
            </View>
            <Image source={Images.next} style={styles.img1}/>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.Logout()}>
            <View style={styles.view} >
            <View style={styles.viewColumn1}>
              <Text style={styles.text6} >Logout</Text>
            </View></View>
            </TouchableOpacity>
            {/* <View style={styles.view6} >
            <Text style={styles.text6} >Deactivate account and delete account </Text>
            </View> */}
            </ScrollView>
            
            </Container>

    );
  }
}

function mapStateToProps(state) {
    const {colors } = state;
  
    
    return {
      colors
    };
  }

  const actionCreators = {
    logout: userActions.logout
  }
  
  const connectedSettingPage = connect(mapStateToProps,actionCreators)(SettingScreen);
  export { connectedSettingPage as SettingScreen }; 

const styles = StyleSheet.create({ 

    view:{
         flexDirection:'row',       
          padding:10,
         justifyContent:'center',
         alignItems:'center',
         borderBottomColor:'#383838',
         borderBottomWidth:.5
        },
        viewColumn1:{
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
  
    text:{
      fontSize:16,      
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
            color:'#FF8A65',
            fontWeight:"bold",
           fontSize:15
            
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







