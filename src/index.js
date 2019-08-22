import React, {Component} from "react";
import { render } from "react-dom";
import fetch from "unfetch";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

// package.json proxy value will replace this with the API URL
//const API_URL = ""

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

/*
*/

class GetDialog extends Component {
  constructor() {
    super();
    this.state = {message: "..."}
  }    
  
  componentDidMount(q) {
    //const { steps } = this.props;
    //const {q, sessionId}  = steps;
    //const q = this.props.q;
    //const sId = '123';
    //const url = `/df?sessionId=123&q=hi`
    //console.log(this.props.q);
    fetch("/df?sessionId=123&q="+q)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          message: result.data
      });
      })
      .catch(console.log)  
    }  

  render() {
    return (<div>{this.state.message}</div>)
  }
}

export default class App extends Component {
  render() {
        return <div>
        <ThemeProvider theme={themeset}>
          <ChatBot steps={[
            {
              id: '1',
              message: 'Hi, Lets chat now',
              trigger: '2'
            },
            {
              id: '2',
              user: true,
              trigger: '3',
            },
            {
              id: '3',
              component: <GetDialog '{previousValue}'/>,
              waitAction: true,
              asMessage: true,
              trigger: '2'
            }
          ]} 
          />
      </ThemeProvider>  
  </div>

  }
}

render(<App />, document.getElementById("root"));