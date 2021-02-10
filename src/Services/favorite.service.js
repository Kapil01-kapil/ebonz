
import { authHeader } from '../Store';
import {AsyncStorage} from "react-native";
import {helperService} from "./helper.service"
import {apiUrl,USER_KEY} from "../Constants"


export const favoriteService = {
       add,
       addSubCategory,
       removeSubCategory,
       getAll,
       remove,
       getFavorites,
   };

async function add(data) {
       const  requestOptions = {
        method: 'POST',
        headers: { 'Content-Type':"application/json",  ... await authHeader()},
        body: JSON.stringify(data)
    };
   console.log('logging request options...',requestOptions);
    return await fetch(`${apiUrl}/favorites/add`, requestOptions)
        .then(helperService.handleResponse);
       
}
async function addSubCategory(data) {
    const  requestOptions = {
     method: 'POST',
     headers: { 'Content-Type':"application/json",  ... await authHeader()},
     body: JSON.stringify(data)
 };

 return await fetch(`${apiUrl}/favorites/addSubCategory`, requestOptions)
     .then(helperService.handleResponse);
    
}

async function removeSubCategory(data) {
    const  requestOptions = {
     method: 'POST',
     headers: { 'Content-Type':"application/json",  ... await authHeader()},
     body: JSON.stringify(data)
 };

 return await fetch(`${apiUrl}/favorites/removeSubCategory`, requestOptions)
     .then(helperService.handleResponse);
    
}

async function getAll(userId) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/favorites/${userId}`, requestOptions).then(helperService.handleResponse);
}

async function remove(data) {

    
    const  requestOptions = {
        method: 'POST',
        headers: { 'Content-Type':"application/json",  ... await authHeader()},
        body: JSON.stringify(data)
    };
    return fetch(`${apiUrl}/favorites/remove`, requestOptions).then(helperService.handleResponse);    
}

async function getFavorites(id) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/favorites?id=${id}&posts=true&subcategories=true`, requestOptions).then(helperService.handleResponse);
}
