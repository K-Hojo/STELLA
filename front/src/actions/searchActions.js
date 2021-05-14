export const INPUT_TITLE = 'INPUT_TITLE';
export const inputTitleAction = (inputState) => {
  return {
    type: 'INPUT_TITLE',
    payload: {
      title: inputState.title,
    }
  }
}

export const SEARCH = 'SEARCH';
export const searchAction = (searchState) => {
  return {
    type: 'SEARCH',
    payload: {
      numberOfRecords: searchState.numberOfRecords,
      result: searchState.result,
    }
  }
}
