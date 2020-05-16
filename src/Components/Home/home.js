import React, { Component } from "react";
import '../../assets/styles.css';
import Title from '../Basic-Components/title';
import Button from '../Basic-Components/button';
import { getAccessToken, validateAccessToken, deleteAccessToken } from '../../Utils/universal';
import {API_ROUTE} from '../../Config/config';

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
        email: null,
        loading:true,
        waiting:false
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
            this.setState({
                waiting:true
            })
            let token = getAccessToken();
            let url = API_ROUTE.GET_USER;
            let userData = await fetch(url, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            let result = await userData.json();
            if (result && result.status === 200 && result.data) {
                this.setState({
                    name: result.data.name,
                    email: result.data.email,
                    loading:false
                })
            }
        }

    }
    render() {
        let loadingData= null;
        if(this.state.waiting && this.state.loading){
            loadingData = <div style = {{"marginLeft":"10px"}}><center><h3>... LOADING, PLEASE WAIT</h3></center></div>
        }
        return (
            <div>
                <Title name="User Dashboard" />
                {loadingData}
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