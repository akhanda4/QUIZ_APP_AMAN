import React, { PureComponent } from "react";
import Cookie from 'universal-cookie';
import "./App.css";
import Auxillary from "./components/auxillary/Auxillary.jsx";
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from "./components/layout/login.jsx";
import Quizmaker from "./components/layout/quizmaker/quizmaker.jsx"
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    }
  }
  componentDidMount() {
    this.authenticated();
  }
  authenticated = () => {
    const cookies = new Cookie();
    if (cookies.get('email') !== undefined) {
      this.setState({
        isAuthenticated: true
      })
    } else {
      this.setState({
        isAuthenticated: false
      })
    }

  }
  render() {
    this.cookies = new Cookie();
    return (
      <BrowserRouter>
        <Auxillary>
          <Route path="/login" exact render={() => <Login authenticated={this.authenticated} isAuthenticated={this.state.isAuthenticated} />} />
          {this.state.isAuthenticated ? <Route path="/admin" exact render={() => <Quizmaker authenticated={this.authenticated} />} /> : <Redirect to='/login' />}
        </Auxillary>
      </BrowserRouter>
    );
  }
}
