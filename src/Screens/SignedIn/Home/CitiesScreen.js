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

class CitiesScreen extends Component {
    constructor(props) {
      super(props);
  
      this.state = {}
    }
  
    componentDidMount() {
      const { dispatch, user,cities } = this.props;
      const stateId=this.props.stateId;
      dispatch(locationActions.getCities(stateId));
    }
  
  
    onStateChanged(id)
    {
        this.props.navigation.navigate(Routes.HomeScreen)
    //   console.log("HelloId:",id)
    //   if(id)
    //   {
    //   const {dispatch,cities}=this.props;  
    //    this.setState({selectedState:id}) 
    //   dispatch(locationActions.getCities(id));
    //  if(cities&&cities.length>0)
    //   this.setState({selectedCity:cities[0].id});
    // }
    }
  
  
    render() {

   

        //console.log("StatesId:",Stateid)
       const {cities,colors}=this.props;
       console.log("CitiesList:",cities)
        const citiesList= cities&&cities.length >0&&cities.map(item => {return <TouchableOpacity onPress={()=>this.onStateChanged(item.id)}><View style={{ height: 30, width: "100%", flexDirection: "row", borderBottomColor:colors.FOREGROUND_DARK, borderBottomWidth: 1 }}><View style={{ justifyContent: 'center', alignItems: "flex-start" }}><Text>{item.name}</Text></View></View></TouchableOpacity>})
    //   const { categories, colors, states, cities, filters } = this.props;
  
    //   console.log("StateList:", states);
    //   const stateList = states && states.length > 0 && states.map(item => { return <TouchableOpacity onPress={()=>this.onStateChanged(item.id)}><View style={{ height: 30, width: "100%", flexDirection: "row", backgroundColor: "yellow", borderBottomColor: "grey", borderBottomWidth: 1 }}><View style={{ justifyContent: 'center', alignItems: "flex-start" }}><Text>{item.name}</Text></View><View style={{ justifyContent: "center", alignItems: 'flex-end', flex: 1 ,right:10}}><Image source={Images.next} style={styles.img1} /></View></View></TouchableOpacity> })
      return (

        <View style={styles.container}>
        <View style={{ paddingVertical: 10}}>
          <View style={{paddingLeft:10}}>
            <Text style={[styles.text, { color: colors.FOREGROUND_DARK }]}>Select Cities</Text></View>

          <View style={{ paddingLeft: 10 }}><ScrollView>{citiesList}</ScrollView></View>
        </View>
        {/* <Header   Text='Choose your location' nav={this.props.navigation} backscreen="HomeScreen"/>  */}
        {/* <View style={{padding:10}}> */}
        {/* <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        /> */}

        {/* <Slider
    style={{width: '100%', height: 10,marginTop:40,backgroundColor:'pink'}}
    minimumValue={0}
    maximumValue={1}
    minimumTrackTintColor="#FFFFFF"
    maximumTrackTintColor="#000000"
  /> */}
        {/* </View> */}

        {/* < BottomTabNavigater {...this.props}/> */}


      </View>

  
    //     <View style={styles.container}>
    //       <View style={{ paddingVertical: 10}}>
    //         <View style={{paddingLeft:10}}><Text style={[styles.text, { color: colors.FOREGROUND_DARK }]}>Select State</Text></View>
  
    //         <View style={{ paddingLeft: 10 }}><ScrollView>{stateList}</ScrollView></View>
    //       </View>
    //       {/* <Header   Text='Choose your location' nav={this.props.navigation} backscreen="HomeScreen"/>  */}
    //       {/* <View style={{padding:10}}> */}
    //       {/* <MapView
    //         style={styles.map}
    //         initialRegion={{
    //           latitude: 37.78825,
    //           longitude: -122.4324,
    //           latitudeDelta: 0.0922,
    //           longitudeDelta: 0.0421,
    //         }}
    //       /> */}
  
    //       {/* <Slider
    //   style={{width: '100%', height: 10,marginTop:40,backgroundColor:'pink'}}
    //   minimumValue={0}
    //   maximumValue={1}
    //   minimumTrackTintColor="#FFFFFF"
    //   maximumTrackTintColor="#000000"
    // /> */}
    //       {/* </View> */}
  
    //       {/* < BottomTabNavigater {...this.props}/> */}
  
  
    //     </View>
  
      );
    }
  
  }
  function mapStateToProps(state) {
    const { alert, categories, colors, locations, filters, users } = state;
  
    return {
      alert, categories: categories.all, colors, states: locations.states, cities: locations.cities, user: users.currentUser, filters: filters.filters
    };
  }

  const connectedCitiesScreenPage = connect(mapStateToProps)(CitiesScreen);
export { connectedCitiesScreenPage as CitiesScreen };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    
  
    img1: {
      height: 10,
      width: 10,
  
  
    },
  

  
  });
  