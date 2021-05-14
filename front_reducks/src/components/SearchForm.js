import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { PrimaryButton, renderTextInput } from './UIkit';

let SearchForm = (props) => {
  const { handleSubmit } = props
  const ndc = ['総記','哲学','歴史','社会科学','自然科学','技術','産業','芸術','言語','文学',];

  return(
    <div>
        <form onSubmit={handleSubmit}>
          {/* <p> */}
            <Field name="title" component={renderTextInput} type="text" placeholder="キーワード" />
            の
            <Field name="ndc" component="select" >
              <option key="default" value="default">（分類を選択）</option>
              {ndc.map((v,i)=>{
                return <option key={i} value={i}>{v}</option>
              })}
            </Field>
            的側面
            <br />
          {/* </p> */}
          <PrimaryButton type="submit" label="検索" />
        </form>
    </div>
  )
};

export default SearchForm = reduxForm({
  form: 'search-input'
})(SearchForm);