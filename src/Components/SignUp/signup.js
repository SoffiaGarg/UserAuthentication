import React, { Component } from "react";
import { Link } from "react-router-dom";
import Title from '../Basic-Components/title';
import TextBox from '../Basic-Components/textbox';
import Button from '../Basic-Components/button';
import Popup from '../Basic-Components/popup';
import logo from '../../assets/images/login.jpg';
import {API_ROUTE} from '../../Config/config';
import { SuccessMsg, ErrorMsg } from "../../Utils/message";

class SignUp extends Component{
    state = {
        name:'',
        email: '',
        password: '',
        errorMsg: null,
        popup: false,
        loading:true,
        waiting:false,
        success:false,
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClosePopup = () => {
        this.setState({
            popup: false,
            success:false
        })
    }

    onClickHandler = async()=>{
        let name = this.state.name;
        let email = this.state.email;
        let password = this.state.password;
        if(name && email && password){
          //call the register api
          this.setState({
              waiting:true
          })
          let url = API_ROUTE.REGISTER;
          let registerUser = await fetch(url, {
              method: 'post',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                   "name":name,
                  "email": email,
                  "password": password
              })
          })
          let result = await registerUser.json();
          if(result.status === 200){
              this.setState({
                  loading:false,
                  popup:true,
                  errorMsg:SuccessMsg.REGISTER_SUCCESS,
                  success:true
              })
              window.location.reload(false);
          }else{
              this.setState({
                  popup:true,
                  loading:false,
                  errorMsg:result.message || 'Registration Unsuccessfull'
              })
          }
        }else{
            if (!name) {
                this.setState({
                    popup: true,
                    loading:false,
                    errorMsg:ErrorMsg.NAME_MISSING
                })
            } else if(!email){
                this.setState({
                    popup: true,
                    loading:false,
                    errorMsg: ErrorMsg.EMAIL_MISSING
                })
            }else{
                this.setState({
                    popup: true,
                    loading:false,
                    errorMsg: ErrorMsg.PASSWORD_MISSING
                })
            }
        }
    }
    render(){
        let errorMsg = null;
        let popup=null;
        if(this.state.success && this.state.popup && this.state.errorMsg){
         popup=<Popup onClosePopup={this.onClosePopup} message={this.state.errorMsg}/>
        }else if (this.state.popup && this.state.errorMsg) {
            errorMsg = <h3 style={{color:"red"}}>{this.state.errorMsg}</h3>
        }
        let loadingData= null;
        if(this.state.waiting && this.state.loading){
            loadingData = <div style = {{"marginLeft":"10px"}}><center><h3>... LOADING, PLEASE WAIT</h3></center></div>
        }
        return(
            <div>
               <Title name={"User Signup"}/>
               {loadingData}
                <div className="form">
                    <img className="formImg" src={logo} alt="Login User" />
                    {errorMsg}
                    <TextBox name={"name"} onChangeHandler={this.onChangeHandler} />
                    <TextBox name={"email"} onChangeHandler={this.onChangeHandler} />
                    <TextBox name={"password"} type={"password"} onChangeHandler={this.onChangeHandler} />
                    <Button name={"Log In"} onClickHandler={this.onClickHandler} />
                    <p className="signupLink">Do you want to login ? <Link to="./">Login</Link></p>
                    {popup}
                </div>
            </div>
        )
    }
}

export default SignUp;