import React from "react";


export class MessagesPannel extends React.Component {


    constructor(props) {
      super(props);  
    }
  
    render() {   
      return (
        <div id="messagePannel">
            <div id="incomingMessagePannel"></div>
            <div id="seperator"></div>
            <div id='outgoingMessagePannel'></div>
        </div>
      );
    }
}

