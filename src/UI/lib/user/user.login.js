const api = require('../../../networking/api/api');

const React = require('react');

const {
  useCallback
} = require('react');

const ReactDOM = require('react-dom');

class LoginPannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      create: false
    };
  }

  switchToCreate(event) {
    document.getElementById('loginForm').style.transform = "translateX(-380px)";
    document.getElementById('createForm').style.transform = "translateX(-380px)";
  }

  switchToLogin(event) {
    document.getElementById('loginForm').style.transform = "translateX(0px)";
    document.getElementById('createForm').style.transform = "translateX(0px)";
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "background"
    }, /*#__PURE__*/React.createElement("div", {
      id: "panel"
    }, /*#__PURE__*/React.createElement("img", {
      id: "logo",
      src: "../static/images/logo_transparent.png",
      alt: "secryptly logo"
    }), /*#__PURE__*/React.createElement("div", {
      className: "divider"
    }), /*#__PURE__*/React.createElement("div", {
      id: "form"
    }, /*#__PURE__*/React.createElement(CreateAccountForm, {
      root: this.props.root,
      switchToLogin: () => this.switchToLogin()
    }), /*#__PURE__*/React.createElement(LoginForm, {
      root: this.props.root,
      switchToCreate: () => this.switchToCreate()
    }))));
  }

}

class LoginForm extends React.Component {
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
    const canSubmit = document.getElementById('emailField').value != '' && document.getElementById('passwordField').value != '';
    document.getElementById('loginButton').disabled = !canSubmit;
  }

  handleSubmit(event) {
    event.preventDefault();
    document.getElementById('panel').className += " loading";
    document.getElementById('loginError').innerText = '';
    secryptly.login(this.state.email, this.state.password).then(success => {
      if (success) {
        this.props.root.unmount();
      } else {
        document.getElementById('loginError').innerText = strings.errors.loginError;
      }
    });
    document.getElementById('panel').className -= " loading";
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit,
      id: "loginForm"
    }, /*#__PURE__*/React.createElement("input", {
      id: "emailField",
      type: "text",
      placeholder: strings.emailPlaceholderText,
      name: "email",
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("input", {
      id: "passwordField",
      type: "password",
      placeholder: strings.passwordPlaceholderText,
      name: "password",
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("small", {
      className: "error",
      id: "loginError"
    }), /*#__PURE__*/React.createElement("button", {
      className: "submitButton",
      id: "loginButton",
      type: "submit",
      disabled: true
    }, strings.loginButtonText), /*#__PURE__*/React.createElement("p", {
      id: "createAccount",
      onClick: () => {
        this.props.switchToCreate();
      }
    }, strings.creatAccountText));
  }

}

class CreateAccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      confirmPassword: ''
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
    document.getElementById('panel').className += " loading";
    console.log(this.state.email + '   ' + this.state.password);
    alert(this.state.email + '   ' + this.state.password);
    document.getElementById('panel').className -= " loading";
  }

  render() {
    return /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleSubmit,
      id: "createForm"
    }, /*#__PURE__*/React.createElement("input", {
      id: "emailCreateField",
      type: "text",
      placeholder: strings.emailPlaceholderText,
      name: "email",
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("small", {
      id: "emailError",
      className: "error"
    }), /*#__PURE__*/React.createElement("input", {
      id: "usernameField",
      type: "text",
      placeholder: strings.usernamePlaceholderText,
      name: "username",
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("small", {
      id: "usernameError",
      className: "error"
    }), /*#__PURE__*/React.createElement("input", {
      id: "passwordCreateField",
      type: "password",
      placeholder: strings.passwordPlaceholderText,
      name: "password",
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("small", {
      id: "passwordError",
      className: "error"
    }), /*#__PURE__*/React.createElement("input", {
      id: "confirmPasswordField",
      type: "password",
      placeholder: strings.confirmPasswordPlaceholderText,
      name: "confirmPassword",
      onChange: this.handleInputChange
    }), /*#__PURE__*/React.createElement("small", {
      id: "confirmError",
      className: "error"
    }), /*#__PURE__*/React.createElement("button", {
      className: "submitButton",
      id: "createButton",
      type: "submit"
    }, strings.creatAccountText), /*#__PURE__*/React.createElement("small", {
      id: "loginLink",
      onClick: () => this.props.switchToLogin()
    }, strings.loginLinkText));
  }

}

exports.LoginPannel = LoginPannel;