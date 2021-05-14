import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNumber, getResult } from '../reducks/search/selectors'

import {search} from '../reducks/search/operations';
import { SearchForm } from '../components'
import { BookCard } from '../components/UIkit';
import { Typography } from '@material-ui/core';


const Search = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);
  const result = getResult(selector);
  const number = getNumber(selector)

    return(
      <div>
        <h1>NDC横断検索</h1>

        <SearchForm onSubmit={values => {
          // console.log(values)
          dispatch(search(values))
        }} />

        {number &&
          <Typography>
            {number}件の検索結果：
          </Typography>
        }
        
        {result &&
          result.map((book,i,) => {
            return (
              <BookCard
                key={i}
                title={book.title}
                creator={book.creator}
                publisher={book.publisher}
                issued={book.issued}
              />
            )
          })
        }
      </div>
    )
}

export default Search;