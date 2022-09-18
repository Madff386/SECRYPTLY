
import * as ReactDOM from 'react-dom/client';
import React from 'react';
import { LoginPannel } from './user/user.login';

import { MessagesPannel } from './messages/main.message.pannel';
import { ContactsPannel } from './user/contacts.pannel';
import { InfoPannel } from './info/info.bar';
import { SettingsPannel } from './info/settings/settings';
import { PopUp } from './lib/popup';

export function Main(){
    const loginPannelRoot = ReactDOM.createRoot(document.getElementById("loginPannelRoot"));
    const mainAppRoot = ReactDOM.createRoot(document.getElementById("mainAppRoot"));



    loginPannelRoot.render(
        <LoginPannel root={loginPannelRoot}/>
    )

    mainAppRoot.render(
        <div id='mainAppWrapper'>
            <MessagesPannel />
            <ContactsPannel />
            <InfoPannel />
            <SettingsPannel />
            <PopUp />
        </div>
    )
    

}        