import React from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';

cosnt getFormValue = () => {
  const selector = formValueSelector('sample-form');
  const name = selector(state, 'name')

      {/* <p>入力された名前：{name}</p> */}
}