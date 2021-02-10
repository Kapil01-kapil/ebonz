import { userConstants, propertyConstants } from '../Constants';
import { userService } from '../Services';
import {NavigationActions} from "react-navigation"
import { alertActions } from './alert.actions';
import {Routes } from "../Constants"
import {Actions} from "react-native-router-flux";
import {AsyncStorage, ToastAndroid} from "react-native";
import {USER_KEY} from "../Constants"
import { categoryActions } from './category.actions';


const LOGIN_METHOD={FACEBOOK:'FACEBOOK',GOOGLE:'GOOGLE',MOBILE:'MOBILE'}

export const userActions = {
    login,
    logout,
    setPassword,
    setProfilePicture,
    register,
    get,  
    verifyOTP,
    getAll,
    delete: _delete,
    clear,
    forgetPassword,
    changePassword,
    update,
    saveSetting,
    getSetting
};

function login(username, password,token) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    if(user.success)
                   {
                         dispatch(success(user));
                         const tokData={userId:user.id,
                        token:token}
                       userService.setFirebaseToken(tokData).then(res=>{
                             console.log(res);
                       }).catch(err=>{
                         console.log(err);
                       })
                         Actions.Protected({type:'reset'}); 
                         dispatch(alertActions.success(user.message))
                         ToastAndroid.show(user.message,ToastAndroid.LONG);
                 }
                    else { 
                        dispatch(failure(user.message));
                         dispatch(alertActions.error(user.message));
                         ToastAndroid.show(user.message,ToastAndroid.LONG);
                        };                                             
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    ToastAndroid.show(error,ToastAndroid.LONG);
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function clear() {
    return { type: userConstants.CLEAR };
}

function logout() { 
   return dispatch=>{
    userService.logout();
    dispatch({type:userConstants.LOGOUT});  
    dispatch({type:Routes.LoginScreen});
   dispatch(alertActions.clear());
   dispatch(userActions.clear()); 
   dispatch(categoryActions.clear());
};    
}

function register(userData,token) {    
   
    return dispatch => {
        dispatch(request(userData));
        userService.register(userData)
            .then(
                user => {     
                                   
                     dispatch(success(user)); 
                     const tokData={userId:user.id,
                        token:token}
                       userService.setFirebaseToken(tokData).then(res=>{
                        console.log(res);
                       }).catch(err=>{
                        console.log(err);
                       })                     
                       dispatch(alertActions.success(user.message));
                       ToastAndroid.show(user.message,ToastAndroid.LONG); 
                       if(user.success==true) {
                      navigate(userData.loginMethod,user); 
                       }                  
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));                
                   dispatch(alertActions.clear())
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
   
     function navigate(method,user){        
        if(method==LOGIN_METHOD.FACEBOOK||method==LOGIN_METHOD.GOOGLE)
        {  
               AsyncStorage.setItem(USER_KEY, JSON.stringify(user));   
               Actions.Protected({type:'reset'});             
        }
        else{
            Actions.OTPScreen({username:userData.mobile})
        }
        
   }
      
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
function verifyOTP(data) {
  
    return dispatch => {
        dispatch(request());
        userService.verifyOTP(data)
            .then(
                user => {  
                    AsyncStorage.setItem(USER_KEY,JSON.stringify(user));                 
                    dispatch(success(user));                                                   
                    dispatch(alertActions.success(user.message));
                    ToastAndroid.show(user.message,ToastAndroid.LONG);
                    Actions.SetPassword({username:data.username})

                },             
            error => {
                console.log('Logging error user actions',error);
                ToastAndroid.show(error,ToastAndroid.LONG);
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
                dispatch(alertActions.clear())
            });
    };

    function request() { return { type: userConstants.OTP_REQUEST,  } }
    function success(user) {      
        return { type: userConstants.OTP_SUCCESS, user } } 
    function failure(error) { return { type: userConstants.OTP_FAILURE,error } }
}


function setProfilePicture(data) {
    return dispatch => {
        dispatch(request(data));
        userService.setProfilePicture(data)
            .then(
                user => { 
                    dispatch(success(user));                                
                    dispatch(alertActions.success('Picture Upload Successfully'));                   
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.UPLOAD_PHOTO_REQUEST, user } }
    function success(user) { return { type: userConstants.UPLOAD_PHOTO_SUCCESS, user } }
    // function navigate(){return{type:Routes.SetPassword}}
    function failure(error) { return { type: userConstants.UPLOAD_PHOTO_FAILURE,error } }
}
function update(user) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                user => { 
                    dispatch(success(user));  
                    console.log('Set User success');                            
                    dispatch(alertActions.success('User saved successfully'));
                    ToastAndroid.show('User saved successfully',ToastAndroid.LONG);                   
                      
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    console.log(error);
                    ToastAndroid.show(error,ToastAndroid.LONG);
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants. UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE,error } }
}



function setPassword(data) {
    return dispatch => {
        dispatch(request(data));

        userService.setPassword(data)
            .then(
                user => { 
                    dispatch(success(user));  
                    console.log('Set Password success');                            
                    dispatch(alertActions.success('Password saved successfully'));
                    ToastAndroid.show('Password saved successfully',ToastAndroid.LONG);                   
                     Actions.Protected({type:'reset'}); 
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    
                }
            );
    };

    function request(user) { return { type: userConstants.SETPASSWORD_REQUEST, user } }
    function success(user) { return { type: userConstants. SETPASSWORD_SUCCESS, user } }
    function failure(error) { return { type: userConstants.SETPASSWORD_FAILURE,error } }
}
function changePassword(user) {
    return dispatch => {
        dispatch(request(user));

        userService.changePassword(user)
            .then(
                user => { 
                    dispatch(success(user));  
                    console.log('Password Change Successfully');                            
                    dispatch(alertActions.success('User saved successfully'));
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

    function request(user) { return { type: userConstants.CHANGE_PASSWORD_REQUEST, user } }
    function success(user) { return { type: userConstants. CHANGE_PASSWORD_SUCCESS, user } }
    function failure(error) { return { type: userConstants.CHANGE_PASSWORD_FAILURE,error } }
}



function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}


function get() {
    return dispatch => {
    
        dispatch(request());

        userService.get()
            .then(
                user=> dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GET_USER_REQUEST } }
    function success(user) { return { type: userConstants.GET_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_USER_FAILURE, error } }
}



// function categories() {
//     return dispatch => {
//         dispatch(request());

//         userService.categories()
//             .then(
//                 categories=> dispatch(success(categories)),
//                 error => dispatch(failure(error.toString()))
//             );
//     };

//     function request() { return { type: userConstants.GET_CATEGORIES_REQUEST } }
//     function success(categories) { return { type: userConstants.GET_CATEGORIES_SUCCESS, categories } }
//     function failure(error) { return { type: userConstants.GET_CATEGORIES_FAILURE, error } }
// }

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

function forgetPassword(data) {
    return dispatch => {
        dispatch(request());
        userService.forgetPassword(data)
            .then(
                user => {                  
                    dispatch(success(user));                                      
                    dispatch(alertActions.success('Otp Send successfully'));
                    ToastAndroid.show('Otp send successfully',ToastAndroid.LONG);                
                    Actions.OTPScreen({username:data})                                      
                },
                error => {
                    console.log(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));                    
                }
            );
    };

    function request() { return { type: userConstants.FORGET_PASSWORD_REQUEST} }
    function success(user) { return { type: userConstants. FORGET_PASSWORD_SUCCESS, user } }
    function failure(error) { return { type: userConstants.FORGET_PASSWORD_FAILURE,error } }
}

function saveSetting(data) {
    return dispatch => {
        dispatch(request());
        userService.saveSetting(data)
            .then(
                data => {                  
                    dispatch(success(data));                                      
                    dispatch(alertActions.success('Setting Saved successfully'));
                                   },
                error => {
                    console.log(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));                    
                }
            );
    };

    function request() { return { type: userConstants.SAVE_SETTING_REQUEST} }
    function success(data) { return { type: userConstants.SAVE_SETTING_SUCCESS, data } }
    function failure(error) { return { type: userConstants.SAVE_SETTING_FAILURE,error } }
}

function getSetting(id) {
    return dispatch => {
        dispatch(request());
        userService.getSetting(id)
            .then(
                data => {                  
                    dispatch(success(data));                                      
                   // dispatch(alertActions.success('Setting Saved successfully'));
                                   },
                error => {
                   // console.log(error);
                    dispatch(failure(error.toString()));
                   // dispatch(alertActions.error(error.toString()));                    
                }
            );
    };

    function request() { return { type: userConstants.GET_SETTING_REQUEST} }
    function success(data) { return { type: userConstants.GET_SETTING_SUCCESS,setting: data.settings } }
    function failure(error) { return { type: userConstants.GET_SETTING_FAILURE,error } }
}