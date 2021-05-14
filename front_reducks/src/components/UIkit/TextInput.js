import React from 'react';
import TextField from '@material-ui/core/TextField';


const renderTextInput = (props) => {
  const {input, ...custom} = props
  return (
    <TextField
      {...custom}
      {...input}
    />
  )
}

export default renderTextInput;
