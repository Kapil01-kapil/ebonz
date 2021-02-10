import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { Header, QRCodeReader,Container,Button } from "../../../Components";
import Images from "../../../Images";
import { Routes } from "../../../Constants";

class VfastSell extends Component {
  constructor(props) {
    super(props);
    this.state={
    QR_Code_Value: '',
    Start_Scanner: false}
  }
  back()
  {
   this.setState({Start_Scanner:false});
   
  }

  onQR_Code_Scan_Done = QR_Code => {
    this.setState({ QR_Code_Value: QR_Code });
    this.setState({ Start_Scanner: false });
  };

  open_QR_Code_Scanner = () => {
  
      this.setState({ Start_Scanner: true });
   
  }; 

  render() {
    if (this.state.Start_Scanner)
    {
      return <QRCodeReader onSuccess={(code)=>this.onQR_Code_Scan_Done(code)} onClose={()=>{this.setState({Start_Scanner:false})}}/>
   }
    return (
      <Container>
        {/* <Header
          Text="Enter Vfast ID of the product"
          nav={this.props.navigation}
          backscreen={Routes.HomeScreen}
        /> */}
        <View
          style={{  flex: 1 }}
        >
          <View style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={{ alignItems: "center", fontSize: 16,marginTop:20 }}>
            Scan QR code
          </Text>

          <TouchableOpacity onPress={this.open_QR_Code_Scanner}>
            <View style={{padding:10}}>
              <Image
                source={Images.qrCode}
                style={{ height: 100, width: 100 }}
              ></Image>
            </View>
          </TouchableOpacity>
          <Text style={{ alignItems: "center", fontSize: 16,padding:10 }}>OR</Text>
          <Text style={{ alignItems: "center", fontSize: 16,padding:10 }}>
            Enter VFAST ID
          </Text>
         <View style={{width:'100%',padding:20}}>
           <TextInput
           style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}          
           /></View>
</View>
<TouchableOpacity   >
                <View style={{width:'100%',padding:10,marginHorizontal:5,backgroundColor:'#007ACC',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{color:'white'}}>Go</Text>
                </View>
              </TouchableOpacity>

              <Text style={{ textAlign: "center", fontSize: 16,padding:10,marginTop:50 }}>
            Don't have VFast App
          </Text>
              {/* <TouchableOpacity   >
                <View style={{width:'100%',padding:10,marginHorizontal:5,backgroundColor:'#007ACC',justifyContent:'center',alignItems:'center'}}>
                  <Text style={{color:'white'}}>Download Now</Text>
                </View>
              </TouchableOpacity> */}
              <Button text="Download Now"></Button>
        </View>
        
          
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;

  return { alert };
}

const connectedVfastSellPage = connect(mapStateToProps)(VfastSell);
export { connectedVfastSellPage as VfastSell };

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white"
  },

  searchcontainer: {
    backgroundColor: "white",
    width: "100%",
    height: 25,
    borderBottomColor: "transparent",
    borderTopColor: "transparent"
  },
  searchbar: {
    width: "100%",
    height: 25,
    backgroundColor: "#FBFBFB",
    borderBottomColor: "transparent",
    borderTopColor: "transparent"
  },
  card: {
    paddingVertical: 10,
    flexDirection: "row",
    width: "100%",
    marginTop: 5,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5
  },
  logo: {
    height: 150,
    width: "100%",
    resizeMode: "contain"
  },
  like: {
    height: 15,
    width: 15,
    resizeMode: "contain",
    marginTop: 5
  },
  text1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  img2: {
    height: 25,
    width: 25
  }
});
