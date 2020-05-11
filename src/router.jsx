import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from './Components/login/login';
import SignUp from './Components/SignUp/signup';
import Home from './Components/Home/home';

class RouterClass extends React.Component {
    render() {
        return (
            <BrowserRouter>
            <Route path="/" exact component={Login} />
            <Route path="/signUp" exact component={SignUp} />
            <Route path="/home" exact component={Home} />
            
         </BrowserRouter>
        );
    }}
export default RouterClass;