import React from "react";
import { Field, reduxForm } from "redux-form";

const SampleForm = (props) => {
  const {handleSubmit} = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="name" component="input" type="text" />
      </div>
        <button type="submit">送信</button>
    </form>
  )
}

export default reduxForm({
  form: 'sample-form',
})(SampleForm);
