import React from 'react';
import '../../assets/styles.css';

const Title = (props)=>{
    return(
        <div className="title">
            <h4>{props.name}</h4>
        </div> 
    )
}
export default Title;