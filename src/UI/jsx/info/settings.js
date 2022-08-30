import React, {useState, useEffect} from "react";
import { Appearance } from "./settings.appearance";
import { MyAccount } from "./settings.myAccount";


export class SettingsPannel extends React.Component {


  constructor(props) {
    super(props); 
    this.state = {
        page: "myAccount",
        open: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount(){
    window.api.ipcComm.on("SETTINGS", data => {
        if (data == "open") {
            this.setState({
                ...this.state,
                open: true,
                page: "myAccount",
            })
        }
    })
  }

  handleClose(event) {
    event.preventDefault();
    this.setState({
        ...this.state,
        open: false,
    })
  }

  handleChange(event) {
    event.preventDefault();
    let id;
    if (event.target.tagName == 'LI'){
        id = event.target.id;
    } else {
        id = event.target.parentElement.id;
    }
    this.setState({
        ...this.state,
        page: id,
    });
  }
  
  render() {  
    if (this.state.open) {
        return (
            <div id='settings'>
                <div id='navigation'>
                    <ul>
                        <li id="myAccount" onClick={this.handleChange}><p>{window.api.i18n.t("myAccount")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                        <li id="appearance" onClick={this.handleChange}><p>{window.api.i18n.t("appearance")}</p></li>
                    </ul>
                </div>
                <div id='seperator'></div>
                <div id='settingsPage'>
                    <SettingsPage page={this.state.page}/>
                </div>
                <button id='exit' onClick={this.handleClose}><span>×</span></button>
            </div>
        );
    } else {
        return null;
    }
  }
}

const SettingsPage = (props) => {
    if (props.page == 'myAccount') {
        return <MyAccount />
    } else if (props.page == 'appearance') {
        return <Appearance />
    }
    
}
