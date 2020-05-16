import React, { Component } from "react";
import Title from '../Basic-Components/title';
import TextBox from '../Basic-Components/textbox';
import Button from '../Basic-Components/button';
import logo from '../../assets/images/login.jpg';
import { Link } from "react-router-dom";
import '../../assets/styles.css';
import {setAccessToken, validateAccessToken} from '../../Utils/universal';
import {API_ROUTE} from '../../Config/config';
import {ErrorMsg} from '../../Utils/message';

class Login extends Component {
    state = {
        email: null,
        password: null,
        errorMsg: null,
        popup: false,
        waiting:false,
        loading:true
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onClosePopup = () => {
        this.setState({
            popup: false
        })
    }

    async componentDidMount(){
       const tokenData = await validateAccessToken();
       if(tokenData){
        this.props.history.push({
            pathname:'./home'
        })
       }
    }
    /**
     *  1) if email or password field is missing , send the appropriate message.
     *  2) if email or password is wrong , send the appropriate message.
     *  3) if login successfull , sert the access token
     *  
     */
    onClickHandler = async () => {
        let email = this.state.email;
        let password = this.state.password;
        if (email && password) {
            //call the login api
            this.setState({
                waiting:true
            })
            let url = API_ROUTE.LOGIN;
            let loginUser = await fetch(url, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            })
            let result = await loginUser.json();
            if(result.status === 200 && result.data && result.data.token){
                setAccessToken(result.data.token);
                this.props.history.push({
                    pathname:'./home'
                })
            }else{
                let message = result.message || 'Email or Password is Wrong'
                if(result.status===401){
                    message = <div>
                        {result.message} <a style={{"color":"red"}} href="./signUp">Sign Up</a>
                    </div>
                }
                this.setState({
                    popup:true,
                    errorMsg:message,
                    loading:false
                })
            }
        } else {
            if (!email) {
                this.setState({
                    popup: true,
                    errorMsg: ErrorMsg.EMAIL_MISSING,
                    loading:false
                })
            } else this.setState({
                popup: true,
                errorMsg: ErrorMsg.PASSWORD_MISSING,
                loading:false
            })
        }
    }

    render() {
        let errorMsg = null;
        if (this.state.popup && this.state.errorMsg) {
            errorMsg = <h3 style={{color:"red"}}>{this.state.errorMsg}</h3>
        }
        let loadingData= null;
        if(this.state.waiting && this.state.loading){
            loadingData = <div style = {{"marginLeft":"10px"}}><center><h3>... LOADING, PLEASE WAIT</h3></center></div>
        }
        return (
            <div>
                <Title name="User Login" />
                 {loadingData}
                <div className="form">
                    <img className="formImg" src= {logo} alt="Login User" />
                    {errorMsg}
                    <TextBox name={"email"} onChangeHandler={this.onChangeHandler} />
                    <TextBox name={"password"} type={"password"} onChangeHandler={this.onChangeHandler} />
                    <Button name={"Log In"} onClickHandler={this.onClickHandler} />
                    <p className="signupLink">Not sign up yet? Do not worry <Link to="./signUp">sign up</Link></p>
                </div>
            </div>
        )
    }
}

export default Login;