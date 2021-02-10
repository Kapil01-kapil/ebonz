//import config from 'config';
import { authHeader } from '../Store';
import {AsyncStorage} from "react-native";
import {helperService} from "./helper.service"
import {apiUrl,USER_KEY} from "../Constants"

export const categoryService = {   
    categories  
};

async function  categories() {
    const requestOptions = {
        method: 'GET',
        headers:await authHeader()
    };
    return fetch(`${apiUrl}/categories/`, requestOptions).then(helperService.handleResponse);
    
}

