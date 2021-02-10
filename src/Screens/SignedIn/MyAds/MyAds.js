import React, { Component, } from 'react';
import {StyleSheet,View,FlatList } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {BottomTabNavigater} from '../../../Components/BottomTabNavigater'
import {Container,MyAdItem} from '../../../Components'
import {postActions} from '../../../Actions'
import { ScrollView } from 'react-native-gesture-handler';
import { Routes } from '../../../Constants';
import { Loader } from "../../../Components/Loader";


class MyAds extends Component {
constructor(props) {
    super(props);
    this.state={posts:[] }
}
componentDidMount(){
  const { dispatch ,user} = this.props;
  dispatch(postActions.getMyPosts(user.id));
}     

  render() {
    const {myposts,colors}=this.props;
     return (
  
      <Container style={{ backgroundColor: colors.BACKGROUND, padding: 0 }}>
          <View style={styles.container}>      
        {myposts?<ScrollView style={{marginBottom:45}}>
          <View style={{width: "100%"}}>
           
          <FlatList
               data={myposts}
               renderItem={(post ,i) =><MyAdItem data={post.item} key={i} {...this.props}/>
                }
              keyExtractor={post => post._id}
        
      />
    
          </View>
          </ScrollView>:<Loader size="small"></Loader>}
           {/* <ScrollView style={{marginBottom:45}}>
          <View style={{width: "100%"}}>
             <View style={{ padding: 5, 
     flexDirection: "column"}}>
            {postItems}
            </View>
          </View>
         </ScrollView>  */}
          < BottomTabNavigater {...this.props}/>

            </View>
</Container>
    );
  }





}

function mapStateToProps(state) {
    const { posts,users,colors } = state;    
    return {
      myposts:posts.myposts,user: users.currentUser,colors
    };
  }
  
  const connectedMyAdsPage = connect(mapStateToProps)(MyAds);
  export { connectedMyAdsPage as MyAds };

const styles = StyleSheet.create({
  container: {
   flex:1,
    backgroundColor: 'white',    
  },
  view:{
    height:40,
    width:'100%',
    borderBottomWidth:.5,
    borderBottomColor:'black',
    justifyContent:'center',
    alignItems:'center'
  },
  text1:{
    fontSize:15,
    fontWeight:'bold',
    color:'black'
  },
  scene: {
    flex: 1,
  
  },
  
});







