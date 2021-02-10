import React, { Component, } from 'react';
import {StyleSheet,Text, View,ScrollView,TextInput ,TouchableOpacity} from 'react-native';
import {Header} from '../../../Components/Header'
import { connect } from 'react-redux';
import {TextInputBox} from "../../../Components/TextInputBox"
import {Button ,Container} from '../../../Components'
import { Routes } from '../../../Constants';
import { newpostActions } from '../../../Actions';


class SetPrice extends Component {
  constructor(props) {
    super(props);
    this.maxLength = 70;
    this.state={
    min_price: 0,
    max_price:0,
    price:0,
    data:null,
    price:0
    };
}
setLocation()
    {
      const {price,min_price}=this.state;
      if(price>=min_price)
    { 
      const {dispatch}=this.props; 
      dispatch(newpostActions.addPrice(price));
      this.props.navigation.navigate(Routes.SetLocation,{images:this.props.images,videos:this.props.videos});
    }else {
      alert('Price must be greater than or equal to '+min_price);
    }
  }

onChangeText(price)
{
   if(price<=this.state.max_price)
    {this.setState({price:price});}
}
  componentDidMount()
  {    
    const {parameters}=this.props.category;
    parameters.map((param)=>
    {
      if(param.key=='price')
        {
          this.setState({min_price:param.min,max_price:param.max});        
        }
    })
  }


  render() {
    const {colors}=this.props; 
    return (  
    <Container styles={{backgroundColor:colors.BACKGROUND}}>   
<View style={{padding:10}}>
           {/* <Header Text='Set a price' nav={this.props.navigation} backscreen="GalleryScreen"/>  */}
           <TextInputBox onChangeText={price => this.onChangeText(price)} value={this.state.price} keyboardType={"numeric"} label="Price" placeholder="₹|" />

           {/* <TouchableOpacity onPress={()=>this.setLocation()}  style={styles.Bottom} > 
            <Text style={{color:'white',fontSize:20}} >Next</Text>
           </TouchableOpacity> */}
           <Button
              onPress={() => {
                this.setLocation();
              }}
              text="NEXT"
            />
        
        </View>
    </Container>

    );
  }

}

function mapStateToProps(state) {
  const { alert, categories ,colors} = state;

  return { alert, category: categories.selectedCategory,colors };
  }
  
  const connectedsetPricePage = connect(mapStateToProps)(SetPrice);
  export { connectedsetPricePage as SetPrice }; 

const styles = StyleSheet.create({
  container: {
   flex:1,
    backgroundColor: 'white',    
  },
  Bottom:{
    height:40,
    width:'100%',
    backgroundColor:'#007ACC',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    bottom:0
  },

 
 
});







