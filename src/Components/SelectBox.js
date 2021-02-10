import React,{Component  } from "react";
import {View,Picker,Text} from "react-native";
import { connect } from "react-redux";
  class SelectBox extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {   
            selectedValue:null ,
            isError:false  
          }
    }

selectionChanged(index)
{
  this.setState({selectedValue: index});
  if(this.props.onSelect)
  this.props.onSelect(this.props.name,index);
}
    render(){
      const {data,label,required,message,colors}=this.props;
        if(!data)
        return <Text>No data</Text>
        listItems=data.map((item,i)=> <Picker.Item label={item.name} value={item.name} />
           );
        return(           
          <View style={{ padding: 10 }}>
           <Text style={{color:colors.FOREGROUND_DARK}}>
        {label}
        {required ? "*" : ""}
      </Text>
          {/* <Text>{message}</Text> */}
          <View style={{ borderColor:colors.HEADER, borderWidth: 1,marginTop:3,borderRadius:3}}>
               <Picker
                    selectedValue={this.state.selectedValue}
                    style={{height: 30, width: '100%'}}
                    itemStyle={{ backgroundColor:colors.BACKGROUND, color: colors.FOREGROUND_DARK, fontFamily:"Ebrima", fontSize:17 }}

                    onValueChange={(item) =>{
                     this.selectionChanged(item);
                   
                    }
  }>
        {listItems}
</Picker></View>
</View>
       
        );
    }
} 
function mapStateToProps(state) {
  const { colors } = state;
  return {
    colors
  };
}

const connectedSelectBox= connect(mapStateToProps)(SelectBox);
export { connectedSelectBox as SelectBox };
