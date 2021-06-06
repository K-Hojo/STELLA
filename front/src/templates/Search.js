import React, { useState, useReducer, useEffect, useContext } from 'react';
import AuthContext from '../operations/auth/context';
import axios from 'axios';
import { collectionReducer, searchReducer } from '../operations/collection/reducers';
import { initAction } from '../operations/collection/actions';
import { CollectionUrls } from '../operations/collection/urls';
import { SearchForm } from '../components';
import { BookCard } from '../components';
import { Typography, Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'inline-block',
  },
  card: {
    padding: theme.spacing(1),
  }
}))

const Search = () => {
  const {auth} = useContext(AuthContext);
  const token = auth.token;
  const [collections, dispatch] = useReducer(collectionReducer,{});
  const initialState = {title:'', ndc:''};
  const [state, dispatchSearch] = useReducer(searchReducer, initialState);
  const [result, setResult] = useState([]);
  const [number, setNumber] = useState('');
  const [page,setPage] = useState(1);
  const from = (page-1)*10+1;
  const to = page*10 <= number ? page*10 : number;
  const classes = useStyles();
  let searchUrl = CollectionUrls.SEARCH;

  useEffect(() => {
    (async () => {
      const response = await axios.get(CollectionUrls.COLLECTION, {headers:{Authorization:'Token '+token}})
      dispatch(initAction(response.data))
    })()
  },[token])

  const handleSubmit = async (e) => {
    e.preventDefault();
    searchUrl = searchUrl + "?title=" + encodeURIComponent(state.title) + "&ndc=" + state.ndc;
    const response = await axios.get(searchUrl);
    setNumber(response.data.numberOfRecords);
    setResult(response.data.result);
    setPage(1);
  }

  const handleChangePage = async (e, value) => {
    setPage(value);
    searchUrl = searchUrl + "?title=" + encodeURIComponent(state.title) + "&ndc=" + state.ndc + "&page=" + value;
    const response = await axios.get(searchUrl);
    console.log(response)
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
            {number}件の検索結果（{from}～{to}件目を表示）：
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
        <div style={{textAlign: "center", padding: 30}}>
        {number &&
          <Pagination
            page={page}
            count={Math.ceil(parseInt(number,10)/10)}
            onChange={handleChangePage}
            variant="outlined"
            color="primary"
            className={classes.root}
          />
        }
        </div>
      </div>
    )
}

export default Search;