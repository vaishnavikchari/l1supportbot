import React, {Component} from "react";
import { render } from "react-dom";
import fetch from "unfetch";
import ChatBot, {Components} from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
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

render(<App />, document.getElementById("root"));



//import ChatBot from '../../lib/index';
const themeset = {
  background: '#f5f8fb',
  fontFamily: 'Arial',
  headerBgColor: 'green',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: 'green',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const steps=[
    {
      id: '1',
      message: 'Please type a number',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      validator: (value) => {
        if (isNaN(value)) {
          return 'value should be a number';
        }
        return true
      },
      message: "ok, once more..",
      trigger: '1',
    },
  ]

render(
  <div>
  <ThemeProvider theme={themeset}>
    <ChatBot steps={steps} />
  </ThemeProvider>
  
  </div>,
  document.getElementById('root')
);