import React from 'react';
import {useDispatch} from 'react-redux';

import {SignupForm} from '../components'
import {signup} from '../reducks/auth/operations'

const SignUp = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>アカウント登録</h2>
      <SignupForm onSubmit={values => {
        dispatch(signup(values))
      }} />
    </div>
  )
}

export default SignUp;