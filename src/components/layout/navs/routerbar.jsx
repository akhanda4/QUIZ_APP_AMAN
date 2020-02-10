import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Catagories from "../quizmaker/quizData/catagories.jsx";
import Questions from "../quizmaker/quizData/questions.jsx";
import SubCatagories from "../quizmaker/quizData/subcatagories.jsx";

class routerbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: ''
    }
  }
  loadCatagories = () => {
    this.setState({
      active: 'Catagories',
      activeCss: 'catActive'
    })
  }
  loadSubCatagories = () => {
    this.setState({
      active: 'SubCatagories',
      activeCss: 'subCatActive'
    })
  }
  loadQuestions = () => {
    this.setState({
      active: 'Questions',
      activeCss: 'quesActive'
    })
  }
  render() {
    let catActive = "catActive";
    let subCatActive = "";
    let quesActive = "";
    if (this.state.active === "Catagories") {
      catActive = "catActive";
    }
    if (this.state.active === "SubCatagories") {
      subCatActive = "subCatActive";
      quesActive = "";
      catActive = "";
    }
    if (this.state.active === "Questions") {
      quesActive = "quesActive";
      catActive = "";
    }
    return (
      <div>
        <Nav fill variant="tabs" defaultActiveKey={"/admin/catagories"}>
          <Nav.Item>
            <span onClick={this.loadCatagories} className={catActive}>Catagories</span>
          </Nav.Item>
          <Nav.Item>
            <span onClick={this.loadSubCatagories} className={subCatActive}>Subcatagories</span>
          </Nav.Item>
          <Nav.Item>
            <span onClick={this.loadQuestions} className={quesActive}>Question</span>
          </Nav.Item>
        </Nav>
        {this.state.active === "Questions" ? <Questions /> : (this.state.active === "SubCatagories" ? <SubCatagories /> : <Catagories />)}
      </div>
    );
  }
}



export default routerbar;
