import Axios from 'axios';
import {searchAction} from '../actions/searchActions';

export const search = (values)=> {
  return async (dispatch) => {

    const response = await Axios.get("http://localhost:8000/api/collection/search/?title="+encodeURIComponent(values.title)+"&ndc="+values.ndc)
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