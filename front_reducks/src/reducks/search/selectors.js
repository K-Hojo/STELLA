import {createSelector} from 'reselect';


const searchSelector = state => state.search;

export const getResult = createSelector(
  [searchSelector],
  state => state.result
)

export const getNumber = createSelector(
  [searchSelector],
  state => state.numberOfRecords
)