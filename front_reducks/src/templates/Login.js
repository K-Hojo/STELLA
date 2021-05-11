import React from 'react';
import {useDispatch} from 'react-redux';

import {LoginForm} from '../components';
import {login} from '../reducks/auth/operations'

const Login = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>ログイン</h1>
      <LoginForm onSubmit={(values) => {
        dispatch(login(values))
      }} />

    </div>
  )
}

export default Login;