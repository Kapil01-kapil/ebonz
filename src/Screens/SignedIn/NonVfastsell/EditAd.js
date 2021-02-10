import React, { Component } from "react";
import { StyleSheet, Text, View, Image,Dimensions } from "react-native";
import Swiper from "react-native-page-swiper";
import { connect } from "react-redux";
import Video from "react-native-video"
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

class EditAd extends Component {
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
      this.props.navigation.navigate(Routes.SetPrice);
    }
  }

  // setPrice() {
  //   const { category, subcategory, userid } = this.props;
  //   var jsonData = [];
  //   var isValid = true;
  //   jsonData.push({ userId: userid });
  //   jsonData.push({ categoryId: category._id });
  //   jsonData.push({ subcategoryId: subcategory._id });
  //   var params = {};
  //   subcategory.parameters.map(parameter => {
  //     if (parameter.is_required && !this.state[parameter.key]) {
  //       alert(parameter.name + " is required");
  //       isValid = false;
  //       return;
  //     }
  //     if (parameter.key === "adtitle" || parameter.key === "description") {
  //       jsonData.push({ [parameter.key]: this.state[parameter.key] });
  //     } else {
  //       if (this.state[parameter.key] != undefined) {
  //         params[parameter.key] = {
  //           key: parameter.key,
  //           value: this.state[parameter.key]
  //         };
  //         //  params.push({[parameter.key]:{ key: parameter.key, value: this.state[parameter.key] }});
  //       }
  //     }
  //   });
  //   jsonData.push({ images:this.images });
  //   jsonData.push({ videos: this.videos });

  //   jsonData.push({ parameters: JSON.stringify(params) });

  //   const {dispatch}=this.props;
  //   dispatch(newpostActions.addData(params));

  //   if (isValid)
  //     this.props.navigation.navigate(Routes.SetPrice, { data: jsonData });
  // }

  render() {
    const { subcategory,newPost} = this.props;
console.log('Logging subcategory',subcategory);

    if (subcategory&&newPost.medias) {     
      const medias=newPost.medias;
      const images=[];
      const videos=[];
      let videoExt = ['mp4']
      let imageExt = ['png', 'jpg', 'jpeg']
     
   const keys=   Object.keys(medias);
   

 const slides=  keys.map(key => {
   const mediaItem= medias[key].data;
   let isImage = imageExt.includes(mediaItem.uri.split('.')[1].toLowerCase());
   let isVideo = videoExt.includes(mediaItem.uri.split('.')[1].toLowerCase());
   if(isImage)
   {  
     images.push(mediaItem); 
     console.log('MEDIA ITEM',mediaItem); 
     return (
       <View style={{ height: 200, width: "100%" }}>
         <Image
           source={{isStatic:true,uri:mediaItem.uri}}
           style={{ height: 200, width: "100%" }} resizeMode={"cover"}
         ></Image>
       </View>
     );     
   }
   else if(isVideo)
   {  
     videos.push(mediaItem);  
     return (     
     <View style={{ height: 200, flex:1 }} >
     <Video source={{isStatic:true,uri: mediaItem.uri}}   // Can be a URL or a local file.                                    
      repeat
      onBuffer={(res)=>this.onBuffer(res)}                // Callback when remote video is buffering
       onError={(err)=>this.videoError(err)}               // Callback when video cannot be loaded
      
       resizeMode={"cover"}  style={{
         aspectRatio: 1,
         width: "100%"
     }}/>
    </View>);     
   }
   });

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
        <View style={styles.container}>
          {/* <Header
            Text={subcategory.name}
            nav={this.props.navigation}
            backscreen={Routes.SubCategories2}
          /> */}
          <View style={{flex:1}}>        

            <View style={{flex:1,backgroundColor:'black'}}>
               <Swiper style={{ height: 200, width: "100%" }} showsButtons={true}>
              {slides}           
            </Swiper>
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
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>Loading</Text>
        </View>
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
const connectedEditAd = connect(mapStateToProps)(EditAd);
export { connectedEditAd as EditAd };

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
