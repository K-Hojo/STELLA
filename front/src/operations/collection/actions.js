export const TITLE = 'TITLE';
export const titleAction = (e) => {
  return {
    type: 'TITLE',
    payload: {
      title: e.target.value,
    }
  }
}

export const NDC = 'NDC';
export const ndcAction = (e) => {
  return {
    type: 'NDC',
    payload: {
      ndc: e.target.value,
    }
  }
}

export const INIT_COL = 'INIT_COL';
export const initAction = (data) => {
  return {
    type: 'INIT_COL',
    payload: {
      ...data
    }
  }
}

export const ADD_COL = 'ADD_COL';
export const addColAction = (list) => {
  return {
    type: 'ADD',
    payload: {
      results: list
    }
  }
}

export const ADD_DET = 'ADD_DET';
export const addDetAction = (list) => {
  return {
    type: 'ADD',
    payload: {
      books: list
    }
  }
}

export const DELETE_COL = 'DELETE_COL';
export const deleteColAction = (list) => {
  return {
    type: 'DELETE_COL',
    payload: {
      results: list
    }
  }
}

export const DELETE_DET = 'DELETE_DET';
export const deleteDetAction = (list) => {
  return {
    type: 'DELETE_DET',
    payload: {
      books: list
    }
  }
}
