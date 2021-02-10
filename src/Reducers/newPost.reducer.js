import { newpostConstants } from '../Constants';

export function newPost(state = {}, action) {
  switch (action.type) { 
            case newpostConstants.ADD_VIDEOS_REQUEST:
            return {
            ...state,  loading: true
            };
          case newpostConstants.ADD_VIDEOS_SUCCESS:
            return {...state, loading: false,videos:action.videos};
          
          case newpostConstants.ADD_VIDEOS_FAILURE:
            return { 
              ...state,  error: action.error
            };     

            case newpostConstants.ADD_PHOTOS_REQUEST:
              return {
              ...state,  loading: true
              };
            case newpostConstants.ADD_PHOTOS_SUCCESS:
              return {...state, loading: false,images:action.images};

            
            case newpostConstants.ADD_PHOTOS_FAILURE:
              return { 
                ...state,  error: action.error
              };                 
              
              case newpostConstants.ADD_MEDIAS_SUCCESS:
                return {...state,medias:action.medias};

                case newpostConstants.ADD_POST_TITLE:
                return {...state,title:action.title};

                case newpostConstants.ADD_POST_DESCRIPTION:
                  return {...state,description:action.description};

                  case newpostConstants.ADD_POST_PRICE:
                    return {...state,price:action.price};
                    case newpostConstants.ADD_POST_PARAMS:
                    return {...state,parameters:action.params};
                    case newpostConstants.ADD_NEW_POST_REQUEST:                    
                        return {...state,loading:true}
                        case newpostConstants.ADD_NEW_POST_SUCCESS:                    
                        return {...state,loading:false,success:true}
                        case newpostConstants.ADD_NEW_POST_FAILURE:                    
                        return {...state,loading:false,success:false}        

            case newpostConstants.CLEAR:
              {}
    default:
      return state
  }
}