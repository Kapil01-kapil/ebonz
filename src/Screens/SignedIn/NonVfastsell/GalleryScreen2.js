import React, { Component, } from 'react';
import {StyleSheet,Text, View,TouchableOpacity,Image } from 'react-native';
import {Header} from '../../../Components/Header'
import { CameraKitGalleryView } from "react-native-camera-kit";
import { Routes } from '../../../Constants';
import Images from "../../../Images"
import { connect } from 'react-redux';

class GalleryScreen2 extends Component {
  constructor(props) {
    super(props);
    this.state={   
    images:[],
    data:null,
    photo_limit:null
    };  
}



    setPrice()
    {   const {images}=this.state;
    const {photolimit}=this.props;
    if(images.length>=photolimit.min)
    {
        var property=this.state.data;
        property.push({images:this.state.images});      
        this.props.navigation.navigate(Routes.SetPrice,{data:property});
    }
    else {alert('Please select atleast' +photolimit.min+" images");}
    }

     
componentDidMount()
{
  const data = this.props.navigation.getParam('data',"");  
  this.setState({data:data}); 
}

 
  render() {    
     
    return (
    <View style={styles.container}>  

           <Header   Text='Upload Your Photos' nav={this.props.navigation} backscreen={Routes.PostAd}/> 
           <CameraKitGalleryView
  ref={gallery => this.gallery = gallery}
  style={{flex: 1, marginTop: 20}}
  minimumInteritemSpacing={10}
  minimumLineSpacing={10}

  columnCount={3}
  onTapImage={event => {
    // event.nativeEvent.selected - ALL selected images ids
  }}

  selectedImageIcon={Images.car}

/>

            <TouchableOpacity onPress={()=>this.setPrice()} style={styles.Bottom}>                       
            <Text style={{color:'white',fontSize:20}} >Next</Text>
            </TouchableOpacity>
    </View>
   );
  }

}

  
function mapStateToProps(state) {
  const { alert, categories } = state;

  return { alert,photolimit:categories.selectedSubCategory.photo_limit };
}

  const connectedGalleryScreenPage = connect(mapStateToProps)(GalleryScreen2);
  export { connectedGalleryScreenPage as GalleryScreen2 }; 

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
  video: {
    height:250,
    width:250,
   
  
    },

 
 
});







