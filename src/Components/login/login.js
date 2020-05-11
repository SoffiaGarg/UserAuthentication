import React, { Component } from "react";
import Title from '../Basic-Components/title';
import TextBox from '../Basic-Components/textbox';
import Button from '../Basic-Components/button';
import Popup from '../Basic-Components/popup';
import logo from '../../assets/images/login.jpg';
import { Link } from "react-router-dom";
import '../../assets/styles.css';
import {setAccessToken, validateAccessToken} from '../../Utils/universal';

class Login extends Component {
    state = {
        email: null,
        password: null,
        errorMsg: null,
        popup: false
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
            let url = 'http://localhost:3000/login';
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
                        {result.message} -s <a style={{"color":"red"}} href="./signUp">Sign Up</a>
                    </div>
                }
                this.setState({
                    popup:true,
                    errorMsg:message
                })
            }
        } else {
            if (!email) {
                this.setState({
                    popup: true,
                    errorMsg: "Email is Missing."
                })
            } else this.setState({
                popup: true,
                errorMsg: "Password is Missing"
            })
        }
    }

    render() {
        let popup = null;
        if (this.state.popup && this.state.errorMsg) {
            popup = <Popup message={this.state.errorMsg} onClosePopup={this.onClosePopup} />
        }
        return (
            <div>
                <Title name="User Login" />
                <div className="form">
                    <img className="formImg" src= {logo} alt="Login User" />
                    <TextBox name={"email"} onChangeHandler={this.onChangeHandler} />
                    <TextBox name={"password"} type={"password"} onChangeHandler={this.onChangeHandler} />
                    <Button name={"Log In"} onClickHandler={this.onClickHandler} />
                    <p className="signupLink">Not sign up yet? Do not worry <Link to="./signUp">sign up</Link></p>
                    {popup}
                </div>
            </div>
        )
    }
}

export default Login;