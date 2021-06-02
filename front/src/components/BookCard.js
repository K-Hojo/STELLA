import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Card, CardActions, CardContent,Typography, IconButton } from '@material-ui/core';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDialog from './DeleteDialog'
import AddDialog from './AddDialog';

const BookCard = (props) => {
  const {book, results, n, list, collection_id, item_id, dispatch} = props
  const location = useLocation();
  const pathname = location.pathname
  const [isAddOpen, toggleAdd] = useState(false)
  const [isDeleteOpen, toggleDelete] = useState(false)

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">
          {book.title}
        </Typography>
        <Typography>
          {book.creator}
        </Typography>
        <Typography>
          {book.publisher}({book.issued})
        </Typography>

        <AddDialog
          open={isAddOpen}
          onClose={toggleAdd}
          book={book}
          results={results}
          dispatch={dispatch}
        />

        <DeleteDialog
          open={isDeleteOpen}
          onClose={toggleDelete}
          targetid={collection_id ? {col:collection_id, item:item_id} : ''}
          targetname={book.title}
          n={n}
          list={list}
          dispatch={dispatch}
        />

      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => toggleAdd(!isAddOpen)}
          disabled={pathname==="/collection/"+collection_id ? true : false}
        >
          <LibraryAddIcon
          />
        </IconButton>
        <IconButton
          onClick={() => toggleDelete(!isDeleteOpen)}
          disabled={pathname==="/search" ? true : false}
        >
          <DeleteIcon/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default BookCard;