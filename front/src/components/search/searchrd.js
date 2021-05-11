import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../operations/searchOperations';

const SearchForm = () => {
  const dispatch = useDispatch()
  const selecor = useSelector(state => state)
  const ndc = ['総記','哲学','歴史','社会科学','自然科学','技術','産業','芸術','言語','文学',];

  return(
    <div>
        <form onSubmit={() => dispatch(search())}>
          <p>
            <input
              type="text"
              placeholder="キーワード"
              value={selecor.title}
              onChange = {}
            />
            の
            <select name="ndc" value={selecor.ndc} onChange={}>
              <option value="default">（分類を選択）</option>
              {ndc.map((v,i)=>{
                return <option value={i}>{v}</option>
              })}
            </select>
            的側面
            <input type="submit" value="検索"></input>
          </p>
        </form>
    </div>
  )
}
export default SearchForm