import {favoriteConstants } from '../Constants';
import { favoriteService } from '../Services';
import { alertActions } from './alert.actions';

export const  favoriteActions = { 
    add,
    addSubCategory,
    removeSubCategory,
    remove,
    getAll, 
    clear,
    
};


function add(data) {
    return dispatch => {
        dispatch(request());
        const payload={'userId': data.userId, 'postId': data.post._id }
        favoriteService.add(payload)
            .then(
                favorite => {
                    console.log('Padding favorite post')
                    dispatch(success(data.post))},
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: favoriteConstants.ADD_FAVORITE_REQUEST } }
    function success(favorite) { return { type: favoriteConstants.ADD_FAVORITE_SUCCESS, favorite } }
    function failure(error) { return { type: favoriteConstants.ADD_FAVORITE_FAILURE, error } }
}


function addSubCategory(data) 
{
    return dispatch => {
        dispatch(request());
        favoriteService.addSubCategory(data)
            .then(
                favorite => dispatch(success(favorite)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: favoriteConstants.ADD_FAVORITE_CATEGORY_REQUEST } }
    function success(favorite) { return { type: favoriteConstants.ADD_FAVORITE_CATEGORY_SUCCESS, favorite } }
    function failure(error) { return { type: favoriteConstants.ADD_FAVORITE_CATEGORY_FAILURE, error } }
}

function removeSubCategory(data) 
{
    return dispatch => {
        dispatch(request());
        favoriteService.removeSubCategory(data)
            .then(
                favorite => dispatch(success(data.subcategoryId)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: favoriteConstants.REMOVE_FAVORITE_CATEGORY_REQUEST } }
    function success(subcategoryId) { return { type: favoriteConstants.REMOVE_FAVORITE_CATEGORY_SUCCESS, subcategoryId } }
    function failure(error) { return { type: favoriteConstants.REMOVE_FAVORITE_CATEGORY_FAILURE, error } }
}


function getAll(id) {
    console.log("Hello");
    return dispatch => {
        dispatch(request());
        favoriteService.getFavorites(id)
            .then(
                favorites => {
                   // console.log('Logging favourites :',favorites);
                    dispatch(success(favorites));
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: favoriteConstants.GET_FAVORITES_REQUEST } }
    function success(favorites) { return { type: favoriteConstants.GET_FAVORITES_SUCCESS, favorites } }
    function failure(error) { return { type: favoriteConstants.GET_FAVORITES_FAILURE, error } }
}




function remove(data) {
    console.log('Remove aaction',data)
    return dispatch => {
        dispatch(request());
        favoriteService.remove(data)
            .then(
                favorites => dispatch(success(data.postId)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: favoriteConstants.REMOVE_FAVORITE_REQUEST } }
    function success(postId) { return { type: favoriteConstants.REMOVE_FAVORITE_SUCCESS, postId } }
    function failure(error) { return { type:favoriteConstants.REMOVE_FAVORITE_FAILURE, error } }
}


function clear() {
    return { type: favoriteConstants.CLEAR };
}

// prefixed function name with underscore because delete is a reserved word in javascript
