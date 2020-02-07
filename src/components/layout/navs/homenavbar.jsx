import React from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import "../../../public/css/homenavbar.css";
import { Link } from "react-router-dom";
const homenavbar = props => {
  return (
    <Auxiliary>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">QUIZ APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Button size="lg" variant="outline-light" href="/quiz">
              {/* <Link to="/playquiz">Play Quiz</Link> */}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Auxiliary>
  );
};

export default homenavbar;
