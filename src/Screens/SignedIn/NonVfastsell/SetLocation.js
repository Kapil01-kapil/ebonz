import React, { Component, } from 'react';
import {StyleSheet, View,ToastAndroid,Platform,Text,Modal } from 'react-native';
import {Header,Button,Container,PostDone} from '../../../Components'
import DocumentPicker from 'react-native-document-picker';
import { connect } from 'react-redux';
import GetLocation from 'react-native-get-location'
import {postActions, newpostActions} from "../../../Actions"
import { Routes } from '../../../Constants';
import { Loader } from '../../../Components/Loader';
import { postService } from '../../../Services';
class SetLocation extends Component {
constructor(props) {
    super(props);
    this.maxLength = 70;
    this.state={
    textLength: 0,num:0, longitude: '77.2797049',
    latitude: '28.6604983',data:null,  modalVisible: false,
    };   
}


setModalVisible(visible) {
  this.setState({modalVisible: visible});
}
componentDidMount(){   
  this.currentLocation();  
}
currentLocation()
{
  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
  .then(location => {    
    this.setState({latitude:location.latitude,longitude:location.longitude}) 
  })
  .catch(error => {
    const { code, message } = error;
    console.warn(code, message);
    alert('Error in get location');
  })
}
onPostAd(){
  // try{
   
  const {latitude,longitude}=this.state;
  const {images,videos}=this.props;

  const {dispatch,categoryId,subcategoryId,user,newPost} =this.props;  
 // alert(JSON.stringify(newPost));
console.log('New posts : ',JSON.stringify(newPost));
  const formdata = new FormData();
  formdata.append('userId',user.id);  
  formdata.append('categoryId',categoryId);  
  formdata.append('subcategoryId',subcategoryId); 
  formdata.append('title',newPost.title); 
  formdata.append('description',newPost.description); 
  formdata.append('price',newPost.price); 
  formdata.append('parameters',JSON.stringify(newPost.parameters)); 
  newPost.images&&  newPost.images.map(image=>{  
 image&&formdata.append('images', {
    uri : image.data.uri,
    type: 'image/jpeg',
    name: image.data.fileName
    });})
    newPost.videos&&newPost.videos.map(video=>{
     video&&
      formdata.append('videos', {
      uri : video.data.uri,
      type: 'video/mp4',
      name: video.data.fileName
      })})
  formdata.append('location',JSON.stringify({
    latitude:latitude,
    longitude:longitude}));

    console.log('Logging formdata :', JSON.stringify(formdata));
  postService.addPost(formdata);
// dispatch(newpostActions.add(formdata));
    this.setModalVisible(true);


//   }
//   catch(err)
//   {
//     console.log(err);
//     alert('Something went wrong');
// }
}

onOKPress(){
 
  console.log('OK Pressed')
  this.setModalVisible(!this.state.modalVisible)
  const {dispatch}=this.props;
  dispatch(newpostActions.clear());
  this.props.navigation.navigate('HomeScreen'); 
}

 onUploadReport(){
  try {
    const res =  DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    });
    console.log(
      res.uri,
      res.type, // mime type
      res.name,
      res.size
    );
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
}

  render() {   
    const {newPost} =this.props;
  //   if(newPost.loading==true)
  //  return( <Container>
  //    <Text>Compressing resources</Text>
  //    <Loader></Loader>
  //    </Container>)
  //  else
    return (
    <Container> 
    <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            //this.props.navigation.navigate('HomeScreen'); 
            Alert.alert('Modal has been closed.');
          }}>
          <View>
            <PostDone onNext={()=>this.onOKPress()}></PostDone>
          </View>
        </Modal>  
    <Button onPress={()=>this.onPostAd()}  text="Post Now" {...this.props}  style={styles.Bottom}/>
 
    </Container>

    );
  }

}

function mapStateToProps(state) {   
    // const {currentUser}=state.users;   
    // return {
    //   currentUser
    // };

    const { alert, categories, users,newPost } = state;

    return {
      alert,
      categoryId: categories.selectedCategory._id,
      subcategoryId: categories.selectedSubCategory._id,
      user: users.currentUser,
      newPost
    };
  }
  
  const connectedsetLocationPage = connect(mapStateToProps)(SetLocation);
  export { connectedsetLocationPage as SetLocation }; 

const styles = StyleSheet.create({
  container: {
   flex:1,
    backgroundColor: 'white',    
  },
  Bottom:{

    height:40,
    width:'100%',
    backgroundColor:'#007ACC',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    bottom:0

  },
  searchbar: {
    width: "100%",
   height:25,
   justifyContent:'center',
   backgroundColor:"#FBFBFB",
   alignItems:'center',
   borderBottomColor: 'transparent',
   borderTopColor: 'transparent'
   
},
searchcontainer: {
  backgroundColor: 'white',
  width:'100%',
borderWidth: 0, //no effect
height:25,
shadowColor: 'white', //no effect
borderBottomColor: 'transparent',
borderTopColor: 'transparent'
} 
});







