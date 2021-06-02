import React, { useState, useReducer, useEffect, useContext } from 'react';
import AuthContext from '../operations/auth/context';
import axios from 'axios';
import { collectionReducer, searchReducer } from '../operations/collection/reducers';
import { initAction } from '../operations/collection/actions'
import { CollectionUrls } from '../operations/collection/urls'
import { SearchForm } from '../components'
import { BookCard } from '../components';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(1),
  }
}))

const Search = () => {
  const {auth} = useContext(AuthContext)
  const token = auth.token
  const [collections, dispatch] = useReducer(collectionReducer,{})
  const initialState = {title:'', ndc:''}
  const [state, dispatchSearch] = useReducer(searchReducer, initialState)
  const [result, setResult] = useState([]);
  const [number, setNumber] = useState('');
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const response = await axios.get(CollectionUrls.COLLECTION, {headers:{Authorization:'Token '+token}})
      dispatch(initAction(response.data))
    })()
  },[token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const searchUrl = CollectionUrls.SEARCH + "?title="+encodeURIComponent(state.title)+"&ndc="+state.ndc

    const response = await axios.get(searchUrl)
    setNumber(response.data.numberOfRecords);
    setResult(response.data.result);
  }

  return(
    <div>
        <h1>NDC横断検索</h1>

        <SearchForm
          dispatch={dispatchSearch}
          state={state}
          handleSubmit={handleSubmit}
        />

        {number &&
          <Typography>
            {number}件の検索結果：
          </Typography>
        }
        <Grid container>
        {result &&
          result.map((book,i,) => {
            return (
              <Grid item xs={6} className={classes.card} key={i}>
                <BookCard
                  book={book}
                  results={collections.results}
                  dispatch={dispatch}
                />
              </Grid>

            )
          })
        }
        </Grid>
      </div>
    )
}

export default Search;