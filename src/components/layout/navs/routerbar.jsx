import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
const routerbar = props => {
  return (
    <Nav fill variant="tabs" defaultActiveKey={"/admin/catagories"}>
      <Nav.Item>
        <Link to="/admin/catagories"><span className={props.catActive}>Catagories</span></Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/admin/subcatagories"><span className={props.subCatActive}>Subcatagories</span> </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/admin/questions"><span className={props.quesActive}>Question</span></Link>
      </Nav.Item>
    </Nav>
  );
};

export default routerbar;
