import React from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import "../../../public/css/homenavbar.css";
const homenavbar = props => {
  return (
    <Auxiliary>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">QUIZ APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Button
              size="lg"
              variant="outline-light"
              target="_blank"
              href="/homepage"
            >
              Play Quiz
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Auxiliary>
  );
};

export default homenavbar;
