import React, { Component } from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import { Redirect } from "react-router-dom";
// import { Route, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
class Adminnavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCookieCleared: false
    };
  }
  clearCookie = () => {
    let cookie = new Cookies();
    cookie.remove("email");
    <Redirect to="/login" />
  };

  render() {
    return (
      <Auxiliary>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>QUIZ APP</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Button
                size="lg"
                variant="outline-light"
                href="/login"
                onClick={this.clearCookie}
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Auxiliary>
    );
  }
}

export default Adminnavbar;
