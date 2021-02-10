import {notificationConstants } from '../Constants';

export function notifications(state = {}, action) {

  switch (action.type) { 
          case notificationConstants.GET_NOTIFICATIONS_REQUEST:
            return { loading: true};
          case notificationConstants.GET_NOTIFICATIONS_SUCCESS:
            return {all: action.notifications.notifications,new :action.notifications.new,loading: false};          
          case notificationConstants.GET_NOTIFICATIONS_FAILURE:
            return { error: action.error }; 
          case notificationConstants.DELETE_NOTIFICATION_REQUEST:
            return {...state, loading: true};
          case notificationConstants.DELETE_NOTIFICATION_SUCCESS:            
          const notifications=  state.all.filter(notif=>{
            return notif._id!=action.notification.notificationId});
            return {...state,loading: false, all:notifications};   
            
            
          case notificationConstants.DELETE_NOTIFICATION_FAILURE:
            return {...state, error: action.error };  
                 
            case notificationConstants.CLEAR:
              {}
    default:
      return state
  }
}