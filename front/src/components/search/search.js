import React from 'react';
import { useDispatch } from 'react-redux';
import {search} from '../../operations/searchOperations';

import Material from './material';
import Add from './add';

import SearchForm from './SearchForm'

/*
dispatchを入れる
*/
const Search = () => {
  const dispatch = useDispatch;
    return(
      <div>
        <h1>NDC横断検索</h1>
        <SearchForm onSubmit={values => {
          console.log(values)
          dispatch(search(values))
        }} />
      </div>
    )
}

export default Search;