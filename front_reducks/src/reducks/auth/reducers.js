import * as Actions from './actions';

export const AuthReducer = (state= {}, action) => {
  switch (action.type) {
    case Actions.LOGIN:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
