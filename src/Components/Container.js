import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from 'react-redux';
 class Container extends Component {
  render() {
    const {colors}=this.props;
    return <View style={[styles.container,this.props.style,{backgroundColor:colors.BACKGROUND}]}>{this.props.children}</View>;
  }
}
function mapStateToProps(state) {
  const { colors } = state;    
  return {
   colors
  };
}
const connectedContainer = connect(mapStateToProps)(Container);
export { connectedContainer as Container };

const styles = StyleSheet.create({
  container: {
    
    height: "100%",   
    width: "100%",

  }
});