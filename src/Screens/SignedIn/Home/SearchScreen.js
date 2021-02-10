import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {postActions, suggestionActions, favoriteActions} from '../../../Actions';
import {Container,SearchItem} from '../../../Components';
import Images from '../../../Images';
import {Routes} from '../../../Constants';

class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.maxLength = 70;
    this.state = {
      searchVisible: false,
    };
  }

  componentDidMount() {
  
  }
  _populateResults(item) {
    const subcategoryID=item.subcategoryId
      this.props.navigation.navigate(Routes.SearchResult,{title:item.title})
     const {dispatch} = this.props;
     dispatch(postActions.getBySubCategory(subcategoryID));
   
  }

onChecked(subcategoryID){
    const {user,dispatch}=this.props;
    const data={userId:user.id,
        subcategoryId:subcategoryID
    }
    console.log("Checked:",data)
    dispatch(favoriteActions.addSubCategory(data));    
}
onUnChecked(subcategoryID){
    const {user,dispatch}=this.props;
    const data={userId:user.id,
        subcategoryId:subcategoryID
    }
    console.log("unChecked data:",data)
    dispatch(favoriteActions.removeSubCategory(data)); 
}

  _textChanged(text) {
    const {dispatch} = this.props;
    if (text != '') {
      dispatch(suggestionActions.getAll(text));
    //  this.setState({searchVisible: true});
    }   
  }

  render() {
    const {suggestions,colors} = this.props;  

    const suggestionItems =
      suggestions &&
      suggestions.length > 0 &&
      suggestions.map((item, i) => {
        return (      
        <SearchItem title={item.title} keywords={item.keywords} onPress={()=>this._populateResults(item)} onChecked={()=>{this.onChecked(item.subcategoryId)}}  onUnChecked={()=>{this.onUnChecked(item.subcategoryId)}} />
     //  <SearchItem title={item.title} keywords={item.keywords} onPress={()=>alert('')} onChecked={()=>{this.onChecked(item.subcategoryId)}}  onUnChecked={()=>{this.onUnChecked(item.subcategoryId)}} />
 );
      });

    return (
      <Container>     
        <View style={{borderColor:colors.HEADER, borderWidth: 1,borderRadius:3, margin: 2}}>
          <TouchableOpacity
            style={{position: 'absolute', left: 10, paddingTop: 12}}
            onPress={() => {
              this.props.navigation.navigate(Routes.HomeScreen);
            }}>
            <Icon  color={colors.FOREGROUND_DARK} name="ios-arrow-back" size={25}/>           
          </TouchableOpacity>
          <View style={{width: '100%', marginLeft: 20}}>
            <TextInput
              style={{width: '100%', fontSize: 14}}
              onChangeText={text => {
                this._textChanged(text);
              }}
              placeholder="Find Cars,Mobile Phones and More....."></TextInput>
          </View>
          {/* <TouchableOpacity
            style={{position: 'absolute', right:10, paddingTop: 10}}
            onPress={() => {
              this.props.navigation.navigate(Routes.Filters);
            }}>
            <Icon  color={colors.FOREGROUND_DARK} size={30} name="ios-funnel"></Icon>
          </TouchableOpacity> */}
        </View>  
        <ScrollView>        
            <View style={{flex: 1,padding:10}}>
            {suggestionItems}
            </View>       
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

const connectedSearchScreenPage = connect(mapStateToProps)(SearchScreen);
export {connectedSearchScreenPage as SearchScreen};

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
