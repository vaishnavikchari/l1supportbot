import React, {Component} from "react";
import { render } from "react-dom";
import fetch from "unfetch";
import ChatBot from 'react-simple-chatbot';
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

class Messages extends Component {
  constructor() {
    super();
    this.state = {hasData: false, message: ""}
  }      
  componentDidMount() {
    fetch('https://ubiquitous-swan.glitch.me/df?q=hi&sessionId=123')
      .then((res) => {
      console.log(res);
      return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ hasData: true, message: data })
      })
      .catch(console.log)  
    }
  render() {
      return (<div className="chat_window"><p>{this.state.hasData? this.state.message : "Default message"}</p></div>)
  }
}

export default class App extends Component {
  render() {
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
              component: <Messages />,
              waitAction: true,
              asMessage: true,
              trigger: '5'
            },
            {
              id: '5',
              message: 'Done',
              end: true,
            }  
          ]} 
          />
      </ThemeProvider>  
  </div>

  }
}

render(<App />, document.getElementById("root"));