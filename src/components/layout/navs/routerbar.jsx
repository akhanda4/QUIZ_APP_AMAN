import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Categories from "../quizmaker/quizData/categories.jsx";
import Questions from "../quizmaker/quizData/questions.jsx";
import SubCategories from "../quizmaker/quizData/subcategories.jsx";

class routerbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: ""
    };
  }
  loadCategories = () => {
    this.setState({
      active: "Categories",
      activeCss: "catActive"
    });
  };
  loadSubCategories = () => {
    this.setState({
      active: "SubCategories",
      activeCss: "subCatActive"
    });
  };
  loadQuestions = () => {
    this.setState({
      active: "Questions",
      activeCss: "quesActive"
    });
  };
  render() {
    let catActive = "catActive";
    let subCatActive = "";
    let quesActive = "";
    if (this.state.active === "Categories") {
      catActive = "catActive";
    }
    if (this.state.active === "SubCategories") {
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
        <Nav fill variant="tabs" defaultActiveKey={"/admin/categories"}>
          <Nav.Item>
            <span onClick={this.loadCategories} className={catActive}>
              Categories
            </span>
          </Nav.Item>
          <Nav.Item>
            <span onClick={this.loadSubCategories} className={subCatActive}>
              Subcategories
            </span>
          </Nav.Item>
          <Nav.Item>
            <span onClick={this.loadQuestions} className={quesActive}>
              Question
            </span>
          </Nav.Item>
        </Nav>
        {this.state.active === "Questions" ? (
          <Questions />
        ) : this.state.active === "SubCategories" ? (
          <SubCategories />
        ) : (
          <Categories />
        )}
      </div>
    );
  }
}

export default routerbar;
