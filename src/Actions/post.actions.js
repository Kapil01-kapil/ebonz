import { postConstants } from '../Constants';
import { postService } from '../Services';
import { alertActions } from './alert.actions';
import CompressImage from 'react-native-compress-image';
import { ProcessingManager } from 'react-native-video-processing';

export const  postActions = {     
    get,
    getAll,  
    getMyPosts,
    removePost, 
    getByCategory,
    getBySubCategory,  
    getRelevants,
    clear,
    getByUserId,
    addReview,
    getReviews,
    markAsSold
};


function get(id) {
    return dispatch => {
        dispatch(request());

        postService.getById(id)
            .then(
                post => dispatch(success(post)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GET_POST_REQUEST } }
    function success(post) { return { type: postConstants.GET_POST_SUCCESS, post } }
    function failure(error) { return { type: postConstants.GET_POST_FAILURE, error } }
}

function getRelevants(userId,latitude,longitude) {
    return dispatch => {
        dispatch(request());

        postService.getRelevants(userId,latitude,longitude)
            .then(
                posts => {
                    if(posts.posts)
                    dispatch(success(posts.posts))
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GET_FILTERED_POST_REQUEST } }
    function success(posts) { return { type: postConstants.GET_FILTERED_POST_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GET_FILTERED_POST_FAILURE, error } }
}
function addReview(data) {
    return dispatch => {
        dispatch(request());

        postService.addReview(data)
            .then(
                review => dispatch(success(review)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.ADD_REVIEW_REQUEST  } }
    function success(review) { return { type: postConstants.ADD_REVIEW_SUCCESS, review } }
    function failure(error) { return { type: postConstants.ADD_REVIEW_FAILURE, error } }
}

function getReviews(uid,postId) {
    return dispatch => {
        dispatch(request());

        postService.getReviews(uid,postId)
            .then(
                reviews => dispatch(success(reviews)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GET_REVIEWS_REQUEST  } }
    function success(reviews) { return { type: postConstants.GET_REVIEWS_SUCCESS, reviews} }
    function failure(error) { return { type: postConstants.GET_REVIEWS_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());
        postService.getAll()
            .then(
                posts => dispatch(success(posts)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GETALL_POST_REQUEST } }
    function success(posts) { return { type: postConstants.GETALL_POST_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GETALL_POST_FAILURE, error } }
}
function removePost(id) {
    return dispatch => {
        dispatch(request());
        postService.removePost(id)
            .then(
                posts => dispatch(success(id)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.REMOVE_POST_REQUEST } }
    function success(postId) { return { type: postConstants.REMOVE_POST_SUCCESS, postId } }
    function failure(error) { return { type: postConstants.REMOVE_POST_FAILURE, error } }
}

function getMyPosts(id) {
    return dispatch => {
        dispatch(request());
        postService.getMyPosts(id)
            .then(
                posts => dispatch(success(posts.posts)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GET_MYPOSTS_REQUEST } }
    function success(posts) { return { type: postConstants.GET_MYPOSTS_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GET_MYPOSTS_FAILURE, error } }
}

 function getByUserId(id) {
    return dispatch => {
        dispatch(request());
        postService.getMyPosts(id)
            .then(
                posts => dispatch(success(posts.posts)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GET_USER_POST_REQUEST } }
    function success(posts) { return { type: postConstants.GET_USER_POST_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GET_USER_POST_FAILURE, error } }
}

function getByCategory(id)
{
    return dispatch => {
        dispatch(request());
        postService.getByCategory(id)
            .then(
                posts => dispatch(success(posts.posts)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GET_BY_CATEGORY_REQUEST } }
    function success(posts) { return { type: postConstants.GET_BY_CATEGORY_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GET_BY_CATEGORY_FAILURE, error } }
}

function getBySubCategory(id)
{
    return dispatch => {
        dispatch(request());
        postService.getBySubCategory(id)
            .then(
                posts => dispatch(success(posts)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.GET_BY_SUBCATEGORY_REQUEST } }
    function success(posts) { return { type: postConstants.GET_BY_SUBCATEGORY_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.GET_BY_SUBCATEGORY_FAILURE, error } }
}

function markAsSold(data)
{
    return dispatch => {
        dispatch(request());
        postService.markAsSold(data)
            .then(
                posts=>{
               dispatch(success(posts))
            },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: postConstants.MARK_AS_SOLD_REQUEST } }
    function success(posts) { return { type: postConstants.MARK_AS_SOLD_SUCCESS, posts } }
    function failure(error) { return { type: postConstants.MARK_AS_SOLD_FAILURE, error } }
}

function clear() {
    return { type: postConstants.CLEAR };
}

// prefixed function name with underscore because delete is a reserved word in javascript
