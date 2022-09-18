import React, {useState, useEffect} from "react";


export class MyAccount extends React.Component {


    constructor(props) {
        super(props); 
        this.state = {
        }

        this.handleEdit = this.handleEdit.bind(this);
        this.handleSaveChange = this.handleSaveChange.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.changeProfile = this.changeProfile.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    deleteAccount(event) {
        window.api.ipcComm.send("POPUP", {
            type: "confirm",
            title: window.api.i18n.t("Delete Account"),
            body: window.api.i18n.t("You are about to delete your account, this action is irreversible."),
            input1Type: "none",
            input2Type: "none",
            button1: window.api.i18n.t("Cancel"),
            button2: window.api.i18n.t("Delete"),
            button1Type: "cancel",
            button2Type: "delete",
            onSuccess: "DELETE_ACCOUNT",
        });
    }

    changePassword(event) {
        window.api.ipcComm.send("POPUP", {
            type: "input",
            title: window.api.i18n.t("Change Password"),
            body: "",
            input1: window.api.i18n.t("New Password"),
            input2: window.api.i18n.t("Confirm Password"),
            input1Type: "password",
            input2Type: "password",
            button1: window.api.i18n.t("Cancel"),
            button2: window.api.i18n.t("Change"),
            button1Type: "cancel",
            button2Type: "confirm",
            onSuccess: "UPDATE_USER_DATA",
        });
    }


    componentDidMount(){
        window.api.ipcComm.invoke("GET_MY_DATA", {}).then( response => {
            if (!response.phone) {
                response.phone = '';
            } 
            if (!response.firstName) {
                response.firstName = '';
            } 
            if (!response.lastName) {
                response.lastName = '';
            } 
            this.setState({...response, time: Date.now()});
        })
    }

    handleEdit(event){
        event.preventDefault();
        event.target.previousElementSibling.removeAttribute('readonly');
        event.target.previousElementSibling.className = 'edit';
        event.target.className = 'edit';
        event.target.previousElementSibling.focus();
        event.target.previousElementSibling.select();
    }

    stopEdit(target) {
        target.setAttribute('readonly', true);
        target.className = '';
        target.nextElementSibling.className = '';
        target.nextElementSibling.nextElementSibling.innerText = '';
        target.value = target.defaultValue;
        
    }

    handleStop(event) {
        this.stopEdit(event.target);
    }

    handleSaveChange(event){
        if (event.key == 'Enter') {
            document.getElementById('profile').className = 'loading';
            window.api.ipcComm.invoke("UPDATE_USER_DATA", { [event.target.name]: event.target.value }).then( response => {
                if (response.success) {
                    this.setState({
                        ...this.state,
                        [event.target.name]: event.target.value,
                    });
                    event.target.defaultValue = event.target.value;
                    this.stopEdit(event.target);
                    document.getElementById('profile').className = '';
                } else {
                    event.target.style.animation = 'none';
                    event.target.offsetHeight; /* trigger reflow */
                    event.target.animation = null; 
                    event.target.style.animation = "shake 0.5s cubic-bezier(.36,.07,.19,.97) both";
                    event.target.nextElementSibling.nextElementSibling.innerText = window.api.i18n.t(response.error);
                    document.getElementById('profile').className = '';
                }
            }) 
            
        } 
    }


    changeProfile(event) {
        window.api.ipcComm.invoke("SET_PROFILE_PICTURE", event.target.files[0].path).then( response => {
            if (response) {
                this.setState({
                    ...this.state,
                    time: Date.now(),
                })
                window.api.ipcComm.send("REFRESH", "profilePicture"); 
            } else {
                event.target.parentElement.style.animation = 'none';
                event.target.parentElement.offsetHeight; /* trigger reflow */
                event.target.parentElement.animation = null; 
                event.target.parentElement.style.animation = "shake 0.5s cubic-bezier(.36,.07,.19,.97) both";
            }
        })
    }

  
    render() {  
        let phoneText = "Edit";
        let firstNameText = "Edit";
        let lastNameText = "Edit";
        if (this.state.phone == '') {
            phoneText = "Add";
        } 
        if (this.state.firstName == '') {
            firstNameText = "Add";
        } 
        if (this.state.lastName == '') {
            lastNameText = "Add";
        } 
        return (
            <div id='myAccount'>
                <h1>{window.api.i18n.t("myAccount")}</h1>

                <div id='profile'>
                    <div id='pictureHalo'>
                        <img id='profilePicture' src={"https://127.0.0.1:3002/resources/profilePicture/" + this.state.id + "?time=" + this.state.time}/>
                        <label id='fileInputButton'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="752pt" height="752pt" version="1.1" viewBox="0 0 752 752">
                                <g>
                                <path d="m471.97 544.77h-246.45c-13.918 0-25.238-11.32-25.238-25.238v-232.57c0-13.918 11.32-25.238 25.238-25.238h171.52v13.875h-171.52c-6.2656 0-11.363 5.0977-11.363 11.363v232.57c0 6.2656 5.0977 11.363 11.363 11.363h246.44c6.2656 0 11.363-5.0977 11.363-11.363l0.003907-157.64h13.875v157.64c-0.007813 13.918-11.328 25.238-25.238 25.238z"/>
                                <path d="m451.54 504.12h-205.59c-2.5703 0-4.9336-1.4258-6.1367-3.6992-1.2031-2.2773-1.0469-5.0273 0.40625-7.1562l38.199-55.887c1.2969-1.8906 3.4375-3.0234 5.7266-3.0234 2.2891 0 4.4336 1.1328 5.7266 3.0234l16.812 24.594 58.871-86.117c1.2969-1.8906 3.4375-3.0234 5.7266-3.0234 2.2891 0 4.4336 1.1328 5.7266 3.0234l80.258 117.41c1.4531 2.1211 1.6094 4.8789 0.40625 7.1562-1.1992 2.2773-3.5625 3.6992-6.1328 3.6992zm-192.44-13.871h179.3l-67.113-98.184-58.871 86.117c-1.2969 1.8906-3.4375 3.0234-5.7266 3.0234-2.2891 0-4.4336-1.1328-5.7266-3.0234l-16.812-24.594z"/>
                                <path d="m279.19 369.58c-15.656 0-28.391-12.738-28.391-28.391 0-15.656 12.738-28.391 28.391-28.391 15.656 0 28.391 12.738 28.391 28.391s-12.738 28.391-28.391 28.391zm0-42.91c-8.0039 0-14.516 6.5117-14.516 14.516s6.5117 14.516 14.516 14.516 14.516-6.5117 14.516-14.516-6.5117-14.516-14.516-14.516z"/>
                                <path d="m483.33 214.16h13.875v109.01h-13.875z"/>
                                <path d="m435.76 261.73h109.01v13.875h-109.01z"/>
                                </g>
                            </svg>
                            <input type='file' accept="image/png" name="image" id='fileInput' onChange={this.changeProfile}/>
                        </label>
                    </div>
                    
                    <p id='username'>{this.state.username}</p>
                    <div id='profileData'>
                        <div>
                            <label htmlFor='username'>{window.api.i18n.t("Username")}</label>
                            <input name='username' readOnly defaultValue={this.state.username} onKeyPress={this.handleSaveChange} onBlur={this.handleStop}/>
                            <button onClick={this.handleEdit}>{window.api.i18n.t("Edit")}</button>
                            <p className="error"></p>
                        </div>
                        <div>
                            <label htmlFor='email'>{window.api.i18n.t("Email")}</label>
                            <input name='email' readOnly defaultValue={this.state.email} onKeyPress={this.handleSaveChange} onBlur={this.handleStop}/>
                            <button onClick={this.handleEdit}>{window.api.i18n.t("Edit")}</button>
                            <p className="error"></p>
                        </div>
                        <div>
                            <label htmlFor='firstName'>{window.api.i18n.t("First Name")}</label>
                            <input name='firstName' readOnly defaultValue={((this.state.firstName == '' ? '--': this.state.firstName))} onKeyPress={this.handleSaveChange} onBlur={this.handleStop}/>
                            <button onClick={this.handleEdit}>{window.api.i18n.t(firstNameText)}</button>
                            <p className="error"></p>
                        </div>
                        <div>
                            <label htmlFor='lastName'>{window.api.i18n.t("Last Name")}</label>
                            <input name='lastName' readOnly defaultValue={((this.state.lastName == '' ? '--': this.state.lastName))} onKeyPress={this.handleSaveChange} onBlur={this.handleStop}/>
                            <button onClick={this.handleEdit}>{window.api.i18n.t(lastNameText)}</button>
                            <p className="error"></p>
                        </div>
                        <div>
                            <label htmlFor='phone'>{window.api.i18n.t("Phone Number")}</label>
                            <input name='phone' readOnly defaultValue={((this.state.phone == '' ? '--': this.state.phone))} onKeyPress={this.handleSaveChange} onBlur={this.handleStop}/>
                            <button onClick={this.handleEdit}>{window.api.i18n.t(phoneText)}</button>
                            <p className="error"></p>
                        </div>
                    </div>
                </div>
                <hr />

                <h2>{window.api.i18n.t("Password and Authentication")}</h2>

                <button id='changePassword' onClick={this.changePassword}>{window.api.i18n.t("Change Password")}</button>

                <hr />

                <h2>{window.api.i18n.t("Account Removal")}</h2>
                <p>{window.api.i18n.t("Deleting your account will permenantly remove it, there is no way to undo this action.")}</p>
                <button id='deleteAccount' onClick={this.deleteAccount}>{window.api.i18n.t("Delete Account")}</button>

            </div>
        ); 
    }
}
