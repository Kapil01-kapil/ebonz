import React, { Component } from "react";
import { StyleSheet, TextInput,View,Text } from "react-native";
import { connect } from "react-redux";
 class TextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }
  textChanged(text) {
    const { min, max } = this.props;
    if (min && max) {
      var len = text.length;
      if (len <= max) {
        this.setState({
          text: text
        });
        if (this.props.onTextChanged)
          this.props.onTextChanged(this.props.name, text);
      }
    }
  }

  render() {
    const {label,required,message,min,max,colors}=this.props;
    return (
      <View style={{ padding: 10 }}>
      <Text style={{color:colors.FOREGROUND_DARK}}>
        {label}
        {required ? "*" : ""}
      </Text>
      {/* <Text>{message}</Text> */}
      <View style={{ borderColor:colors.HEADER, borderWidth: 1,marginTop:3,borderRadius:3}}>
      <TextInput         
        onChangeText={val => {
          this.textChanged(val);
        }}
        value={this.state.text}
        {...this.props}
      /> 
       </View>
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

const connectedTextBox = connect(mapStateToProps)(TextBox);
export { connectedTextBox as TextBox };



const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "black",
    width: "100%",
    alignItems: "center"
  }
});
