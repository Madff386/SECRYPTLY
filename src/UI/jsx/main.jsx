
const React = require('react');
const ReactDOM = require('react-dom/client');



const loginPannelRoot = ReactDOM.createRoot(document.getElementById("loginPannelRoot"));
const mainAppRoot = ReactDOM.createRoot(document.getElementById("mainAppRoot"));
const LoginPannel = require('./user/user.login').LoginPannel;
const MessagesPannel = require('./messages/main.message.pannel').MessagesPannel;
const ContactsPannel = require('./user/contacts.pannel').ContactsPannel;
const InfoPannel = require('./info/info.bar').InfoPannel;
//loginPannelRoot.render(<LoginPannel root={loginPannelRoot}/>);

mainAppRoot.render(
    <div id='mainAppWrapper'>
        <ContactsPannel />
        <MessagesPannel />
        <InfoPannel />
    </div>
)
