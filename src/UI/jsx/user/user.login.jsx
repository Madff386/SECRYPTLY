const api = require('../../../networking/api/api');
const React = require('react');
const { useCallback } = require('react');
const ReactDOM = require('react-dom');




class LoginPannel extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      create: false,
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
    return (
      <div className="background">
        <div id="panel">
          <img id='logo' src="../static/images/logo_transparent.png" alt="secryptly logo" />
          <div className="divider"></div>
          <div id="form">
          <CreateAccountForm root={this.props.root} switchToLogin={() => this.switchToLogin()}/>
          <LoginForm  root={this.props.root} switchToCreate={() => this.switchToCreate()}/>
          </div>
        </div>
      </div>
    );
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
    secryptly.login(this.state.email, this.state.password).then( success => {
      if (success){
        this.props.root.unmount();
      } else {
        document.getElementById('loginError').innerText = strings.errors.loginError;
      }
    })
    document.getElementById('panel').className -= " loading";
  }


  render(){
    
    return  (
      <form onSubmit={this.handleSubmit} id="loginForm">
        <input id="emailField" type='text' placeholder={strings.emailPlaceholderText} name="email" onChange={this.handleInputChange} />
        <input id="passwordField" type="password" placeholder={strings.passwordPlaceholderText} name="password" onChange={this.handleInputChange}/>
        <small className='error' id='loginError'></small>
        <button className="submitButton" id="loginButton" type='submit' disabled={true}>{strings.loginButtonText}</button>
        <p id='createAccount' onClick={() => {this.props.switchToCreate()}}>{strings.creatAccountText}</p>
      </form>
    )
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
      confirmPassword: '',
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

  render(){
    return (
      <form onSubmit={this.handleSubmit} id="createForm">
        <input id="emailCreateField" type='text' placeholder={strings.emailPlaceholderText} name="email" onChange={this.handleInputChange}/>
        <small id="emailError" className="error"></small>

        <input id="usernameField" type='text' placeholder={strings.usernamePlaceholderText} name="username" onChange={this.handleInputChange}/>
        <small id="usernameError" className="error"></small>

        <input id="passwordCreateField" type="password" placeholder={strings.passwordPlaceholderText} name="password" onChange={this.handleInputChange}/>
        <small id="passwordError" className="error"></small>

        <input id="confirmPasswordField" type="password" placeholder={strings.confirmPasswordPlaceholderText} name="confirmPassword" onChange={this.handleInputChange}/>
        <small id="confirmError" className="error"></small>

        <button className="submitButton" id='createButton' type='submit'>{strings.creatAccountText}</button>
        <small id='loginLink' onClick={() => this.props.switchToLogin()}>{strings.loginLinkText}</small>
      </form>
    )
  }
}

exports.LoginPannel = LoginPannel;