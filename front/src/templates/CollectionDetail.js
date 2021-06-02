import React, { useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import { BookCard } from '../components';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { detailReducer } from '../operations/collection/reducers'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    padding: theme.spacing(1),
  }
}))

const CollectionDetail = () => {
  const classes = useStyles();
  const location = useLocation();
  const [detail, dispatch] = useReducer(detailReducer, location.state.collection)
  const books = detail.books

  return(
    <div>
        <h2>コレクション詳細</h2>
        <Typography variant="h2">{detail.name}</Typography>
        <Grid container>
        {books.map((item,i,books) => {
          const book = item.book
            return (
              <Grid item xs={6} className={classes.card} key={book.id}>
                <BookCard
                  book={book}
                  n={i}
                  list={books}
                  collection_id={detail.id}
                  item_id={item.id}
                  dispatch={dispatch}
                />
              </Grid>

            )
          })
        }
        </Grid>
      </div>
    )
}

export default CollectionDetail;