import { authHeader } from '../Store';
import {helperService} from "./helper.service"
import {apiUrl} from "../Constants"

export const conversationService = {  
    addNew,    
    getByUserId,
    getById,
    getConversationById,
    blockUser,
    unblockUser,
    getBlockedUsers,
    _delete,
    
   };

async function getByUserId(id) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/conversations?userId=${id}`, requestOptions).then(helperService.handleResponse);
}
async function getById(uid,id) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/conversations?userId=${uid}&conversationId=${id}`, requestOptions).then(helperService.handleResponse);
}

async function getConversationById(userId,postId,sellerId,buyerId) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/conversations/getById?userId=${userId}&sellerId=${sellerId}&buyerId=${buyerId}&postId=${postId}`, requestOptions).then(helperService.handleResponse);
}
async function addNew(data) {
    const requestOptions = {
        method:'POST',
        headers: { 'Content-Type':"application/json",  ... await authHeader()},
        body: JSON.stringify(data)
    };
    return fetch(`${apiUrl}/conversations/add`, requestOptions).then(helperService.handleResponse);
}

async function blockUser(data) {
    const requestOptions = {
        method:'POST',
        headers: { 'Content-Type':"application/json",  ... await authHeader()},
        body: JSON.stringify(data)
    };
    return fetch(`${apiUrl}/conversations/blockUser`, requestOptions).then(helperService.handleResponse);
}

async function getBlockedUsers(id) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/conversations/getBlockedUser/${id}`, requestOptions).then(helperService.handleResponse);
}

async function unblockUser(data) {
    const requestOptions = {
        method:'POST',
        headers: { 'Content-Type':"application/json",  ... await authHeader()},
        body: JSON.stringify(data)
    };
    return fetch(`${apiUrl}/conversations/unblockUser`, requestOptions).then(helperService.handleResponse);
}

async function _delete(data) {
    const requestOptions = {
        method:'POST',
        headers: { 'Content-Type':"application/json",  ... await authHeader()},
        body: JSON.stringify(data)
    };
    return fetch(`${apiUrl}/conversations/delete`, requestOptions).then(helperService.handleResponse);
}