import React, { Component } from "react";
import '../../assets/styles.css';
import Title from '../Basic-Components/title';
import Button from '../Basic-Components/button';
import { getAccessToken, validateAccessToken, deleteAccessToken } from '../../Utils/universal';

/**
 * ------------------------------------------------------------------------------------------------------------
 *  if user is already login or its access token is present in cookies and that is also valid then directly
 *  comes here.
 *   if user tries to open this page directly and access token is not valid then he automatically redirects to
 *   login page.
 *    if you want to come to login screen again then click on button "login with another account"
 * ........................................................................................................
 */
class Home extends Component {
    state = {
        name: null,
        email: null
    }

    onClickHandler = () => {
        deleteAccessToken();
        this.props.history.push({
            pathname: './'
        })
    }
    async componentDidMount() {
        let isValidate = await validateAccessToken();
        if (!isValidate) {
            this.props.history.push({
                pathname: './'
            })
        } else {
            let token = getAccessToken();
            let url = "http://localhost:3000/";
            let userData = await fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            let result = await userData.json();
            console.log("resul===", result);
            if (result && result.status === 200 && result.data) {
                this.setState({
                    name: result.data.name,
                    email: result.data.email
                })
            }
        }

    }
    render() {
        return (
            <div>
                <Title name="User Dashboard" />
                <h4>Welcome {this.state.name}</h4>
                <h5>You are successfully login with email id {this.state.email}</h5>
                <br />
                <br />
                <Button onClickHandler={this.onClickHandler} placeholder="Sign In with Another Account" />
            </div>

        )
    }
}
export default Home;