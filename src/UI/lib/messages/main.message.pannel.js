const React = require('react');

class MessagesPannel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "messagePannel"
    }, /*#__PURE__*/React.createElement("div", {
      id: "incomingMessagePannel"
    }), /*#__PURE__*/React.createElement("div", {
      id: "seperator"
    }), /*#__PURE__*/React.createElement("div", {
      id: "outgoingMessagePannel"
    }));
  }

}

exports.MessagesPannel = MessagesPannel;