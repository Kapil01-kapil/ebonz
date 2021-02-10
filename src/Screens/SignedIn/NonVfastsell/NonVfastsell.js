import React, { Component, } from 'react';
import {StyleSheet,Text, View,  Image, ScrollView,TouchableOpacity} from 'react-native';
import {Container} from '../../../Components'
import { connect } from 'react-redux';
import {categoryActions} from "../../../Actions"
import { Routes } from '../../../Constants';

class NonVfastsell extends Component {
constructor(props) {
    super(props);

    this.state={modalVisible: false  }
}

toggleModal(visible) {
  this.setState({ modalVisible: visible,Categories:[] });
}


SubCategories(categoryId)
  {
    const { dispatch } = this.props;        
    dispatch(categoryActions.setSelected(categoryId));
    this.props.navigation.navigate('SubCategories2');
    
  }


render() {    

       const {categories,colors}=this.props; 
       const listItems1= categories&&categories.length>0&&categories.map((category,i) =>      
    <View style={{width:'50%'}}>
      <View style={{margin:10}}>
       <TouchableOpacity onPress={()=>this.SubCategories(category._id)} style={[styles.blockContainer]} key={i}>
       <Image style={styles.img} source={{uri:category.icon}}/>
       <View style={styles.transparentView}>
      <View style={{bottom:10,position:'absolute', left:10}}>
        <Text style={[styles.text, {color:'white',fontSize:16,zIndex:10}]}>{category.name}</Text>
      </View>
        </View>     
       </TouchableOpacity>
       
       </View>         
     </View>
       );
    return (  
          <Container style={{backgroundColor:colors.BACKGROUND}}>      
     
        <ScrollView>    
        <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
         {listItems1}          
         </View>
         </ScrollView> 
        </Container>
    );
  }
}

function mapStateToProps(state) {
    const {alert,categories,colors } = state;    
    return( 
      {alert,categories: categories.all,colors})
    ;
  }
  
  const connectedNonVfastsellsellPage = connect(mapStateToProps)(NonVfastsell);
  export { connectedNonVfastsellsellPage as NonVfastsell }; 

const styles = StyleSheet.create({
  blockContainer: {
    height: 170,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  transparentView: {
    position: 'absolute',
    borderRadius: 5,
    top: 0,
    left: 0,
    // backgroundColor: 'black',
    // opacity: 0.3,
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: 170,
  },
  text: {
    backgroundColor:'transparent',
    shadowColor: '#fff',
  shadowOffset: {
    width: 0,
    height: 2,
  },

  shadowOpacity: 0.23,
  shadowRadius: 2.62,
  elevation: 4,},

  img: {
    borderRadius:5,
    height: 170,
    width: '100%',
    resizeMode: 'cover',
  },
});







