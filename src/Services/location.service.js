//import config from 'config';
import { authHeader } from '../Store';
import {AsyncStorage} from "react-native";
import {helperService} from "./helper.service"
import {apiUrl,USER_KEY} from "../Constants"

export const locationService = {   
    getStates, getCities  
};

async function  getStates() {
    const requestOptions = {
        method: 'GET',
        headers:await authHeader()
    };
    return fetch(`${apiUrl}/locations?countryId=101`, requestOptions).then(helperService.handleResponse);    
}

async function  getCities(id) {
    const requestOptions = {
        method: 'GET',
        headers:await authHeader()
    };
    return fetch(`${apiUrl}/locations?stateId=${id}`, requestOptions).then(helperService.handleResponse);    
}