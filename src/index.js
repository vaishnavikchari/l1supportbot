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
  fontFamily: 'Arial',
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
  align-items: center;
`;
const Container = styled.div`
  width: 350px;
`;
export default class App extends Component {
  render() {
        return (<Div>
        <Container>    
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