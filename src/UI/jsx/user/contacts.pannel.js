import React from "react";

const contactsData = {user1: {username: "user1", read:true}, user2: {username: "user2", read:false}};

export class ContactsPannel extends React.Component {


    constructor(props) {
      super(props);  
      
    }
  
    render() {   
      return (
        <div id="contactPannel">
            <div id='contactList'>
            {Contacts(contactsData)}
            </div>
        </div>
      );
    }
}

function Contacts(contactsData){
    let contacts = []
    for (var key in contactsData){
        contacts.push(<Contact userData={contactsData[key]} key={key} />);
    }
    for (var i = 0; i < 20; i++){
        contacts.push(<Contact userData={{username:"test"}} key={i} />);
    }
    return contacts;
}

function Contact(props){
    let pic = '';
    if (props.userData.profilePicture){
        pic = props.userData.profilePicture;
    } else{
        pic = 'https://127.0.0.1:3002/resources/profilePicture/default.png';
    }
    return (
        <div className="contact">
            <img className={'profile ' + ((props.userData.read) ? 'unread': '')} alt={props.userData.username + "'s profile picture"} src={pic}/>
        </div>
    )
}


