import React from 'react';
import plus from './icons/plus-circle.svg';
import plusfill from './icons/plus-circle-fill.svg';


const Add = (props) => {
  if(!props.flag){
    return <img src={plus} alt="plus" onClick={props.onClick}></img>
  } else {
    return <img src={plusfill} alt="plus-fill" onClick={props.onClick}></img>
  }
};

export default Add;


