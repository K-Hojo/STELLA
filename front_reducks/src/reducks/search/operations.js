import Axios from 'axios';
import {searchAction} from './actions';

export const search = (values)=> {
  return async (dispatch) => {
    const searchUrl = "http://localhost:8000/api/collection/search/?title="+encodeURIComponent(values.title)+"&ndc="+values.ndc

    const response = await Axios.get(searchUrl)
    .then(res => res.data)
    .catch(() => null)
    const numberOfRecords = response.numberOfRecords;
    const result = response.result;
    // console.log(numberOfRecords)

    dispatch(searchAction({
      'numberOfRecords': numberOfRecords,
      'result': result,
    }))
  }
}