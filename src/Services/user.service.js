//import config from 'config';
import { authHeader } from '../Store';
import {AsyncStorage} from "react-native";
import {apiUrl,USER_KEY} from "../Constants"
import {helperService} from "./helper.service"
import {socketActions} from '../Actions'
import {socketService} from './socket.service'



export const userService = {
    isSignedIn,
    login,
    logout,
    register,
    setPassword,
    verifyOTP,
    get,
    categories,
    getAll,
    getById,
    setProfilePicture,
    setFirebaseToken,
    update,
    delete: _delete,
    forgetPassword,
    changePassword,
    saveSetting,
    getSetting
};

function isSignedIn() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(USER_KEY)
        .then(res => {
          if (!res) {
            resolve({success:false});          
          } else { 
            console.log('Logging user id :');
            const user=JSON.parse(res);
            console.log(user.id);
            socketService.initSocketIO(user.id);
               resolve({success:true});        
          }
        })
        .catch(err => {
            console.log('Logging error from issigned in',err);
           // resolve({success:false});    }
            reject(err)}
            );
    });
  };

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${apiUrl}/users/authenticate`, requestOptions)
        .then(helperService.handleResponse)
        .then(async user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
           await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));        
            return user;
        });
}

 function logout() {
    return new Promise(async(resolve,reject)=>{
       await AsyncStorage.removeItem(USER_KEY).then(res=>resolve(true)).catch(err=>reject(err));
    })
    // remove user from local storage to log user out
  
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users`, requestOptions).then(helperService.handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(helperService.handleResponse);
}

async function get() {
    console.log('calling user get method');
    const requestOptions = {
        method: 'GET',
        headers:await authHeader()
    };
  var json=  await AsyncStorage.getItem(USER_KEY);
  var user=JSON.parse(json);
  return fetch(`${apiUrl}/users/${user.id}`, requestOptions).then(helperService.handleResponse);
}

async function  categories() {
    const requestOptions = {
        method: 'GET',
        headers:await authHeader()
    };

console.log(requestOptions);
    return fetch(`${apiUrl}/categories/`, requestOptions).then(helperService.handleResponse);
    
}


function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(user)      
    }; 
    return fetch(`${apiUrl}/users/register`, requestOptions).then(helperService.handleResponse);
       
}

function verifyOTP(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(user)       
    };
    return fetch(`${apiUrl}/users/verifyOTP`, requestOptions).then(helperService.handleResponse);
}


async function setProfilePicture(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ... await authHeader(), 'Content-Type': 'multipart/form-data' } ,
        body: user.data   
    };
    return fetch(`${apiUrl}/users/updatePhoto/${user.id}`, requestOptions).then(helperService.handleResponse);
}

async function setFirebaseToken(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ... await authHeader(),  'Content-Type': 'application/json'} ,
        body: JSON.stringify(user)   
    };
    return fetch(`${apiUrl}/users/setToken`, requestOptions).then(helperService.handleResponse);
}

async function update(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ... await authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)     
    };

    return fetch(`${apiUrl}/users/update`, requestOptions).then(helperService.handleResponse);;
}
function setPassword(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)     
    }; 
    return fetch(`${apiUrl}/users/setPassword`, requestOptions).then(helperService.handleResponse).then(async user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
       await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));        
       return user;
    });;    

}

async function changePassword(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ... await authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)     
    };

    return fetch(`${apiUrl}/users/changePassword`, requestOptions).then(helperService.handleResponse);;
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/users/${id}`, requestOptions).then(helperService.handleResponse);
}
 async function forgetPassword(data) {
     
     const res={username:data};
    const requestOptions = {
        method: 'POST',
        headers: {  'Content-Type': 'application/json' },
        body: JSON.stringify(res)
    };
    console.log(requestOptions);
    return fetch(`${apiUrl}/users/forgetPassword`, requestOptions).then(helperService.handleResponse);
}

async function saveSetting(data) {
    //console.log("Settingdata:",data)
    const requestOptions = {
        method: 'POST',
        headers: {  'Content-Type': 'application/json',...await authHeader() },
        body: JSON.stringify(data)
    };

    return fetch(`${apiUrl}/users/saveSetting`, requestOptions).then(helperService.handleResponse);
}

async function getSetting(id) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/users/getSetting/${id}`, requestOptions).then(helperService.handleResponse);
}