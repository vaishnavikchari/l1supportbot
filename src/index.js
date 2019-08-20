import React, {Component} from "react";
import { render } from "react-dom";
import fetch from "unfetch";
import ChatBot, {Components} from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

// package.json proxy value will replace this with the API URL
const API_URL = ""

//import ChatBot from '../../lib/index';
const themeset = {
  background: '#f5f8fb',
  fontFamily: 'Arial',
  headerBgColor: '#800080',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#800080',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

class Greet extends Component {
  render() {
    return <div>Hello {this.props.to}</div>;
  }
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {hasData: false, to: "world" }
  }
  componentDidMount() {
    fetch(`${API_URL}/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: "{ planet }" })
    })
      .then(res => res.json())
      .then (res => this.setState({hasData: true, to: res.data.planet}))
  }
  render() {
    //return <Greet to={this.state.to}/> 
        return <div>
        <ThemeProvider theme={themeset}>
          <ChatBot steps={[
            {
              id: '1',
              message: 'What is your name?',
              trigger: '2',
            },
            {
              id: '2',
              user: true,
              trigger: '3',
            },
            {
              id: '3',
              message: "Hi {previousValue}",
              trigger: '4',
            },
            {
              id: '4',
              component: <Greet to={this.state.to} />,
              waitAction: true,
              asMessage: true,
              trigger: '5',
            },
            {
              id: '5',
              message: 'Done',
              trigger: '1',
            }  
          ]} 
          />
      </ThemeProvider>  
  </div>

  }
}

render(<App />, document.getElementById("root"));