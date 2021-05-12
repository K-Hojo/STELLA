import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const BookCard = (props) => {
  const {title, creator, publisher, issued, handleAdd, handleDelete} = props
  return (
    <Card>
      <CardContent>
        <Typography>
          {title}
        </Typography>
        <Typography>
          {creator}
        </Typography>
        <Typography>
          {publisher}
        </Typography>
        <Typography>
          ({issued})
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <AddIcon onClick={handleAdd}/>
        </IconButton>
        <IconButton>
          <DeleteIcon onClick={handleDelete}/>
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default BookCard;