
import { authHeader } from '../Store';
import {helperService} from "./helper.service"


export const imageService = {
   getImage
};

// function getImage(path) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     };
//     return fetch(path.replace("localhost","192.168.1.18"), requestOptions).then(helperService.handleResponse); 
    
// }

async function getImage(path) {
    const requestOptions = {
        method: 'GET',    
        headers:await authHeader()
    };
    //console.log(await fetch(path.replace("localhost","192.168.1.3"), requestOptions).then(res=>res));
    //return fetch(path.replace("localhost","192.168.1.3"), requestOptions).then(helperService.handleResponse); 
  return path.replace("localhost","192.168.1.3");
}

