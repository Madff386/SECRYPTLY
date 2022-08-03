const LoginPannel = require('./user/user.login').LoginPannel;
const React = require('react');
const ReactDOM = require('react-dom/client');



const loginPannelRoot = ReactDOM.createRoot(document.getElementById("loginPannelRoot"));
loginPannelRoot.render(<LoginPannel />);