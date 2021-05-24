import React from 'react';
import {Switch} from 'react-router';
import {BrowserRouter, Route} from 'react-router-dom'
// import { Home, Login, Signup, SignupDone, EmailVerification, Search} from './templates';
import { Home, Signup, EmailVerification, Login } from './templates';
import { MyNavbar } from './components'


const Router = () => {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Switch>
        <Route exact path="/signup" component={Signup} />
        <Route path="/account/confirm-email/:key" component={EmailVerification}/>
        <Route exact path="/login" component={Login} />
        {/* <Route exact path="/search" component={Search} /> */}
        <Route exact path="(/)?" component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router;