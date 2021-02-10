import React, { Component, } from 'react';
import {StyleSheet,Text, View,ScrollView,TouchableOpacity} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native'
import {Container} from '../../../Components'
import { connect } from 'react-redux';


//import { TouchableOpacity } from 'react-native-gesture-handler';
 class Privacy extends Component {

    ChangePassword()
    {
        this.props.navigation.navigate('ChangePassword');
    }

  render() {
const {colors}=this.props;
    return (
  
       
        <Container>             
        <ScrollView style={{padding:10}}>

    
      
          {/* <View style={styles.view4} >
          <View style={styles.view5}>
          <Text style={{color:colors.FOREGROUND_DARK}}  >Show my phone number in ads</Text>
         
          </View>
          <ToggleSwitch 
              isOn={true}
              onColor='green'
              offColor='red'  
              size='medium'
              onToggle={ (isOn) => console.log('changed to : ', isOn) }/>
          </View> */}

          <View style={styles.view4} >
          <View style={styles.view5}>
           <TouchableOpacity onPress={()=>this.ChangePassword()} >   
          <Text  style={{color:colors.FOREGROUND_DARK}}  >Change password</Text>
          </TouchableOpacity>
        
          </View>
         
          </View>
          </ScrollView>

    
          </Container>


    );
  }





}

function mapStateToProps(state) {
    const { colors } = state;
  
    
    return {
      colors
    };
  }
  
  const connectedPrivacyPage = connect(mapStateToProps)(Privacy);
  export { connectedPrivacyPage as Privacy }; 

const styles = StyleSheet.create({
  container: {
   flex:1,
    backgroundColor: 'white',    
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







