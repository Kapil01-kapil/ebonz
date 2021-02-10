import { categoryConstants } from '../Constants';
import { categoryService } from '../Services';
import { alertActions } from './alert.actions';


export const  categoryActions = {
    
    categories,clear,setSelected,selectSubcategory
   
};


function setSelected(categoryId) {
    return dispatch=>{dispatch({ type: categoryConstants.SET_SELECTED_CATEGORY,id:categoryId  })}

    
   
}
function selectSubcategory(subcategoryId) {
    console.log('Logging from reducer',subcategoryId)
    return dispatch=>{dispatch({ type: categoryConstants.SET_SELECTED_SUBCATEGORY,id:subcategoryId  })}

    
   
}


function categories() {
    return dispatch => {
        dispatch(request());

        categoryService.categories()
            .then(
                categories=> dispatch(success(categories)),
                error => {dispatch(failure(error.toString())); 
                       dispatch(alertActions.error(error.toString()));  }
            );
    };

    function request() { return { type: categoryConstants.GET_CATEGORIES_REQUEST } }
    function success(categories) { return { type: categoryConstants.GET_CATEGORIES_SUCCESS, categories } }
    function failure(error) { return { type: categoryConstants.GET_CATEGORIES_FAILURE, error } }
}

function clear() {
    return { type: categoryConstants.CLEAR };
}
// prefixed function name with underscore because delete is a reserved word in javascript
