import React, { Component, } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image ,ScrollView} from 'react-native';
import { followActions } from '../../../Actions'
import { connect } from 'react-redux';
import {Routes} from '../../../Constants';
import {Container} from '../../../Components'
class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFollowers: true
    }
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch(followActions.getAll(user.id));
  }
  toggleState(flag) {
    this.setState({ showFollowers: flag });
  }

_onPress(foll){
  
  this.props.navigation.navigate(Routes.UserInfo,{postuser:foll});
}
  render() {
    const { follow,colors } = this.props;
    const listItems = follow && follow.followers && follow.followers.length > 0 && follow.followers.map((foll, i) => {
      return (
        <TouchableOpacity onPress={()=>this._onPress(foll)}>
          <View style={{ flex: 1, flexDirection: 'row', padding: 10, borderColor: colors.BASE_COLOR, borderBottomWidth: 1 }}>
            <Image source={{ uri: foll.profile.thumbnail }} style={{ height: 50, width: 50 }}></Image>
            <View style={{ flex: 3,justifyContent:'center' }} >
              <View style={{padding:10 }}>
                <Text>{foll.profile.name}</Text>               
                </View>
            </View>
          </View>
        </TouchableOpacity>

      );
    })

    const Items = follow && follow.followings && follow.followings.length > 0 && follow.followings.map((foll, i) => {
      return (
        <TouchableOpacity onPress={()=>this._onPress(foll)}>
          <View style={{ flex: 1, flexDirection: 'row', padding: 10, borderColor: colors.BASE_COLOR, borderBottomWidth: 1 }}>
            <Image source={{ uri: foll.profile.thumbnail }} style={{ height: 50, width: 50 }}></Image>
            <View style={{ flex: 3,justifyContent:'center' }} >
              <View style={{padding:10 }}>
                <Text>{foll.profile.name}</Text>               
                </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    )


    return (
      <Container >
        <View style={{  flexDirection: 'row',width:'100%',height:40}}>
         
            <View style={{width:'50%'}}><TouchableOpacity onPress={() => this.toggleState(true)}>
              <View style={{padding:10,backgroundColor:(this.state.showFollowers) ?colors.HEADER:colors.BACKGROUND,width:'100%',height:40,justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:(this.state.showFollowers == true) ?colors.BACKGROUND:colors.HEADER}}>Followers</Text></View>
              </TouchableOpacity></View>
              <View style={{width:'50%'}}><TouchableOpacity onPress={() => this.toggleState(false)}>
            <View style={{padding:10,backgroundColor:(!this.state.showFollowers) ?colors.HEADER:colors.BACKGROUND,width:'100%',height:40,justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:(!this.state.showFollowers) ?colors.BACKGROUND:colors.HEADER}}>Followings</Text></View>
              </TouchableOpacity></View>
          </View>
  
        <ScrollView style={{flex:1}}>
              <View style={{flex:1,padding:10}}>
              {(this.state.showFollowers == true) ? listItems : Items}
             </View>
         </ScrollView>
       
      </Container>

    );
  }

}

function mapStateToProps(state) {
  const { users, follow,colors } = state;
  var user;

  user = users.currentUser;
  console.log('Logging follows', follow);
  return { user: user, follow: follow.follows,colors };
}

const connectedFriendsPage = connect(mapStateToProps)(Friends);
export { connectedFriendsPage as Friends };


const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
     backgroundColor: 'white',    
  }

});







