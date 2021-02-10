import {locationConstants } from '../Constants';
import { locationService } from '../Services';
import { alertActions } from './alert.actions';


export const  locationActions = { 
    getStates,
    getCities,   
    clear
};


function getStates() {
    return dispatch => {
        dispatch(request());
        locationService.getStates()
            .then(
                data => {
                  
                    if(data.success)
                   { 
                       dispatch(success(data.states));
                   }                
                },
                error =>{                  
                    dispatch(failure(error.toString()));}
            );
    };

    function request() { return { type: locationConstants.GET_STATES_REQUEST } }
    function success(states) { return { type: locationConstants.GET_STATES_SUCCESS, states } }
    function failure(error) { return { type: locationConstants.GET_STATES_FAILURE, error } }
}

function getCities(id) {
    return dispatch => {
        dispatch(request());
        locationService.getCities(id)
            .then(
                data => {
                    if(data.success)
                   { 
                       dispatch(success(data.cities));
                   }                
                },
                error =>{                  
                    dispatch(failure(error.toString()));}
            );
    };

    function request() { return { type: locationConstants.GET_CITIES_REQUEST } }
    function success(cities) { return { type: locationConstants.GET_CITIES_SUCCESS, cities } }
    function failure(error) { return { type: locationConstants.GET_CITIES_FAILURE, error } }
}




function clear() {
    return { type: locationConstants.CLEAR };
}

// prefixed function name with underscore because delete is a reserved word in javascript
