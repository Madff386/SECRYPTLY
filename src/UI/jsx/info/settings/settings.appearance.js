import React, {useState, useEffect} from "react";
import { RangeSlider } from "../../lib/range-slider";


export class Appearance extends React.Component {


  constructor(props) {
    super(props); 
    this.state = {
      theme: "dark"
    };
    this.onChangeTheme = this.onChangeTheme.bind(this);
  }

  onChangeTheme(event) {
    const radioButtons = document.querySelectorAll('#themeRadioContainer .radioButton');
    radioButtons.forEach( radioButton => {
      radioButton.className = 'radioButton';
    });
    event.target.parentElement.className += ' selected';

    window.api.ipcComm.send("CHANGE_THEME", event.target.value);
    this.setState({
      ...this.state,
      theme: event.target.value,
    })
  }

  onChangeFont(value) {
    console.log(value);
  }

  componentDidMount() {
    window.api.ipcComm.invoke("GET_THEME_SOURCE", {}).then( theme => {
      this.setState({
        ...this.state,
        theme,
      })
    })
  }

  render() {  
    return (
        <div id='appearance'>
            <h1>{window.api.i18n.t("appearance")}</h1>
            <h3>{window.api.i18n.t("Theme")}</h3>
            <div className="radio" id='themeRadioContainer'>
              <label className="radioButton">
                <span className="text">{window.api.i18n.t("Dark")}</span>
                <input type="radio" name="radio" value='dark' checked={this.state.theme == 'dark'} onChange={this.onChangeTheme}/>
                <span className="checkmark"></span>
              </label>
              <label className="radioButton">
                <span className="text">{window.api.i18n.t("Light")}</span>
                <input type="radio" name="radio" value='light' checked={this.state.theme == 'light'} onChange={this.onChangeTheme}/>
                <span className="checkmark"></span>
              </label>
              <label className="radioButton">
                <span className="text">{window.api.i18n.t("Same As System")}</span>
                <input type="radio" name="radio" value='system' checked={this.state.theme == 'system'} onChange={this.onChangeTheme}/>
                <span className="checkmark"></span>
              </label>
            </div>
        </div>
    ); 
  }
}
