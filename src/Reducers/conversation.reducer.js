import { conversationConstants } from '../Constants';

export function conversations(state = {}, action) {

  switch (action.type) { 
          case conversationConstants.GET_MY_CONVERSATION_REQUEST:
            return { ...state,loading: true};
          case conversationConstants.GET_MY_CONVERSATION_SUCCESS:
            return {...state,allConversations: action.conversations.conversations};          
          case conversationConstants.GET_MY_CONVERSATION_FAILURE:
            return { ...state,error: action.error };  

            case conversationConstants.GET_CONVERSATION_REQUEST:
            return {...state, loading: true};

          case conversationConstants.GET_CONVERSATION_SUCCESS:
         
            return {...state,selectedConversation: action.conversation};          
            
          case conversationConstants.GET_CONVERSATION_FAILURE:
            return {...state, error: action.error };  
         
            case conversationConstants.DELETE_CONVERSATION_REQUEST:
              return {...state, loading: true};
  
            case conversationConstants.DELETE_CONVERSATION_SUCCESS:
           const conversations= state.allConversations&&state.allConversations.filter(conv=>{return conv.id!=action.conversation.conversationId})
            
              return {...state,allConversations:conversations,selectedConversation:null};          
              
            case conversationConstants.DELETE_CONVERSATION_FAILURE:
              return { ...state,error: action.error };  

              case conversationConstants.BLOCK_CONVERSATION_REQUEST:
                return {...state, loading: true};
    
              case conversationConstants.BLOCK_CONVERSATION_SUCCESS:
              //  ,blockedUsers:action.blockedUsers
              let friendId=action.conversation.friendId;
              if(state.blockedUsers.includes[friendId])
              {
                return state;     
              }  
              else return {...state,blockedUsers:state.blockedUsers.push(friendId)};  
              // console.log(action.conversation); 

              // return state; 
                
              case conversationConstants.BLOCK_CONVERSATION_FAILURE:
                return {...state, error: action.error }; 

                case conversationConstants.UNBLOCK_CONVERSATION_REQUEST:
                  return {...state, loading: true};
      
                case conversationConstants.UNBLOCK_CONVERSATION_SUCCESS:
               
                  return state;          
                  
                case conversationConstants.UNBLOCK_CONVERSATION_FAILURE:
                  return {...state, error: action.error }; 
                  
                case conversationConstants.GET_BLOCKED_USERS_REQUEST:
                  return {...state, loading: true};
      
          case conversationConstants.GET_BLOCKED_USERS_SUCCESS:
           console.log(action);
          return {...state,blockedUsers:action.blockedUsers};          
                  
          case conversationConstants.GET_BLOCKED_USERS_FAILURE:
          return { ...state,error: action.error }; 


          case conversationConstants.SEND_MESSAGE_REQUEST:
          return state;
          case conversationConstants.SEND_MESSAGE_SUCCESS:
          case conversationConstants.RECIEVE_MESSAGE_SUCCESS:         
          console.log('reducer called')             
          return {
            ...state,selectedConversation:{...state.selectedConversation,messages:state.selectedConversation.messages.concat(action.message)}
          }
          case conversationConstants.SEND_MESSAGE_FAILURE:
          return state

            case conversationConstants.CLEAR:
              {}
    default:
      return state
  }
}