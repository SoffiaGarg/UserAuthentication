import React, { Component } from 'react';
import Login from './Components/login/login';
import SignUp from './Components/SignUp/signup';
import RouterClass from './router';

class App extends Component{
  render(){
    return(
      <div>
      <RouterClass/>
      </div>
    )
  }
}

export default App;
