import { userConstants } from '../Constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };

      case userConstants.GET_USER_REQUEST:
        return {
          loading: true
        };
      case userConstants.GET_USER_SUCCESS:
        return {...state,"currentUser": action.user.user}
      case userConstants.GET_USER_FAILURE:
        return { 
          error: action.error
        };

        case userConstants.UPLOAD_PHOTO_REQUEST:
            return {
            ...state,  loading: true
            };
          case userConstants.UPLOAD_PHOTO_SUCCESS:
            return {...state,  loading: false,"currentUser": {...state.currentUser,thumbnail:action.user.thumbnail}}
          case userConstants.UPLOAD_PHOTO_FAILURE:
            return { 
              ...state,  error: action.error
            };

        case userConstants.FORGET_PASSWORD_REQUEST:
          return {
            loading: true
          };
        case userConstants.FORGET_PASSWORD_SUCCESS:
          return {...state,forgetPassword: action.user}
        case userConstants.FORGET_PASSWORD_FAILURE:
          return { 
            error: action.error
          };

          case userConstants.CHANGE_PASSWORD_REQUEST:
            return {
              loading: true
            };
          case userConstants.CHANGE_PASSWORD_SUCCESS:
            return {...state,changePassword: action.user}
          case userConstants.CHANGE_PASSWORD_FAILURE:
            return { 
              error: action.error
            };

            case userConstants.SAVE_SETTING_REQUEST:
              return {...state,
                loading: true
              };
            case userConstants.SAVE_SETTING_SUCCESS:
              return {...state,saveSetting: action.data,loading:false}
            case userConstants.SAVE_SETTING_FAILURE:
              return { 
                error: action.error,loading:false
              };

              case userConstants.GET_SETTING_REQUEST:
                return {...state,
                  loading: true
                };
              case userConstants.GET_SETTING_SUCCESS:
                return {...state,setting: action.setting,loading:false}
              case userConstants.SAVE_SETTING_FAILURE:
                return { ...state,
                  error: action.error,loading:false
                };

        case userConstants.CLEAR:
          return {}
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}