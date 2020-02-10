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
import Homepage from "./components/play/homepage.jsx";
import Playquiz from "./components/play/playquizpage.jsx";
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
    console.log("inapp redirect");
    this.setState({
      redirectToHomepage: true
    });
  };
  render() {
    return (
      <BrowserRouter>
        <Auxillary>
          <Route
            path="/playquiz"
            exact
            render={() => (
              <Playquiz playId={this.state.playId} redirect={this.redirect} />
            )}
          />
          <Route
            path="/homepage"
            exact
            render={() => <Homepage getId={this.getId} />}
          />
          <Route
            path="/login"
            exact
            render={() => (
              <Login
                authenticated={this.authenticated}
              // isAuthenticated={this.state.isAuthenticated}
              />
            )}
          />
          <Route
            path="/admin/catagories"
            render={() => <Catagories /*authenticated={this.authenticated}*/ />}
          />
          <Route
            path="/admin/subcatagories"
            exact
            render={() => <Subcatagories /*authenticated={this.authenticated}*/ />}
          />

          <Route
            path="/admin/questions"
            exact
            render={() => <Questions /*authenticated={this.authenticated}*/ />}
          />
          <Route
            path="/admin"
            exact
            render={() => <Quizmaker /*authenticated={this.authenticated}*/ />}
          />
          {/* {this.state.isAuthenticated ? (
            <Route
              path="/admin"
              exact
              render={() => <Quizmaker authenticated={this.authenticated} />}
            />
          ) : (
            <Redirect to="/login" />
          )} */}
          {/* play quiz wasn't working so commented above page */}
          {this.state.redirectToHomepage ? <Redirect to="/homepage" /> : ""}
        </Auxillary>
      </BrowserRouter>
    );
  }
}
