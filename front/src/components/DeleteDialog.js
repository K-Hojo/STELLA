import React, {useContext} from 'react';
import axios from 'axios';
import AuthContext from '../operations/auth/context';
import { useLocation } from 'react-router-dom';
import { Dialog, DialogTitle, Button, DialogActions, DialogContentText, Typography } from '@material-ui/core'
import { CollectionUrls } from '../operations/collection/urls'
import { deleteColAction, deleteDetAction } from '../operations/collection/actions'


const DeleteDialog = (props) => {
  // nは配列のindex,targetidはDB上のidなので別物。
  // DBのデータ操作にはtargetid、表示の操作にはnが必要
  const {open, onClose, targetid, targetname, n, list, dispatch} = props
  const {auth} = useContext(AuthContext)
  const token = auth.token
  const location = useLocation();
  const pathname = location.pathname

  let targetType = ''
  let url = CollectionUrls.COLLECTION
  let action = () => {}
  if (pathname === "/collection") {
    targetType = 'コレクション'
    url = url + targetid
    action = deleteColAction
  } else if (pathname === "/collection/" + targetid.col) {
    targetType = 'アイテム'
    url = url + targetid.col + "/books/" + targetid.item
    action = deleteDetAction
  }

  const handleDelete = async () => {
    const response = await axios.delete(url, {headers: {Authorization: 'Token ' + token}}) //responseの確認のためいったんgetで
    console.log(response)
    list.splice(n,1)
    dispatch(action(list))
    onClose(!open)
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {targetType}を削除しますか？
      </DialogTitle>
      <DialogContentText>
        <Typography>
        タイトル：{targetname}
        </Typography>
        <Typography color="secondary" variant="caption">
          この操作は元に戻せません
        </Typography>
      </DialogContentText>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={() => handleDelete()}>はい</Button>
        <Button variant="contained" color="primary" onClick={() => onClose(!open)}>いいえ</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog;