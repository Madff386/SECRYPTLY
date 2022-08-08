const React = require('react');



class MessagesPannel extends React.Component {


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

exports.MessagesPannel = MessagesPannel;