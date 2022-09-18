import React, { useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import { stackoverflowLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { stackoverflowDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { EncryptAnimation } from "./encryptAnimation";
export class MessagesPannel extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
      in: "",
      out: "",
      isRender: false,
      isLightTheme: false,
      user: null,
    }

    this.focusSend = this.focusSend.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){

    window.api.ipcComm.invoke("GET_THEME", "").then( shouldUseDarkColors => {
      this.setState({...this.state, isLightTheme: !shouldUseDarkColors})
    })

    window.api.ipcComm.on("SWITCH_CONTACT", (user) => {
      this.setState({
        ...this.state,
        user: user.id,
      })
      if (user.id == null) {
        this.setState({...this.state, in: "" });
      } else {
        window.api.ipcComm.invoke("GET_MSG", { from: user.id }).then(((response) => {
          this.setState({...this.state, in: response });
        }))
      }
    });

    window.api.ipcComm.on("MESSAGE_RECEIVED", (data) => {
      window.api.ipcComm.invoke("GET_MSG", { from: data.from }).then(((response) => {
        this.setState({...this.state, in: response });
      }))
    })

    window.api.ipcComm.on("LOGOUT", () => {
      this.setState({
        ...this.state,
        user: null,
        in: "",
        out: "",
      })
      document.getElementById("outMsgInput").value = '';
    })

    window.api.ipcComm.on("PING", (data) =>{
      if (data == "TOGGLE_RENDER"){
        if (this.state.isRender) {
          document.getElementById('renderButton').className = '';
        } else {
          document.getElementById('renderButton').className = 'render';
        }
        this.setState({ ...this.state, isRender: !this.state.isRender });
      }
    });

    window.api.ipcComm.on("PING", (data) =>{
      if (data == "SEND_MSG"){
        const msg = this.state.out;
        window.api.ipcComm.invoke("SEND_MSG", { to: this.state.user, text: msg }).then((response) => {
          if (!response.error) {
            this.setState({
              ...this.state,
              isRender: true,
            }, () => {
              const el = document.querySelector("#outMsg .container");
              const fx = new EncryptAnimation(el);
              console.log(response.message.content);
              fx.setText(response.message.content).then( () => {
                document.querySelector("#outMsg .container").style.transform = 'translateX(110%)';
                setTimeout(() => {
                  this.setState({
                    ...this.state,
                    out: '',
                    isRender: false,
                  })
                }, 2000)
              });
            })
          } else if (response.error == 'message too long') {
            window.api.ipcComm.send("POPUP", {
              type: "alert",
              title: window.api.i18n.t("Too Long"),
              body:  window.api.i18n.t("Max message length is 5,000 characters"),
              input1Type: "none",
              input2Type: "none",
              button1:  window.api.i18n.t("Ok"),
              button1Type: "ok",
            })
          } else {
            console.log(response.error); 
          }
        });
      }
    });

    window.api.ipcComm.on("SHOULD_USE_DARK", (shouldUseDarkColors) =>{
      this.setState({...this.state, isLightTheme: !shouldUseDarkColors})
    });

  }

  onChange(event){
    this.setState({ ...this.state, out: document.getElementById("outMsgInput").value });
  }

  focusSend(event){
    let element = document.getElementById("outMsgInput");
    if (typeof(element) != 'undefined' && element != null) {
      element.focus();
    }
  }

  render() {   
    let style;
    if (this.state.isLightTheme){
      style = stackoverflowLight;
    } else {
      style = stackoverflowDark;
    } 
    return (
      <div id="messagePannel">
          <div id="incomingMessagePannel">
            <div id="inMsg">
                <ReactMarkdown children={this.state.in} components={{
                  code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={style}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  }
                }}/>
            </div>
          </div>
          <div id="seperator"></div>
          <div id='outgoingMessagePannel' onClick={this.focusSend}>
            <OutMsg isRender={this.state.isRender} out={this.state.out} isLightTheme={this.state.isLightTheme} onChange={this.onChange}/>
          </div>
      </div>
    );
  }
}


const OutMsg = (props) => {

  let msg;
  if (props.isRender) {
    let style;
    if (props.isLightTheme){
      style = stackoverflowLight;
    } else {
      style = stackoverflowDark;
    } 
    msg = <ReactMarkdown className="container" children={props.out} components={{
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, '')}
            style={style}
            language={match[1]}
            PreTag="div"
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
    }}/>
  } else {
    msg = <textarea id="outMsgInput" onChange={props.onChange}/>
  }

  useEffect(() => {
    let element = document.getElementById("outMsgInput");
    if (typeof(element) != 'undefined' && element != null) {
      element.value = props.out;
    }

    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
      tx[i].addEventListener("input", OnInput, false);
    }
  })

  return (
    <div id="outMsg">
      {msg}
    </div>
  )
}
     
function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}
