const React = require('react');

const {
  remote,
  ipcRenderer
} = require('electron');

const {
  Menu
} = remote;
const contactsData = {
  user1: {
    username: "user1",
    read: true
  },
  user2: {
    username: "user2",
    read: false
  }
};

class ContactsPannel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "contactPannel"
    }, /*#__PURE__*/React.createElement("div", {
      id: "contactList"
    }, Contacts(contactsData)));
  }

}

function Contacts(contactsData) {
  let contacts = [];

  for (var key in contactsData) {
    contacts.push( /*#__PURE__*/React.createElement(Contact, {
      userData: contactsData[key],
      key: key
    }));
  }

  for (var i = 0; i < 20; i++) {
    contacts.push( /*#__PURE__*/React.createElement(Contact, {
      userData: {
        username: "test"
      },
      key: i
    }));
  }

  return contacts;
}

function Contact(props) {
  let pic = '';

  if (props.userData.profilePicture) {
    pic = props.userData.profilePicture;
  } else {
    pic = 'https://127.0.0.1:3002/resources/profilePicture/default.png';
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "contact",
    onContextMenu: markdownContextMenu.popup()
  }, /*#__PURE__*/React.createElement("img", {
    className: 'profile ' + (props.userData.read ? 'unread' : ''),
    alt: props.userData.username + "'s profile picture",
    src: pic
  }));
}

const markdownContextMenu = Menu.buildFromTemplate([{
  label: 'Open File',

  click() {
    mainProcess.getFileFromUser();
  }

}, {
  type: 'separator'
}, {
  label: 'Cut',
  role: 'cut'
}, {
  label: 'Copy',
  role: 'copy'
}, {
  label: 'Paste',
  role: 'paste'
}, {
  label: 'Select All',
  role: 'selectall'
}]);
exports.ContactsPannel = ContactsPannel;