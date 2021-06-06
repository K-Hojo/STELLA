import React, { useState } from 'react';
import axios from 'axios'
import { Button, TextField, Typography, Grid, Box } from '@material-ui/core'
import { AuthUrls } from '../operations/auth/urls';


// import {SignupForm} from '../components'


const SignUp = () => {
  const [email, setEmail] = useState('')
  const [username, setName] = useState('')
  const [password1, setPass1] = useState('')
  const [password2, setPass2] = useState('')
  const [detail, setDetail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = {
      email: email,
      username: username,
      password1: password1,
      password2: password2,
    }

    axios.post(AuthUrls.SIGNUP, data)
      .then(res => setDetail(res.data.detail))
  }
  return (
    <div>
      <h2>アカウント登録</h2>
        <Box display="flex" justifyContent="center" >
        <Box border={1} borderColor="grey.500" borderRadius="borderRadius" minWidth={300}>
        <div style={{padding:20}}>
          <form onSubmit={handleSubmit}>
            <Grid container direction="column" alignItems="center" spacing={3}>
              <Grid item >
                <TextField required id="email" name="email" type="email" label="メールアドレス" onChange={e => setEmail(e.target.value)} value={email}/>
              </Grid>
              <Grid item >
                <TextField required id="username" name="username" type="text" label="ユーザー名"onChange={e => setName(e.target.value)} value={username}/>
              </Grid>
              <Grid item >
                <TextField required id="password1" name="password1" type="password" label="パスワード" onChange={e => setPass1(e.target.value)} value={password1}/>
              </Grid>
              <Grid item >
                <TextField required id="password2" name="password2" type="password" label="パスワード（確認用）" onChange={e => setPass2(e.target.value)} value={password2}/>
              </Grid>
              <Grid item >
                <Button type="submit" variant="contained" color="primary">送信</Button>
              </Grid>
            </Grid>
          </form>
        </div>
        </Box>
        </Box>
        <Box display="flex" justifyContent="center">
        <Typography color="primary">{detail}</Typography>
        </Box>
    </div>
  )
}

export default SignUp;