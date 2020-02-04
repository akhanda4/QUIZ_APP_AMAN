import React, { PureComponent } from "react";
import "./App.css";
import Auxillary from "./components/auxillary/Auxillary.jsx";
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from "../src/components/layout/navbar.jsx";
import Login from "./components/layout/login.jsx"
import Quizmaker from "./components/layout/quizmaker/quizmaker.jsx"
export default class App extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Auxillary>
          <Navbar adminLogin={this.adminLogin} />
          <Route path="/login" exact render={() => <Login />} />
          <Route path="/admin" exact render={() => <Quizmaker />} />
        </Auxillary>
      </BrowserRouter>
    );
  }
}
