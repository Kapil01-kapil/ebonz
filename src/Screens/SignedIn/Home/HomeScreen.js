import React, { Component } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  KeyboardAvoidingView
} from "react-native";
import Images from "../../../Images";
import { BottomTabNavigater } from "../../../Components/BottomTabNavigater.js";
import { categoryActions, userActions, postActions,suggestionActions,notificationActions,favoriteActions } from "../../../Actions";
import { CardView, QRCodeReader } from "../../../Components";
import { BackHandler, Alert } from "react-native"
import { ScrollView } from "react-native-gesture-handler";
import { Routes } from "../../../Constants";
import { Actions } from "react-native-router-flux";
import { Container, SearchItem } from "../../../Components"
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from "react-native-firebase";
import { Loader, PostDone } from "../../../Components";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      Categories: [],
      modalShow: false,
      searchVisible: false,
      text: "",
      search: "",
      ImageSource: "",
      QR_Code_Value: "",
      Start_Scanner: false,
      properties: [],
      SelectedId: null
    };

  }
  NotificationTypes = {
    POST_VERIFIED: 'POST_VERIFIED',
    FOLLOW_SUCCESS: 'FOLLOW_SUCCESS',
    POST_GETTING_EXPIRED: 'POST_GETTING_EXPIRED',
    POST_REVIEWED: 'POST_REVIEWED',
    POST_LIKED: 'POST_LIKED',
    MESSAGE_MISSED: 'MESSAGE_MISSED',
    NEW_ITEM_ARRIVED: 'NEW_ITEM_ARRIVED'
  }


  handleBackButton = () => {

    if (Actions.currentScene === '_HomeScreen') {
      Alert.alert(
        'Exit App',
        'Exiting the application?', [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }, {
          text: 'OK',
          onPress: () => BackHandler.exitApp()
        },], {
        cancelable: false
      }
      )
      return true;
    }
  }


  _navigate(screen) {

    this.props.navigation.navigate(screen);
  }
  onPlaceHolderPress(SearchScreen) {
    this.props.navigation.navigate(SearchScreen);

  }
  NonVfastSell() {

    _navigate(Routes.NonVfastsell);

  }
  VfastSell() {
    _navigate(Routes.VfastID);
  }

  SubCategories(categoryId) {
    const { dispatch } = this.props;
    dispatch(categoryActions.setSelected(categoryId));
    this.props.navigation.navigate(Routes.SubCategories);
  }
  showPopup(id) {
    this.setState({ SelectedId: id })
    this.interval = setInterval(() =>
      this.setState({ SelectedId: null }), 4000);
    this.clearInterval
  }

  onUnChecked(subcategoryID) {
    
    const { user, dispatch } = this.props;
    if(user)
    {
    const data = {
      userId: user.id,
      subcategoryId: subcategoryID
    }
    console.log("Uncheckeddata:",data)
    dispatch(favoriteActions.removeSubCategory(data));
  }}


  onPress(item) {
    const subcategoryID = item.subcategoryID
    this.props.navigation.navigate(Routes.SearchResult, { title: item.title })
    const { dispatch } = this.props;
    dispatch(postActions.getBySubCategory(subcategoryID));
  }

  onChecked(subcategoryID) {
    
    const { user, dispatch } = this.props;
    console.log("CheckedUser:",user)
    if(user){
    const data = {
      userId: user.id,
      subcategoryId: subcategoryID
    }
    console.log("Checked:",data)
    dispatch(favoriteActions.addSubCategory(data));}
  }

  onPause = () => {

    clearInterval(this.showPopup);
  }

  componentDidMount() {

    const { dispatch } = this.props;
   
    dispatch(categoryActions.categories());
    dispatch(userActions.get());
    dispatch(postActions.getAll());
    this.checkPermission();
    this.messageListener();
    const { user } = this.props;
    if (user) {
      dispatch(notificationActions.getAll(user.id));
      dispatch(favoriteActions.getAll(user.id));
    }


    console.log(user);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);



  }
  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log('Checking permission')
      this.getFcmToken();
    } else {
      this.requestPermission();
    }
  }

  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);

    } else {
      console.log('Failed', 'No token received');
    }
  }

  _textChanged(text) {
    const { dispatch } = this.props;
    if (text != '') {
      dispatch(suggestionActions.getAll(text));
      this.setState({searchVisible: true});
    }else  this.setState({searchVisible: false});
  }

  onLocation(Routes){

    console.log("hello")
    this.props.navigation.navigate(Routes)
  }



  messageListener = async () => {
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      // alert(title, body);
      //  Notification.show();
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body, _data } = notificationOpen.notification;
      console.log('Logging notification data ', notificationOpen);
      alert('Notification Opened 1' + JSON.stringify(_data));
    });

    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { _data } = notificationOpen.notification;
      switch (_data.type) {
        case this.NotificationTypes.POST_VERIFIED:
          this.props.navigation.navigate(Routes.MyAdDetails, { postId: _data.postId })
      }
    }

    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }
  componentWillUnmount() {
    this.notificationListener();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    clearInterval(this.interval);
  }

  render() {
    const HeadingFont = 14;
    const iconsize = 24;

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
      const paddingToBottom = 20;
      return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
    };
    const { categories, posts, colors, notifications, suggestion } = this.props;

    const listItems =
      categories &&
      categories.length > 0 &&
      categories.map((category, i) => {

        // return (
        //   <TouchableWithoutFeedback
        //     onPress={() => this.SubCategories(category._id)} onLongPress={()=>this.showPopup(category._id)}
        //     key={i}
        //   >
        //     <View style={[styles.Products,{flex:1,backgroundColor:colors.BASE_COLOR,borderRadius:50}]}>
        //     {(this.state.SelectedId==category._id)&&<View style={{position:"absolute",bottom:50,backgroundColor:"grey",justifyContent:"center",alignItems:'center',borderRadius:10,padding:3,width:70}}><Text style={{ color: "white",fontSize:10 }} >{category.name}</Text></View>}
        //      <View><Image source={{uri:category.icon}} style={[styles.shadow,{height:45,width:45,resizeMode:'cover',borderRadius:50}]}></Image></View>

        //     </View>
        //   </TouchableWithoutFeedback>
        // );

        
  


        return (
          <TouchableWithoutFeedback
            onPress={() => this.SubCategories(category._id)} key={i}
          >
            <View style={{ alignItems: 'center' }}>
              <View style={[styles.Products, { height: 40, width: 40, backgroundColor: colors.BASE_COLOR, borderRadius: 50 }]}>

                <View>
                  <Image source={{ uri: category.icon }} style={[styles.shadow, { height: 45, width: 45, resizeMode: 'cover', borderRadius: 50 }]}></Image>

                </View>

              </View>
              <Text style={{ color: colors.FOREGROUND_DARK, fontSize: 10, textAlign: "center", width: 60 }} numberOfLines={2}>{category.name}</Text></View>
          </TouchableWithoutFeedback>
        );

      });
    const suggestionItems =
      suggestion &&
      suggestion.length > 0 &&
      suggestion.map((item, i) => {
        return (
          <SearchItem title={item.title} keywords={item.keywords} onPress={() => { this.onPress(item) }} onChecked={() => { this.onChecked(item.subcategoryId) }} onUnChecked={() => { this.onUnChecked(item.subcategoryId) }} />
        );
      });

    return (
   
      <Container style={{ backgroundColor: colors.BACKGROUND}}>
       
        <View style={{
          backgroundColor: colors.HEADER, width: '100%', shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          elevation: 9,
          position:"relative"
        }}>

          <View style={[styles.header, { backgroundColor: colors.HEADER }]}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ width: 40, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                  style={{ left: 5, paddingTop: 5 }}
                  onPress={() => Actions.drawerOpen()}
                >
                  <View style={styles.newview}>
                    <Icon color={colors.FOREGROUND_LIGHT} name="ios-menu" size={25} />

                  </View>
                </TouchableOpacity></View>
              <View style={{ flex: 3 }}>
                <Image source={Images.LogoName} style={styles.Logo} />
              </View>
              <View style={{ width: 30, marginRight: 5, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this._navigate(Routes.Filters)}>
                  <Icon color={colors.FOREGROUND_LIGHT} name="ios-funnel" size={25} />
                </TouchableOpacity>
              </View>

              <View style={{ width: 30, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => this._navigate(Routes.Notifications)}>
                  {notifications && notifications.new && <View style={{ backgroundColor: "red", justifyContent: "center", alignItems: "center", position: "absolute", left: 10, borderRadius: 30, height: 20, width: 20, zIndex: 2 }}>
                    <Text style={{ color: "white", fontSize: 10 }}>{notifications.new}</Text>
                  </View>}
                  <Icon color={colors.FOREGROUND_LIGHT} name="ios-notifications" size={25} />
                </TouchableOpacity>
              </View>

            </View>
          </View>
          <View style={{ backgroundColor: colors.HEADER }}>
            <View
              style={{
                borderColor: colors.BACKGROUND,
                backgroundColor: colors.BACKGROUND,
                borderWidth: 1,
                borderRadius: 2,
                margin: 5,
                height:40,justifyContent:"center"
              }}>
<View style={{ justifyContent: "center", width: "100%", flexDirection: "row" }}>
                  <View style={{justifyContent:"center"}}><Image style={{ width: 18, height: 18, position: "absolute",left:15 }} source={Images.search} /></View>
                  <TextInput
                    style={{ width: '100%', fontSize: 14, textAlign: "center" }}
                    onChangeText={text => {
                      this._textChanged(text);
                    }}
                    placeholder="Find Cars,Mobile Phones and More....."></TextInput>
                 <View style={{justifyContent:"center"}}><TouchableOpacity onPress={()=>this.onLocation(Routes.LocationScreen)}><Icon color={colors.FOREGROUND_DARK} name="ios-pin" size={iconsize} style={{right:15}}/></TouchableOpacity></View>
                </View>

            </View>
          </View>

        </View>

        {this.state.searchVisible&& <TouchableWithoutFeedback onPress={()=>{this.setState({searchVisible:false})}}><View style={{padding:5,position:"absolute",top:95,zIndex:95,width:"100%",shadowColor: "#000",height:'100%',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          elevation: 9,}}>
      <View style={{width:"100%",backgroundColor:colors.BACKGROUND,shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          elevation: 9,}}>
      <ScrollView>
        <View>
        {suggestionItems}
        </View>
      </ScrollView>
      </View>
      </View></TouchableWithoutFeedback>}

        {/* <ScrollView>
          
        </ScrollView> */}

        <ScrollView onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            // alert('');

          }
        }}
          scrollEventThrottle={400}
          style={{ marginBottom: 70,position: "relative" }}
        >

{/* <View style={{ flex: 1 }}>
            {suggestionItems}
          </View> */}


          <View style={{ padding: 2, width: "100%",position: "relative" }}>
            <View style={styles.Categories}>
              <View style={styles.Categories1}>
                <TouchableOpacity
                  onPress={() => this._navigate(Routes.Categories)}
                >
                  <Text style={{ color: colors.FOREGROUND_DARK, fontSize: HeadingFont, fontWeight: "bold" }}>See All</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.Pro}>
                {listItems ? <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  <View style={{ flexDirection: "row", flex: 1 }}>{listItems}</View>
                </ScrollView> : <Loader size="small"></Loader>}
              </View>
            </View>
            {/* <View style={{paddingVertical:5}}>
              <TouchableOpacity    onPress={() => this._navigate(Routes.VfastSell)}>
                <View style={{paddingVertical:5,marginHorizontal:2, backgroundColor:colors.HEADER,justifyContent:'center',alignItems:'center',borderRadius:2}}>
                  <Text style={{color:'white'}}>Sell on VFAST</Text>
                </View>
              </TouchableOpacity>
            </View> */}
            <Text style={{ color: colors.FOREGROUND_DARK, marginLeft: 5, fontSize: HeadingFont, fontWeight: "bold" }}>Recent Nearby</Text>
            <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
              {/* { postItems?postItems:<Loader size="small"></Loader>} */}

              <FlatList
                data={posts}
                renderItem={(post, i) => <CardView data={post.item} key={i} {...this.props} />
                }
                keyExtractor={post => post._id}
                numColumns={2}
              />
            </View>
          </View>

         
        </ScrollView>
       
       <BottomTabNavigater {...this.props} />
        </Container>
        
    );
  }
}

function mapStateToProps(state) {
  const { alert, categories, posts, colors, notifications, suggestions,users } = state;

  return { alert, categories: categories.all, posts: posts.posts, colors, notifications, suggestion: suggestions.suggestions,user: users.currentUser };
}

const connectedHomeScreen = connect(mapStateToProps)(HomeScreen);
export { connectedHomeScreen as HomeScreen };

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 45,

  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  Categories: {
    padding: 5,
    flexDirection: "column",
    width: "100%",
    borderRadius: 2
  },


  Products: {
    //   paddingHorizontal: 10,
    //  paddingVertical:5,
    //  borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",

    marginRight: 5,
    marginTop: 5,
    marginBottom: 2,
    shadowColor: "#8F979A",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },

  Pro: {
    flexDirection: "row",
    width: "100%"
  },
  Categories1: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },

  Cattext: {
    color: "black",
    fontSize: 18,
    marginLeft: 5
  },
  Logo: {
    height: 55,
    width: 100,
    resizeMode: "contain"
  },
newview: {
    height: 30,
    width: 30,
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
  },


  img: {

    height: 25,
    width: 25,

    resizeMode: "contain"
  }
});
