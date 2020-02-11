import React, { Component } from "react";
import Cookie from "universal-cookie";
import "../../public/css/login.css";
import Homenavbar from "./navs/homenavbar.jsx";
import { Button, Navbar, Nav } from "react-bootstrap";
import { Route, Redirect } from "react-router-dom";
import $ from "jquery";
import Auxiliary from "../auxillary/Auxillary.jsx";
import JqxNotification from "jqwidgets-scripts/jqwidgets-react-tsx/jqxnotification";
import QuizMaker from "../layout/quizmaker/quizmaker.jsx";

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
    $.ajax({
      url: "http://localhost:8000/login",
      data: credentials,
      type: "POST",
      success: response => {
        if (response.length) {
          console.log(response);
          this.setState(
            {
              authenticated: true
            },
            () => { }
          );
          cookies.set("email", credentials.email);
          setTimeout(() => {
            this.props.authenticated();
          }, 200);
        } else {
          if (response.length === 0) {
            document.getElementById("login_error_message").innerHTML = "Wrong Email or Password";
            this.refs.msgNotificationError.open();
            return;
          }
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
        <JqxNotification
          ref={"msgNotificationError"}
          width={250}
          position={"top-right"}
          opacity={0.9}
          autoOpen={false}
          autoClose={true}
          animationOpenDelay={800}
          autoCloseDelay={3000}
          template={"error"}
        >
          <div id="login_error_message"></div>
        </JqxNotification>
        <JqxNotification
          ref={"msgNotificationSuccess"}
          width={250}
          position={"top-right"}
          opacity={0.9}
          autoOpen={false}
          autoClose={true}
          animationOpenDelay={800}
          autoCloseDelay={3000}
          template={"success"}
        >
          <div id="login_sucess_message">Updated Successfully.</div>
        </JqxNotification>
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
