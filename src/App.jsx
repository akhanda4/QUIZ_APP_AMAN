import React, { PureComponent } from "react";
import Cookie from "universal-cookie";
import "./App.css";
import Auxillary from "./components/auxillary/Auxillary.jsx";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./components/layout/login.jsx";
import Quizmaker from "./components/layout/quizmaker/quizmaker.jsx";
import Homepage from "./components/play/homepage.jsx";
import Playquiz from "./components/play/playquizpage.jsx";
import Auxiliary from "./components/auxillary/Auxillary.jsx";
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      playId: "",
      redirectToHomepage: false
    };
    this.PlayQuizPage = React.createRef();
  }
  componentDidUpdate(prevProps, prevState) {
    this.setState({
      redirectToHomepage: false
    });
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
  getId = id => {
    this.setState({
      playId: id
    });
  };
  redirect = value => {
    this.setState({
      redirectToHomepage: true
    });
  };
  render() {
    return (
      <BrowserRouter>
        <Auxillary>
          <Route
            path="/"
            exact
            render={() => <Login authenticated={this.authenticated} />}
          />
          {this.state.redirectToHomepage ? (
            <Route
              path="/homepage"
              exact
              render={() => <Homepage getId={this.getId} />}
            />
          ) : (
            ""
          )}
          <Route
            path="/homepage"
            exact
            render={() => <Homepage getId={this.getId} />}
          />
          <Route
            path="/playquiz"
            exact
            render={() => (
              <Playquiz playId={this.state.playId} redirect={this.redirect} />
            )}
          />
          <Route
            path="/login"
            exact
            render={() => <Login authenticated={this.authenticated} />}
          />
          {this.state.isAuthenticated ? (
            <Route path="/admin" render={() => <Quizmaker />} />
          ) : (
            ""
          )}
          {this.state.redirectToHomepage ? <Redirect to="/homepage" /> : ""}
        </Auxillary>
      </BrowserRouter>
    );
  }
}
