import {filterConstants } from '../Constants';
import { filterService } from '../Services';
import { alertActions } from './alert.actions';

export const  filterActions = { 
    add,
    get,   
    clear
};


function add(data) {
    return dispatch => {
        dispatch(request());
        filterService.add(data)
            .then(
                result => {
                    if(result.success){
                        dispatch(success(result.filters));         
                    }                            
                },
                error =>{              
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: filterConstants.ADD_FILTERS_REQUEST } }
    function success(filters) { return {type: filterConstants.ADD_FILTERS_SUCCESS, filters } }
    function failure(error) { return {type: filterConstants.ADD_FILTERS_FAILURE,error } }
}

function get(uid)
{
    return dispatch => {
        dispatch(request());
        filterService.get(uid)
            .then(
                filters => dispatch(success(filters)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { 
        return { type: filterConstants.GET_FILTERS_REQUEST }
     }
    function success(filters) { 
        return { type: filterConstants.GET_FILTERS_SUCCESS,filters:filters.filters}
     } 
    function failure(error) { 
        return { type: filterConstants.GET_FILTERS_FAILURE, error } 
    }
}

function clear() {
    return { type: followConstants.CLEAR };
}

// prefixed function name with underscore because delete is a reserved word in javascript
