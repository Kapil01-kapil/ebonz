import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text,ActivityIndicator } from "react-native";
import { connect } from "react-redux";

  class Loader extends Component {
  render() {
    const {colors}=this.props;
    return ( 
      <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>  
      <ActivityIndicator size={this.props.size} color={colors.BASE_COLOR} />
    </View>
    );
  }
}
function mapStateToProps(state) {
  const { colors } = state;
  return {
    colors
  };
}

const connectedLoader= connect(mapStateToProps)(Loader);
export { connectedLoader as Loader };


const styles = StyleSheet.create({
  button: {
    paddingHorizontal:20,
    paddingVertical:8,       
     borderRadius:5,        
     justifyContent:'center',
     alignItems:'center',
     
     shadowColor: "#000",
     shadowOffset: {
         width: 0,
         height: 1,
     },
     shadowOpacity: 0.22,
     shadowRadius: 2.22,
     
     elevation: 3,
  }
});
