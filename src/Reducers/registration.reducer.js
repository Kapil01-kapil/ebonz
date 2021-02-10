import { userConstants } from '../Constants';

export function registration(state = {}, action) {
console.log('Logging action type from Registration....',action.type);

  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      console.log(action);
      return {registered:true,user:action.user};
    case userConstants.REGISTER_FAILURE:
      return {};
      case userConstants.OTP_REQUEST:         
        return {verifying:true};
       case userConstants.OTP_SUCCESS:     
       console.log('Logging success case',action);    
         return {verified:true,user:action.user}; 
        case userConstants.OTP_FAILURE:
          return {verified:false,};
          case userConstants.CLEAR:
            return {};
    default:
      return state
  }
}