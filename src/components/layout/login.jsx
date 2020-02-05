import React, { Component } from "react";
import Cookie from "universal-cookie";
import "../../public/css/login.css";
import Homenavbar from "./navs/homenavbar.jsx";
import { Button, Navbar, Nav } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import $ from "jquery";
import Auxiliary from "../auxillary/Auxillary.jsx";

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }
  componentDidMount() {
    this.authenticated();
  }
  authenticated = () => {
    const cookies = new Cookie();
    if (cookies.get("email") !== undefined) {
      this.setState({
        authenticated: true
      });
    } else {
      this.setState({
        authenticated: false
      });
    }
  };
  validate = event => {
    var cookies = new Cookie();
    event.preventDefault();
    let credentials = {};
    credentials.email = document.getElementById("email").value;
    credentials.password = document.getElementById("pwd").value;
    cookies.set("email", credentials.email);
    $.ajax({
      url: "http://localhost:8000/login",
      data: credentials,
      type: "POST",
      success: response => {
        if (response.length) {
          if (typeof response === "string") {
            response = JSON.parse(response);
          }
          this.props.authenticated();
          this.setState(
            {
              authenticated: true
            },
            () => {}
          );
        } else {
          <Route path="/admin" exact render={() => <Login />} />;
        }
      },
      error: response => {
        console.log(response);
      }
    });
  };
  check = () => {
    const cookies = new Cookie();
    let email = cookies.get("email");
    if (!email) {
      return false;
    }
    return true;
  };
  render() {
    return (
      <Auxiliary>
        <Homenavbar />
        <div className="main-content">
          {this.state.authenticated ? (
            <Redirect to="/admin" />
          ) : (
            <Redirect to="/login" />
          )}
          <form
            onSubmit={event => this.validate(event)}
            id="form"
            action="http://localhost:8000/admin"
            method="POST"
          >
            <input
              className="inputs"
              type="text"
              name="email"
              placeholder="example@gmail.com"
              required
              id="email"
            />
            <input
              className="inputs"
              type="password"
              name="password"
              placeholder="****************"
              required
              id="pwd"
            />
            <Button
              size="lg"
              variant="outline-info"
              className="custom_btn"
              type="submit"
              id="submit_login_form"
            >
              Login
            </Button>
          </form>
        </div>
      </Auxiliary>
    );
  }
}
