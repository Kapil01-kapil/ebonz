import {followConstants} from "../Constants"

export function follow(state= {},action) {
    switch (action.type){
        case followConstants.ADD_FOLLOW_REQUEST:
        return {loading:true};
        case followConstants.ADD_FOLLOW_SUCCESS:
         return  {} ;
        case followConstants.ADD_FOLLOW_FAILURE:
         return ;
        case followConstants.GET_FOLLOW_REQUEST:
         return {loading:true} ;
        case followConstants.GET_FOLLOW_SUCCESS:
         return {follows:action.follow} ;
         case followConstants.GET_FOLLOW_FAILURE:
            return {follows:action.error} ;;    
        default:
        return state
    }
}