import React from 'react';
import Material from './material';
import Add from './add';


class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      ndc: 'default',
      numberOfRecords: 0,
      result: [],
      flags: Array(10).fill(0)
    }
  }

  handleKwChange(e){
    this.setState({title: e.target.value})
  }
  handleOpChange(e){
    this.setState({ndc: e.target.value})
  }
  handleSubmit(e){
    fetch("http://localhost:8000/api/collection/search/?title="+encodeURIComponent(this.state.title)+"&ndc="+this.state.ndc)
      .then(res => res.json())
      .then(json => this.setState({
        'numberOfRecords': json.numberOfRecords,
        'result': json.result,
      }))
      .catch(error => {
        this.setState({
          'numberOfRecords': 0,
          'result': [{'title':'エラーが発生しました。'}],
        })
        console.log(error)
      })
    e.preventDefault();
  }

  handleClickPlus(i){
    const flags = this.state.flags.slice();
    const flag = flags[i];
    flags[i] = flag ? 0:1;
    this.setState({flags: flags});
  }

  renderPlus(i){
    return <Add flag={this.state.flags[i]} onClick={() => this.handleClickPlus(i)}/>
  }

  render(){
    const ndc = ['総記','哲学','歴史','社会科学','自然科学','技術','産業','芸術','言語','文学',];
    return(
      <div>
        <form onSubmit={e=>this.handleSubmit(e)}>
          <p>
            <input
              type="text"
              placeholder="キーワード"
              value={this.state.title}
              onChange = {e => this.handleKwChange(e)}
            />
            の
            <select name="ndc" value={this.state.ndc} onChange={e => this.handleOpChange(e)}>
              <option value="default">（分類を選択）</option>
              {ndc.map((v,i)=>{
                return <option value={i}>{v}</option>
              })}
            </select>
            的側面
            <input type="submit" value="検索"></input>
          </p>
        </form>

        <p>{this.state.numberOfRecords}件の検索結果</p>
        {
          this.state.result.map((v,i,a)=>{
            return (
              <div>
                {this.renderPlus(i)}
                <Material info={v}/>
              </div>
            )
          })
        }
      </div>
    )
  };
}

export default Search;