import {conversationConstants} from '../Constants';
import {conversationService} from '../Services';
import {ToastAndroid} from 'react-native'
import {alertActions} from './alert.actions';

export const conversationActions = {
  getMyConversations,
  getByID,
  getByFriendId,
  getConversationByIds,
  deleteConversation,
  blockUser,
  unblockUser,
  getBlockedUsers,
  clear,
};

function getMyConversations(uid) {
  return dispatch => {
    dispatch(request());
    conversationService.getByUserId(uid).then(
      conversations => {
        console.log('Logging conversation.....');
        dispatch(success(conversations));
      },
      error => dispatch(failure(error.toString())),
    );
  };
  function request() {
    return {type: conversationConstants.GET_MY_CONVERSATION_REQUEST};
  }
  function success(conversations) {
    return {
      type: conversationConstants.GET_MY_CONVERSATION_SUCCESS,
      conversations,
    };
  }
  function failure(error) {
    return {type: conversationConstants.GET_MY_CONVERSATION_FAILURE, error};
  }
}

function getByID(uid,cid) {
  return dispatch => {
    dispatch(request());
    conversationService.getById(uid,cid).then(
      conversations => {
        dispatch(success(conversations));
        console.log('CONV CONV CONV');
        console.log(conversations);
      },
      error => dispatch(failure(error.toString())),
    );
  };
  function request() {
    return {type: conversationConstants.GET_CONVERSATION_REQUEST};
  }
  function success(conversations) {
    return {
      type: conversationConstants.GET_CONVERSATION_SUCCESS,
      conversation: conversations.conversation,
    };
  }
  function failure(error) {
    return {type: conversationConstants.GET_CONVERSATION_FAILURE, error};
  }
}

function getByFriendId(fid) {
  return dispatch => {
    dispatch(success(fid));
  };
  function success(id) {
    return {type: conversationConstants.GET_BY_FRIENDID_SUCCESS, id};
  }
}

//Params Definition
//uid=> User ID
//pid=>Post ID
//sid=> Seller ID
//bid=> Buyer ID

function getConversationByIds(uid,pid, sid, bid) {
  return dispatch => {
    dispatch(request());
    conversationService.getConversationById(uid,pid, sid, bid).then(
      conversations => {
        if (conversations.success) {
          console.log('Logging conversation.....');
          dispatch(success(conversations));
        } else {
          const data = {postId: pid, sellerId: sid, buyerId: bid};
          dispatch(convRequest());
          conversationService.addNew(data).then(
            conv => {
              if (conv.success) {
                dispatch(convSuccess(conv));
              }
            },
            err => {
              dispatch(convFailure(err));
            },
          );
        }
      },
      error => dispatch(failure(error.toString())),
    );
  };

  function request() {
    return {type: conversationConstants.GET_CONVERSATION_REQUEST};
  }
  function success(conversations) {
    return {
      type: conversationConstants.GET_CONVERSATION_SUCCESS,
      conversation: conversations.conversation,
    };
  }
  function failure(error) {
    return {type: conversationConstants.GET_CONVERSATION_FAILURE, error};
  }
  function convRequest() {
    return {type: conversationConstants.GET_CONVERSATION_REQUEST};
  }
  function convSuccess(conversations) {
    return {
      type: conversationConstants.GET_CONVERSATION_SUCCESS,
      conversation: conversations.conversation,
    };
  }
  function convFailure(error) {
    return {type: conversationConstants.GET_CONVERSATION_FAILURE, error};
  }
}

function deleteConversation(data){
  return dispatch => {
    dispatch(request());
    conversationService._delete(data).then(
      res=>{
        if(res.success==true)
        {dispatch(success(data));
        
          ToastAndroid.show("Chat deleted",ToastAndroid.LONG);    
          }
      },
      err=>{
         dispatch(failure(err));
      }
    )

    function request() {
      return {type: conversationConstants.DELETE_CONVERSATION_REQUEST};
    }
    function success(data) {
      return {
        type: conversationConstants.DELETE_CONVERSATION_SUCCESS,
        conversation: data,
      };
    }
    function failure(error) {
      return {type: conversationConstants.DELETE_CONVERSATION_FAILURE, error};
    }
  }
}

function blockUser(data){
  return dispatch => {
    dispatch(request());
    conversationService.blockUser(data).then(
      res=>{
        if(res.success==true)
      { 
         dispatch(success(data));
         ToastAndroid.show("User blocked",ToastAndroid.LONG);    
      }
      },
      err=>{
         dispatch(failure(err));
      }
    )

    function request() {
      return {type: conversationConstants.BLOCK_CONVERSATION_REQUEST};
    }
    function success(data) {
      return {
        type: conversationConstants.BLOCK_CONVERSATION_SUCCESS,
        conversation: data,
      };
    }
    function failure(error) {
      return {type: conversationConstants.BLOCK_CONVERSATION_FAILURE, error};
    }
  }
}

function unblockUser(data){
  return dispatch => {
    dispatch(request());
    conversationService.unblockUser(data).then(
      res=>{
        if(res.success==true)
       { dispatch(success(data));
        ToastAndroid.show("User Unblocked",ToastAndroid.LONG);    
      }
      },
      err=>{
         dispatch(failure(err));
      }
    )

    function request() {
      return {type: conversationConstants.UNBLOCK_CONVERSATION_REQUEST};
    }
    function success(data) {
      return {
        type: conversationConstants.UNBLOCK_CONVERSATION_SUCCESS,
        conversation: data,
      };
    }
    function failure(error) {
      return {type: conversationConstants.UNBLOCK_CONVERSATION_FAILURE, error};
    }
  }
}

function getBlockedUsers(userId){
  return dispatch => {
    dispatch(request());
    conversationService.getBlockedUsers(userId).then(
      data=>{
        if(data.success==true)
       { 
         dispatch(success(data));      
      }
      },
      err=>{
         dispatch(failure(err));
      }
    )

    function request() {
      return {type: conversationConstants.GET_BLOCKED_USERS_REQUEST};
    }
    function success(data) {
       console.log('Logging blocked users'+JSON.stringify(data));

      return {
        type: conversationConstants.GET_BLOCKED_USERS_SUCCESS,
        blockedUsers:data.users,
      };
    }
    function failure(error) {
      return {type: conversationConstants.GET_BLOCKED_USERS_FAILURE, error};
    }
  }
}

function clear() {
  return {type: conversationConstants.CLEAR};
}

// prefixed function name with underscore because delete is a reserved word in javascript
