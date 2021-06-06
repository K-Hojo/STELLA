import React, { useContext, useReducer, useEffect } from 'react';
import AuthContext from '../operations/auth/context';
import axios from 'axios';
import {CollectionUrls} from '../operations/collection/urls';
import bg_concept from '..//bg_concept.jpg';
import { initAction } from '../operations/collection/actions';
import { collectionReducer } from '../operations/collection/reducers';
import { Box, Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { CollectionCard } from '../components';



const Home = () => {
  const {auth} = useContext(AuthContext);
  const token = auth.token;
  const [collections, dispatch] = useReducer(collectionReducer,{count:0,results:[{name:''}]});

  useEffect(() => {
    (async () => {
      const response = await axios.get(CollectionUrls.COLLECTION, {headers:{Authorization:'Token '+token}})
      dispatch(initAction(response.data))
    })()
  },[token])

  const renderContent = () => {
    if (!token){
      return (
        <Typography variant="h5">
          <Link href="/login">ログイン</Link>してコレクションを作成しましょう。
        </Typography>
      )
    } else if (collections.count === 0){
      return (
        <Typography variant="h5">
          まだコレクションがありません。
          <Link component={RouterLink} to={{pathname: "/search"}}>search</Link>で関心のある分野の資料を集めましょう。
        </Typography>
      )
    } else {
      const results = collections.results.slice()
      const latest = results.sort((x,y) => {
        const date1 = new Date(x.updated_at)
        const date2 = new Date(y.updated_at)
        return date2 - date1
      })[0]

      return (
        <>
          <Typography variant="h5">最新のコレクション</Typography>
          <Box width="50%">
            <CollectionCard collection={latest} list={results} dispatch={dispatch}/>
          </Box>
        </>
      )
    }
  }
  return (
    <>
      <div>
        <img src={bg_concept} alt="concept" width="100%"/>
      </div>
      <Box m={10}>
        {renderContent()}
      </Box>
     </>
  )
}

export default Home;