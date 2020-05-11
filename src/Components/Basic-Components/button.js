import React from 'react';
import '../../assets/styles.css';

const Button = (props)=>{
    let buttonName = props.placeholder || 'Submit'
    return(
   <button className="formButton" onClick = {props.onClickHandler}>{buttonName}</button>
    )
}

export default Button;