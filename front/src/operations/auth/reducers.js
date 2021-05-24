import * as Actions from './actions'

export const initialState = {token: '', isAuthenticated: false}

export const authReducer = (state,action) => {
  switch (action.type) {
    case Actions.LOGIN:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.LOGOUT:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return {
        ...state,
      };
  }
}