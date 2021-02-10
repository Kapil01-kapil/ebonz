import React, { Component, } from 'react';
import {StyleSheet,Text, View,ScrollView,Dimensions,TextInput,Picker } from 'react-native';
import { connect } from 'react-redux';
import { postActions,locationActions,filterActions } from "../../../Actions";
import {Header,Container,MultiSelectList,HorizontalList,SelectBox,Button} from '../../../Components'
import Images from "../../../Images"
import { Routes } from '../../../Constants';
import Slider from '@react-native-community/slider';
import { Actions } from 'react-native-router-flux';
import { Loader } from '../../../Components/Loader';


class Filters extends Component {
constructor(props) {
    super(props);
  this.state={
    category:null,
    sortby:null,
    price_min:'\u20B9'+0,
    price_max:'\u20B9'+1,
    radius:-1,  
    selectedState:"",
    selectedCity:"",
    state:"",
    city:""
   
  }  
}

onValueChanged = (index, val) => {
  //alert(index+" ; "+val)
  this.setState({ [index]: val });
};

saveFilters(){
const {dispatch,user,states,cities}=this.props;

const {sortby,price_min,price_max,radius,selectedState,selectedCity}=this.state;

const currentState= states.find(state=>{return state.id==selectedState});
const currentCity= cities.find(city=>{return city.id==selectedCity});

const data={
  userId:user.id,
  categories:this.state.category,
  sortby:sortby,
  minPrice:price_min,
  maxPrice:price_max,
  range:radius,
  state:currentState.name,
  city:currentCity&&currentCity.name
}
 dispatch(filterActions.add(data))
 this.props.navigation.navigate(Routes.SearchResult);
}

componentDidMount()
{ 
  const {dispatch,user}=this.props;
  dispatch(locationActions.getStates());
  if(user)
  dispatch(filterActions.get(user.id)); 
  const {filters}=this.props;
  if(filters)
  {
    this.setState({
      category:filters.categories,
      sortby:filters.sortBy,
      price_min:filters.price.min,
      price_max:filters.price.max,
      radius:filters.range,
      selectedState:filters.state
      
    })
   this.onStateChanged(filters.state);
   this.setState({selectedCity:filters.city})
  }
}
 
onStateChanged(id)
{
  if(id)
  {
  const {dispatch,cities}=this.props;  
   this.setState({selectedState:id}) 
  dispatch(locationActions.getCities(id));
 if(cities&&cities.length>0)
  this.setState({selectedCity:cities[0].id});
}
}

onCityChanged(id)
{
  if(id)
  {
  const {dispatch,cities}=this.props; 
  this.setState({selectedCity:id});
  }
}


  render() {
  
    const {categories,colors,states,cities,filters}=this.props;    

    const categoryItems = categories&&categories.length>0&&categories.map((category,i) => {
      return ({id :category._id,key:category.name,name:category.name});
    });

    const stateList=states&&states.length>0&&states.map(item=>{return <Picker.Item label={item.name} value={item.id} /> })

    const cityList=cities&&cities.length>0&&cities.map(item=>{return <Picker.Item label={item.name} value={item.id} /> })
    
    const sortList=[{key:'highestreviewed',name:'Highest Reviewed'},{key:'priceLowest',name:'Price: Lowest'},
    {key:'priceHighest',name:'Price: Highest'}]
    
    
    return (  
    <Container>     
      {/* {!filters?<Loader/>:     */}
      <ScrollView> 

    <MultiSelectList
    label='Categories'
    required={false}
    message='Category is required'
    data={categoryItems}
    selectedItems={filters&&filters.categories}
    name='category'
    onSelect={this.onValueChanged}  
  />

  <HorizontalList
    label='Sort'
    required={false}
    message='Sort is required'
    data={sortList}
    name='sort'
    onSelect={this.onValueChanged}
  />

<View style={{paddingHorizontal:10}}>  
    
        <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flex:1}}>  
          <Text style={[styles.text,{color:colors.FOREGROUND_DARK}]}>Min Price </Text>
          <View style={{borderWidth:1,borderColor:colors.HEADER,flex:1,height:40}}>
            <TextInput value={this.state.price_min+""} style={{flex:1,textAlign:"center"}} placeholder={'\u20B9'} onChangeText={val => {
          this.setState({price_min:val})
        }} keyboardType={"number-pad"}></TextInput>
          </View>
        </View>
          <View style={{width:10}}></View>
          <View style={{flex:1}}>  
          <Text style={[styles.text,{color:colors.FOREGROUND_DARK}]}>Max Price </Text>
          <View style={{borderWidth:1,borderColor:colors.HEADER,flex:1,height:40}}>
          <TextInput  value={this.state.price_max+""} style={{flex:1,textAlign:"center"}} placeholder={'\u20B9'} onChangeText={val => {
          this.setState({price_max:val})
        }} keyboardType={"number-pad"}></TextInput>
          </View>
        </View>         
        </View>    
</View>

<View style={{paddingHorizontal:10,marginTop:5}}>  
<View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
  <Text style={[styles.text,{color:colors.FOREGROUND_DARK}]}>Range in Kms</Text> 
   <Text style={[styles.text,{color:colors.FOREGROUND_DARK,fontSize:18}]}>
     {this.state.radius}</Text>
</View>
 
 <View style={{flex:1}}>
  <Slider
    style={{width: '100%', height: 30}}
    minimumValue={0}
    maximumValue={1000}    
    step={1}
    minimumTrackTintColor={colors.BASE_COLOR}
    maximumTrackTintColor={colors.HEADER}
    onValueChange={(val)=>{this.setState({radius:val})}}  
  />
  </View> 
</View>

<View style={{paddingHorizontal:10}}>  
  <Text style={[styles.text,{color:colors.FOREGROUND_DARK}]}>Select State</Text>
  <View style={{flex:1}}>
  <View style={{borderWidth:1,borderColor:colors.HEADER,flex:1}}>

  <Picker style={{height: 40, width: '100%'}}
                    itemStyle={{color: colors.FOREGROUND_DARK, width: '100%', fontFamily:"Ebrima", fontSize:17 }}
                    onValueChange={(itemValue, itemIndex) =>{    
                    this.onStateChanged(itemValue)            
                    }}
                  selectedValue={this.state.selectedState}
                  >
     {stateList}
</Picker>
</View>
</View>        
  </View>
    
<View style={{paddingHorizontal:10}}>  
                  <Text style={[styles.text,{color:colors.FOREGROUND_DARK}]}>Select City</Text>
  <View style={{flex:1}}>
  <View style={{borderWidth:1,borderColor:colors.HEADER,flex:1}}>
<Picker style={{height: 40, width: '100%'}}
  itemStyle={{color: colors.FOREGROUND_DARK, width: '100%', fontFamily:"Ebrima", fontSize:17 }}
  onValueChange={(itemValue, itemIndex) =>{                        
          this.onCityChanged(itemValue)}}  selectedValue={this.state.selectedCity}>
       {cityList}
</Picker>
</View>
</View>        
</View>
<Button text="Save"   onPress={() => {
                this.saveFilters();
              }}/>
</ScrollView>     
     {/* } */}
     </Container>
    );
  }
}

function mapStateToProps(state) {
  const { alert, categories ,colors,locations,filters,users} = state;
  return { alert,categories: categories.all,colors,states:locations.states,cities:locations.cities,user: users.currentUser,filters:filters.filters};
}
  
  const connectedFiltersPage = connect(mapStateToProps)(Filters);
  export { connectedFiltersPage as Filters}; 

const styles = StyleSheet.create({
  container: {
    height:'100%',
    width:'100%',
    backgroundColor: 'white',    
  },
  
  sliders: {
    margin: 20,
    width: 280,
},
text: {
    
    paddingVertical: 5,
},
title: {
    fontSize: 30,
},
sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
}
 
});







