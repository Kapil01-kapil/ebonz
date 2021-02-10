import React, { Component } from "react";
import { StyleSheet, Text, View, Image,Dimensions, Slider } from "react-native";
import Swiper from "react-native-swiper";
import { connect } from "react-redux";
import Video from "react-native-video"
import {Container} from "../../../Components"
const { width } = Dimensions.get('window');
import {
  Header,
  HorizontalList,
  SelectBox,
  TextBox,
  NumberBox,
  Button
} from "../../../Components";

import { ScrollView } from "react-native-gesture-handler";
import { Routes } from "../../../Constants";
import { newpostActions } from "../../../Actions";
import { Loader } from "../../../Components/Loader";

class PostAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: null,
      subcategory: null
    };
  }

  images={};
  videos={};

  onBuffer(res){console.log('On buffer',res);}
  videoError(err){console.log('Video Error',err);}



  onValueChanged = (index, val) => {
    this.setState({ [index]: val });
  };

  setPrice() {
    const {subcategory,dispatch } = this.props;

    var isValid = true;

    var params = {};
    subcategory.parameters.map(parameter => {
      if (parameter.is_required && !this.state[parameter.key]) {
        alert(parameter.name + " is required");
        isValid = false;
        return;
      }
      if (parameter.key === "adtitle") {
        dispatch(newpostActions.addTitle(this.state[parameter.key]))       
      }
     else if ( parameter.key === "description") {
        dispatch(newpostActions.addDescription(this.state[parameter.key]))   
      }
      
      else {
        if (this.state[parameter.key] != undefined) {
          params[parameter.key] = {
            key: parameter.key,
            value: this.state[parameter.key]
          };
          //  params.push({[parameter.key]:{ key: parameter.key, value: this.state[parameter.key] }});
        }
      }
    });
    
    if (isValid)
     {
      dispatch(newpostActions.addParameters(params));
      this.props.navigation.navigate(Routes.SetPrice,{images:this.props.images,videos:this.props.videos});
    }
  }

  
  render() {
    const { subcategory,newPost} = this.props;
console.log('Logging subcategory',subcategory);
console.log(newPost.medias)
    if (subcategory&&newPost.medias) {     
      const medias=newPost.medias;
      const images=[];
      const videos=[];
      let videoExt = ['mp4','3gp']
      let imageExt = ['png', 'jpg', 'jpeg']
     
  //  const keys=   Object.keys(medias);
    console.log('!!!!!!!!!!!!!!!!!!!!!!',newPost.medias)

 const slides=  medias.map((item, i) => {
   const mediaItem= item.data;
   //alert(JSON.stringify(mediaItem));
   const type=mediaItem.fileName.split('.')[1].toLowerCase(); 
  // alert(JSON.stringify(type));   
   let isImage = imageExt.includes(type);
   let isVideo = videoExt.includes(type);
  
   if(isImage)
   {  
     images.push(mediaItem);   
     return (
      <View style={{  width: 300,height:220}} key={i}>
       {/* <View style={{margin:5,width:300}} key={i}> */}
         <Image
           source={{isStatic:true, uri:mediaItem.uri}}
           style={{height: 200, width: 300,resizeMode:'contain'}}
           ></Image>
  {/* <Text>{mediaItem.uri}</Text> */}
         </View>
         );     
   }
   else if(isVideo)
   {  
     videos.push(mediaItem);  
     return (  
          
     <View  style={{  width: 300,height:220}} key={i}>
     <Video source={{isStatic:true,uri: mediaItem.uri}}   // Can be a URL or a local file.                                    
      repeat
      onBuffer={(res)=>this.onBuffer(res)}                // Callback when remote video is buffering
      onError={(err)=>this.videoError(err)}               // Callback when video cannot be loaded      
      resizeMode={"contain"}  style={{aspectRatio: 1, width: "100%"
     }}/>
    </View>);     
   }
   });

   console.log(slides);

    this.images=images;
    this.videos=videos; 

      const controls = subcategory.parameters.map(parameter => {
        switch (parameter.control_type) {
          case "BUTTON_LIST":
            return (             

              <HorizontalList
                label={parameter.label}
                required={parameter.is_required}
                message={parameter.error_msg}
                data={parameter.values}
                name={parameter.key}
                onSelect={this.onValueChanged}
              />
            );
          case "SELECT":
            return (
              <SelectBox
                label={parameter.label}
                required={parameter.is_required}
                message={parameter.error_msg}
                data={parameter.values}
                name={parameter.key}
                onSelect={this.onValueChanged}
              />
            );
          case "NUMBER":
            return (              
              <NumberBox
                label={parameter.label}
                required={parameter.is_required}
                message={parameter.error_msg}
                name={parameter.key}
                min={parameter.min}
                max={parameter.max}
                onTextChanged={this.onValueChanged}
              />
            );
          case "TEXT":
            return (             
              <TextBox
                label={parameter.label}
                required={parameter.is_required}
                message={parameter.error_msg}
                name={parameter.key}
                min={parameter.min}
                max={parameter.max}
                onTextChanged={this.onValueChanged}
              />
            );
          case "TEXTAREA":
            return (             
              <TextBox
                label={parameter.label}
                required={parameter.is_required}
                message={parameter.error_msg}
                name={parameter.key}
                min={parameter.min}
                max={parameter.max}
                multiline={true}
                onTextChanged={this.onValueChanged}
              />
            );
        }
      });

      return (
        <Container>
       
          <View style={{flex:1}}> 
          <View style={styles.swiper}>    
               {/* <Swiper 
                style={{ height: 200, width: 300 }} 
               >  */}
             <ScrollView horizontal={true}>
               {slides}
               </ScrollView>           
             {/* </Swiper> */}
            </View>
           
              
          
            <View style={{flex:1}}>
            <ScrollView>           
            {controls}
            </ScrollView>
            </View>
            <Button
              onPress={() => {
                this.setPrice();
              }}
              text="NEXT"
            />
          </View>
        </Container>
      );
    } else {
      return (
        <Container>
        <Loader></Loader>
        </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  const { alert, categories, users,newPost } = state;

  return {
    alert,
    category: categories.selectedCategory,
    subcategory: categories.selectedSubCategory,
    userid: users.currentUser.id,
    newPost
  };
}
const connectedSubCategoriesPage = connect(mapStateToProps)(PostAd);
export { connectedSubCategoriesPage as PostAd };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
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
