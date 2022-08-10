import React from "react";


export class InfoPannel extends React.Component {


    constructor(props) {
      super(props);  
    }
  
    render() {   
      return (
        <div id="infoPannel">
            <div id='userInfo'></div>
            <input type="text" name="sendBox" id="sendBox" />
        </div>
      );
    }
}

