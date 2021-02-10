import React, { Component, } from 'react';
import {connect} from "react-redux";
import {StyleSheet,Text, View, TouchableOpacity, Image,ScrollView} from 'react-native';
import Images from '../../../Images'
import {categoryActions} from "../../../Actions"
import {Header,Container} from '../../../Components'
import Icon from 'react-native-vector-icons/Ionicons';
import { Routes } from '../../../Constants';


 class Categories extends Component {
  
constructor(props) {
    super(props);

    this.state={data:'',Categories:[], modalVisible: false,}
}

SubCategories(categoryId)
  {    
    const { dispatch } = this.props;        
    dispatch(categoryActions.setSelected(categoryId));
    this.props.navigation.navigate(Routes.SubCategories);
  }
Home()
{
  this.props.navigation.navigate(Routes.HomeScreen);
}
 
  render() {
   
      const {categories,colors}=this.props;    

      const listItems = categories&&categories.length>0&&categories.map((category,i) => {
        return (
          <View style={{ padding: 10 }} key={i}>
            <TouchableOpacity
              onPress={()=>this.SubCategories(category._id)}
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
                <Text style={{ color: colors.FOREGROUND_DARK }}>{category.name}</Text>
                <View>  
          <Icon  color={colors.FOREGROUND_DARK} name="ios-arrow-forward" size={25}/>     
          </View>
                {/* <Image source={Images.next} style={styles.img1} /> */}
              </View>
            </TouchableOpacity>
          </View>
        );
      });  
      return (
        <Container style={{backgroundColor:colors.BACKGROUND}}>
          {/* <Header
            Text='Categories'
            nav={this.props.navigation}
            backscreen={Routes.HomeScreen}
          /> */}
          <ScrollView>
          {listItems}</ScrollView>
        </Container>
      );
 
    }


  }
function mapStateToProps(state) {
  const {alert,categories,colors } = state;    
  return( 
    {alert,categories: categories.all,colors})
  ;
}

const connectedCategoriesScreen = connect(mapStateToProps)(Categories);
export { connectedCategoriesScreen as Categories };



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




