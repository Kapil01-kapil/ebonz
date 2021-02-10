import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Dimensions,
  AsyncStorage, Linking
} from "react-native";
import Images from "../../../Images";
import { Routes } from "../../../Constants";
import { connect } from "react-redux";
import ImagePicker from "react-native-image-picker";
import { userActions } from "../../../Actions";
import { Container } from "../../../Components";
import Icon from 'react-native-vector-icons/Ionicons';
class ListItem extends Component {
  render() {
    const { icon, text, onPress, color, Photo } = this.props;
    return (

      <View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={onPress}>
            <View style={{
              flex: 1, flexDirection: "row", borderBottomWidth: 1.2, borderRightWidth: 1.2, borderColor: "#282828", borderBottomRightRadius: 18, height: 65,  width:252, bottom: 28,paddingTop:15,
              backgroundColor: '#FF8A65',
              shadowColor: "#000",
              shadowOffset: {
                width: 4,
                height: 4,

              },
              shadowOpacity: 0.32,
              shadowRadius: 5.46,

              elevation: 9,
            }}>

              <View style={{ width: 50, justifyContent: 'center', paddingLeft: 20 }}>

                <Icon color="white" name={icon} size={25} />
              </View>
              <View style={{ width: "100%", justifyContent: "center" }}>
                <Text style={{ color: color }}>{text}</Text>
              </View>

            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = { userImage: Images.users };
  }

  SettingScreen() {
    this.props.navigation.navigate("SettingScreen");
  }

  HelpandSupport() {
    this.props.navigation.navigate("HelpandSupport");
  }

  EditProfile() {
    this.props.navigation.navigate("EditProfile");
  }


  componentDidMount() {
    const { dispatch } = this.props;
    const { user } = this.props;
    if (user) {
      dispatch(userActions.get());
    }
  }

  _navigate(screen) {
    this.props.navigation.navigate(screen);
  }

  render() {
    const { user, colors } = this.props;
    // alert(JSON.stringify(colors));
    if (!user)
      return <View></View>

    return (
      <Container>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, backgroundColor: colors.HEADER }}>

            <ScrollView>
              <View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    //paddingTop: 35,
                    marginBottom: 10,
                    flex: 1
                  }}
                >
                  <View style={{
                    width: "90%", borderBottomWidth: 1, borderColor: "#282828", borderRightWidth: 1, borderBottomRightRadius: 18, paddingLeft: 20, paddingTop: 35, backgroundColor: '#ff8a65', shadowColor: "#000",
                    shadowOffset: {
                      width: 10,
                      height: 10,
                    },
                    shadowOpacity: 0.24,
                    shadowRadius: 5,

                    elevation: 8, zIndex: 1000
                  }}><TouchableOpacity onPress={() => this._navigate(Routes.EditProfile)}>
                      <Image source={{ uri: user.thumbnail }} style={[styles.user, { backgroundColor: colors.BASE_COLOR }]}></Image>
                    </TouchableOpacity>
                    <Text style={{ padding: 10, fontSize: 22, color: colors.FOREGROUND_LIGHT }}>{user.name}</Text></View>
                </View>

                <View style={{ zIndex: 1000, height: 50, width: "90%", position: 'relative' }}>
                  <View style={{ position: 'absolute', top: 5 }}>
                    <ListItem icon="ios-person"
                      text="Edit Profile"
                      onPress={() => this._navigate(Routes.EditProfile)}
                      color={colors.FOREGROUND_LIGHT}
                    /></View>
                </View>
                <View style={{ zIndex: 100, height: 55, width: "90%", position: 'relative' }}>
                  <View style={{ position: 'absolute', top: 5 }}>
                    <ListItem
                      icon="ios-people"
                      text="My Club"
                      onPress={() => this._navigate(Routes.Friends)}
                      color={colors.FOREGROUND_LIGHT}
                    /></View>
                </View>

                <View style={{ zIndex: 10, height: 50, width: "90%", position: 'relative' }}>
                  <View style={{ position: 'absolute', top: 1 }}>
                    <ListItem
                      icon="ios-settings"
                      text="Settings"
                      onPress={() => this._navigate(Routes.SettingScreen)}
                      color={colors.FOREGROUND_LIGHT}
                    /></View>
                </View>

                <View style={{ zIndex: 1, height: 50, width: "90%", position: 'relative' }}>
                  <View style={{ position: 'absolute', top: 1 }}>
                    <ListItem
                      icon="ios-help-circle"
                      text="Help & Support"
                      onPress={() => this._navigate(Routes.HelpandSupport)}
                      color={colors.FOREGROUND_LIGHT}
                    /></View>
                </View>

                <View style={{ zIndex: 1,height:100, width: "90%", position: 'relative',flex:1 }}>
                  <View style={{ position: 'absolute',bottom:65}}>

                    <View>
                    <View style={{ flex:1 }}>

                    <TouchableOpacity onPress={() => Linking.openURL("https://www.vfast.in/verify/product")}>
                      <View style={{ flex: 1, flexDirection: "row", borderBottomWidth: 1, borderRightWidth: 1, borderColor: "#282828", borderBottomRightRadius: 18, height: 60,width:252 }}>

                        <View style={{ padding: 10 }} >
                          <View style={{ width: 70, height: 35, backgroundColor: "#2A292D", justifyContent: "center", flex: 1, alignItems: "center", top: 6 }}>
                            <Image source={Images.vfastLogo} style={{ height: 20, width: 60 }} />
                          </View>
                        </View>

                        <View style={{ padding: 10 }}>
                          <View style={{ justifyContent: "center", paddingLeft: -10, paddingTop: 10 }}>
                            <Text style={{ color: colors.FOREGROUND_LIGHT }}>VFast Products </Text>
                            <Text style={{ color: colors.FOREGROUND_LIGHT, fontSize: 12 }}>coming soon</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                   </View>
                   </View>
                  </View>
                </View>
                </View>

            </ScrollView>
              <View style={{ justifyContent: "flex-end", alignItems: "flex-end", right: 30, bottom: 40 }}><Text style={{ color: colors.FOREGROUND_LIGHT, left: 5, fontSize: 13 }}>Powered By FBIV</Text></View>
          </View>
            {/* <View style={{flex:1,backgroundColor:'rgba(52, 52, 52, 0.8)'}}>

        </View> */}
          </View></Container>
        );
      }
    }
    
function mapStateToProps(state) {
  const {users, colors} = state;
        var user;
      
        user = users.currentUser;
  return {user: user, colors };
      }
      
      const connectedAccountPage = connect(mapStateToProps)(MyAccount);
export {connectedAccountPage as MyAccount};
        
const styles = StyleSheet.create({
          container: {
          flex: 1, backgroundColor: 'transparent'
    
      },
    
  user: {
          height: 100,
         width: 100,
        borderRadius: 100,
      }
    });
    
    
    
    
    
    
    
    
    
// import React, {Component} from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   TouchableHighlight,
//   Modal,
//   Dimensions,
//   AsyncStorage, Linking
// } from "react-native";
// import Images from "../../../Images";
// import { Routes } from "../../../Constants";
// import { connect } from "react-redux";
// import ImagePicker from "react-native-image-picker";
// import { userActions } from "../../../Actions";
// import { Container } from "../../../Components";
// import Icon from 'react-native-vector-icons/Ionicons';
// class ListItem extends Component {
//   render() {
//     const { icon, text, onPress, color, Photo } = this.props;
//     return (

//       <View>
//       <View style={{ flex:1}}>
//         <TouchableOpacity onPress={onPress}>
//           <View style={{ flex: 1, flexDirection: "row", borderBottomWidth:1,borderRightWidth:1,borderColor:"#282828",borderBottomRightRadius: 25,height:50,width:"90%"}}>

//             <View style={{ width: 60 ,justifyContent:'center',paddingLeft:20}}>

//               <Icon color="white" name={icon} size={28} />
//             </View>
//             <View style={{ width: "100%", justifyContent: "center" }}>
//               <Text style={{ color: color,fontSize:16 }}>{text}</Text>
//               </View>

//           </View>
//         </TouchableOpacity>
//       </View>
//       </View>
//         );
//   }
// }

// class MyAccount extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { userImage: Images.users };
//   }

//   SettingScreen() {
//     this.props.navigation.navigate("SettingScreen");
//   }

//   HelpandSupport() {
//     this.props.navigation.navigate("HelpandSupport");
//   }

//   EditProfile() {
//     this.props.navigation.navigate("EditProfile");
//   }


//   componentDidMount() {
//     const { dispatch } = this.props;
//     const { user } = this.props;
//     if (user) {
//       dispatch(userActions.get());
//     }
//   }

//   _navigate(screen) {
//     this.props.navigation.navigate(screen);
//   }

//   render() {
//     const { user, colors } = this.props;
//     // alert(JSON.stringify(colors));
//     if (!user)
//       return <View></View>

//     return (
//       <Container>
//         <View style={{ flex: 1, flexDirection: 'row' }}>
//           <View style={{ flex: 1, backgroundColor: colors.HEADER }}>

//             <ScrollView>
//               <View>
//                 <View
//                   style={{
//                     justifyContent: "center",
//                     alignItems: "flex-start",
//                     paddingTop: 10,
//                     marginBottom:10

//                   }}
//                 >
//                   <View style={{ width: "90%", borderBottomWidth: 1, borderColor:"#282828", borderRightWidth: 1, borderBottomRightRadius: 30, paddingLeft: 20, paddingTop: 20 }}><TouchableOpacity onPress={() => this._navigate(Routes.EditProfile)}>
//                     <Image source={{ uri: user.thumbnail }} style={[styles.user, { backgroundColor: colors.BASE_COLOR }]}></Image>
//                   </TouchableOpacity>
//                     <Text style={{ padding: 10, fontSize: 22, color: colors.FOREGROUND_LIGHT }}>{user.name}</Text></View>
//                 </View>

//                 <ListItem
//                   icon="ios-person"
//                   text="Edit Profile"
//                   onPress={() => this._navigate(Routes.EditProfile)}
//                   color={colors.FOREGROUND_LIGHT}
//                 />
//                 <ListItem
//                   icon="ios-people"
//                   text="My Club"
//                   onPress={() => this._navigate(Routes.Friends)}
//                   color={colors.FOREGROUND_LIGHT}
//                 />

//                 <ListItem
//                   icon="ios-settings"
//                   text="Settings"
//                   onPress={() => this._navigate(Routes.SettingScreen)}
//                   color={colors.FOREGROUND_LIGHT}
//                 />

//                 <ListItem
//                   icon="ios-help-circle"
//                   text="Help & Support"
//                   onPress={() => this._navigate(Routes.HelpandSupport)}
//                   color={colors.FOREGROUND_LIGHT}
//                 />


//                 <View>

//                   <View style={{flex:1 }}>
//                     <TouchableOpacity onPress={() => Linking.openURL("https://www.vfast.in/verify/product")}>
//                       <View style={{ flex: 1, flexDirection: "row", borderBottomWidth:1,borderRightWidth:1,borderColor:"#282828",borderBottomRightRadius: 30,height:70 ,width:"90%"}}>
//                         <View style={{padding:10 }}>
//                         <View style={{  backgroundColor: "#2A292D", justifyContent: "center",flex:1,alignItems:"center",paddingHorizontal:5}}>
//                           <Image source={Images.vfastLogo} style={{ height: 20, width: 60 }} />

//                         </View>
//                         </View>
//                         <View style={{ width: "100%", justifyContent: "center"}}>
//                           <Text style={{ color: colors.FOREGROUND_LIGHT ,fontSize:18}}>VFast Products </Text>
//                           <Text style={{ color: colors.FOREGROUND_LIGHT, fontSize: 12 }}>Coming soon</Text>
//                         </View>
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                 </View>


//               </View>

//             </ScrollView>
//             <View style={{ justifyContent: "flex-end", alignItems: "flex-end", right: 30, bottom: 20 }}><Text style={{ color: colors.FOREGROUND_LIGHT, left: 5, fontSize: 18 }}>Powered by FBIV</Text></View>
//           </View>

//         </View></Container>
//     );
//   }
// }

// function mapStateToProps(state) {
//   const { users, colors } = state;
//   var user;

//   user = users.currentUser;
//   return { user: user, colors };
// }

// const connectedAccountPage = connect(mapStateToProps)(MyAccount);
// export { connectedAccountPage as MyAccount };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, backgroundColor: 'transparent'

//   },

//   user: {
//     height: 100,
//     width: 100,
//     borderRadius: 100,
//   }
// });
