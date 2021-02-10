import {notificationConstants } from '../Constants';
import { notificationService } from '../Services';
import { alertActions } from './alert.actions';

export const  notificationActions = { 
 
    getAll,
    clear,
    deleteNotifications,
    readNotifications
    
};



function getAll(userId) {
   
    return dispatch => {
        dispatch(request());
        notificationService.get(userId)
            .then(
                notifications => {                
                    dispatch(success(notifications));
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: notificationConstants.GET_NOTIFICATIONS_REQUEST } }
    function success(notifications) { return { type: notificationConstants.GET_NOTIFICATIONS_SUCCESS, notifications } }
    function failure(error) { return { type: notificationConstants.GET_NOTIFICATIONS_FAILURE, error } }
}


function deleteNotifications(data){
    console.log('Payload for delete notification :',data);
    return dispatch => {
        dispatch(request());

        notificationService.deleteNotifications(data)
            .then(
                notification => { 
                    dispatch(success(data));  
                   // console.log('Notification Deleted successfully');                            
                    dispatch(alertActions.success('Notification Deleted successfully'));
                    ToastAndroid.show(user.message,ToastAndroid.LONG);                   
                      
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    console.log(error);
                    ToastAndroid.show(error,ToastAndroid.LONG);
                }
            );
    };

    function request() { return { type: notificationConstants.DELETE_NOTIFICATION_REQUEST } }
    function success(notification) { return { type: notificationConstants.DELETE_NOTIFICATION_SUCCESS, notification } }
    function failure(error) { return {type: notificationConstants.DELETE_NOTIFICATION_FAILURE,error } }
}

function readNotifications(data){
    console.log('Payload for read notification :',data);
    return dispatch => {
        dispatch(request());
        notificationService.readNotifications(data)
            .then(
                notification => { 
                    dispatch(success(notification));                   
                },
                error => {
                    dispatch(failure(error.toString()));                
                });
    };
    function request() { return { type: notificationConstants.READ_NOTIFICATIONS_REQUEST } }
    function success(notification) { return { type: notificationConstants.READ_NOTIFICATIONS_SUCCESS, notification } }
    function failure(error) { return {type: notificationConstants.READ_NOTIFICATIONS_FAILURE,error } }
}

function clear() {
    return { type: notificationConstants.CLEAR };
}

// prefixed function name with underscore because delete is a reserved word in javascript
