import React, { Component } from "react";
import { Button, Navbar, NavDropdown, Nav, Form, FormControl } from 'react-bootstrap';
import "./App.css";
import Auxillary from "./components/auxillary/Auxillary.jsx";
import { BrowserRouter } from 'react-router-dom';
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Auxillary>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>QUIZ APP</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
              </Nav>
              <Nav className="mr-auto">
                <Button size="lg" variant="outline-light">Play Quiz</Button>
              </Nav>
              <Nav>
                <Button size="lg" variant="outline-info">Login</Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Auxillary>
      </BrowserRouter>
    );
  }
}
