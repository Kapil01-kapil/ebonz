import React, { Component, Platform } from 'react';
import { connect } from "react-redux";
import { Image, View, AsyncStorage, ImageBackground,StyleSheet,Text,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Container} from "./Container"


class PostDone extends Component {

  render() {
    const { colors } = this.props;  
    return (
        <Container style={{ backgroundColor: colors.BASE_COLOR}}>
     <View style={{flex:1,paddingHorizontal:10,paddingVertical:30}}>
     <View style={[styles.shadow,{flex:1, backgroundColor:colors.HEADER,borderRadius:5,paddingHorizontal:30,paddingVertical:'20%',alignItems:'center'}]}>
       <View>
         <View style={[styles.shadow,styles.circle, {backgroundColor:'#F6997C'}]}>
         <View style={[styles.shadow,styles.circle, {backgroundColor:'#F7A48A'}]}>
         <View style={[styles.shadow,styles.circle, {backgroundColor:'#F8B099'}]}>
        <View style={{height:50,width:50,alignItems:"center",justifyContent:'center'}}>
           <Icon name="ios-checkmark" color='white' size={100} style={{margin:0,padding:0}}></Icon>
        </View> 
         </View>
         </View>
         </View>
     
     </View> 
     <View style={{padding:30}}>
       <Text style={{color:colors.FOREGROUND_LIGHT,fontSize:28}}>Congratulations</Text>
       </View>
       <View style={{paddingBottom:25}}>
       <Text style={{color:colors.FOREGROUND_LIGHT,textAlign:'center',fontSize:16}}>Your new Ad is submitted successfully for verification. Once it gets verified it will be live.</Text>
       </View>
       <TouchableOpacity onPress={this.props.onNext}>
         <View style={[styles.shadow, styles.button,{backgroundColor:colors.HEADER,borderColor:colors.FOREGROUND_LIGHT }]}>
          <Text style={{color:colors.FOREGROUND_LIGHT}}>OK</Text>
        </View>
       </TouchableOpacity>
     </View> 
     </View>
  </Container>
    );
  }
}

function mapStateToProps(state) {
  const {  colors } = state; 
  return {
  colors
  };
}

const connectedPostDoneScreen = connect(mapStateToProps)(PostDone);

export { connectedPostDoneScreen as PostDone };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
circle:{
borderRadius:100,padding:18
},
button:{width:200,paddingVertical:10,borderRadius:3,borderWidth:2
  ,alignItems:'center',justifyContent:'center',},  

  shadow:{shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  
  elevation: 6,}



});
