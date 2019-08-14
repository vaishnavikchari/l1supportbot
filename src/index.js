import React, { Component } from "react";
import { render } from "react-dom";
/*import fetch from "unfetch";

// package.json proxy value will replace this with the API URL
const API_URL = ""

class Greet extends Component {
  render() {
    return <div>Hello {this.props.to}</div>;
  }
}

export default class App extends Component {
  constructor() {
    super();
    this.state = { to: "" }
  }
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

render(<App />, document.getElementById("root"));*/

import ChatBot from 'react-simple-chatbot';
/*const steps = [
  {
    id: '0',
    message: 'Welcome to react chatbot!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Bye!',
    end: true,
  },
];*/
 
render(
  <div>
    <ChatBot
  steps={[
    {
      id: 'hello-world',
      message: 'Hello World!',
      end: true,
    },
  ]}
/>
  </div>,
  document.getElementById('root')
);