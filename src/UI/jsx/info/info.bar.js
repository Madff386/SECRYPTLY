import React from "react";


export class InfoPannel extends React.Component {


  constructor(props) {
    super(props);  
    this.state = {
      text: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    }

  handleSubmit(event) {
    event.preventDefault();
    document.getElementById("sendButton").value = '';
    alert(this.state.text);
  }

  
  render() {   // TODO: make sendBox placeholder be whatever user is selcted
    return (
      <div id="infoPannel">
         <UserInfoPannel />
          <form onSubmit={this.handleSubmit}>
          <input type="text" name="text" placeholder="Message xyz" id="sendBox" onChange={this.handleInputChange} /> 
          <button id='sendButton' type='submit'>
            <svg id="sendSVG" viewBox="0 0 20 20">
              <path d="M17.218,2.268L2.477,8.388C2.13,8.535,2.164,9.05,2.542,9.134L9.33,10.67l1.535,6.787c0.083,0.377,0.602,0.415,0.745,0.065l6.123-14.74C17.866,2.46,17.539,2.134,17.218,2.268 M3.92,8.641l11.772-4.89L9.535,9.909L3.92,8.641z M11.358,16.078l-1.268-5.613l6.157-6.157L11.358,16.078z"></path>
            </svg>
          </button>
          </form>
      </div>
    );
  }
}

class UserInfoPannel extends React.Component {
  constructor(props) {
    super(props);  
  }

  render() {  
    return (
      <div id='userInfo'>

      </div>
    );
  }
}
