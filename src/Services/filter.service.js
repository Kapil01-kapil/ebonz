import { authHeader } from '../Store';
import {helperService} from "./helper.service"
import {apiUrl} from "../Constants"

export const filterService = {      
    get,
    add
   };

async function get(userId) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/filters?userId=${userId}`, requestOptions).then(helperService.handleResponse);
}
async function add(data) {
    const requestOptions = {
        method: 'POST',
        headers: { ... await authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    console.log('Logging data before sending')
    console.log(data)
    return fetch(`${apiUrl}/filters/add`, requestOptions).then(helperService.handleResponse);
}