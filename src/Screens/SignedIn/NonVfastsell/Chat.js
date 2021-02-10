import React, { Component, } from 'react';
import {StyleSheet,Text, View,ScrollView,TextInput } from 'react-native';
import {Header} from '../../../Components/Header'
import { connect } from 'react-redux';

class Chat extends Component {
  state = {
      }

  render() {    
     
    return (
  
    <View style={styles.container}>   

           <Header   Text='Chat' nav={this.props.navigation} backscreen="AddDetails"/> 
           <ScrollView>           
           </ScrollView>
        </View>

    );
  }

}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    console.log('Logging state from Register Screen');
    console.log(state);
    console.log('Logging state end from Register Screen');
    
    return {
        loggingIn
    };
  }
  
  const connectedChatPage = connect(mapStateToProps)(Chat);
  export { connectedChatPage as Chat }; 

const styles = StyleSheet.create({
  container: {
   flex:1,
    backgroundColor: 'white',    
  },
  Bottom:{

    height:40,
    width:'100%',
    backgroundColor:'#007ACC',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    bottom:0

  },

  view1:  {
      height:40,
      width:140,
      justifyContent:'center',
      alignItems:'center',
      borderColor:'black',
      borderWidth:1,
     
    },
    view11:  {
        height:40,
        width:140,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'black',
        borderWidth:1,
        marginLeft:5
       
      },
    text1:{
        color:'black',
        fontSize:14
    },
    view2:{
        height:40,
        width:80,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'black',
        borderWidth:1,
        
    },
    view22:{
        height:40,
        width:80,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'black',
        borderWidth:1,
        marginLeft:5
        
    },
    view3:{
        height:40,
        width:120,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'black',
        borderWidth:1,
    },
    view33:{
        height:40,
        width:120,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'black',
        borderWidth:1,
        marginLeft:5
    },
    view4:{
        height:40,
        width:120,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'black',
        borderWidth:1
    },

    view44:{
        height:40,
        width:120,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'black',
        borderWidth:1,
        marginLeft:5
    },
    textinput:{
        height:40,
        width:'100%',
        borderColor:'black',
        borderWidth:1,
        marginTop:3
    },
    textinput1:{
        height:80,
        width:'100%',
        textAlign:'left',
        borderColor:'black',
        marginBottom:40,
        borderWidth:1,
        marginTop:3
    }
  
 
});







