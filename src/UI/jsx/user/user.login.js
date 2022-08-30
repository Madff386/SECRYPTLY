import React from 'react';

export class LoginPannel extends React.Component {


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
      username: '',
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

    const canSubmit = document.getElementById('usernameLoginField').value != '' && document.getElementById('passwordField').value != '';
    document.getElementById('loginButton').disabled = !canSubmit;
  }

  handleSubmit(event) {
    event.preventDefault();
    document.getElementById('panel').className += " loading";
    document.getElementById('loginError').innerText = '';
    window.api.ipcComm.invoke("LOGIN", {username: this.state.username, password: this.state.password}).then( success => {
      if (success){
        this.props.root.unmount();
      } else {
        document.getElementById('loginError').innerText = window.api.i18n.t("Inncorrect Username or Password");
      }
    }).catch( err => {
      document.getElementById('loginError').innerText = window.api.i18n.t("Inncorrect Username or Password");
    })
    document.getElementById('panel').className -= " loading";
  }


  render(){
    
    return  (
      <form onSubmit={this.handleSubmit} id="loginForm">
        <input id="usernameLoginField" type='text' placeholder={window.api.i18n.t("Username")} name="username" onChange={this.handleInputChange} />
        <input id="passwordField" type="password" placeholder={window.api.i18n.t("Password")} name="password" onChange={this.handleInputChange}/>
        <small className='error' id='loginError'></small>
        <button className="submitButton" id="loginButton" type='submit' disabled={true}>{window.api.i18n.t("Login")}</button>
        <p id='createAccount' onClick={() => {this.props.switchToCreate()}}>{window.api.i18n.t("Create Account")}</p>
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
    document.getElementById('confirmError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('usernameError').innerText = '';
    document.getElementById('passwordError').innerText = '';

    if (document.getElementById('usernameField').value == '') {
      document.getElementById('usernameError').innerText = 'username can\'t be blank';

    } else if (document.getElementById('emailCreateField').value == '') {
      document.getElementById('emailError').innerText = 'email can\'t be blank';

    } else if (document.getElementById('passwordCreateField').value == '') {
      document.getElementById('passwordError').innerText = 'password can\'t be blank';

    } else if (document.getElementById('passwordCreateField').value != document.getElementById('confirmPasswordField').value) {
      document.getElementById('confirmError').innerText = 'passwords are not the same';
    } else {
      window.api.ipcComm.invoke("CREATE_ACCOUNT", this.state).then( response => {
        if (response.error) {
          document.getElementById(response.field + "Error").innerText = response.error;
        } else {
          console.log("good");
        }
      })
    }
    document.getElementById('panel').className -= " loading";
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} id="createForm">
        <input id="usernameField" type='text' placeholder={window.api.i18n.t("Username")} name="username" onChange={this.handleInputChange}/>
        <small id="usernameError" className="error"></small>

        <input id="emailCreateField" type='text' placeholder={window.api.i18n.t("Email")} name="email" onChange={this.handleInputChange}/>
        <small id="emailError" className="error"></small>

        <input id="passwordCreateField" type="password" placeholder={window.api.i18n.t("Password")} name="password" onChange={this.handleInputChange}/>
        <small id="passwordError" className="error"></small>

        <input id="confirmPasswordField" type="password" placeholder={window.api.i18n.t("Confirm Password")} name="confirmPassword" onChange={this.handleInputChange}/>
        <small id="confirmError" className="error"></small>

        <button className="submitButton" id='createButton' type='submit'>{window.api.i18n.t("Create Account")}</button>
        <small id='loginLink' onClick={() => this.props.switchToLogin()}>{window.api.i18n.t("Login Instead")}</small>
      </form>
    )
  }
}

