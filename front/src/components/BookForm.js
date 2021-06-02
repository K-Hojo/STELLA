import React from 'react';
import { Box, TextField } from '@material-ui/core'

const BookForm = (props) => {
  const {onChange, books} = props;

  return (
    <Box display="flex" flexDirection="column" >
      <TextField required label="タイトル" name="title" value={books.title} onChange={e=> onChange(e)} margin="dense"/>
      <TextField label="編著者" name="creator" value={books.creator} onChange={e=> onChange(e)} margin="dense"/>
      <TextField label="出版社" name="publisher" value={books.publisher} onChange={e=> onChange(e)} margin="dense"/>
      <TextField label="出版年" name="issued" value={books.issued} onChange={e=> onChange(e)} margin="dense"/>
    </Box>
  )
}

export default BookForm;