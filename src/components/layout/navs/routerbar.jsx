import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
const routerbar = props => {
  return (
    <Nav fill variant="tabs" defaultActiveKey={"/admin/catagories"}>
      <Nav.Item>
        <Link to="/admin/catagories">Catagories</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/admin/subcatagories">Subcatagories</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/admin/questions">Question</Link>
      </Nav.Item>
    </Nav>
  );
};

export default routerbar;
