import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image,ScrollView,PermissionsAndroid,NativeModules,FlatList } from "react-native";
import { Container } from "../../../Components";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import {ImagePicker} from "react-native-image-picker";
import { Routes } from "../../../Constants";
import { newpostActions } from "../../../Actions/newpost.actions";
import { Loader } from "../../../Components/Loader";
var MultiImagePicker = NativeModules.ImageCropPicker;
const iconsize = 50;
const iconcolor = "black";

class MediaItem extends Component {
  constructor(props)
  {
    super(props);
    this.state={checked:false}
  }
  componentDidMount()
  {  
    // const {id,data,type} = this.props;
    // console.log('Type on mount',type);
    // this.onPress(id,data.node.image,type)
  }

 


onPress(id,item,type){
  const {checked}=this.state;
  if(checked)  
  this.props.onUnChecked(id,type);
  else 
  this.props.onChecked(id,item,type);
  this.setState({checked:!checked});
}

  render() {
    const {id,data,type,checkedColor} = this.props;
    const {checked}=this.state;
    return (
      <View style={{width:'33%',height:120}}>        
      <View style={{margin:3}}>
      <TouchableOpacity onPress={()=>{this.onPress(id,data.node.image,type)}}>      
       <View>
         <Image 
         style={{
           width: '100%',
           height: '100%',
         }}
         source={{ uri: data.node.image.uri }}
       /> 
       {(type=='video')&&
       <View style={{position:'absolute',paddingTop:30,paddingLeft:40}}>
       <Icon name="ios-play" color="white" size={60}></Icon>
       </View>}
       {checked&&
       <View style={ {position:'absolute',top:5,right:10}}>
         <View style={[{paddingHorizontal:10,paddingVertical:2,backgroundColor:checkedColor,borderRadius:20}]}>
       <Icon name="ios-checkmark" color='white' size={30}></Icon>
       </View></View>}
       </View> 
       </TouchableOpacity>
    </View></View>
    );
  }
}

class GalleryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],   
      videos: [],
      photolimit: { min: 1, max: 10 },
      videolimit: { min: 1, max: 1 },
      assets:[],
      photos:[]
    };
    this.requestCameraPermission();  
    this.requestStoragePermission();  
  }
 
  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'EBON Camera Permission',
          message:
            'EBON needs access to your camera ' ,          
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  async requestStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'EBON Storage Permission',
          message:
            'EBON needs access to your Storage ' ,          
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // CameraRoll.getPhotos({
        //   first: 42,
        //   assetType: 'All',
        //   groupName: "Favorites",
        //   groupTypes: "All"
        // })
        // .then(r => {
        //   console.log('Assets :',JSON.stringify(r))
        //   this.setState({ assets: r.edges });
        // })
        // .catch((err) => {
        //   alert(err);   
        // });

        console.log('Permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }




  pickMultiple() {
    MultiImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false    
    }).then(images => {   
      console.log('IMAGE',images); 
        const assets= images.map(img => {    
          const fileName=img.path.substring(img.path.lastIndexOf("/")+1);        
         const node= {
        type:img.mime,
        image:{
          fileName:fileName,
          uri:img.path,      
          height:img.height,
          width:img.width        
       }};
        console.log(node);

      

      return {node};

             })

             console.log('IMAGE 2',assets); 
         const prevAssets=this.state.assets;
        // prevAssets.concat(assets);  
       
        //  console.log(assets) 
      this.setState({assets:[...prevAssets,...assets]});
           console.log('Logging final assets :::::::',this.state.assets)  
   
    }).catch(error => {
      console.log(error)
    });
  }

  
  pickSingleWithCamera(cropping, mediaType = 'photo') {
    MultiImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,    
      quality:0.5,
      mediaType,    
      storageOptions:{path:'ebonz'}
    }).then(response => {
      console.log(response);
    //  const prevAssets=this.state.assets;
    //  prevAssets.push({ uri: image.path, width: image.width, height: image.height, mime: image.mime });    
    //   this.setState({assets:prevAssets});
    const fileName=response.path.substring(response.path.lastIndexOf("/")+1);;
    const node={
      type:response.mime,       
      image:{ 
      fileName:fileName,
      uri:response.path,     
      height:response.height,
      width:response.width        
    }} 
     const assets= this.state.assets;
     assets.splice(0,0,{node:node}) 
     this.setState({assets:assets})

    }).catch(e => {
     console.log(e)
    });
  }



  Next() {  
    try{
    const {images,photolimit,videos}=this.state;   
  
   const {dispatch}=this.props;
   dispatch(newpostActions.addImages(images));
   dispatch(newpostActions.addVideos(videos));
 

    const medias=[...images,...videos]
    console.log('Here is new post',JSON.stringify(medias));
    dispatch(newpostActions.addMedia(medias));
   
    if (images.length >= photolimit.min) 
    {
      if(videos.length==1)
     {    
     }  
      this.props.navigation.navigate(Routes.NonVfastsell);  
      } 
      else {
        alert("Please select at least" + photolimit.min + " images");
      } 
     }catch(err){console.log('Error occured in compression :',err);}
    }

  launchCamera() {
    ImagePicker.launchCamera(
      {
        mediaType: "photo",        
        quality: 0.4,
        noData:true,
        height:500,
        width:400,
        fileSize:512,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      },
      response => {
  
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          console.log( response);
        } else if (response.customButton) 
        {
          console.log('User tapped custom button: ', response.customButton);
        }
         else { 
          console.log('Image Response ::::',response); 
          
      const node={
        type:response.type,       
        image:{ 
        fileName:response.fileName,
        uri:'file://'+response.path,     
        height:response.height,
        width:response.width        
      }} 
       const assets= this.state.assets;
       assets.splice(0,0,{node:node}) 
       this.setState({assets:assets})
       //this.setState({assets:[...this.state.assets,{node:node}]})
          
       }
      }
    );   
  }

  launchRecorder() {
    ImagePicker.launchCamera(
      {
        mediaType: "video",
        durationLimit:30,     
        storageOptions: {
          skipBackup: true,
          path: 'images',
        }
      },
      response => {
   
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {

          console.log('Video response ::::',response);
          const fileName=response.path.substring(response.path.lastIndexOf("/")+1);;
          const node={
            type:'video/mp4',
            image:{
            fileName:fileName,
            uri:'file://'+response.path,     
            height:response.height&&-1,
            width:response.width &&-1       
          }}    
          const assets= this.state.assets;
          assets.splice(0,0,{node:node}) 
          this.setState({assets:assets})   
            //  this.setState({assets:[...this.state.assets,{node:node}]})
        }
      }
    );
   
  }

  openLibrary(){
    ImagePicker.launchImageLibrary( {
       mediaType: "mixed",     
      noData:true      
    }, (response)  => {
      console.log(response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
       
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
       console.log(response);
       const fileName=response.path.substring(response.path.lastIndexOf("/")+1);;
      const node={
        type:response.type,
        image:{
          fileName:fileName,
          uri:'file://'+response.path,      
          height:response.height,
          width:response.width        
      }} 
      // if(response.type)
      // { 
      //   const type=response.type.split('/')[0];          
      //   this.onMediaItemChecked(response.fileName,node.image,type)
      // }
       const assets= this.state.assets;
       assets.splice(0,0,{node:node}) 
       this.setState({assets:assets})
      }
     
    });
  }

  onMediaItemChecked(id,data,type){
    console.log('This is the type :',type);
    if(type=='video')
    {
     this.setState({videos:[...this.state.videos,{id:id,data:data}]});
    }
    else{
      this.setState({images:[...this.state.images,{id:id,data:data}]});
    }
  }

  onMediaItemUnChecked(id,type)
  {  
    if(type=='video')
    {    
       const newData=this.state.videos.filter(item=>{
        return item.id!=id;
       })
    this.setState({videos:newData}); 
    }
 else
    {    
       const newData=this.state.images.filter(item=>{
        return item.id!=id;
    })
    this.setState({images:newData});
    }
  }

  render() {
    const {colors}=this.props;
    return (
      <Container style={{backgroundColor:colors.BACKGROUND}}>
       
        <View style={{height:40}}>
          <View style={{flex:1,flexDirection:'row'}}>
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{ textAlign: "center",color:colors.FOREGROUND_DARK, fontWeight: "bold" }}>
          {this.state.images.length} Images selected
        </Text>
        </View>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{ textAlign: "center",color:colors.FOREGROUND_DARK,  fontWeight: "bold" }}>
          {this.state.videos.length} Videos selected
        </Text></View>
        </View>
        </View>
        <View style={{ width:'100%', height:70 }}>
        <View style={{ flex: 1, flexDirection: "row",}}>
          <View style={{ flex: 1 ,margin:5}}>
            <TouchableOpacity
              onPress={() => {
                this.pickSingleWithCamera(true);
              }}
            >
              <View
               style={{borderColor:colors.HEADER,
                borderWidth:2,
                borderRadius:50,                
                justifyContent: "center",
                alignItems: "center"
              }}
              >
                <Icon name="ios-camera" size={iconsize} color={colors.HEADER} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1,margin:5 }}>
            <TouchableOpacity
              onPress={() => {
                this.launchRecorder();
              }}
            >
              <View
                style={{borderColor:colors.HEADER,
                  borderWidth:2,
                  borderRadius:50,                
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Icon name="ios-videocam" size={iconsize} color={colors.HEADER} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{flex:1,margin:5}}>
          <TouchableOpacity
            onPress={()=>this.pickMultiple()}>
            <View
              style={{
                borderColor: colors.HEADER,
                borderWidth: 2,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                // backgroundColor: colors.HEADER,
                // height: 40
                paddingVertical:5,
                paddingHorizontal:5
              }}
            >
              <View><Text style={{ color: colors.HEADER, fontSize: 15,textAlign:'center',fontWeight:'bold' }}>Choose from Gallery</Text></View>
            </View>
          </TouchableOpacity>
          </View>
        </View></View>
       

  <View style={{flex:1}}>       
     
         <ScrollView>
         <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>         
       {        
         this.state.assets&&this.state.assets.map((p, i) => {        
         if(p.node.type)
       { 
         const type=p.node.type.split('/')[0];    
        console.log(JSON.stringify(p));
       return (
         <MediaItem type={type} data={p} id={p.node.image.fileName} checkedColor={colors.HEADER} onChecked={(id,data,type)=>this.onMediaItemChecked(id,data,type)} onUnChecked={(id,type)=>this.onMediaItemUnChecked(id,type)}/>
       );
       }
      else return <Loader></Loader>
     })
      }
     </View>
     </ScrollView>
        </View>
        <TouchableOpacity onPress={() => this.Next()} style={[styles.Bottom,{backgroundColor:colors.HEADER}]}>
          <Text style={{ color: "white", fontSize: 20 }}>Next</Text>
        </TouchableOpacity>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { alert,colors } = state;

  return { alert,colors };
}

const connectedGalleryScreenPage = connect(mapStateToProps)(GalleryScreen);
export { connectedGalleryScreenPage as GalleryScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  shadow:{shadowColor: "#fff",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  
  elevation: 4,},
  Bottom: {
    height: 40,
    width: "100%",
    backgroundColor: "#007ACC",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0
  },
  video: {
    height: 250,
    width: 250
  }
});
