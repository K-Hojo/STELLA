import * as Actions from './actions'

export const searchReducer = (state,action) => {
  switch (action.type) {
    case Actions.TITLE:
      return {
        ...state,
        ...action.payload
      };
    case Actions.NDC:
      return {
        ...state,
        ...action.payload
      };
    default:
      return {
        ...state,
      };
  }
}

export const collectionReducer = (state,action) => {
  switch (action.type) {
    case Actions.INIT_COL:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.ADD_COL:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.DELETE_COL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export const detailReducer = (state,action) => {
  switch (action.type) {
    case Actions.ADD_DET:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.DELETE_DET:
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