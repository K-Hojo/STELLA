import * as Actions from '../actions/searchActions';
// import initialState from '../store/initialstate';

export const SearchReducer = (state = {}, action) => {
  switch(action.type){
    case Actions.INPUT_TITLE:
      return {
        ...state,
        ...action.payload
      }
    case Actions.SEARCH:
      return {
        ...state,
        ...action.payload,
      }
  }
}