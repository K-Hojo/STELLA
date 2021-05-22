import Axios from 'axios';
import {searchAction} from './actions';

import { CollectionUrls } from '../collection/urls'

export const search = (values)=> {
  return async (dispatch) => {
    const searchUrl = CollectionUrls.SEARCH + "?title="+encodeURIComponent(values.title)+"&ndc="+values.ndc

    const response = await Axios.get(searchUrl)
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