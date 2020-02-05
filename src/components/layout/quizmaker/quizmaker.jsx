import React, { PureComponent } from "react";
import "../../../public/css/quizmaker.css";
import Auxiliary from "../../auxillary/Auxillary.jsx";
import Logout from "../logout.jsx";
import { Nav, Navbar, Button } from "react-bootstrap";

class quizmaker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Auxiliary>
        <Logout authenticated={this.props.authenticated} />
        <Nav fill variant="tabs">
          <Nav.Item>
            <Nav.Link
              eventKey="link-1"
              href="/admin/catagories"
              onClick={this.loadCatagories}
            >
              Catagories
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-2"
              href="/admin/subcatagories"
              onClick={this.loadSubCatagories}
            >
              Subcatagories
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="link-3"
              href="/admin/questions"
              onClick={this.loadQuestions}
            >
              Question
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Auxiliary>
    );
  }
}
export default quizmaker;
