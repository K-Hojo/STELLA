import React from 'react';
import { Button, TextField } from '@material-ui/core'


const SignupForm = (props) => {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <TextField required id="email" name="email" type="email" label="メールアドレス"/>
      <TextField required id="username" name="username" type="text" label="ユーザー名"/>
      <TextField required id="password1" name="password1" type="password" label="パスワード"/>
      <TextField required id="password2" name="password2" type="password" label="パスワード（確認用）"/>
      <Button type="submit" variant="contained" color="primary">送信</Button>
    </form>
  )
}

export default SignupForm;