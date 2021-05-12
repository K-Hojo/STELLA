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