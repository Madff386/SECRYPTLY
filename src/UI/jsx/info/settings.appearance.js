import React, {useState, useEffect} from "react";


export class Appearance extends React.Component {


  constructor(props) {
    super(props); 
    this.state = {
    }

  }

  
  render() {  
    return (
        <div id='settingsPage'>
            <h1>{window.api.i18n.t("appearance")}</h1>
        </div>
    ); 
  }
}
