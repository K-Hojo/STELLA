import React from 'react';
import {Route, Switch} from 'react-router';
import { Home, Login, Signup, SignupDone, AccountActivation} from './templates';


const Router = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={Signup} />
      <Route path="/account/confirm-email/:key" component={AccountActivation}/>
      <Route exact path="/signup_done" component={SignupDone} />
      <Route exact path="/login" component={Login} />
      <Route exact path="(/)?" component={Home} />
    </Switch>
  )
}

export default Router;