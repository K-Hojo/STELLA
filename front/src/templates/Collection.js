import React, {useReducer, useEffect,useContext} from 'react';
import AuthContext from '../operations/auth/context';
import axios from 'axios';
import { Link } from 'react-router-dom'
import {CollectionUrls} from '../operations/collection/urls'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CollectionCard } from '../components';
import { initAction } from '../operations/collection/actions'
import { collectionReducer } from '../operations/collection/reducers'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(1),
  }
}))

const Collection = () => {
  const {auth} = useContext(AuthContext);
  const token = auth.token;
  const classes = useStyles();
  const [collections, dispatch] = useReducer(collectionReducer,{count:0,results:[{name:''}]});

  useEffect(() => {
    (async () => {
      const response = await axios.get(CollectionUrls.COLLECTION, {headers:{Authorization:'Token '+token}})
      dispatch(initAction(response.data))
    })()
  },[token])

  return (
    <div>
      <h2>コレクション一覧</h2>
      {!token &&
        <p>コレクションを利用するには<Link to="/login">ログイン</Link>する必要があります。</p>
      }

      {collections.count}個のコレクション：

      <Grid container>
        {auth.isAuthenticated && collections.count && collections.results.map((collection,i,results) => {
          return (
            <Grid item xs={6} p={1} key={collection.id} className={classes.card}>
            <CollectionCard
              results={results}
              collection={collection}
              n={i}
              list={results}
              dispatch={dispatch}
            />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default Collection;