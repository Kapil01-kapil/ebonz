import React, { Component, } from 'react';
import {StyleSheet, View,TouchableOpacity,TouchableWithoutFeedback,Text,Image} from 'react-native';
import Images from '../Images'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { favoriteActions } from '../Actions/favorite.actions';
import { Loader } from './Loader';
const iconsize=25;
const iconcolor='black';
class CardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLiked:false
          }
      }
    
      componentDidMount() {
        // const data = this.props.data;
        // if (data) {
        //   const { favorites } = this.props;
        //   const isLiked = favorites.posts && favorites.posts.length > 0 && favorites.posts.find((post) => {
        //     return post._id === data._id
        //   });
        const {isLiked}=this.props;
          if (isLiked) {
            this.setState({ isLiked: isLiked });
          }
        // }
    
    
    
      }
    

      AddDetails()
    {
      this.props.navigation.navigate('AddDetails',{data:this.props.data,isLiked: this.props.isLiked});
    }
    addToFav() {
      const { dispatch, user } = this.props;
      const post = this.props.data;
      const { isLiked } = this.props;
      if (!isLiked) {
        dispatch(favoriteActions.add({ 'userId': user.id, 'post': post}));
        // dispatch(favoriteActions.add({ 'userId': user.id, 'postId': post._id }));
         //this.setState({ isLiked: true });
      }
      else {
        dispatch(favoriteActions.remove({ 'userId': user.id, 'postId': post._id }));
         //this.setState({ isLiked: false });
      }
    }

  render() {
      const post=this.props.data;  
      const {colors}=this.props; 
      return ( 
        <View style={{width:'50%'}}>  
        <View style={styles.card}>
        <TouchableWithoutFeedback  onPress={()=>this.AddDetails()} >
        <View>
        <View style={styles.logoContainer}>
          
        <Image style={styles.logo} resizeMode="contain"  source={{uri:post.thumbnail}} />  
        {/* <View style={{position:'absolute',top:10,left:10,paddingHorizontal:5,paddingVertical:1, borderRadius:4}}>
      <View style={{flex:1,flexDirection:'row'}}>  
          <Icon  color={this.state.isLiked?colors.HEADER:colors.BASE_COLOR} onPress= 
        {()=>this.addToFav()} name="ios-thumbs-up" size={iconsize}/>     
          </View>
        </View> */}
        </View>
        <View style={{marginTop:6,borderColor:colors.FOREGROUND_DARK,borderWidth:1,borderRadius:4}}>
        <View style={{flex:1, flexDirection:'row',padding:5,paddingBottom:0}}>
       <View style={{flex:2}}>
        <Text style={{fontSize:16,color:colors.HEADER}} >{post.price.display_price}</Text>
        </View>
       </View>
       <View style={{paddingLeft:5}}>
          <Text style={{fontSize:14,color:colors.FOREGROUND_DARK}}  numberOfLines={1}  >{post.title}asdfasfadsfasfaf</Text>
       </View>
        <View style={{ paddingHorizontal:5,alignItems:'center',flexDirection:'row',justifyContent:"space-between"}}>
        <View style={{flexDirection:"row",alignItems:"center"}}><Icon color={colors.FOREGROUND_DARK} name="ios-pin" size={iconsize} />        
        <Text numberOfLines={1} style={{marginLeft:5, color:colors.FOREGROUND_DARK}} >{post.location.city&&post.location.city.name}</Text></View>        
         <View style={{right:2,alignItems:"center"}}><Icon  color={this.state.isLiked?colors.HEADER:colors.BASE_COLOR} onPress= 
        {()=>this.addToFav()} name="ios-thumbs-up" size={iconsize}/></View>             
        </View> 
        </View>
        </View>
        </TouchableWithoutFeedback>
        </View>
        </View>      
          );
  }


}


function mapStateToProps(state) {
  const {favorites, users, colors } = state;

  return {
    user: users.currentUser,
    colors,
    favorites:favorites,
  };
  }
  
  const connectedCardViewPage = connect(mapStateToProps)(CardView);
  export { connectedCardViewPage as CardView }; 

const styles = StyleSheet.create({
 
    card:{       
        margin:5,
        marginBottom:10,         
        borderRadius:5,
        
      
    },
 logo:{
   borderRadius:5,
    height:170,
    width:'100%',
   // resizeMode:'contain',
    

    
  
    
 },
 logoContainer:{
    justifyContent:"center",alignItems:"center",padding:20,
  borderRadius:5,
  width:'100%',
 backgroundColor:'white',
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 4,
    
  },
  shadowOpacity: 0.32,
  shadowRadius: 5.46,
  
  elevation: 9,
},
 like:
    {
        height:15,
        width:15,
        resizeMode:'contain',
        marginTop:5
    },
  text1:{
    fontSize:20,
    fontWeight:'bold',
    color:'black'
  },
  img2:{
    height:25,width:25
},
  
});







