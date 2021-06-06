import React, {useContext, useState} from 'react';
import axios from 'axios';
import { CollectionUrls } from '../operations/collection/urls';
import AuthContext from '../operations/auth/context';
import { useLocation,useHistory } from 'react-router-dom';
import { addColAction, addDetAction } from '../operations/collection/actions';
import { Dialog, DialogTitle, DialogContentText, DialogActions, Button, DialogContent, Box, Typography, TextField} from '@material-ui/core';
import CollectionSelect from './CollectionSelect';
import BookForm from './BookForm'


const AddDialog = (props) => {
  const {open, onClose, results, book, collection, dispatch} = props;
  const {auth} = useContext(AuthContext);
  const token = auth.token;
  const history = useHistory();
  const location = useLocation();
  const pathname = location.pathname;
  const [col, setCol] = useState(''); //searchから追加するときにコレクションを指定するための変数
  const [collectionName, setCollectionName] = useState('')
  const [books, setBooks] = useState([{'book': {title: '', creator: '', publisher: '', issued: ''}}]);
  let url = CollectionUrls.COLLECTION
  let action = () => {}
  let data = {}
  let list = []

  if (collection) { //呼び出し元がCollectionCard
    url = url + collection.id + "/books/"
    action = addDetAction
    data = {id: collection.id, book: books}
    list = collection.books
  } else if (pathname === "/search" && col !== 'new') { //呼び出し元がBookCardで新規作成でない
    action = addDetAction
    url = url + col.id + "/books/"
    data = {id: col.id, book: book}
    list = col.books
  } else if (pathname === "/search" && col === 'new') { //呼び出し元がBookCardで新規作成
    action = addColAction
    data = {name: collectionName, books: Array(1).fill({'book': book})}
    list = results
  }

  const handleChangeCollection = (e) => {
    setCol(e.target.value)
  }

  const handleChangeBooks = (e) => {
    const target = e.target;
    const name = target.name;
    const value=target.value
    setBooks({...books, [name]: value})
  }

  const clearBooks = () => {
    setBooks([{'book':{title: '', creator: '', publisher: '', issued: ''}}])
  }

  const handleAdd = async () => {
    if(!token){
      history.push("/login")
    }
    const response = await axios.post(url, data, {headers: {Authorization: 'Token ' + token}})
    list.push(response.data)
    dispatch(action(list))
    clearBooks()
    setCol('')
    onClose(!open)
  }
  const handleClose = () => {
    clearBooks()
    onClose(!open)
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>アイテムを追加しますか？</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {collection &&
            <>
              <Typography>追加先コレクション：</Typography>
              <Typography variant="h6">{collection.name}</Typography>
            </>
          }
        </DialogContentText>
        <Box>
          {book &&
            <CollectionSelect onChange={(e) => handleChangeCollection(e)} results={results} col={col}/>
          }
        </Box>
        <Box>
          {collection &&
            <BookForm onChange={handleChangeBooks} books={books} />
          }
        </Box>
        <Box>
          {col === 'new' &&
            <TextField placeholder="コレクション名" value={collectionName} onChange={e => setCollectionName(e.target.value)}></TextField>
          }
        </Box>
        <Box component="div" style={{marginTop:10}}>
        <DialogContentText>
          {pathname === "/search" &&
            book.title
          }
        </DialogContentText>
        </Box  >
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => handleAdd()}>追加</Button>
        <Button variant="outlined" onClick={() => handleClose()}>キャンセル</Button>
      </DialogActions>
    </Dialog>
  )
};

export default AddDialog;