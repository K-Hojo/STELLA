import React from 'react';
import {Field, reduxForm} from 'redux-form';

import { PrimaryButton, renderTextInput} from './UIkit';


let LoginForm = (props) => {
  const {handleSubmit} = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" label="メールアドレス" component={renderTextInput} type='email' required={true} fullWidth={false} />
      <Field name="password" label="パスワード" component={renderTextInput} type='password' required={true} fullWidth={false} />
      <PrimaryButton label="ログイン" type="submit" />
    </form>
  )
}

export default LoginForm = reduxForm(
  {form: 'login'}
)(LoginForm);