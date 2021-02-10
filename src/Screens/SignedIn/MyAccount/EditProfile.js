import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput

} from "react-native";
import Images from "../../../Images";
import { Button, NumberBox, TextBox ,Container} from "../../../Components"
import { connect } from "react-redux";
import ImagePicker from "react-native-image-picker";
import { userActions } from "../../../Actions";
import {TextInputBox} from '../../../Components/TextInputBox'
import { colors } from "../../../Reducers/color.reducer";
import { Loader } from "../../../Components";


class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { userImage: Images.users ,name:"",email:"",mobile:"",aadhar:""};
  }


  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      this.setState({ img: JSON.stringify(response.fileName) });

      if (response.didCancel) {
        console.log("User cancelled photo picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
       
        console.log(response);
        let source = { uri: "data:image/jpeg;base64," + response.data };
        this.setState({
          userImage: source
        });

        const { dispatch, user } = this.props;
        const formdata = new FormData();
        formdata.append('userPhoto',{    uri : response.uri,
          type: 'image/jpeg',
          name: response.uri})
        const data={id:user.id,data:formdata}
          console.log(data);
        dispatch(userActions.setProfilePicture(data));
      }
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { user } = this.props;
    if (user) {
      dispatch(userActions.get());
    }
    this.setState({
      name:user.name,
      email:user.email,
      mobile:user.phone,
      aadhar:user.aadhar,
      userImage: user.thumbnail
    
      
    })
  }

  onPress(){
    const {user}=this.props;
    const {name,email,mobile,aadhar}=this.state;
    const userInfo={userId:user.id,name,email,mobile,aadhar}
    console.log("SaveChanges:",userInfo)
    const { dispatch } = this.props;
         if (userInfo) {
             dispatch(userActions.update(userInfo));              
         }
       

  }
  _navigate(screen) {
    this.props.navigation.navigate(screen);
  }

  render() {
    const { user } = this.props;
    if(!user)
    return   <Container><Loader></Loader></Container>
    return (
      <Container>
        <ScrollView>
          <View>
            <View
              style={{
                justifyContent: "center",
                padding: 20, flex: 1, flexDirection: 'row'
              }}
            >
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.selectPhotoTapped();
                  }}
                >
                  <Image source={{uri:user.thumbnail}} style={styles.user}></Image>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 2, justifyContent: 'center' }}>
                <Button text="Upload Photo" onPress={() => {
                  this.selectPhotoTapped();
                }} />
              </View>

             </View>

              <View style={{ justifyContent:"space-between",padding:10}}>
              
               
                  <TextInputBox
                    style={{borderBottomColor: colors.FOREGROUND_DARK, borderBottomWidth: 1,width:'100%' }}
                    placeholder="Enter Name"
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                    placeholderTextColor={colors.FOREGROUND_DARK}
                  ></TextInputBox>
                
              
              
                  <TextInputBox
                    style={{borderBottomColor:  colors.FOREGROUND_DARK, borderBottomWidth: 1,width:'100%' }}
                    placeholder="Enter Aadhar Number"
                    onChangeText={(aadhar) => this.setState({aadhar})}
                    value={this.state.aadhar}
                    placeholderTextColor={ colors.FOREGROUND_DARK}
                  ></TextInputBox>
                
              
                  <TextInputBox
                    style={{borderBottomColor: colors.FOREGROUND_DARK, borderBottomWidth: 1,width:'100%' }}
                    placeholder="Phone Number"
                    onChangeText={(mobile) => this.setState({mobile})}
                    value={this.state.mobile}
                    placeholderTextColor={ colors.FOREGROUND_DARK}
                  ></TextInputBox>
                

               
                  <TextInputBox
                    style={{borderBottomColor:  colors.FOREGROUND_DARK, borderBottomWidth: 1,width:'100%' }}
                    placeholder="Email Address"
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    placeholderTextColor={ colors.FOREGROUND_DARK}
                  ></TextInputBox>
                
              

            </View>
          </View>
        </ScrollView>
        <View><Button text="Save Changes" onPress={()=>this.onPress()}/></View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { users } = state;
  var user;

  user = users.currentUser;
  return { user: user };
}

const connectedEditProfilePage = connect(mapStateToProps)(EditProfile);
export { connectedEditProfilePage as EditProfile };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },

  user: {
    height: 100,
    width: 100,
    borderRadius: 100,
borderColor:"white",
    borderWidth: 2
  }
});
