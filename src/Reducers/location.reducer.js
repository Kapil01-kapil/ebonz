import {locationConstants} from "../Constants"

export function locations(state= {},action) {
    switch (action.type){
        case locationConstants.GET_STATES_REQUEST:
        return {loading:true};
        case locationConstants.GET_STATES_SUCCESS:
         return  {states:action.states};
        case locationConstants.GET_STATES_FAILURE:
         return {error:action.error};

         case locationConstants.GET_CITIES_REQUEST:
         return {...state, loading:true};
         case locationConstants.GET_CITIES_SUCCESS:
         return  {...state,cities:action.cities} ;
         case locationConstants.GET_CITIES_FAILURE:
         return {...state,error:action.error};
         
        default:
        return state
    }
}