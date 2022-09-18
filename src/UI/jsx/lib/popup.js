import React, {useState, useEffect} from "react";


export class PopUp extends React.Component {


  constructor(props) {
    super(props); 
    this.state = {
        isOpen: false,
        title: "",
        body: "",
        input1: "",
        input2: "",
        input1Type: "none",
        input2Type: "none",
        button1: "",
        button2: "",
        button1Type: "none",
        button2Type: "none",
        type: "",
        onSuccess: "",
        error: "",
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.api.ipcComm.on("POPUP", (data) => {
        this.setState({
            ...this.state,
            ...data,
            isOpen: true,
        })
    })
  }

  handleClick(event) {
    if (event.target.className == 'cancelButton') {
        this.close();
    }

    if (event.target.className == 'okButton') {
        this.close();
    }


    if (event.target.className == 'confirmButton') {
        let data;
        if (this.state.onSuccess == 'UPDATE_USER_DATA'){
            if (document.getElementById("input1").value == document.getElementById("input2").value){
                data = { password: document.getElementById("input1").value };
            } else {
                this.setState({
                    ...this.state,
                    error: "Passwords must match",
                });
                return 0;
            }
        } else {
            data = {
                input1Value: document.getElementById("input1").value,
                input2Value: document.getElementById("input2").value,
            }
        }
        

        window.api.ipcComm.invoke(this.state.onSuccess, data).then( response => {
            if (response.success) {
                this.close();
            } else {
                this.setState({
                    ...this.state,
                    error: response.error,
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }

    if (event.target.className == 'deleteButton') {
        window.api.ipcComm.invoke(this.state.onSuccess, {}).then( response => {
            if (response.success) {
                this.close();
                window.api.ipcComm.send("LOGOUT", {});
            } else {
                this.setState({
                    ...this.state,
                    error: response.error,
                })
            }
        });
    }
  }

  close() {
    this.setState({
        isOpen: false,
        title: "",
        body: "",
        input1: "",
        input2: "",
        input1Type: "none",
        input2Type: "none",
        button1: "",
        button2: "",
        button1Type: "none",
        button2Type: "none",
        type: "",
        onSuccess: "",
        error: "",
    })
  }
  
  render() { 
    if (this.state.isOpen) { 
        return (
            <div id='popup'>
                <div id='modal'>
                    <h1>{this.state.title}</h1>
                    <p>{this.state.body}</p>
                    <input type={this.state.input1Type} className={this.state.input2Type + "Input"} id='input1' placeholder={this.state.input1}/>
                    <input type={this.state.input2Type} className={this.state.input2Type + "Input"} id='input2' placeholder={this.state.input2}/>
                    <p id='error'>{this.state.error}</p>
                    <button id='button1' className={this.state.button1Type + "Button"} onClick={this.handleClick}>{this.state.button1}</button>
                    <button id='button2' className={this.state.button2Type + "Button"} onClick={this.handleClick}>{this.state.button2}</button>
                </div>
            </div>
        ); 
    } else {
        return null;
    }
  }
}
