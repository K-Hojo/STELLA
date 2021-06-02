import React, {useReducer, useEffect,useContext} from 'react';
import AuthContext from '../operations/auth/context';
import axios from 'axios';
import {CollectionUrls} from '../operations/collection/urls'
import { Grid } from '@material-ui/core'
import { CollectionCard } from '../components';
import { initAction } from '../operations/collection/actions'
import { collectionReducer } from '../operations/collection/reducers'

const Collection = () => {
  const {auth} = useContext(AuthContext)
  const token = auth.token
  const [collections, dispatch] = useReducer(collectionReducer,{count:0,results:[{name:''}]})

  useEffect(() => {
    (async () => {
      const response = await axios.get(CollectionUrls.COLLECTION, {headers:{Authorization:'Token '+token}})
      dispatch(initAction(response.data))
    })()
  },[token])

  return (
    <div>
      <h2>コレクション一覧</h2>
      {collections.count}個のコレクション：
      <Grid container>
        {collections.count && collections.results.map((collection,i,results) => {
          return (
            <Grid item xs={6} p={1} key={collection.id}>
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