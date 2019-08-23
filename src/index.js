import React, {Component} from "react";
import { render } from "react-dom";
import fetch from "unfetch";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
// package.json proxy value will replace this with the API URL
//const API_URL = ""

//import ChatBot from '../../lib/index';
const themeset = {
  background: '#f5f8fb',
  fontFamily: 'Verdana',
  headerBgColor: '#8D33FF',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#8D33FF',
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
    this.triggetNext()
    }  
  
  triggetNext() {
      this.props.triggerNextStep();
  }
    
  render() {
    return (<div>{this.state.message}</div>)
    /*
    {<button onClick={() => this.triggetNext()}>
      Start Again
    </button>}
    */
  }
}

//Styling page using styled-components

const Div = styled.div`
  display: flex;
  height: device-height;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
width: 450px;
@media only screen and (max-width: 450px) {
      width: 100%;
}
`;
const Title = styled.h1`
  font-family: Verdana, Arial, sans-serif;
  font-size: 1.5em;
  text-align: center;
  color: #8D33FF;
  text-align: left;
`;
export default class App extends Component {
  render() {
        return (<Div> 
        <Container>  
          <Title>Chat with Ecobot</Title>
        <ThemeProvider theme={themeset}>
          <ChatBot headerTitle={"Ecobot"} width={"450px"} steps={[
            {
              id: 'one',
              message: 'Hi, I am Ecobot. Ask me something',
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
              delay: 2000,
              asMessage: true,
              trigger: 'two'
            }
          ]} 
          />
      </ThemeProvider> 
            </Container>
  </Div>)

  }
}

render(<App />, document.getElementById("root"));