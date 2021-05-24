import React, { useContext, useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router';
import { AuthUrls } from '../operations/auth/urls';
import { loginAction } from '../operations/auth/actions'
import AuthContext from '../operations/auth/context';
import { Button, TextField, Grid, Box } from '@material-ui/core'


const Login = () => {
  const {dispatch} = useContext(AuthContext)
  const history = useHistory();
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    const data = {
      email: email,
      password: password,
    }

    await axios.post(AuthUrls.LOGIN, data)
      .then(res => {
        const token = res.data.key
        dispatch(loginAction(token));
        sessionStorage.setItem('token', token);
        history.push("/");
      })
    }

  return (
    <div>
      <h2>ログイン</h2>
      <Box display="flex" justifyContent="center">
      <Box border={1} borderColor="grey.500" borderRadius="borderRadius" minWidth={300}>
      <div style={{padding:20}}>
        <form onSubmit={e => handleLogin(e)}>
          <Grid container direction="column" alignItems="center" spacing={3}>
            <Grid item>
              <TextField required id="email" name="email" type="email" label="メールアドレス" onChange={e => setEmail(e.target.value)} value={email}/>
            </Grid>
            <Grid item>
              <TextField required id="password" name="password" type="password" label="パスワード" onChange={e => setPass(e.target.value)} value={password}/>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">送信</Button>
            </Grid>
          </Grid>
        </form>
      </div>
      </Box>
      </Box>
    </div>
  )
}

export default Login;