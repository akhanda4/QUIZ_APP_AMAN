import React, { PureComponent } from "react";
import Cookie from "universal-cookie";
import "./App.css";
import Auxillary from "./components/auxillary/Auxillary.jsx";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./components/layout/login.jsx";
import Quizmaker from "./components/layout/quizmaker/quizmaker.jsx";
import Questions from "./components/layout/quizmaker/quizData/questions.jsx";
import Catagories from "./components/layout/quizmaker/quizData/catagories.jsx";
import Subcatagories from "./components/layout/quizmaker/quizData/subcatagories.jsx";

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }
  componentDidMount() {
    this.authenticated();
  }
  authenticated = () => {
    const cookies = new Cookie();
    if (cookies.get("email") !== undefined) {
      this.setState({
        isAuthenticated: true
      });
    } else {
      this.setState({
        isAuthenticated: false
      });
    }
  };
  render() {
    return (
      <BrowserRouter>
        <Auxillary>
          <Route
            path="/login"
            exact
            render={() => (
              <Login
                authenticated={this.authenticated}
                isAuthenticated={this.state.isAuthenticated}
              />
            )}
          />
          <Route
            path="/admin/catagories"
            exact
            render={() => <Catagories authenticated={this.authenticated} />}
          />
          <Route
            path="/admin/subcatagories"
            exact
            render={() => <Subcatagories authenticated={this.authenticated} />}
          />

          <Route
            path="/admin/questions"
            exact
            render={() => <Questions authenticated={this.authenticated} />}
          />
          {this.state.isAuthenticated ? (
            <Route
              path="/admin"
              exact
              render={() => <Quizmaker authenticated={this.authenticated} />}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Auxillary>
      </BrowserRouter>
    );
  }
}
