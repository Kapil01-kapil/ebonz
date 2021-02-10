import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {postActions, suggestionActions} from '../../../Actions';
import Icon from 'react-native-vector-icons/Ionicons';
import {CardView,Container} from '../../../Components';
import Images from '../../../Images';
import {Routes} from '../../../Constants';

class FindAds extends Component {
  constructor(props) {
    super(props);
    this.maxLength = 70;
    this.state = {
      searchVisible: false,
    };
  }

  componentDidMount() {
    const {dispatch, subcategoryID} = this.props;
    dispatch(postActions.getBySubCategory(subcategoryID));
  }
  _populateResults(subcategoryID) {
    const {dispatch} = this.props;
    dispatch(postActions.getBySubCategory(subcategoryID));
  }

  _textChanged(text) {
    const {dispatch} = this.props;
    if (text != '') {
      dispatch(suggestionActions.getAll(text));
      this.setState({searchVisible: true});
    } else {
      this.setState({searchVisible: false});
      const {subcategoryID} = this.props;
      dispatch(postActions.getBySubCategory(subcategoryID));
    }
  }

  render() {
    const {results, suggestions,colors} = this.props;
    let posts;
if(!results.search_results)
{posts=results.posts;
}else posts=results.search_results;
    // const postItems =
    //   posts &&
    //   posts.length > 0 &&
    //   posts.map((post, i) => {
    //     return <CardView data={post} key={i} {...this.props} />;
    //   });

    const suggestionItems =
      suggestions &&
      suggestions.length > 0 &&
      suggestions.map((item, i) => {
        return (
<TouchableOpacity
onPress={()=>  this._populateResults(item.subcategoryId)}>
 <View style={{flex:1,flexDirection:'row', borderColor: colors.FOREGROUND_DARK, borderBottomWidth: 1,}}>
<View style={{padding: 10,flex:1}}>
<Text style={{fontSize: 16,color:'black',fontWeight:'bold'}}>{item.title}</Text>
<Text style={{fontSize: 12,color:colors.FOREGROUND_DARK}}>{item.keywords}</Text>
</View>
</View>
</TouchableOpacity>
        );
      });

    return (
      <Container style={{backgroundColor:colors.BACKGROUND}}>
        <View style={{borderColor:colors.HEADER, borderWidth: 1,borderRadius:3, margin: 2}}>
          <TouchableOpacity
            style={{position: 'absolute',backgroundColor:'transparent', padding: 10, paddingTop: 12}}
            onPress={() => {
              this.props.navigation.navigate(Routes.HomeScreen);
            }}>
              <Icon  color={colors.FOREGROUND_DARK} name="ios-arrow-back" size={25}/>   
          </TouchableOpacity>
          <View style={{width: '100%', marginLeft: 30}}>
            <TextInput
              style={{width: '100%', fontSize: 14}}
              onChangeText={text => {
                this._textChanged(text);
              }}
              placeholder="Find Cars,Mobile Phones and More....."></TextInput>
          </View>        
        </View>
        {this.state.searchVisible ? (
          <View
            style={{
              width: '100%',
              position: 'absolute',
              zIndex: 100,
              top: 60           
            }}>
            <View style={{padding: 5}}>
              <View style={{flex: 1, flexDirection: 'row',padding:3}}>
                <View style={{flex: 1, justifyContent: 'flex-start'}}>
                  <Text>Search results</Text>
                </View>
                <View style={{ justifyContent: 'flex-end'}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({searchVisible: false});
                    }}>
                    <View>
                      <Text style={{color: colors.FOREGROUND_DARK,fontSize:18}}>X</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {suggestionItems}
            </View>
          </View>
        ) : (<View></View>)}

        <ScrollView>      
          
          <FlatList
               data={posts}
               renderItem={( post ,i) =><CardView data={post.item} key={i} {...this.props} />
}
               keyExtractor={post => post._id}
               numColumns={2}
              />
        </ScrollView>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const {alert, categories, posts, suggestions,colors} = state;

  return {
    alert,
    subcategoryID: categories.selectedSubCategory._id,
    results: posts,
    suggestions: suggestions.suggestions,
    colors
  };
}

const connectedFindCategoriesPage = connect(mapStateToProps)(FindAds);
export {connectedFindCategoriesPage as FindAds};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
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
