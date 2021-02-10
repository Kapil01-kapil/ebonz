window.navigator.userAgent='react-native';
import {apiUrl} from '../Constants/config'
import io from 'socket.io-client';
import {conversationConstants} from  '../Constants'


export const socketService = {initSocketIO,eventEmitter}

export const socket=new WebSocket('wss://www.ebonz.in:4000/');


socket.onopen = () => {
   // alert('connected')
    console.log('connected');
    
  };
  socket.onclose = () => {
    //alert('disconnected')
    console.log('disconnected');
  };
  
  socket.onerror = (error) => {
    console.log('failed to connect', error);
  };

function initSocketIO(userId){
    console.log('WebSocket initialized')
    try{

  //  socket.send('Hello from client');
  //  socket.send('init',{Id:userId});

const payload={type:'USER_INIT',data:{Id:userId}}
socket.send(JSON.stringify(payload));
   console.log(socket);
  }
  catch(err){
    console.log(err);
}
  
}

function eventEmitter(event,data)
{
    this.socket.emit(event,data); 
}