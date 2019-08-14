import React from "react";
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

import ChatBot, {Components} from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

//import ChatBot from '../../lib/index';
const themeset = {
  background: '#f5f8fb',
  fontFamily: 'Arial',
  headerBgColor: '#EF6C00',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#EF6C00',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const steps = [
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
];

render(
  <div>
  <ThemeProvider theme={themeset}>
    <ChatBot steps={steps} />;
  </ThemeProvider>
  
  </div>,
  document.getElementById('root')
);