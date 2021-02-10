import React, { Component, } from 'react';
import {StyleSheet, View,TouchableOpacity,Text,Image} from 'react-native';
import Images from '../Images'
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
const iconsize=25;
const iconcolor='black';
class HorizontalCardView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLiked:false
          }
      }

      AddDetails()
      {
        this.props.navigation.navigate('AddDetails',{data:this.props.data});
      }
   
        render() {
          const { search } = this.state;  
          const property=this.props.data;
        
          return (
                  <TouchableOpacity  onPress={()=>this.AddDetails()} >
                  <View style={styles.card} >
                  <View style={{width:'50%',justifyContent:'center',alignItems:'center',paddingHorizontal:10,paddingVertical:10}}>
                  <Image source={{uri:property.thumbnail}} style={styles.logo}/>
                  </View>

                  <View style={{width:'50%',justifyContent:'center',paddingHorizontal:10,paddingVertical:10}}>
                  <Icon style={{alignSelf:'flex-end'}} name="ios-thumbs-up" size={iconsize}   color={this.state.isLiked?'red':'black'} onPress= 
                      {()=>this.setState({isLiked:!this.state.isLiked})} />
                  <Text style={{color:'yellowgreen'}} >&#8377;{property.price}</Text>
                  <Text>{property.adTitle}</Text>
                  <Text>{property.description}</Text>
                  <Text>{property.location.data.formattedAddress}</Text>
                  </View>
                  </View>
                  </TouchableOpacity>
      
                  );
                }


        }


function mapStateToProps(state) {
     const { alert  } = state;
    // console.log('Logging state from Register Screen');
    // console.log(state);
    // console.log('Logging state end from Register Screen');
    
    return( 
        {alert})
      ;
  }
  
  const connectedHorizontalCardViewPage = connect(mapStateToProps)(HorizontalCardView);
  export { connectedHorizontalCardViewPage as HorizontalCardView }; 

const styles = StyleSheet.create({
 
    card:{
        paddingVertical:10,
        flexDirection:'row',
        width:'100%',
        marginTop:5,
        borderColor:'black',
        borderWidth:1,
        borderRadius:5
      },
      logo:{
        height:150,
        width:'100%',
        resizeMode:'contain',
        
      },
      like:{
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
        height:25,
        width:25
      },
       
});







