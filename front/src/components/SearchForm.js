import React from 'react';
import { titleAction, ndcAction } from '../operations/collection/actions'
import { Button, TextField, Select, MenuItem, InputLabel, Box, FormControl } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth:100
  }
}))

const SearchForm = (props) => {
  const { dispatch, state, handleSubmit } = props
  const classes = useStyles();

  const ndc = ['総記','哲学','歴史','社会科学','自然科学','技術','産業','芸術','言語','文学',];

  return(
    <div>

        <form onSubmit={e => handleSubmit(e)}>
          <div style={{width:'100%'}}>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" flexWrap="nowrap">
              <FormControl className={classes.formControl}>
                <TextField onChange={e => dispatch(titleAction(e))} name="title" value={state.title} type="text" placeholder="キーワード" margin="normal"/>
              </FormControl>
              の
              <FormControl className={classes.formControl}>
                <InputLabel>（分類）</InputLabel>
                <Select onChange={e => dispatch(ndcAction(e))} name="ndc" value={state.ndc}>
                  {ndc.map((v,i)=>{
                    return <MenuItem key={i} value={i}>{v}</MenuItem>
                  })}
                </Select>
              </FormControl>
              的側面
              <Box p={2}>
                <Button type="submit" variant="contained" color="primary">
                  検索
                </Button>
              </Box>
            </Box>
          </div>
        </form>
    </div>
  )
};

export default SearchForm;