import { favoriteConstants } from '../Constants';

export function favorites(state = {}, action) {

  switch (action.type) { 
          case favoriteConstants.GET_FAVORITE_REQUEST:
            return { loading: true};
          case favoriteConstants.GET_FAVORITES_SUCCESS:
            return action.favorites;          
          case favoriteConstants.GET_FAVORITES_FAILURE:
            return { error: action.error }; 

            case favoriteConstants.ADD_FAVORITE_CATEGORY_REQUEST:
              return {...state, loading: true};

            case favoriteConstants.ADD_FAVORITE_CATEGORY_SUCCESS:
              return {...state,favorite: action.favorites};  

            case favoriteConstants.ADD_FAVORITE_CATEGORY_FAILURE:
              return {...state, error: action.error };  

              case favoriteConstants.REMOVE_FAVORITE_CATEGORY_REQUEST:
                return {...state, loading: true};
                
              case favoriteConstants.REMOVE_FAVORITE_CATEGORY_SUCCESS:

                const remainingsSub=state.subcategories&&state.subcategories.filter((item)=>{
                  return item._id!==action.subcategoryId
                })
                return {...state,subcategories:remainingsSub};   
               // return {...state,favorite: action.favorites};  
  
              case favoriteConstants.REMOVE_FAVORITE_CATEGORY_FAILURE:
                return {...state, error: action.error };

            case favoriteConstants.ADD_FAVORITE_REQUEST:
                return { ...state,loading: true};

              case favoriteConstants.ADD_FAVORITE_SUCCESS:
               
                return {...state,posts: [...state.posts,action.favorite]};  
               

              case favoriteConstants.ADD_FAVORITE_FAILURE:
                return {...state, error: action.error };   

                case favoriteConstants.REMOVE_FAVORITE_REQUEST:
                  return { ...state,loading: true};
  
                case favoriteConstants.REMOVE_FAVORITE_SUCCESS:
                const remainings=state.posts&&state.posts.filter((item)=>{
                    return item._id!==action.postId
                  })
                  return {...state,posts:remainings};   
  
                case favoriteConstants.REMOVE_FAVORITE_FAILURE:
                  return {...state, error: action.error }; 
            case favoriteConstants.CLEAR:
              {}
    default:
      return state
  }
}