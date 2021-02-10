import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  AppRegistry
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Swiper from 'react-native-swiper';
import Video from "react-native-video";
import {Container} from '../../../Components';
import { connect } from "react-redux";
import { postActions} from "../../../Actions";
import { Routes } from "../../../Constants";
const iconsize = 30;
const iconcolor = "red";

class MyAdDetail extends Component {
  constructor(props) {
    super(props);
    this.controls = Video;
    this.state = {
      index: 0,
      visible: false,
      isLiked: false,
      postdata: null,
      review:""
    };
  }
  componentDidMount() {
    const data = this.props.navigation.getParam("data", "");
    this.setState({ postdata: data });

    const {dispatch,user}=this.props; 
    dispatch(postActions.getReviews(user.id,data._id))
  }

  HomeScreen() {
    this.props.navigation.navigate("HomeScreen");
  } 

  onCancel() {
    console.log("CANCEL");
    this.setState({ visible: false });
  }
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  onSwiperPress(Routes){
    console.log("hello");
    this.props.navigation.navigate(Routes,{ postdata: this.state.postdata })
    
   
     }
     
  render() {
    const { postdata } = this.state;
    const {reviews,colors}=this.props;
   console.log(reviews);
    if (postdata) {
      console.log(postdata.user);


      const parameters = postdata.parameters;
      details =
        parameters &&
        Object.keys(parameters).map((key, i) => {
          return (
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '100%',
              }}
              key={i}>
              <Text
                style={{
                  color: colors.FOREGROUND_DARK,
                  width: '45%',
                  textTransform: 'capitalize',
                }}>
                {key}
              </Text>
              <Text style={{width: '10%', color: colors.FOREGROUND_DARK}}>:</Text>
              <Text style={{color: colors.FOREGROUND_DARK, width: '45%'}}>
                {parameters[key]}
              </Text>
            </View>
          );
        });

      slides = postdata.images.map((image, i) => {
        return (
          <View style={{  width: '100%'}} key={i}>
          <TouchableOpacity onPress={()=>this.onSwiperPress(Routes.SwiperScreen,)}>
          <Image
            source={{uri: image.url}}
            style={{height: 200,resizeMode:'contain', width: '100%'}}
            ></Image></TouchableOpacity>
        </View>
        );
      });
      slides2 =postdata.videos&&postdata.videos.length>0&&postdata.videos.map((video, i) => {
        return (
          <View style={{  flex: 1 }} key={i}>
            <Video
              source={{ uri: video.url }} // Can be a URL or a local file.
              repeat
              onBuffer={res => this.onBuffer(res)} // Callback when remote video is buffering
              onError={err => this.videoError(err)} // Callback when video cannot be loaded
              resizeMode={"contain"}
              style={{
                aspectRatio: 1,
                width: "100%"
              }}
            />
          </View>
        );
      });   
      slides.push(slides2);

    const  reviewList=reviews&&reviews.reviews&&reviews.reviews.length>0&&reviews.reviews.map((review)=>{
       return(  
       <View style={{flex:1,flexDirection:'row',padding:5}}>
        <Image source={{uri:review.userId.profile.thumbnail}} style={{height:30,width:30}}></Image>
       <View style={{flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <View style={{padding:10,flex:1}}>       
         <Text>{review.text}</Text>
         <Text>{review.userId.profile.email}</Text>
         </View>
         <TouchableOpacity style={{width:30}}><View>
                  <Icon
                    color="red"                 
                    name="ios-trash"
                    size={25}
                  /></View></TouchableOpacity>
         </View>
        </View>)
      })

      return (
        <Container style={{backgroundColor: colors.BACKGROUND}}>
          <ScrollView>
            <View style={{padding: 10}}>
              <View>
                <View>
                  <View style={{paddingVertical: 5}}>
                    <Text style={{fontSize: 25,color:colors.FOREGROUND_DARK}}>{postdata.title}</Text>
                  </View>
                  <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:3}}>
                      <Text style={{fontSize: 22, color: colors.HEADER}}>
                    {postdata.price.display_price}
                  </Text>
                  </View> 
                   <View style={{flex: 1, flexDirection: 'row'}}>
                     <View style={{flex:1}}>
                       <TouchableOpacity
                    onPress={() => {
                      Share.open(shareOptions);
                    }}>
                    <Icon
                      style={{marginRight: 10}}
                      color={colors.HEADER}
                      name="ios-share"
                      size={iconsize}
                    />
                  </TouchableOpacity>
                  </View>
                  <View style={{flex:1}}><TouchableOpacity>
                    <Icon
                      color={this.state.isLiked ? colors.HEADER :colors.BASE_COLOR}
                      onPress={() =>
                        this.setState({isLiked: !this.state.isLiked})
                      }
                      name="ios-thumbs-up"
                      size={iconsize}
                    />
                  </TouchableOpacity>
                  </View>
                </View>

                  </View>
                </View>

              
              </View>

              <View style={styles.swiper}>
                  <Swiper
                   //style={{ width: '100%'}}
                    >
                    {slides}
                  </Swiper>
                </View>


              <View
                style={{
                  paddingVertical: 10,            
                  width: '100%',                
                  marginTop: 5,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Icon color={colors.HEADER} name="ios-pin" size={iconsize} />
                <Text style={{fontSize: 16, marginLeft: 10,color:colors.FOREGROUND_DARK}}>
                  {postdata.location.address}
                </Text>
              </View>

              <View style={styles.detail}>
                {/* <Text style={{fontSize: 20, color:colors.FOREGROUND_DARK}}>
                  Description
                </Text> */}
                <Text
                  style={{fontSize: 20, color: colors.FOREGROUND_DARK}}>
                  {postdata.description}
                </Text>
              </View>
              {details && (
                <View >
                  <Text style={{fontSize: 20, color:colors.FOREGROUND_DARK,paddingVertical:10}}>Details</Text>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      width: '100%',
                    }}>
                    <View
                     >
                      {details}
                    </View>
                  </View>
                </View>
              )}       
     
          <View
            style={{
              width: '100%',             
              flexDirection: 'column',
            }}>
          
           
          </View>
          <View  style={styles.detail}>
             <Text style={{color:colors.FOREGROUND_DARK}}>Reviews</Text>
             <View>
{reviewList}
</View>
           </View>
         </View>
         </ScrollView>   
          
        </Container>
      );
   
    
     
    }
    return (
      <View style={styles.container}>
        <Text>Loading.....</Text>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { users,posts,colors } = state;   

  return {
    user: users.currentUser,
    reviews:posts.reviews,
    colors
  };
}

const connectedMyAdDetailPage = connect(mapStateToProps)(MyAdDetail);
export { connectedMyAdDetailPage as MyAdDetail };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFF5"
  },
  scene: {
    flex: 1
  },
  video: {
    height: 250,
    width: "100%",
    resizeMode: "cover"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  },
  pricedetail: {
    paddingVertical: 10,
 flexDirection:'row',
   flex:1,
    backgroundColor: "white",
    padding: 20,
    marginTop: 15
  },
  detail: {
    paddingVertical: 10,
    width:'100%',
    
   
    marginTop: 15
  },
  man: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 1
  },
  map: {
    height: 250,
    marginTop: 20,

    width: "100%"
  },

  swiper: {
    height:200,
 
     shadowColor: "#000",
     shadowOffset: {
       width: 0,
       height: 1,
     },
     shadowOpacity: 0.20,
     shadowRadius: 1.41,
     elevation: 2,
   },
  view1: {
    paddingVertical: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginTop: 10,
    backgroundColor: "white"
  },
  view2: {
    height: 70,
    width: 70,
    backgroundColor: "white",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1
  },

  view3: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 20,
    padding: 10
  },
  text2: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18
  },

  text3: {
    color: "#007ACC"
  },
  header: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    height: 40,
    paddingLeft: 5,
    paddingRight: 5,
    position: "absolute",
    top: 0
  },
  img2: {
    height: 25,
    width: 25
  },
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  }
});


AppRegistry.registerComponent("AddDetails", () => AddDetails);
