import React, { Component, } from 'react';
import {Platform,Text, View,PermissionsAndroid, TouchableOpacity} from 'react-native';
import { CameraKitCameraScreen } from "react-native-camera-kit";



export default class QRCodeReader extends Component {
  
constructor(props) {
    super(props);
    // this.state={       
    //      Start_Scanner: false
    //     }
}

  back()
  {
  // this.setState({Start_Scanner:false}); 
   this.props.onClose&&this.props.onClose();  
  }

  onQR_Code_Scan_Done = QR_Code => {
      this.props.onSuccess&&this.props.onSuccess(QR_Code);   
  //  this.setState({ Start_Scanner: false });
  };

  open_QR_Code_Scanner = () => {
    var that = this; 
    if (Platform.OS === "android") {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "Camera App Permission",
              message: "Camera App needs access to your camera "
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            that.setState({ QR_Code_Value: "" });
            that.setState({ Start_Scanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err", err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      //that.setState({ QR_Code_Value: "" });
      that.setState({ Start_Scanner: true });
    }
  }; 

  render() { 
    return (      
        <View style={{ flex: 1 }}>

          <View style={{height:40,width:'100%',backgroundColor:'white',justifyContent:'space-between',alignItems:'center',padding:10,flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>this.back()}>
          <Text style={{color:'#007ACC',fontSize:18}} >Cancel</Text>
          </TouchableOpacity>
          <Text style={{fontSize:18,color:'black',fontWeight:'bold'}} >QR Code</Text>
          <Text></Text>
          </View>
   
          <CameraKitCameraScreen     
            actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
            showFrame={true}
            hideControls={true}  
            scanBarcode={true}
            laserColor={"red"}
            frameColor={"yellow"}   
            cameraOptions={{ratioOverlay:'1:1'}}      
            // heightForScannerFrame = {400}             
            colorForScannerFrame={'red'}
            onReadCode={event =>
            this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
            }
          />
   
        </View>
      );
  }
 }








