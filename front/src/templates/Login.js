import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { Button, TextField, Grid, Box } from '@material-ui/core'
import { AuthUrls } from '../operations/auth/urls';


const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      email: email,
      password: password,
    }

    await axios.post(AuthUrls.LOGIN, data)
      .then(res => history.push('/'))

  }
  return (
    <div>
      <h2>ログイン</h2>
      <Box display="flex" justifyContent="center">
      <Box border={1} borderColor="grey.500" borderRadius="borderRadius" minWidth={300}>
      <div style={{padding:20}}>
        <form onSubmit={handleSubmit}>
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