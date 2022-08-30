import React, {useState, useEffect} from "react";


export class ContactsPannel extends React.Component {


    constructor(props) {
      super(props);  
      this.state = {
        contactsAll: [],
        time: Date.now(),
        selected: null,
      }

      this.switchContact = this.switchContact.bind(this);
    }

    async getData() {
        let contacts = [];

        let received = await window.api.ipcComm.invoke("GET_RECEIVED", {})
        for (var key in received){
            let id = received[key].from;
            if (!contacts.some(e => e.id == id)){
                contacts.push({
                    id:id,
                    time:received[key].time
                });
            }
        }

        let sent = await window.api.ipcComm.invoke("GET_SENT", {})
        for (var key in sent){
            let id = sent[key].to;
            if (!contacts.some(e => e.id == id)){
                contacts.push({
                    id:id,
                    time:sent[key].time
                });
            }
        }
        
        let stored = await window.api.ipcComm.invoke("GET_STORED", {});
        for (var key in stored){
            let user = stored[key];
            if (!contacts.some(e => e.id == user.id)){
                contacts.push({
                    id:user.id,
                    time: user.time,
                });
            }
        }

        contacts.sort(function(first, second) {
            return new Date(second.time) - new Date(first.time);
           });
        

        this.setState({
            ...this.state,
            contactsAll: contacts,
            selected: contacts[0].id,
        })

        window.api.ipcComm.send("SWITCH_CONTACT", {id: contacts[0].id});
        
    }

    switchContact(id){
        this.setState({
            ...this.state,
            selected: id,
        })
    }

    componentDidMount(){
        window.api.ipcComm.on("LOGGED_IN", () =>{
            this.getData();
        });

        window.api.ipcComm.on("ADD_CONTACT", () => {
            this.getData();
        });

        window.api.ipcComm.on("REFRESH", () => {
            this.setState({
                ...this.state,
                time: Date.now(),
            }) 
        })
    }
  
    render() {   
      return (
        <div id="contactPannel">
            <div id='contactList'>
            {Contacts(this.state.contactsAll, this.state.time, this.switchContact, this.state.selected)}
            </div>
        </div>
      );
    }
}

function Contacts(contactsAll, time, switchContact, selected){
    let contacts = []

    contacts.push(<AddContact key="add"/>)
    for (var key in contactsAll){
        contacts.push(<Contact userId={contactsAll[key].id} key={contactsAll[key].id} time={time} selected={selected} switchContact={switchContact}/>);
    }
    return contacts;
}


function AddContact(props){
    const openAddContact = () => {
        const element = document.getElementById('addContact');
        if (element.className.includes('adding')){
            element.className = 'contact';
            document.getElementById('addUserInput').value = '';
        } else{
            element.className = 'contact adding';
            document.getElementById('addUserInput').focus();

        }
    }

    const addContact = (event) => {
        if (event.key === 'Enter'){
            event.preventDefault();
            const element = document.getElementById('addContact');
            element.className += " loading";
            window.api.ipcComm.invoke("ADD_CONTACT", event.target.value).then( success => {
                if (success){
                    element.className = 'contact';
                    event.target.value = '';
                } else {
                    element.className = 'contact adding';
                    event.target.style.animation = 'none';
                    event.target.offsetHeight; /* trigger reflow */
                    event.target.animation = null; 
                    event.target.style.animation = "shake 0.5s cubic-bezier(.36,.07,.19,.97) both";

                }
            })

            
        }
    }
    return (
        <div className="contact" id="addContact" >
            <span id="addContactSymbol" onClick={openAddContact}>+</span>
            <input id='addUserInput' onKeyPress={addContact}/>
        </div>
    )
}


function Contact(props){
    const [user, setUser] = useState({
        username: "loading...",
        read: true, //TODO: add feature to mark message as read
        id: props.userId,
        exists: true,
    });


    const getData = async () => {

        const response = await window.api.ipcComm.invoke("GET_USER", {id: props.userId});
        if (response.status == 404){
            setUser(prev => ({
                ...prev,
                username: "",
                exists: false,
            }));
        } else {
            setUser(prev => ({
                ...prev,
                username: response.username,
            }));
        }
    }

    useEffect(() => {
        getData();
    }, [])

    const contextMenu = (event) => {
        event.preventDefault();
        window.api.ipcComm.send("CONTACT_CONTEXT_MENU", user);
    }

    const switchContact = (event) => {
        window.api.ipcComm.send("SWITCH_CONTACT", user);
        props.switchContact(user.id);
    }
    
    if (!user.exists) {
        return null;
    }

    return (
        <div className={"contact " + ((props.selected == props.userId) ? "selected" : "" )} onContextMenu={contextMenu} onClick={switchContact}>
            <img className={'profile ' + ((user.read) ? '': 'unread')} alt={user.username + "'s profile picture"} src={"https://127.0.0.1:3002/resources/profilePicture/" + props.userId + "?time=" + props.time}/>
        </div>
    )
}


