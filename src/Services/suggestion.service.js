import { authHeader } from '../Store';
import {helperService} from "./helper.service"
import {apiUrl} from "../Constants"

export const suggestionService = {      
       getAll
   };

async function getAll(query) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/suggestions?query=${query}`, requestOptions).then(helperService.handleResponse);
}

