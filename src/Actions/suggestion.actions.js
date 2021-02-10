import {suggestionConstants } from '../Constants';
import { suggestionService } from '../Services';
import { alertActions } from './alert.actions';

export const  suggestionActions = {     
    getAll,
    clear
};


function getAll(query) {
    return dispatch => {
        dispatch(request());
        suggestionService.getAll(query)
            .then(
                suggestions => dispatch(success(suggestions)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: suggestionConstants.GET_SUGGESTIONS_REQUEST } }
    function success(suggestions) { return { type: suggestionConstants.GET_SUGGESTIONS_SUCCESS, suggestions } }
    function failure(error) { return { type: suggestionConstants.GET_SUGGESTIONS_FAILURE, error } }
}

function clear() {
    return { type: suggestionConstants.CLEAR };
}

// prefixed function name with underscore because delete is a reserved word in javascript
