import { authHeader } from '../Store';
import {helperService} from "./helper.service"
import {apiUrl} from "../Constants"

export const followService = {      
    getFollow,
    follow,
    unfollow
   };

async function getFollow(userId) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/friends?userId=${userId}`, requestOptions).then(helperService.handleResponse);
}
async function follow(data) {
    const  requestOptions = {
        method: 'POST',
        headers: { 'Content-Type':"application/json",  ... await authHeader()},
        body: JSON.stringify(data)
    };
    return fetch(`${apiUrl}/friends/follow`, requestOptions).then(helperService.handleResponse);    
}
async function unfollow(data) {
    const  requestOptions = {
        method: 'POST',
        headers: { 'Content-Type':"application/json",  ... await authHeader()},
        body: JSON.stringify(data)
    };
    return fetch(`${apiUrl}/friends/unfollow`, requestOptions).then(helperService.handleResponse);    
}