import React, { Component } from "react";
import "./App.css";
import Auxillary from "./components/auxillary/Auxillary.jsx";
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Auxillary >
        <p></p>
      </Auxillary>
    );
  }
}
