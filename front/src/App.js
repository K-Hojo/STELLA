import React, {useReducer, useEffect} from 'react';
import Router from './Router';

import AuthContext from './operations/auth/context'
import { initialState, authReducer } from './operations/auth/reducers';
import { loginAction } from './operations/auth/actions';

const App = () => {
  const [auth, dispatch] = useReducer(authReducer,initialState);
  
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if(token){
      dispatch(loginAction(token))
    }
  },[])

  return (
    <div>
      <AuthContext.Provider value={{auth, dispatch}}>
        <Router />
      </AuthContext.Provider>
    </div>
  )
}

export default App;