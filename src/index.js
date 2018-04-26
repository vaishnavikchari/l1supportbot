import React, { Component } from "react";
import { render } from "react-dom";
import fetch from "unfetch";

const API_URL = ""

class Greet extends Component {
  render() {
    return <div>Hello {this.props.to}</div>;
  }
}

export default class App extends Component {
  state = { to: "" };
  componentDidMount() {
    fetch(`${API_URL}/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "{ planet }" })
    })
      .then(res => res.json())
      .then(res => this.setState({ to: res.data.planet }));
  }
  render() {
    return <Greet to={this.state.to} />;
  }
}

render(<App />, document.getElementById("root"));
