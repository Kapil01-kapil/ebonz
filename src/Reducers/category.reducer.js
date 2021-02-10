import { categoryConstants } from '../Constants';

export function categories(state = {}, action) {
  switch (action.type) {
  
        case categoryConstants.GET_CATEGORIES_REQUEST:
          return {
            loading: true
          };
        case categoryConstants.GET_CATEGORIES_SUCCESS:
          return {all: action.categories};
        case categoryConstants.GET_CATEGORIES_FAILURE:
          return { 
            error: action.error
          };
        case categoryConstants.SET_SELECTED_CATEGORY:
          categ=state.all.find(category =>
            category._id === action.id
              ?category
              : ""
          )       ;
          return{...state,    
              selectedCategory: categ
          };  

          case categoryConstants.SET_SELECTED_SUBCATEGORY:

          console.log('SETTING SELECTED SUBCATEGORY', state.selectedCategory.subcategories)
              categ=state.selectedCategory.subcategories.find(category =>
                category._id == action.id
                  ?category
                  : ""
              );
              console.log('FILTERED RESULT',categ);
              return{...state,    
                  selectedSubCategory: categ
              };  
        case categoryConstants.CLEAR:
          return {};    
   
    default:
      return state
  }
}