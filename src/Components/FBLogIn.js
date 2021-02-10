import React, { Component } from "react";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { TouchableOpacity, Text, View ,StyleSheet,Image} from "react-native";
import Images from '../Images'


export default class FBLogIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accessToken: null
    };
  }

  initUser(token) {
    fetch(
      "https://graph.facebook.com/v2.5/me?fields=email,name,picture&access_token=" +
        token
    )
      .then(response => response.json())
      .then(result  => {
        result={token,...result};      
        this.props.onPress(result);
      
        })
        .catch(err => console.log(err)
        );
    }

    
  fbAuth() {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function(result) {
        console.log(result);
        if (result.isCancelled) {
         // alert("Login was cancelled");
          console.log("Login was cancelled");
        } else {
          //alert("Login successful");
        //  Actions.HomeScreen();
       
      
          console.log(
            "Login was successful with permissions: " +
              result.grantedPermissions.toString()
          );
        }
      },
      function(error) {
        console.log("Login failed with error: " + error);
      }
    );
    AccessToken.getCurrentAccessToken()
    .then(data => {
    this.setState({ accessToken: data.accessToken });
      this.initUser(data.accessToken);

    })
    .catch(error => {
      console.log(error);
    });
  }


  
  
    componentDidMount() {
      // AccessToken.getCurrentAccessToken()
      // .then(data => {
      //   this.setState({ accessToken: data.accessToken });
      //   this.initUser(data.accessToken);
  
      // })
      // .catch(error => {
      //   console.log(error);
      // });
    }
  
  render() {
    

return (
  <View style={styles.container}>
  <TouchableOpacity  onPress={this.fbAuth.bind(this)}>
  <View style={{width: '100%', height: 40,backgroundColor:"#38539b",flexDirection:'row',padding:5,borderRadius:5}}>
   <Image source={Images.FacebookIcon} style={{height:20,width:20,top:5,left:5}}/>
   <Text style={{color:"white", fontWeight:'bold',flex:1,top:5,fontSize:14,textAlign:'center'}}>Sign in with facebook</Text>
   </View>
  {/* <Image source={Images.FacebookIcon} style={{resizeMode:'contain',height:30}}/> */}
   {/* <View style={{borderRadius:5,flex:1,backgroundColor:'#3B5998',padding:8,marginHorizontal:5}} >
   <Text style={{color:'white',fontWeight:'bold',textAlign:'center'}} >Login with Facebook</Text>
   </View> */}
 </TouchableOpacity>   
</View>
);
}
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal:10,paddingVertical:8
  }
});
