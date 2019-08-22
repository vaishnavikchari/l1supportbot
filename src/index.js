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
    this.triggetNext = this.triggetNext.bind(this);
  }    
  
  componentDidMount() {
    const { steps } = this.props;
    const q = steps.two.value;
    //const sId = '123';
    //const url = `/df?sessionId=123&q=hi`
    fetch("/df?sessionId=123&q="+q)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          message: result.data
      });
      })
      .catch(console.log)  
    }  
  
  triggetNext() {
    this.setState(() => {
      this.props.triggerNextStep();
    });
  }
    
  render() {
    return (<div>{this.state.message} {this.triggetNext('Are you looking for a parcel? Sad')}</div>)
  }
}

export default class App extends Component {
  render() {
        return <div>
        <ThemeProvider theme={themeset}>
          <ChatBot steps={[
            {
              id: 'one',
              message: 'Hi, Lets chat now',
              trigger: 'two'
            },
            {
              id: 'two',
              user: true,
              trigger: 'three',
            },
            {
              id: 'three',
              component: <GetDialog/>,
              waitAction: true,
              asMessage: true,
              trigger: 'two'
            }
          ]} 
          />
      </ThemeProvider>  
  </div>

  }
}

render(<App />, document.getElementById("root"));