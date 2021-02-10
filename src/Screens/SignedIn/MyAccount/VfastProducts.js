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
import { Header, QRCodeReader } from "../../../Components";
import Images from "../../../Images";
import { Routes } from "../../../Constants";

class ListItem extends Component {
  render() {
    const { icon, text, onPress } = this.props;
    return (
      <View style={{ padding: 10, borderColor: '#FF8A65', borderTopWidth: 1 }}>
        <TouchableOpacity onPress={onPress}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ width: 60 }}>
              <Image source={icon} style={{ width: 30, height: 30 }} />
            </View>
            <View style={{ width: "100%", justifyContent: "center" }}>
              <Text style={{ color: '#FF8A65' }}>{text}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class VfastProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      QR_Code_Value: "",
      Start_Scanner: false
    };
  }
  back() {
    this.setState({ Start_Scanner: false });
  }

  onQR_Code_Scan_Done = QR_Code => {
    this.setState({ QR_Code_Value: QR_Code });
    this.setState({ Start_Scanner: false });
  };

  open_QR_Code_Scanner = () => {
    this.setState({ Start_Scanner: true });
  };

  _navigate(screen) {
    this.props.navigation.navigate(screen);
  }

  render() {
    if (this.state.Start_Scanner) {
      return (
        <QRCodeReader
          onSuccess={code => this.onQR_Code_Scan_Done(code)}
          onClose={() => {
            this.setState({ Start_Scanner: false });
          }}
        />
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{ flex: 1,padding:10 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{ alignItems: "center", fontSize: 16, marginTop: 20 }}
              >
                Scan QR code
              </Text>

              <TouchableOpacity onPress={this.open_QR_Code_Scanner}>
                <View style={{ padding: 10 }}>
                  <Image
                    source={Images.qrCode}
                    style={{ height: 60, width: 60 }}
                  ></Image>
                </View>
              </TouchableOpacity>

              <Text style={{ alignItems: "center", fontSize: 16, padding: 10 }}>
                OR
              </Text>
              <Text style={{ alignItems: "center", fontSize: 16, padding: 10 }}>
                Enter VFAST ID
              </Text>
              <View style={{ width: "100%", padding: 5 }}>
                <TextInput
                  style={{ height: 40, borderColor: '#FF8A65', borderWidth: 1,width: "100%" }}
                />
              </View>
            </View>
            <TouchableOpacity>
              <View
                style={{
                  width: "100%",
                  margin:5,
                  height:40,
                  backgroundColor: '#FF8A65',
                  justifyContent:"center",
                  alignItems: "center"
                }}
              >
                <Text style={{ color: "white",fontSize:20 }}>Go</Text>
              </View>
            </TouchableOpacity>
            <View style={{padding:5}}>
           <Text>QR History</Text>
          <ListItem
            icon={Images.qrCode}
            text="IPhone 7"
            
            onPress={() => this._navigate(Routes.QRDetails)}
          />  
          <ListItem
            icon={Images.qrCode}
            text="Swift Dzire"
            onPress={() => this._navigate(Routes.QRDetails)}
          />  
</View>
          
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;

  return { alert };
}

const connectedVfastProductsPage = connect(mapStateToProps)(VfastProducts);
export { connectedVfastProductsPage as VfastProducts };

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    padding:10
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
