import React from 'react';
import {Field, reduxForm} from 'redux-form';

import { PrimaryButton, renderTextInput} from './UIkit';


let SignupForm = (props) => {
  const {handleSubmit} = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field name="email" label="メールアドレス" component={renderTextInput} type='email' required={true} fullWidth={false} />
      <Field name="username" label="ユーザー名" component={renderTextInput} type='text' required={true} fullWidth={false} />
      <Field name="password1" label="パスワード" component={renderTextInput} type='password' required={true} fullWidth={false} />
      <Field name="password2" label="パスワード（確認用）" component={renderTextInput} type='password' required={true} fullWidth={false} />
      <PrimaryButton label="送信" type="submit" />
    </form>
  )
}

export default SignupForm = reduxForm(
  {form: 'signup'}
)(SignupForm);