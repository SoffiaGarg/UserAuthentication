import React,{Component} from 'react';
import '../../assets/styles.css';

class TextBox extends Component {
   render() {
      let inputType = this.props.type || "text"
        return (
           <input className="formInput" type={inputType} name={this.props.name} placeholder={this.props.name} onChange = {this.props.onChangeHandler}></input>
        )
    }
}

export default TextBox;