import React, { Component, } from 'react';
import {StyleSheet, View,TouchableOpacity,Text,Image} from 'react-native';
import Images from '../Images'
import { connect } from 'react-redux';
class Header extends Component {
 

        back(){
            this.props.nav.navigate(this.props.backscreen);
                }

              


  render() {

    return (
     
        <View style={styles.view}>
        <TouchableOpacity onPress={()=>this.back()}>   
        <Image source={Images.leftarrow} style={styles.img2}/>
        </TouchableOpacity> 
        <Text style={styles.text1} >{this.props.Text}</Text>
        <Text style={styles.text1} ></Text>


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
  
  const connectedHeaderPage = connect(mapStateToProps)(Header);
  export { connectedHeaderPage as Header }; 

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
    width: '100%',
    alignItems: 'center' 
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
  text1:{
    fontSize:20,
    fontWeight:'bold',
    color:'black'
  },
  img2:{
    height:25,width:25
},
  
});







