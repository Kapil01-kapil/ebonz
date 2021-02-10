import React, { Component, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, AppRegistry,FlatList } from 'react-native';
import { Header } from '../../../Components/Header';
import { postActions,followActions } from '../../../Actions'
import { connect } from 'react-redux';
import { Routes } from '../../../Constants';
import Images from "../../../Images";
import { CardView } from '../../../Components'
import { Loader } from '../../../Components/Loader';


class UserInfo extends Component {
  componentDidMount() {
    const { dispatch, postuser } = this.props;
    dispatch(postActions.getByUserId(postuser._id));
  }

  follow(){
    const { dispatch, postuser,user } = this.props;
   //HERE USERID is MY ID && postuser.id is the friend id
    const data={
      userId:user.id,
      friendId:postuser._id
    }
    console.log(data);
   
    dispatch(followActions.follow(data));
  }

  render() {
    const { postuser, posts } = this.props;
 if(posts&&postuser)
    return (
      <View style={styles.container}>

        <View style={styles.userInfo}>
          <View style={styles.userView}>
            <View style={styles.imageView}>
              <View style={styles.userImage}>
                <Image source={{ uri: postuser.profile.profilePhoto }} style={styles.image} />
              </View>
            </View>
            <View style={styles.buttonView}>
              <View style={styles.dataView} >
                <View style={styles.followingView}>

                  <View style={styles.followingInfo}><Text style={styles.numFollowing}>{(postuser.profile.followings) ? postuser.profile.followings : 0}</Text><Text style={styles.followingText}>FOLLOWING</Text>
                  </View>

                  <View style={styles.followersInfo}><Text style={styles.numFollowers}>{(postuser.profile.followers) ? postuser.profile.followers : 0}</Text><Text style={styles.followersText}>FOLLOWERS</Text>
                  </View>
                </View>
                <View style={{ paddingTop: 10 }}>
                  <TouchableOpacity onPress={()=>{this.follow()}}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Follow</Text>
                  </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.userName}><Text style={styles.userText}>{postuser.profile.name}</Text>
            {/* <Text style={styles.memberDate}>Member Since May 2016</Text> */}
          </View>

        </View>
     
     <View style={{flex:1}}>
       <View style={{padding:5}}>
         <Text style={{fontSize:18}}>Published Ads</Text>
       </View>
       <View style={{flex:1}}>
       <ScrollView >
       <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
       <FlatList
               data={posts}
               renderItem={( post ,i) =><CardView data={post.item} key={i} {...this.props} />
}
               keyExtractor={post => post._id}
               numColumns={2}
              />
            </View>
       </ScrollView></View>
     </View>  
     
     
      </View>
    );
    else return <Loader></Loader>
  }
};


function mapStateToProps(state) {
  const { posts ,users} = state;
  var user;
  user = users.currentUser;
  return {
   user:user,
    posts: posts.userPosts
  };
}

const connectedUserInfoPage = connect(mapStateToProps)(UserInfo);
export { connectedUserInfoPage as UserInfo };
const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: "white"
  },
  userInfo: {
   height:220,
  
    borderBottomColor: '#FF8A65',
    borderBottomWidth: 5,
  },
  buttonView: {
    flexDirection: "column",
    width: '70%',
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  dataView: {
    flexDirection: "column",
    height: 100,
    width: '100%',
    paddingTop: 10
  },
  followingView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  followingInfo: {
    paddingRight: 10,
    borderRightColor: "grey",
    borderRightWidth: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  followersInfo: {
    paddingLeft: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  numFollowing: {
    fontSize: 20,
    fontWeight: "bold"
  },

  followingText: {
    fontSize: 15
  },
  numFollowers: {
    fontSize: 20,
    fontWeight: "bold"
  },
  followersText: {
    fontSize: 15
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  cardInnerView: {
    borderColor: "grey",
    height: 220,
    width: 200,
    borderWidth: 1,
    flexDirection: "column",
    padding: 10,
    marginRight: 10
  },
  cardImageView: {
    height: '70%',
    width: '100%'
  },
  cardImage: {
    height: '100%',
    width: '100%'
  },
  userName: {
    height: '40%',
    paddingLeft: 10,
    padding: 10
  },
  userText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  memberDate: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey"
  },
  publishView: {
    justifyContent: "center",
    paddingLeft: 10
  },
  publishText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black"
  },

  lowerView: {
    flex: 5
  },
  viewMore: {
    justifyContent: "center",
    padding: 10
  },
  viewMoreText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "blue"
  },
  cardView: {
    flex: 1,
  //  paddingLeft: 10,
  //  paddingTop: 10,
   // justifyContent: "space-between"
  },
  cardTextView: {
    flexDirection: "row",
    height: '30%',
    width: '100%',
    justifyContent: "space-between"
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  text: {
    paddingLeft: 20,
    paddingTop: 10
  },
  userView: {
    height: '60%',
    flexDirection: "row",

  },
  middleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
 
  button: {
    height: 40,
    width: '100%',
    backgroundColor: '#FF8A65',
    alignItems: "center",
    justifyContent: "center"
  }
  ,
  imageView: {
    width: '30%',
    paddingTop: 30

  },
  userImage: {

    paddingLeft: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: 'center',
    height: 100,
    width: 100
  },
  image: {
    height: 100,
    borderRadius: 50,
    width: 100,
  },

});