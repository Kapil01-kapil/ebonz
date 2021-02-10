import React, { Component } from "react";
import { StyleSheet, TextInput,View,Text } from "react-native";
import { connect } from "react-redux";

 class NumberBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: null
    };
  }
  componentDidMount(){this.setState({number:this.props.min})}
  textChanged(text) {
    const { min, max } = this.props;
    //const num=text;
   // alert(text);
    if (min && max) {    
      if ( text <= max) {
        const num=text.replace(/[^0-9]/g, "");
        this.setState({
          number: num
        });
        if (this.props.onTextChanged)
          this.props.onTextChanged(this.props.name, num);
      }
    }
  }
  render() {
    //const {data}=this.props;
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
      
        value={this.state.number}
        onChangeText={val => {
          this.textChanged(val);
        }}
        keyboardType={"number-pad"}
    
        {...this.props}
      /></View>
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

const connectedNumberBox = connect(mapStateToProps)(NumberBox);
export { connectedNumberBox as NumberBox };


