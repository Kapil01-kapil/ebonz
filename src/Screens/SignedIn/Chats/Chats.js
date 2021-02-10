import React, { Component, } from 'react';
import {StyleSheet,Text, View,TextInput,Dimensions,TouchableOpacity,TouchableHighlight,ScrollView,Image } from 'react-native';
import { connect } from 'react-redux';
window.navigator.userAgent='react-native';
import {conversationConstants} from  '../../../Constants'

import {Loader,Container} from '../../../Components'
import {conversationActions, categoryActions} from '../../../Actions'
import {socket} from "../../../Services/socket.service";
import {Routes} from '../../../Constants'
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux'

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';



class Chats extends Component {
constructor(props) {
    super(props);   
    this.state={message:"",messages:[],friendId:null,blocked:false}  
    
    const {dispatch}=this.props; 

    socket.onmessage = (event) => {     
      const payload=JSON.parse(event.data);
      switch(payload.type)
      {
        case 'ON_MESSAGE_RECIEVED':
              dispatch({type:conversationConstants.RECIEVE_MESSAGE_SUCCESS,message:payload.data}) ;
      
          break;
          case 'ON_MESSAGE_SENT':
             
      dispatch({type:conversationConstants.SEND_MESSAGE_SUCCESS,message:payload.data}) 
            break;
      } 
     // console.log('received', event.data);
    }

   
}



componentDidMount(){
  const {user,chat,blockedUsers}=this.props;
  console.log('You have blocked the following users'+JSON.stringify(blockedUsers));
  if(user&&chat)
  {
    const friend=(chat.seller._id===user.id)?chat.buyer:chat.seller;
    if(blockedUsers)
    {  
      console.log(blockedUsers);
      const blocked= blockedUsers.find(blockeduser=>{
      console.log(friend._id+" , "+blockeduser._id) 
      return friend._id===blockeduser._id})
    if(blocked)
    {
      this.setState({blocked:true})
    }
    
    }
  }

   this.props.navigation.setParams({
    hideNavBar:true
});
}

onsendMessage(){ 
  const {user,chat}=this.props;
    //console.log(JSON.stringify(chat));
    if(chat&&user)
 {
    const friend=(chat.seller._id===user.id)?chat.buyer:chat.seller;

  //const {friendId}=this.state;
  const data={
    conversationId:chat.id,
    senderId:user.id,
    recieverId:friend._id,
    messageType:"text",
    message:this.state.message
  } 
  console.log(data);

  const payload={type:'ON_SEND_MESSAGE',data:data}
  socket.send(JSON.stringify(payload));
  //socket.emit('onSendMessage',data); 
   this.setState({message:""});
  }
}

onchangeText(event){
  this.setState({message:event})
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

onDeleteChat(){ 
  const { chat,user,dispatch } = this.props;
  if(user&&chat)
  {
    const data={conversationId:chat.id,
    userId:user.id}
    dispatch(conversationActions.deleteConversation(data));
    Actions.pop();
  }
}

onBlockUser(){ 
  const { chat,user,dispatch } = this.props;
  if(user&&chat)
  {
    const friend=(chat.seller._id===user.id)?chat.buyer:chat.seller;
    const data={
  userId:user.id,
  friendId:friend._id
}
this.setState({blocked:true})
dispatch(conversationActions.blockUser(data));
}
}

unBlockUser(){ 
  const { chat,user,dispatch } = this.props;
  if(user&&chat)
  {
    const friend=(chat.seller._id===user.id)?chat.buyer:chat.seller;
    const data={
  userId:user.id,
  friendId:friend._id
}
this.setState({blocked:false})
dispatch(conversationActions.unblockUser(data));
}
}

  render() {

    
    const { chat,user,colors } = this.props;
 
    const allItems= chat&&chat.messages&&
    chat.messages.length > 0 &&chat.messages.map((item)=>{
    return( 
    (item.senderId==user.id)?
     ( <View style={{padding:5,alignItems:"flex-end"}}>
        <View style={{backgroundColor:"#c9c3c3",paddingHorizontal:8,paddingVertical:1,borderRadius:20}} >
          <Text style={{textAlign:"right",padding:5,color:'black',
        }}>
          {item.message}
        </Text>
        </View>
     <View style={{marginRight:10,paddingTop:3}}><Text style={{fontSize:10}}>{this.parseTime(item.createdAt)}</Text></View>
         </View>):
          ( <View style={{padding:5,alignItems:"flex-start"}}>
          <View style={{backgroundColor:colors.HEADER,paddingHorizontal:8,paddingVertical:1,borderRadius:20}}><Text style={{textAlign:"left",padding:5,color:'white'}}>
            {item.message}
          </Text>
        
          </View>
          <View style={{marginLeft:10,paddingTop:3}}><Text style={{fontSize:10}}>{this.parseTime(item.createdAt)}</Text></View>
           </View>)
     
         )
    })


   // const chatUser=chat&&((chat.seller._id===user.id)?chat.buyer:chat.seller);

   var obj={thumbnail:"",name:"",online:""}
   if(chat&&chat.seller&&chat.buyer)
   {
     const res=(chat.seller._id===user.id)?chat.buyer:chat.seller;
     obj.thumbnail=res.profile.thumbnail;
     obj.name=res.profile.name;
     obj.online=res.online;
   }


    return (  
          <Container style={{backgroundColor:colors.BASE_COLOR}}> 
          <View style={[styles.header,{backgroundColor:colors.HEADER}]}>
        <TouchableOpacity onPress={()=>{Actions.pop()}}>
          <Icon color={colors.FOREGROUND_LIGHT} name="ios-arrow-back" size={32}  />
        </TouchableOpacity>
          <View style={{marginHorizontal:10}}>
            <Image source={{uri:obj.thumbnail}} style={{height:35,width:35,borderRadius:35,borderColor:'#ffffff'}}></Image>
          </View>
          <View style={{justifyContent:'center',width:250}}>
    <Text  style={{fontSize:18,color:colors.FOREGROUND_LIGHT}}>{obj.name}</Text>
    {obj.online?  <Text style={{fontSize:10,color:colors.FOREGROUND_LIGHT}}>online</Text>:null}
          </View>
<View style={{justifyContent:'center'}}> 
  <Menu>
      <MenuTrigger><Icon color={colors.FOREGROUND_LIGHT} style={{transform: [{ rotate: "90deg" }]}} name="ios-more" size={25}/></MenuTrigger>
      <MenuOptions>  
        <MenuOption onSelect={() => this.onDeleteChat()}>
          <View style={{padding:5}}>
          <Text  style={{fontSize:16}}>Delete Chat</Text>
          </View>
        </MenuOption>
        <MenuOption onSelect={() => this.onBlockUser()}>
      <View style={{padding:5}}>
          <Text style={{fontSize:16}} >{this.state.blocked?"Unblock User":"Block User"}</Text>
          </View>
        </MenuOption>
      </MenuOptions>
    </Menu>
  </View>
 </View>
         

<ScrollView style={{flex:1}}  ref={ref => this.scrollView = ref}
    onContentSizeChange={(contentWidth, contentHeight)=>{        
        this.scrollView.scrollToEnd({animated: true});
    }}>
              <View style={{flex:1}}>
              {allItems?allItems:<Loader></Loader>}
            
             </View>
            </ScrollView>       
           
            <View style={[styles.bottom,{backgroundColor:colors.BASE_COLOR}]}>
       {!this.state.blocked?       <View style={{flexDirection:"row",flex:1,margin:5}}>
                <View style={{flex:1,backgroundColor:colors.BACKGROUND ,borderRadius:30,paddingLeft:5,flexDirection:'row'}}>
                  <View style={{flex:1}}>
                    <TextInput   onChangeText={(e)=>{this.onchangeText(e)}} placeholder="Type your message" value={this.state.message}/>
                  </View> 
                  {/* <View style={{width:25,paddingTop:15,transform: [{ rotate: "45deg" }]}}><Icon name="ios-attach" size={25} color={colors.FOREGROUND_DARK}></Icon></View> */}
                  </View>
                  <TouchableOpacity  onPress={()=>{this.onsendMessage()}} >
                  <View style={{paddingHorizontal:15,paddingVertical:5,marginLeft:3,backgroundColor:colors.HEADER,borderRadius:60,justifyContent:"center",alignItems:"center"}}>
           
                  {/* <Text style={{color:'white',padding:5}}>Send</Text> */}
                  <Icon color={colors.FOREGROUND_LIGHT} name="ios-arrow-forward" size={32}  />               
                </View>
                </TouchableOpacity>
                </View>
:<TouchableOpacity onPress={()=>{this.unBlockUser()}}>
  <View style={{padding:10,alignItems:'center',backgroundColor:'red'}}><Text  style={{fontSize:18,color:'#ffffff'}}>Unblock User</Text></View>
  </TouchableOpacity>
}
</View>     
        </Container>
    );
  }

}

function mapStateToProps(state) {
  const { users,conversations,colors } = state;  
  var user;
  user = users.currentUser;

  return { user: user ,chat:conversations.selectedConversation,blockedUsers:conversations.blockedUsers ,colors};
  }
  
  const connectedChatsPage = connect(mapStateToProps)(Chats);
  export { connectedChatsPage as Chats }; 


const styles = StyleSheet.create({
  container: {
   flex:1,
   flexDirection:'column',
    backgroundColor: 'white',    
  }, 

  header:{
    height:55,padding:10,paddingLeft:15,flexDirection:'row',
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.27,
shadowRadius: 4.65,

elevation: 6
  },

  bottom:{
    backgroundColor:'white',
height:50,
shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.27,
shadowRadius: 4.65,

elevation: 6,
  },
  
});







