import React, {useState, useEffect} from "react";


export class InfoPannel extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      time: Date.now(),
    } 
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRender = this.handleRender.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    window.api.ipcComm.send("PING", "SEND_MSG");
  }

  handleRender(event) {
    event.preventDefault();
    window.api.ipcComm.send("PING", "TOGGLE_RENDER");
  }



  handleSettings(event) {
    event.preventDefault();
    window.api.ipcComm.send("SETTINGS", "open");
  }

  componentDidMount(){
    window.api.ipcComm.on("REFRESH", () => {
      this.setState({
        ...this.state,
        time: Date.now(),
    }) 
    })
  }
  
  render() {  
    return (
      <div id="infoPannel">
        <button id='settingsButton' onClick={this.handleSettings}>
          <svg id='settingsIcon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
          </svg>
        </button>
         <UserInfoPannel time={this.state.time}/>
         <button id='renderButton' onClick={this.handleRender}>
         <svg id='previewIcon' version="1.1" x="0px" y="0px" viewBox="0 0 480.606 480.606">
            <g>
              <rect x="85.285" y="192.5" width="200" height="30"/>
              <path d="M439.108,480.606l21.213-21.213l-71.349-71.349c12.528-16.886,19.949-37.777,19.949-60.371
                c0-40.664-24.032-75.814-58.637-92.012V108.787L241.499,0H20.285v445h330v-25.313c6.188-2.897,12.04-6.396,17.475-10.429
                L439.108,480.606z M250.285,51.213L299.072,100h-48.787V51.213z M50.285,30h170v100h100v96.957
                c-4.224-0.538-8.529-0.815-12.896-0.815c-31.197,0-59.148,14.147-77.788,36.358H85.285v30h126.856
                c-4.062,10.965-6.285,22.814-6.285,35.174c0,1.618,0.042,3.226,0.117,4.826H85.285v30H212.01
                c8.095,22.101,23.669,40.624,43.636,52.5H50.285V30z M307.389,399.208c-39.443,0-71.533-32.09-71.533-71.533
                s32.089-71.533,71.533-71.533s71.533,32.089,71.533,71.533S346.832,399.208,307.389,399.208z"/>
            </g>
          </svg>
         </button>
          <button id='sendButton' onClick={this.handleSubmit}>
          <span id='sendIcon'>&rarr;</span> 
          </button>
      </div>
    );
  }
}

const UserInfoPannel = (props) => {
  const [user, setUser] = useState({
    username: "",
    id: "default",
  });


  const getData = async (id) => {

    const response = await window.api.ipcComm.invoke("GET_USER", {id: id});
    setUser(prev => ({
        ...prev,
        username: response.username,
        id: id,
    }));
    
  }

  useEffect(() => {
    window.api.ipcComm.on("LOGGED_IN", username => {
      window.api.ipcComm.invoke("GET_MY_ID", username).then( id => {
        getData(id);
      });
    })

    window.api.ipcComm.on("LOGOUT", () => {
      setUser(prev => ({
        ...prev,
        username: '',
        id: 'default',
    }));
    })
  }, []);

  return (
    <div id='userInfo'>
        <img id='profilePicture' alt='profile picture' src={"https://127.0.0.1:3002/resources/profilePicture/" + user.id + "?time=" + props.time}/>
        <p id="username">{user.username}</p>
    </div>
  );
}
