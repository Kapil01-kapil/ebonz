import {filterConstants} from "../Constants"

export function filters(state= {},action) {
    switch (action.type){

        case filterConstants.GET_FILTERS_REQUEST:
        return {loading:true};
        case filterConstants.GET_FILTERS_SUCCESS:
         return {...state,filters:action.filters} ;
        case filterConstants.GET_FILTERS_FAILURE:
         return {...state,error:action.error} ;  
         
         case filterConstants.ADD_FILTERS_REQUEST:
            return {loading:true,...state};
            case filterConstants.ADD_FILTERS_SUCCESS:
                return {...state,filters:action.filters} ;
            case filterConstants.ADD_FILTERS_FAILURE:
                return {...state,error:action.error} ;          
        default:
        return state
    }
}