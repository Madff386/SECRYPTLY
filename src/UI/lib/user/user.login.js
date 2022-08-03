const api = require('../../../networking/api/api');

const React = require('react');

const ReactDOM = require('react-dom/client');

const strings = require('../../strings.json')[locale];

function login() {
  event.preventDefault();
  form = document.getElementById('loginForm');
  console.log(form.email.value);
  console.log(form.password.value);
  api.login(form.email.value, form.password.value).then(success => {
    console.log(success);
  });
}

class LoginPannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
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
    console.log(this.state.email + '   ' + this.state.password);
    alert(this.state.email + '   ' + this.state.password);
    event.preventDefault();
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "background"
    }, /*#__PURE__*/React.createElement("div", {
      className: "form"
    }, /*#__PURE__*/React.createElement("img", {
      id: "logo",
      src: "../static/images/logo_transparent.png",
      alt: "secryptly logo"
    }), /*#__PURE__*/React.createElement("div", {
      className: "divider"
    }), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit,
      id: "loginForm"
    }, /*#__PURE__*/React.createElement("input", {
      id: "emailField",
      type: "text",
      name: "email",
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("input", {
      id: "passwordField",
      type: "password",
      name: "password",
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("button", {
      id: "submitButton",
      type: "submit"
    }, strings.loginText))));
  }

}

exports.LoginPannel = LoginPannel;