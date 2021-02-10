import { authHeader } from '../Store';
import {helperService} from "./helper.service"
import {apiUrl} from "../Constants"

export const notificationService = {      
    get,
    deleteNotifications,
    readNotifications
   };


async function get(userId) {
    const requestOptions = {
        method: 'GET',
        headers: await authHeader()
    };
    return fetch(`${apiUrl}/notifications?userId=${userId}`, requestOptions).then(helperService.handleResponse);
}
async function deleteNotifications(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ... await authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${apiUrl}/notifications/delete`, requestOptions).then(helperService.handleResponse);
}

async function readNotifications(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ... await authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`${apiUrl}/notifications/markAsRead`, requestOptions).then(helperService.handleResponse);
}