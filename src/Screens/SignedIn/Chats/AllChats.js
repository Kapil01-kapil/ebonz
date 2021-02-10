import React, { Component, } from 'react';
import {StyleSheet,Text, View,Image,TextInput,Dimensions,TouchableOpacity,ScrollView,FlatList } from 'react-native';
import { connect } from 'react-redux';
import Images from "../../../Images";
//window.navigator.userAgent='react-native';
import {conversationActions} from "../../../Actions"
//import io from 'socket.io-client';
import { Routes } from '../../../Constants';
import {Loader,Container} from '../../../Components'


class AllChats extends Component {
constructor(props) {
    super(props);  
    this.state={message:"",messages:[]}
}

componentDidMount(){
  const {dispatch,user}=this.props;
  if(user)
 { 
    dispatch(conversationActions.getBlockedUsers(user.id));
    dispatch(conversationActions.getMyConversations(user.id)); 
}
}

onsendMessage(message){ 
  // const msg={userId:}
  // const msg={receiverId:'pradeep',message}
  // this.socket.emit('message',msg);
}

onchangeText(event){
  this.setState({message:event})
  console.log(event);
}

goToChat(conversation){ 
  const {dispatch,user}=this.props;
  if(user&&conversation)
 { 
   dispatch(conversationActions.getByID(user.id,conversation.id));    
   this.props.navigation.navigate(Routes.Chats);
}
}

parseTime(time)
{
  var dt= new Date(time);
 var timeString=dt.toLocaleTimeString();
var today=new Date();
const diff=Math.abs(today-dt);

const difference=Math.round(diff / (1000 * 60 * 60 * 24));
//console.log(diff+" :===>"+difference);
var H = timeString.substr(0, 2);
var h = H % 12 || 12;
//var ampm = (H < 12 || H === 24) ? "AM" : "PM";
timeString = h + timeString.substr(2, 3) ;
if(difference===0)
return timeString + " Today";
else if (difference===1)
return timeString  +" Yesterday";
else return  dt.toLocaleDateString()
}

  render() {
    const { conversations,colors,user } = this.props;
   

     const allItems= conversations &&
    conversations.length > 0 &&conversations.map((item)=>{
   
   const lastMsg=item.message;
    return(
<TouchableOpacity onPress={()=>{this.goToChat(item)}}>
<View style={[styles.shadow, {flexDirection:'row',flex:1,paddingHorizontal:10,paddingVertical:15,marginBottom:5}]}>
  <View  style={{width:65,alignItems:'center',justifyContent:'center'}}>    
    <Image source={{uri:item.post.thumbnail}} style={{height:55,width:55,borderColor:colors.HEADER,borderWidth:1}}></Image>

</View>
<View style={{flex:1,justifyContent:'center',paddingLeft:15}}>
<Text style={{color:colors.HEADER,fontSize:16}}>{item.post.title}</Text>
<Text style={{color:colors.FOREGROUND_DARK}} numberOfLines={1}>{lastMsg.message}</Text>
    <Text style={{color:colors.FOREGROUND_DARK, fontSize:12,marginTop:5}}>{this.parseTime(lastMsg.createdAt) }</Text>
</View>
<View  style={{width:60,alignItems:'center',justifyContent:'center'}}>
  
<Image source={{uri:(user.id===item.buyer._id)?item.seller.profile.thumbnail:item.buyer.profile.thumbnail}} style={{height:55,width:55,borderRadius:55,borderColor:colors.HEADER,borderWidth:1}}></Image> 
    </View>
</View>
</TouchableOpacity>
)})
 
   
    return (  
          <Container>
            {allItems?<ScrollView style={{flex:1}}>
              <View style={{flex:1}}>
           {allItems}
             </View>
            </ScrollView>
            :null
            //<View style={{justifyContent:"center",alignItems:"center",flex:1}}><Image source={Images.chat} style={{height:150,width:150}}/></View>
            }           
        </Container>  ); }}

function mapStateToProps(state) {
  const { users,conversations ,colors} = state;
  var user;

  user = users.currentUser;

  return { user: user,conversations: conversations.allConversations,colors };
  }
  
  const connectedChatsPage = connect(mapStateToProps)(AllChats);
  export { connectedChatsPage as AllChats }; 


const styles = StyleSheet.create({
 
  shadow: {
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    
    elevation: 7,
  },
});







