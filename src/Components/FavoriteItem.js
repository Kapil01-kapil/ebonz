import React, { Component, } from 'react';
import {StyleSheet,View ,TouchableOpacity,TouchableWithoutFeedback,Image,Text} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { favoriteActions } from '../Actions/favorite.actions';
import { Routes } from '../Constants';

class FavoriteItem extends Component {

  _viewAdDetail(post)
  {
this.props.navigation.navigate(Routes.AddDetails,{data:post});
  }

  onRemove(id){
    const { dispatch ,user} = this.props;
       //console.log("GautamPostId:",id) 
       if(user)
        { 
          const data={'userId':user.id,'postId':id};
           dispatch(favoriteActions.remove(data));
          }
          this.setState({isLiked:false}); 
  }

  render() {
    const post = this.props.data;
    console.log("GautamId:",post)
    const {colors}=this.props;
    return (
      <View style={{flex:1,margin:5,borderColor:colors.BASE_COLOR,borderWidth:1}}>
        <TouchableWithoutFeedback  onPress={()=>{this._viewAdDetail(post)}} >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.shadow}>
              <Image source={{ uri: post.thumbnail }} style={styles.image} resizeMode="contain"/>
            </View>
            <View style={{width:'57%',margin:5}}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",paddingHorizontal:10,paddingVertical:8}}>
                 <Text style={{ fontSize: 18,color:colors.FOREGROUND_DARK }} numberOfLines={1}>{post.title}</Text>
               
                <TouchableOpacity onPress={()=>this.onRemove(post._id)}><View style={{height:25,width:25,justifyContent:'center',alignItems:"center"}}><Icon color={colors.FOREGROUND_DARK}
                  name="ios-close"
                  size={30}/></View></TouchableOpacity>
              </View>
              <View style={{paddingHorizontal:10}}>
              <Text style={{ fontSize: 18,color:colors.HEADER }}>{post.price.display_price}</Text>
              <View  >
             <Text style={{color:colors.FOREGROUND_DARK,fontSize:16}}>Likes :{post.likes?post.likes:0}</Text>
             <Text style={{color:colors.FOREGROUND_DARK,fontSize:16}}>Reviews :{post.reviews?post.reviews:0}</Text>
             <Text style={{color:colors.FOREGROUND_DARK,fontSize:16}}>Images :{post.images.length}</Text>
             <Text style={{color:colors.FOREGROUND_DARK,fontSize:16}}>Videos :{post.videos.length}</Text>
              </View></View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}


function mapStateToProps(state) {
    const { posts,users,colors } = state;    
    return {
      myposts:posts.myposts,user: users.currentUser,colors
    };
  }
  
  const connectedMyAdsPage = connect(mapStateToProps)(FavoriteItem);
  export { connectedMyAdsPage as FavoriteItem };

const styles = StyleSheet.create({
    shadow:{
         backgroundColor:'white',
    width: '40%',
    //   borderRadius:5,  
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,},
  image: {
    width:'100%',height:170,
  //  borderRadius:5,    
  
  },
  
  
});













// import React, { Component, } from 'react';
// import {StyleSheet,View ,TouchableOpacity,TouchableWithoutFeedback,Image,Text} from 'react-native';
// import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/Ionicons';

// import { Routes } from '../Constants';

// class FavoriteItem extends Component {

//   _viewAdDetail(post)
//   {
// this.props.navigation.navigate(Routes.AddDetails,{data:post});
//   }

//   render() {
//     const post = this.props.data;
//     const {colors}=this.props;
//     return (
//       <View style={{flex:1,margin:5,borderColor:colors.BASE_COLOR,borderWidth:1}}>
//         <TouchableWithoutFeedback  onPress={()=>{this._viewAdDetail(post)}} >
//           <View style={{ flex: 1, flexDirection: "row" }}>
//             <View style={styles.shadow}>
//               <Image source={{ uri: post.thumbnail }} style={styles.image} resizeMode="contain"/>
//             </View>
//             <View style={{width:'57%',margin:5}}>
//               <View
//                 style={{
//                   justifyContent: "space-between",
//                   flexDirection: "row",paddingHorizontal:10,paddingVertical:8}}
//               >
//                  <Text style={{ fontSize: 18,color:colors.FOREGROUND_DARK }} numberOfLines={1}>{post.title}</Text>
               
//                 <Icon color="black"
//                   name="ios-close"
//                   size={25} />
//               </View>
//               <View style={{paddingHorizontal:10}}>
//               <Text style={{ fontSize: 18,color:colors.HEADER }}>{post.price.display_price}</Text>
//               <View  >
//              <Text style={{color:colors.FOREGROUND_DARK,fontSize:16}}>Likes :{post.likes?post.likes:0}</Text>
//              <Text style={{color:colors.FOREGROUND_DARK,fontSize:16}}>Reviews :{post.reviews?post.reviews:0}</Text>
//              <Text style={{color:colors.FOREGROUND_DARK,fontSize:16}}>Images :{post.images.length}</Text>
//              <Text style={{color:colors.FOREGROUND_DARK,fontSize:16}}>Videos :{post.videos.length}</Text>
//               </View></View>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </View>
//     );
//   }
// }


// function mapStateToProps(state) {
//     const { posts,users,colors } = state;    
//     return {
//       myposts:posts.myposts,user: users.currentUser,colors
//     };
//   }
  
//   const connectedMyAdsPage = connect(mapStateToProps)(FavoriteItem);
//   export { connectedMyAdsPage as FavoriteItem };

// const styles = StyleSheet.create({
//     shadow:{
//          backgroundColor:'white',
//     width: '40%',
//     //   borderRadius:5,  
//     shadowColor: "#000",
//     shadowOffset: {
//         width: 0,
//         height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,
    
//     elevation: 3,},
//   image: {
//     width:'100%',height:170,
//   //  borderRadius:5,    
  
//   },
  
  
// });







