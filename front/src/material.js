import React from 'react';

function Material(props){
  return(
    <div>
      <h2>{props.info.title}</h2>
      <p>
        <span>{props.info.creator}</span>
        <span>{props.info.publisher}</span>
        <span>{'('+props.info.issued+')'}</span>
      </p>
    </div>
  )
}

export default Material;