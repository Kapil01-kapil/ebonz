import React, { Component, Platform } from 'react';
import Images from '../Images';
import { connect } from "react-redux";
import { userService } from "../Services";
import { Actions } from "react-native-router-flux";

import { Image, View, AsyncStorage, ImageBackground,Text,TouchableOpacity } from 'react-native';
import { Routes, userConstants, colorConstants } from '../Constants';
import { Container } from "../Components"


import NetInfo from "@react-native-community/netinfo";



class Splash extends Component {

  constructor(props)
  {super(props);
  this.state={isConnected:false}
}

  componentDidMount() {
    const { dispatch } = this.props;
    const hours = new Date().getHours()
    const isDayTime = hours > 6 && hours < 20 //AFTER 8'O clock the application will change color
    if(isDayTime)
   {
     
      dispatch({ type: colorConstants.LIGHT })
  }
    else{
      
      dispatch({ type: colorConstants.DARK });
    }

  //dispatch({ type: colorConstants.DARK });
    this.initialize();

   
  }
  componentWillUnmount(){clearInterval(this.interval)}

  initialize(){

    NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
   // alert(state.isConnected);
   this.setState({isConnected: state.isConnected});
   if(state.isConnected)
   {
      this.interval=setInterval(()=>{     
    
   userService.isSignedIn().then(res => {
    if (res.success == true) {

      Actions.Protected({ type: 'reset' })
    }
    if (res.success == false) {

      Actions.Public({ type: 'reset' })
    }
  }).catch(err => {
    console.log(err);
  })},2000);
 }
    console.log("Is connected?", state.isConnected);
  });

}


  render() {
    const { colors } = this.props;  
    const {isConnected}=this.state;
   return (
     isConnected?(
      <ImageBackground style={{ flex: 1,height: "100%",resizeMode:'contain'}} source={Images.BackGround}>
      <View style={{flex:1,  alignItems: "center", justifyContent: "center" }}>      
      <Image source={Images.Logo} style={{width: '100%',height: '60%' }}/>
      <Image source={Images.LogoName} style={{ width: '100%', height: 60, resizeMode: 'contain' }} />
      </View>
      </ImageBackground>
  ):( 
  <ImageBackground style={{ flex: 1,height: "100%",resizeMode:'contain'}} source={Images.BackGround}>
       <View style={{ flex:1,   alignItems: "center", justifyContent: "center" }}>  
           <Image source={Images.Logo} style={{width: '100%',height: '60%' }}/>    
      <Image source={Images.LogoName} style={{ width: '100%', height: 60, resizeMode: 'contain' }} />
      <Text style={{marginBottom:10}}>No Internet</Text>
      <TouchableOpacity onPress={()=>this.initialize()}>
        <View style={{padding:10,width:200,alignItems:'center',justifyContent:'center', borderRadius:3, backgroundColor:colors.HEADER}}>
          <Text style={{color:colors.FOREGROUND_LIGHT,fontSize:16}}>Retry</Text>
        </View>
      </TouchableOpacity> 
    </View>
    </ImageBackground> 
     )
    );
  }
}

function mapStateToProps(state) {
  const { alert, authentication, colors } = state;
  const { authenticated } = authentication;
  return {
    alert,
    authenticated, colors
  };
}

const connectedSplashScreen = connect(mapStateToProps)(Splash);

export { connectedSplashScreen as Splash };

