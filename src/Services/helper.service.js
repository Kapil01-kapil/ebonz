import { authHeader } from '../Store';
import {AsyncStorage} from "react-native";
import {apiUrl,USER_KEY} from "../Constants"
export const helperService = {handleResponse}

async function logout() {
    // remove user from local storage to log user out
   await AsyncStorage.removeItem(USER_KEY);
}
function handleResponse(response) {
    return response.text().then(text => {
         const data = text && JSON.parse(text);
        
        //const data = text;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                console.log("Logout Called");
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
        
            return Promise.reject(error);
        }

        return data;

    });
}
