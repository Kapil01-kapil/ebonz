import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import { Container, SearchItem } from '../../../Components';
import {postActions, suggestionActions, favoriteActions} from '../../../Actions';
import {CardView} from '../../../Components/CardView';
import Images from '../../../Images';
import {Routes} from '../../../Constants';



class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.maxLength = 70;
    this.state = {
      searchVisible: false,
    };
  }

  componentDidMount() {

  
  }
  _populateResults(subcategoryID) {
     
     const {dispatch} = this.props;
     dispatch(postActions.getBySubCategory(subcategoryID));
  }

onChecked(subcategoryID){
    const {user,dispatch}=this.props;
    const data={userId:user.id,
        subcategoryId:subcategoryID
    }
    dispatch(favoriteActions.addSubCategory(data));    
}
onUnChecked(subcategoryID){
    const {user,dispatch}=this.props;
    const data={userId:user.id,
        subcategoryId:subcategoryID
    }
    dispatch(favoriteActions.removeSubCategory(data)); 
}

  _textChanged(text) {
    const {dispatch} = this.props;
    if (text != '') {
      dispatch(suggestionActions.getAll(text));
      this.setState({searchVisible: true});
    }   
  }

  onPlaceHolderPress(Routes){
    this.props.navigation.navigate(Routes)

  }
  render() {
     
    const {title}=this.props;
   const {results,colors}=this.props;
   console.log("GautamResult:",results)

  //  const postItems =
  //     results &&
  //     results.posts.length > 0 &&
  //     results.posts.map((post, i) => {
  //       return <CardView data={post} key={i} {...this.props} />;
  //     });

    return (
      <Container style={{ backgroundColor: colors.BACKGROUND }}>
      <View style={{ height:60, paddingTop:10, backgroundColor: colors.HEADER }}>
      <View
          style={{
            borderColor: colors.BACKGROUND,
            backgroundColor:colors.BACKGROUND,
            borderWidth: 1,
            borderRadius:2,
            margin:5                     
          }}>
         
          <View style={{ marginLeft: 5}}>
           
       

          <TouchableOpacity onPress={()=>this.onPlaceHolderPress(Routes.HomeScreen)}>
         <View style={{flexDirection:"row"}}>
         <View style={{alignItems:'center',justifyContent:'center'}}>
         <TouchableOpacity
              style={{ position: "absolute", left: 10 }}
              onPress={() => {
                this.props.navigation.navigate(Routes.HomeScreen);
              }}>
              <Icon color={colors.FOREGROUND_DARK} name="ios-arrow-back" size={40} />
            </TouchableOpacity>
          </View>
          <View style={{width:"100%",height:35,justifyContent:"center",paddingLeft:10,alignItems:"center"}}>
            <Text style={{color:colors.BASE_COLOR}}>{title}</Text></View></View>
            </TouchableOpacity>
             
          </View>
         </View>
        </View>

        <ScrollView>     
             
        <FlatList
               data={results.posts}
               renderItem={( post ,i) =><CardView data={post.item} key={i} {...this.props} />
}
               keyExtractor={post => post._id}
               numColumns={2}
              />

        {/* <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
            { postItems?postItems:<Loader size="small"></Loader>}
            </View>       */}
        </ScrollView>
      
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const {alert, categories, posts, suggestions,users,colors} = state;

  return {
    alert,
    user: users.currentUser, 
    results: posts,
    suggestions: suggestions.suggestions,
    colors
  };
}

const connectedSearchResultPage = connect(mapStateToProps)(SearchResult);
export {connectedSearchResultPage as SearchResult};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    
    paddingTop:30
  },

  searchcontainer: {
    backgroundColor: 'white',
    width: '100%',
    height: 25,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchbar: {
    width: '100%',
    height: 25,
    backgroundColor: '#FBFBFB',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  card: {
    paddingVertical: 10,
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  logo: {
    height: 150,
    width: '100%',
    resizeMode: 'contain',
  },
  like: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginTop: 5,
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  img2: {
    height: 25,
    width: 25,
  },
});
