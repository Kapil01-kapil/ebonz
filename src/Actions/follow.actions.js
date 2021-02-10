import {followConstants } from '../Constants';
import { followService } from '../Services';
import { alertActions } from './alert.actions';
import { ToastAndroid } from 'react-native';

export const  followActions = { 
    follow,
    unfollow,
    getAll, 
    clear
};


function follow(data) {
    return dispatch => {
        dispatch(request());
        followService.follow(data)
            .then(
                follow => {
                    dispatch(success(follow));
                    ToastAndroid.show('User followed successfully',ToastAndroid.LONG);
                },
                error =>{ 
                    ToastAndroid.show(error.toString(),ToastAndroid.LONG);
                    dispatch(failure(error.toString()));}
            );
    };

    function request() { return { type: followConstants.ADD_FOLLOW_REQUEST } }
    function success(follow) { return { type: followConstants.ADD_FOLLOW_SUCCESS, follow } }
    function failure(error) { return { type: followConstants.ADD_FOLLOW_FAILURE, error } }
}

function getAll(uid) {
    return dispatch => {
        dispatch(request());
        followService.getFollow(uid)
            .then(
                follow => dispatch(success(follow)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: followConstants.GET_FOLLOW_REQUEST } }
    function success(follow) { return { type: followConstants.GET_FOLLOW_SUCCESS,follow:follow.follows} } 
    function failure(error) { return { type: followConstants.GET_FOLLOW_FAILURE, error } }
}

function unfollow(data) {
    return dispatch => {
        dispatch(request());
        followService.unfollow(data)
            .then(
                follow => dispatch(success(follow)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: followConstants.UNFOLLOW_REQUEST } }
    function success(favorites) { return { type: followConstants.UNFOLLOW_SUCCESS, favorites } }
    function failure(error) { return { type:followConstants.UNFOLLOW_FAILURE, error } }
}



function clear() {
    return { type: followConstants.CLEAR };
}

// prefixed function name with underscore because delete is a reserved word in javascript
