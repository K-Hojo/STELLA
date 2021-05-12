import * as Actions from './actions';

export const SearchReducer = (state = {}, action) => {
  switch (action.type) {
    case Actions.SEARCH:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}