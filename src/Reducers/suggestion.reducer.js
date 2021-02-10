import { suggestionConstants } from '../Constants';

export function suggestions(state = {}, action) {

  switch (action.type) { 
          case suggestionConstants.GET_SUGGESTIONS_REQUEST:
            return { loading: true};
          case suggestionConstants.GET_SUGGESTIONS_SUCCESS:
            return action.suggestions;          
          case suggestionConstants.GET_SUGGESTIONS_FAILURE:
            return { error: action.error };            
                 
            case suggestionConstants.CLEAR:
              {}
    default:
      return state
  }
}