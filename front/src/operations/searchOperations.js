import Axios from 'axios';
import searchAction from '../actions';

export const search = (title, ndc)=> {
  return async (dispatch, getstate) => {
    const state = getstate();

    const response = await Axios.get("http://localhost:8000/api/collection/search/?title="+encodeURIComponent(title)+"&ndc="+ndc)
    .then(res => res.data)
    .catch(() => null)
    const numberOfRecords = response.numberOfRecords;
    const result = response.result;

    dispatch(searchAction({
      'numberOfRecords': numberOfRecords,
      'result': result,
    }))
  }
}