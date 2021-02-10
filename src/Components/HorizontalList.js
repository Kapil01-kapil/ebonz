import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";

class HorizontalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: -1
    };
  }
  onItemPress(index, val) {
    this.setState({ selectedIndex: index });
    if (this.props.onSelect) this.props.onSelect(this.props.name, val.name);
  }
  render() {
    const { data, label, required, message,colors } = this.props;
    if (!data) return <Text>No data</Text>;
    listItems = data.map((item, i) => (
      <View
        style={{ flexDirection: "row", marginTop: 5, padding: 3 }}
        key={item.key}
      >
        <TouchableOpacity
          style={this.state.selectedIndex == i ? [styles.viewSelect,{backgroundColor:colors.HEADER}] : [styles.view,{borderColor:colors.HEADER}]}
          onPress={() => this.onItemPress(i, item)}
        >
          <Text
            style={
              this.state.selectedIndex == i ? [styles.textSelected,{color:colors.FOREGROUND_LIGHT}] : [styles.text,{color:colors.HEADER}]
            }
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    ));

    return (
      <View style={{ padding: 10 }}>
        <Text style={{color:colors.FOREGROUND_DARK}}>
          {label}
          {required ? " *" : ""}
        </Text>
        {/* <Text>{message}</Text> */}
        <View style={{ flexDirection: "row" }}>
          <ScrollView  showsHorizontalScrollIndicator={false} horizontal={true}>{listItems}</ScrollView>
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

const connectedHeaderPage = connect(mapStateToProps)(HorizontalList);
export { connectedHeaderPage as HorizontalList };

const styles = StyleSheet.create({
 
  viewSelect: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3B5998",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,
    //borderColor: "black",
   // borderWidth: 1
  },
  view: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    //borderColor: "black",
    borderWidth: 1,
    borderRadius:3
  },

  textSelected: {
    color: "white",
    fontSize: 14
  },

  text: {
    color: "black",
    fontSize: 14
  }
});
