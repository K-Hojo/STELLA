import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth:200
  }
}))

const CollectionSelect = (props) => {
  const {onChange, results, col} = props;
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
    <InputLabel>追加先コレクション</InputLabel>
    <Select value={col} onChange={onChange}>
      {results &&
        results.map((collection) => {
        return (
          <MenuItem key={collection.id} value={collection}>{collection.name}</MenuItem>
        )
      })
      }
      <Divider/>
      <MenuItem key="new" value="new">新規作成</MenuItem>
    </Select>
    </FormControl>
  )
}

export default CollectionSelect;