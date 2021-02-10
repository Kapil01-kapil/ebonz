import React, { Component, } from 'react';
import {StyleSheet,Text, View,Dimensions ,TouchableOpacity,Image,ScrollView,FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import {BottomTabNavigater} from '../../../Components/BottomTabNavigater'
import {Container} from '../../../Components'
import { favoriteActions } from '../../../Actions/favorite.actions';
import {FavoriteItem} from '../../../Components/FavoriteItem';
import {Loader} from "../../../Components/Loader";
import Images from "../../../Images";
 class Favorites extends Component {

constructor(props) {
    super(props);

    this.state={}
}
componentDidMount(){
  
  const { dispatch ,user} = this.props;
  dispatch(favoriteActions.getAll(user.id));
} 
onCross(subcategories){
  const { dispatch,user} = this.props;
  if(user)
   {
     const data={userId:user.id,subcategoryId:subcategories}
      dispatch(favoriteActions.removeSubCategory(data));  
  }
  } 
  render() {
    const HeadingFont=17;
    const Weight="bold";

    const {favorites,colors}=this.props;
   
    const  categories= favorites.subcategories&& favorites.subcategories.length>0&&favorites.subcategories.map((category,i) => {
    return (     
          <View style={{  flexDirection: "row",marginRight:5,backgroundColor:colors.HEADER,borderRadius:5,paddingHorizontal:8,paddingVertical:5,marginBottom:5}}>
            <Text style={{ fontSize: 12,color:colors.FOREGROUND_LIGHT }}>{category.name}</Text>               
                <TouchableOpacity onPress={()=>this.onCross(category._id)}>
               <View style={{Left:20,height:20,width:20,justifyContent:"center",alignItems:"center"}}><Icon
                  color={colors.FOREGROUND_LIGHT}
                  name="ios-close"
                  size={20}
                /></View></TouchableOpacity>      
        </View>     
      )
    });


    return (  
          <Container style={{backgroundColor:colors.BACKGROUND}}>
          <ScrollView style={{marginBottom:60}}>  
         <View style={{padding:10}}><Text style={{color:colors.BLACK,fontSize:HeadingFont}}>Favorite categories </Text>
          
          <View style={{flex:1,paddingTop:10,flexDirection:"row", flexWrap: "wrap" }}>
            {categories?categories:<Loader size="small"></Loader>&&<View style={{justifyContent:"center",alignItems:"center",flex:1}}><Text style={{color:colors.FOREGROUND_DARK}}>No Categories found</Text></View>}           
            </View>
        
           <Text style={{color:colors.BLACK,marginTop:10,fontSize:HeadingFont}}>Favorite Ads </Text>
           </View>
            <FlatList
               data={favorites.posts}
               renderItem={(post ,i) =><FavoriteItem data={post.item} key={i} {...this.props}/>
                }
        keyExtractor={post => post._id}        
      />
         
             
           </ScrollView> 
    < BottomTabNavigater {...this.props}/>        
            </Container>

    );
  }

}

function mapStateToProps(state) {
  const { favorites,users,colors } = state;   
 console.log("Favourites:",favorites)
 console.log("Users:",users)
  return {
    favorites:favorites,user: users.currentUser,colors
  };
}
  const connectedFavoritesPage = connect(mapStateToProps)(Favorites);
  export { connectedFavoritesPage as Favorites }; 

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







