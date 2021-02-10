
import { authHeader } from '../Store';
import {AsyncStorage} from "react-native";
import {helperService} from "./helper.service"
import {apiUrl,USER_KEY} from "../Constants"

export const postService = {
       addPost,
       removePost,
       getAll,
       getRelevants,
       getById,
       getMyPosts,
       getByCategory,
       getBySubCategory,
       addReview,
       getReviews,
       markAsSold
   };

async function addPost(data) {
       const  requestOptions = {
        method: 'POST',
        headers: { 'Accept':"application/json", ...await authHeader(),   'Content-Type' : 'multipart/form-data', },
        body: data
    };
    return await fetch(`${apiUrl}/posts/create`, requestOptions)
        .then(helperService.handleResponse)
        .then(post => {       
           
            return post;
        }).catch(err=>{console.log(err)});
}

async function addReview(data) {
    const  requestOptions = {
     method: 'POST',
     headers: { 'Accept':"application/json", ...await authHeader() },
     body: data
 };
 return await fetch(`${apiUrl}/reviews/add`, requestOptions)
     .then(helperService.handleResponse)
     .then(review => {       
         return review;
     }).catch(err=>{console.log(err)});
}
async function getReviews(userId,postId) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/reviews?userId=${userId}&postId=${postId}`, requestOptions).then(helperService.handleResponse).catch(err=>{console.log(err)});
}

async function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/posts`, requestOptions).then(helperService.handleResponse).catch(err=>{console.log(err)});
}

async function getRelevants(userId,latitude,longitude) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/posts/getRelevant?userId=${userId}&latitude=${latitude}&longitude=${longitude}`, requestOptions).then(helperService.handleResponse).catch(err=>{console.log(err)});
}

async function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/posts/${id}`, requestOptions).then(helperService.handleResponse).catch(err=>{console.log(err)});
}

//id will be the user id
async function getMyPosts(id) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/posts/myposts/${id}`, requestOptions).then(helperService.handleResponse).catch(err=>{console.log(err)});
}

//id will be the ctegory id
async function getByCategory(id) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/posts?categoryId=${id}`, requestOptions).then(helperService.handleResponse).catch(err=>{console.log(err)});
}
//id will be the subcategory id
async function getBySubCategory(id) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/posts?subcategoryId=${id}`, requestOptions).then(helperService.handleResponse).catch(err=>{console.log(err)});
}

async function removePost(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/posts/${id}`, requestOptions).then(helperService.handleResponse).catch(err=>{console.log(err)});
}

async function markAsSold(data){
    console.log("MarkData:",data)
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type':"application/json", ...await authHeader()},
        body:JSON.stringify(data)
        
    };
    return fetch(`${apiUrl}/posts/markAsSold`, requestOptions).then(helperService.handleResponse).catch(err=>{console.log(err)});
}