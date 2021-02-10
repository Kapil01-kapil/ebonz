import React, { Component, } from 'react';
import {StyleSheet,View ,TouchableOpacity,TouchableWithoutFeedback,Image,Text} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { Routes } from '../Constants';

class SearchItem extends Component{
    constructor(props)
    {
        super(props);
        this.state={checked:false}
    }
    onChecked()
    {
        const {checked}=this.state;        
        this.setState({checked:!checked})
        if(checked)
        this.props.onUnChecked();
        else {this.props.onChecked();}
    }
    render()
    {
        const {title,keywords,onPress,colors}=this.props;
        const {checked}=this.state;
        return(  
               <TouchableOpacity
               onPress={this.props.onPress}>
                <View style={{flex:1,flexDirection:'row', borderColor: colors.FOREGROUND_DARK, borderBottomWidth: 1,}}>
            <View style={{padding: 10,flex:1}}>
              <Text style={{fontSize: 16,color:'black',fontWeight:'bold'}}>{title}</Text>
              <Text style={{fontSize: 12,color:colors.FOREGROUND_DARK}}>{keywords}</Text>
            </View>
            <View style={{padding: 10}}>
                <TouchableOpacity onPress={()=>{this.onChecked()}}>
         <View style={{borderColor:colors.HEADER,borderRadius:40, borderWidth:4,height:40,width:40,alignItems:'center',justifyContent:'center'}}>
             {checked?<Icon size={50} name="ios-checkmark" color={colors.HEADER}></Icon>:null}
    
         </View></TouchableOpacity>
            </View>
            </View>
          </TouchableOpacity>);
    }
}

function mapStateToProps(state) {
    const { posts,users,colors } = state;    
    return {
      myposts:posts.myposts,user: users.currentUser,colors
    };
  }
  
  const connectedSearchItem = connect(mapStateToProps)(SearchItem);
  export { connectedSearchItem as SearchItem };

const styles = StyleSheet.create({
    shadow:{
         backgroundColor:'white',
    width: '40%',   borderRadius:5,  
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    
    elevation: 3,},
  image: {
    width:'100%',resizeMode:'cover',height:170,
   borderRadius:5,    
  
  }  
});







