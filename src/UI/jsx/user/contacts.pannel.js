import React, {useState, useEffect} from "react";


export class ContactsPannel extends React.Component {


    constructor(props) {
      super(props);  
      this.state = {
        contactsAll: []
      }
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
        
        //TODO: read saved contacts from disk that were added with add contact

        contacts.sort(function(first, second) {
            return new Date(second.time) - new Date(first.time);
           });

        this.setState({
            contactsAll: contacts
        })
        
    }

    componentDidMount(){
        window.api.ipcComm.once("LOGGED_IN", () =>{
            this.getData();
        });
    }
  
    render() {   
      return (
        <div id="contactPannel">
            <div id='contactList'>
            {Contacts(this.state.contactsAll)}
            </div>
        </div>
      );
    }
}

function Contacts(contactsAll){
    let contacts = []
    for (var key in contactsAll){
        contacts.push(<Contact userId={contactsAll[key].id} key={key} />);
    }
    contacts.push(<AddContact key="add"/>)
    return contacts;
}


function AddContact(props){
    const addContact = () => {
        //TODO: feature to add contact
    }
    return (
        <div className="contact" id="addContact" onClick={addContact}>
            <span id="addContactSymbol">+</span>
        </div>
    )
}


function Contact(props){
    const [user, setUser] = useState({
        username: "loading...",
        read: true,
        profilePictureId: "default.png"
    });

    const getData = async () => {
        let response = await window.api.ipcComm.invoke("GET_USER", {id: props.userId});
        setUser(prev => ({
            ...prev,
            username: response.username
        }));
    }

    useEffect(() => {
        getData();
    }, [])

    
    
    return (
        <div className="contact">
            <img className={'profile ' + ((user.read) ? '': 'unread')} alt={user.username + "'s profile picture"} src={"https://127.0.0.1:3002/resources/profilePicture/" + user.profilePictureId}/>
        </div>
    )
}


