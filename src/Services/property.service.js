//import config from 'config';
import { authHeader } from '../Store';
import {AsyncStorage} from "react-native";
import {helperService} from "./helper.service"
import {apiUrl,USER_KEY} from "../Constants"

export const propertyService = {
       addProperty,
       getAll,
       getById
   };

async function addProperty(data) {
       const  requestOptions = {
        method: 'POST',
        headers: { 'Accept':"application/json", ...await authHeader(),   'Content-Type' : 'multipart/form-data', },
        body: data
    };
    return await fetch(`${apiUrl}/properties/create`, requestOptions)
        .then(helperService.handleResponse)
        .then(property => {       
            return property;
        }).catch(err=>{console.log(err)});
}

async function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/properties`, requestOptions).then(helperService.handleResponse);
}

async function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/properties/${id}`, requestOptions).then(helperService.handleResponse);
}