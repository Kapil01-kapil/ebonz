import { postConstants } from '../Constants';

export function posts(state = {}, action) {
  switch (action.type) { 
            case postConstants.GETALL_POST_REQUEST:
            return {
              loading: true
            };
          case postConstants.GETALL_POST_SUCCESS:
            return action.posts;
          
          case postConstants.GETALL_POST_FAILURE:
            return { 
              error: action.error
            };
           
            case postConstants.GET_USER_POST_REQUEST:
              return {
                ...state,
               loading:true
              };
            case postConstants.GET_USER_POST_SUCCESS:
              return {
                ...state,  
               userPosts : action.posts
              };
            case postConstants.GET_USER_POST_FAILURE:
              return {
               error:action.error
              };

          case postConstants.GET_MYPOSTS_REQUEST:
            return {...state,loading:true}
          case postConstants.GET_MYPOSTS_SUCCESS:
            return{ ...state,  
                myposts: action.posts
            };
            case postConstants.GET_MYPOSTS_FAILURE:
                return { 
                  error: action.error
                };
                
                case postConstants.ADD_MYPOST_REQUEST:
                  return {...state,loading:true}
                case postConstants.ADD_MYPOST_SUCCESS:
                  return{ ...state,  
                      myposts: [...state.myposts,action.post]
                  };
                  case postConstants.ADD_MYPOST_FAILURE:
                      return { ...state,
                        error: action.error
                      };    


                case postConstants.REMOVE_POST_REQUEST:
                  return {...state,loading:true}
                case postConstants.REMOVE_POST_SUCCESS:
                   

                const posts=  state.myposts.filter((post)=>{return post._id!=action.postId})
                  return{ ...state,  
                      myposts: posts
                  };
                  case postConstants.REMOVE_POST_FAILURE:
                      return { ...state,
                        error: action.error
                      }; 

                case postConstants.GET_REVIEWS_REQUEST:
                  return {...state,loading:true}
                case postConstants.GET_REVIEWS_SUCCESS:
                  return{ ...state,  
                      reviews: action.reviews
                  };
                  case postConstants.GET_REVIEWS_FAILURE:
                      return { 
                        error: action.error
                      };                  

            case postConstants.GET_BY_CATEGORY_REQUEST:
                  return {...state,loading:true}
            case postConstants.GET_BY_CATEGORY_SUCCESS:
                  return{ ...state,  
                      search_results: action.posts
                  };
            case postConstants.GET_BY_CATEGORY_FAILURE:
                      return { 
                        error: action.error
                      }; 

            case postConstants.GET_BY_SUBCATEGORY_REQUEST:
                        return {...state,
                          loading:true}
            case postConstants.GET_BY_SUBCATEGORY_SUCCESS:
              return{ ...state,  
                search_results: action.posts
                     };
            case postConstants.GET_BY_SUBCATEGORY_FAILURE:
              return { 
                      error: action.error
                     };            
                
                     case postConstants.MARK_AS_SOLD_REQUEST:
                      return{...state,loading:true};
      
                      case postConstants.MARK_AS_SOLD_SUCCESS:
                        
                        return state;
                        
                        case postConstants.MARK_AS_SOLD_FAILURE:
                          return {...state,error:action.error} ;  

                          case postConstants.GET_FILTERED_POST_REQUEST:
                            return {...state,
                              loading:true}
                case postConstants.GET_FILTERED_POST_SUCCESS:
                  return{ ...state,  
                    search_results: action.posts
                         };
                case postConstants.GET_FILTERED_POST_FAILURE:
                  return { 
                          error: action.error
                         };       


            case postConstants.CLEAR:
              {}
    default:
      return state
  }
}