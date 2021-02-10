import React, { Component, } from 'react';
import { StyleSheet, View, Slider, Text, Picker, Image,TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { BottomTabNavigater } from '../../../Components/BottomTabNavigater';
import { postActions, locationActions, filterActions } from "../../../Actions";
//import MapView from 'react-native-maps';
import { Header } from '../../../Components/Header';
import Images from "../../../Images";
import { ScrollView } from 'react-native-gesture-handler';
import { Routes } from '../../../Constants';

class LocationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch(locationActions.getStates());
   
  }


  onStateChanged(id)
  {
    this.props.navigation.navigate(Routes.CitiesScreen,{stateId:id})
  }


  render() {
    const { colors, states } = this.props;

    console.log("StateList:", states);
    const stateList = states && states.length > 0 && states.map(item => { return <TouchableOpacity onPress={()=>this.onStateChanged(item.id)}><View style={{ height: 30, width: "100%", flexDirection: "row", borderBottomColor: colors.FOREGROUND_DARK, borderBottomWidth: 1 }}><View style={{ justifyContent: 'center', alignItems: "flex-start" }}><Text>{item.name}</Text></View><View style={{ justifyContent: "center", alignItems: 'flex-end', flex: 1 ,right:10}}><Image source={Images.next} style={styles.img1} /></View></View></TouchableOpacity>
  })
    return (
      <View style={styles.container}>
        <View style={{ paddingVertical: 10}}>
          <View style={{paddingLeft:10}}>
            <Text style={[styles.text, { color: colors.FOREGROUND_DARK }]}>Select State</Text></View>

          <View style={{ paddingLeft: 10 }}><ScrollView>{stateList}</ScrollView></View>
        </View>
    

     


      </View>

    );
  }

}

function mapStateToProps(state) {
  const { alert, categories, colors, locations, filters, users } = state;

  return {
    alert, categories: categories.all, colors, states: locations.states, cities: locations.cities, user: users.currentUser, filters: filters.filters
  };
}

const connectedLocationScreenPage = connect(mapStateToProps)(LocationScreen);
export { connectedLocationScreenPage as LocationScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  view: {
    height: 40,
    width: '100%',
    borderBottomWidth: .5,
    borderBottomColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text1: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black'
  },
  scene: {
    flex: 1,


  },

  img1: {
    height: 10,
    width: 10,


  },

  map: {
    height: 400,
    padding: 10,
    width: '100%',
  },

});







