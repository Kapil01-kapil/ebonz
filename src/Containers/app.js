import React, { Component } from "react";
import { Router, Scene, Actions, Drawer } from "react-native-router-flux";
import {BackHandler,Alert} from "react-native"
import { Splash } from "../Screens";
import {
  LoginScreen,
  RegisterScreen,
  SocialSignUp,
  SocialLogin,
  SetPassword,
  OTPScreen,ForgetPassword
} from "../Screens/SignedOut";
import {
  HomeScreen,
  Notifications,
  LocationScreen,
  SubCategories,
  Categories,
  FindAds,
  Filters,
  MyAccount,
  SettingScreen,
  NotificationScreen,
  Privacy,
  ChangePassword,
  HelpandSupport,
  FAQ,
  EditProfile,
  Favorites,
  MyAds,
  AllChats,
  Chats,
  VfastSell,
  Chat,
  NonVfastsell,
  AddDetails,
  SetPrice,
  SetLocation,
  GalleryScreen,
  SubCategories2,
  PostAd,
  UserInfo, Friends, VfastProducts, QRDetails,MyAdDetail,SearchScreen,SearchResult,TermsConditions,PrivacyPolicy,
  SwiperScreen,CitiesScreen
} from "../Screens/SignedIn";



import { Routes } from "../Constants";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  // handleBackButton = () => {
  //   Alert.alert(
  //       'Exit App',
  //       'Exiting the application?', [{
  //           text: 'Cancel',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel'
  //       }, {
  //           text: 'OK',
  //           onPress: () => BackHandler.exitApp()
  //       }, ], {
  //           cancelable: false
  //       }
  //    )
  //    return true;
  //  } 
  //  componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  // }
  
  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  // }
  render() {
    return (
      <Router navigationBarStyle={{ backgroundColor: '#FF8A65' }} tintColor='white' titleStyle={{color:'white'}}>
        <Scene key="root">
          <Scene
            key={Routes.Splash}
            component={Splash}
            hideNavBar
            initial={true}
          ></Scene>

          {/* PUBLIC ROUTES */}
          <Scene key="Public" hideNavBar>
            <Scene key={Routes.LoginScreen} component={LoginScreen}></Scene>
            <Scene
              key={Routes.RegisterScreen}
              component={RegisterScreen} 
            ></Scene>
            <Scene key={Routes.SocialSignUp} component={SocialSignUp}></Scene>
            <Scene key={Routes.SocialLogin} component={SocialLogin}></Scene>
            <Scene key={Routes.OTPScreen} component={OTPScreen} ></Scene>
            <Scene key={Routes.SetPassword} component={SetPassword}    ></Scene>
            <Scene key={Routes.ForgetPassword} component={ForgetPassword} ></Scene>
          </Scene>
          {/* END PUBLIC ROUTES */}

          {/* PRIVATE ROUTES  */}
          <Scene key="Protected" hideNavBar>
          
          {/* DRAWER  */}         
          <Drawer key="drawer" hideNavBar contentComponent={MyAccount} drawerWidth={280}>
              <Scene key={Routes.HomeScreen} hideNavBar component={HomeScreen}></Scene>
          </Drawer>
          {/* DRAWER  */}

            <Scene key={Routes.NonVfastsell} component={NonVfastsell}  title="What are you offering" hideNavBar={false}></Scene>
            <Scene key={Routes.FindAds} component={FindAds}></Scene>
            <Scene
              key={Routes.SubCategories2}
              component={SubCategories2} hideNavBar={false} title="Subcategories"
            ></Scene>
             <Scene
              key={Routes.SearchScreen}
              component={SearchScreen}
            ></Scene>
             <Scene
              key={Routes.SearchResult}
              component={SearchResult} 
            ></Scene>
            <Scene key={Routes.Filters} component={Filters} hideNavBar={false} title="Filters"></Scene>
            <Scene
              key={Routes.SubCategories}
              component={SubCategories} hideNavBar={false} title="Subcategories"
            ></Scene>
            <Scene key={Routes.Categories} component={Categories} hideNavBar={false} title="All Categories"></Scene>
            <Scene key={Routes.PostAd} component={PostAd} hideNavBar={false} title="Describe your ad"></Scene>
            <Scene key={Routes.SetPrice} component={SetPrice} hideNavBar={false} title="Set price"></Scene>
            <Scene key={Routes.SetLocation} component={SetLocation} hideNavBar={false} title="Post your ad"></Scene>
            <Scene
              key={Routes.GalleryScreen}
              component={GalleryScreen} title="Select photos or videos" hideNavBar={false}
            ></Scene>
            <Scene key={Routes.AddDetails} component={AddDetails} title="Ad Details" hideNavBar={false}></Scene>
            <Scene key={Routes.SwiperScreen} component={SwiperScreen} title="Images" hideNavBar={false}></Scene>
            <Scene key={Routes.AllChats} component={AllChats} title="All Chats" hideNavBar={false}></Scene>
            <Scene key={Routes.Chats} component={Chats} title="Chats" hideNavBar={false}></Scene>
            <Scene key={Routes.VfastSell} component={VfastSell} hideNavBar={false} title="Vfast Sell"></Scene>
            <Scene key={Routes.Favorites} component={Favorites} title="Favorites" hideNavBar={false}></Scene>
            <Scene key={Routes.MyAds} component={MyAds} title="My Ads" hideNavBar={false}></Scene>
            <Scene key={Routes.MyAdDetail} component={MyAdDetail} title="Ad Detail" hideNavBar={false}></Scene>
            <Scene
              key={Routes.Notifications}
              component={Notifications} hideNavBar={false} title="Notifications"
            ></Scene>
            <Scene key={Routes.EditProfile} component={EditProfile} title="Edit Profile" hideNavBar={false}></Scene>
            <Scene key={Routes.Chat} component={Chat} title="Chats" hideNavBar={false}></Scene>
            <Scene key={Routes.UserInfo} component={UserInfo} hideNavBar={false} title="Posted By"></Scene>
            <Scene
              key={Routes.LocationScreen}
              component={LocationScreen} hideNavBar={false} title="Set your Location"
            ></Scene>

            <Scene
              key={Routes.CitiesScreen}
              component={CitiesScreen} hideNavBar={false} title="Cities"
            ></Scene>


            {/* Scenes for My Account Start */}
            <Scene key={Routes.MyAccount} component={MyAccount}></Scene>
            <Scene key={Routes.FAQ} component={FAQ} title="FAQ's" hideNavBar={false}></Scene>
            <Scene key={Routes.Friends} component={Friends} title="Follower & Followings" hideNavBar={false}></Scene>
            <Scene
              key={Routes.HelpandSupport}
              component={HelpandSupport}
              hideNavBar={false} title="Help & Support" ></Scene>
            <Scene key={Routes.Privacy} component={Privacy} title="Privacy" hideNavBar={false}></Scene>
            <Scene
              key={Routes.PrivacyPolicy}
              component={PrivacyPolicy}
              hideNavBar={false} title="Privacy Policy" ></Scene>
               <Scene
              key={Routes.TermsConditions}
              component={TermsConditions}
              hideNavBar={false} title="Terms & Conditions" ></Scene>
            <Scene
              key={Routes.ChangePassword}
              component={ChangePassword}
              hideNavBar={false} title="Change Password" ></Scene>

            <Scene
              key={Routes.SettingScreen}
              component={SettingScreen}
              hideNavBar={false} title="Settings" ></Scene>
            <Scene
              key={Routes.VfastProducts}
              component={VfastProducts}
              hideNavBar={false} title="VFast Products" ></Scene>
            <Scene
              key={Routes.QRDetails}
              component={QRDetails}
              hideNavBar={false} title="Details" ></Scene>
            <Scene
              key={Routes.NotificationScreen}
              component={NotificationScreen}
              title="Notifications" hideNavBar={false} title="Settings"></Scene>
            {/* Scenes for MyAccount End */}


          </Scene>

             {/* END PRIVATE ROUTES  */}
        </Scene>
      </Router>
    );
  }
}