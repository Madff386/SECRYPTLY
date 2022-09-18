import { Titlebar, Color} from "custom-electron-titlebar";

window.addEventListener('DOMContentLoaded', () => {
  new Titlebar({
    backgroundColor: Color.fromHex("#303032"),
    itemBackgroundColor: Color.fromHex("#3A3A3C"),
    svgColor: Color.fromHex("#677078"),
    icon: "../static/images/icon-transparent.ico",
  });
})

const {	contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
	"api", {
      ipcComm: {
          send: (channel, data) => {
          ipcRenderer.send(channel, data);
        },
        on: (channel, callback) => {
          // Remove `event` parameter (the underscore parameter) as the UI doesn't need it
          ipcRenderer.on(channel, (_, ...args) => {
            callback(...args);
          });
        },
        removeAllListeners: (channel) => {
          ipcRenderer.removeAllListeners(channel);
        },
        invoke: (channel, data) => {
          return ipcRenderer.invoke(channel, data);
        },
        once: (channel, callback) => {
          ipcRenderer.once(channel, callback);
        }
    },
    i18n: {
      t: (text) => {
        return ipcRenderer.sendSync("i18n.t", text);
      }
    }
	}
);


