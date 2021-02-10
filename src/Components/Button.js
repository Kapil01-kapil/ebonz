import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";

  class Button extends Component {
  render() {
    const {colors}=this.props;
    return ( 
       <View style={{padding:10}}> 
      <TouchableOpacity onPress={this.props.onPress}   
      style={[
      styles.button,{ backgroundColor:colors.HEADER}
      ]}>        
      
    <Text style={{ color:colors.FOREGROUND_LIGHT,fontSize:20 }}>{this.props.text}</Text>
        
      </TouchableOpacity>
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

const connectedButton= connect(mapStateToProps)(Button);
export { connectedButton as Button };


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
