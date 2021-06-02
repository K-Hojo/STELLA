import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteDialog from './DeleteDialog';
import AddDialog from './AddDialog';

const CollectionCard = (props) => {
  const {results, collection, n, list, dispatch} = props
  const [isAddOpen, toggleAdd] = useState(false)
  const [isDeleteOpen, toggleDelete] = useState(false)
  const created_at = new Date(collection.created_at)
  const updated_at = new Date(collection.updated_at)

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">
          <Link component={RouterLink} to={{pathname:"/collection/"+collection.id, state:{collection: collection}}} color="inherit">
            {collection.name}
          </Link>
        </Typography>
        <Typography>
          {collection.books.length}冊の本
        </Typography>
        <Typography>
          作成日時：{created_at.toLocaleDateString('ja-JP')}{created_at.toLocaleTimeString('ja-JP')}
          <br/>
          更新日時：{updated_at.toLocaleDateString('ja-JP')}{updated_at.toLocaleTimeString('ja-JP')}
        </Typography>

      <AddDialog
        open={isAddOpen}
        onClose={toggleAdd}
        collection={collection}
        results={results}
        dispatch={dispatch}
      />

      <DeleteDialog
        key={collection.id}
        open={isDeleteOpen}
        onClose={toggleDelete}
        n={n}
        list={list}
        targetid={collection.id}
        targetname={collection.name}
        dispatch={dispatch}
      />

      </CardContent>

      <CardActions>
        <IconButton onClick={() => toggleAdd(!isAddOpen)}>
          <LibraryAddIcon/>
        </IconButton>
        <IconButton onClick={() => toggleDelete(!isDeleteOpen)}>
          <DeleteIcon/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default CollectionCard;