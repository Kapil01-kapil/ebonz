import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image,ScrollView } from "react-native";
import {Header,Container} from '../../../Components'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import Images from "../../../Images";
import { categoryActions } from "../../../Actions";
import { Routes } from "../../../Constants";


class SubCategories extends Component {
  constructor(props) {
    super(props);   
  }

  navigateToPosts(id) {
    const { dispatch } = this.props;        
    dispatch(categoryActions.selectSubcategory(id)); 
    this.props.navigation.navigate(Routes.FindAds);
  }

  render() {
    const {category,colors}=this.props;
    if (category) {
      var list = category.subcategories; 
      const name = category.name;
      const listItems = list.map((subcategory, i) => {
        return (
          <View style={{ padding: 10 }} key={i}>
            <TouchableOpacity
              onPress={() => this.navigateToPosts(subcategory._id)}
            >
             <View
                style={{
                  flexDirection: "row",
                  width: "100%",           
                  justifyContent: "space-between",
                  paddingBottom:5,
                  paddingTop:0,
                  borderBottomColor: colors.BASE_COLOR,
                  borderBottomWidth: 1
                }}
              >
                <Text style={{ color: colors.FOREGROUND_DARK }}>{subcategory.name}</Text>
                <View>  
          <Icon  color={colors.FOREGROUND_DARK} name="ios-arrow-forward" size={25}/>     
          </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      });  
      return (
        <Container style={{backgroundColor:colors.BACKGROUND}}>
          {/* <Header
            Text={name}
            nav={this.props.navigation}
            backscreen={Routes.HomeScreen}
          /> */}
          <ScrollView>
          {listItems}</ScrollView>
        </Container>
      );
    } else {
      return (
        <Container style={{backgroundColor:colors.BACKGROUND}}>
          <Text>{JSON.stringify(this.props.categories)}</Text>
          </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  const { alert, categories,colors } = state;

  return { alert, category: categories.selectedCategory ,colors};
}
const connectedSubCategoriesPage = connect(mapStateToProps)(SubCategories);
export { connectedSubCategoriesPage as SubCategories };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  Bottom: {
    height: 40,
    width: "100%",
    backgroundColor: "#007ACC",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },
  img1: {
    height: 15,
    width: 15,
    resizeMode: "contain"
  },
  text4: {
    fontSize: 20,
    color: "black"
  },
  view4: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    padding: 20,
    alignItems: "center",
    borderBottomColor: "#383838",
    borderBottomWidth: 0.5
  }
});
