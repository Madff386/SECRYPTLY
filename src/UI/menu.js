const { app, BrowserWindow, Menu, MenuItem, shell } = require('electron');

const language = 'en-AU' // TODO: read from either settings or system language
const strings = require('./strings.json')[language];




const template = [
    {
        label: strings.menu.edit,
        submenu: [
        {
            label: strings.menu.undo,
            accelerator: 'CommandOrControl+Z',
            role: 'undo',
        },
        {
            label: strings.menu.redo,
            accelerator: 'Shift+CommandOrControl+Z',
            role: 'redo',
        },
        { type: 'separator' },
        {
            label: strings.menu.cut,
            accelerator: 'CommandOrControl+X',
            role: 'cut',
        },
        {
            label: strings.menu.copy,
            accelerator: 'CommandOrControl+C',
            role: 'copy',
        },
        {
            label: strings.menu.paste,
            accelerator: 'CommandOrControl+V',
            role: 'paste',
        },
        {
            label: strings.menu.selectAll,
            accelerator: 'CommandOrControl+A',
            role: 'selectall',
        },
        ],
    },
    {
        label: strings.menu.window,
        submenu: [
        {
            label: strings.menu.minimise,
            accelerator: 'CommandOrControl+M',
            role: 'minimize',
        },
        {
            label: strings.menu.close,
            accelerator: 'CommandOrControl+W',
            role: 'close',
        },
        ],
    },
    {
        label: strings.menu.help,
        role: 'help',
        submenu: [
        {
            
            label: strings.menu.learnMore,
            click() {
                require('electron').shell.openExternal("https://github.com/Madff386/secryptly_vJS")
             
        },
             
            label: "devtools",
            role:'toggleDevTools'
             
        },
        ],
    }
];

if (process.platform === 'darwin') {
    const name = app.getName();
    template.unshift({
        label: name,
        submenu: [
        {
            label: `${strings.menu.about} ${name}`,
            role: 'about',
        },
        { type: 'separator' },
        {
            label: strings.menu.services,
            role: 'services',
            submenu: [],
        },
        { type: 'separator' },
        {
            label: `${strings.menu.hide} ${name}`,
            accelerator: 'Command+H',
            role: 'hide',
        },
        {
            label: strings.menu.hideOthers,
            accelerator: 'Command+Alt+H',
            role: 'hideothers',
        },
        {
            label: strings.menu.showAll,
            role: 'unhide',
        },
        { type: 'separator' },
        {
            label: `${strings.menu.quit} ${name}`,
            accelerator: 'Command+Q',
            click() { app.quit(); },
        },
        ],
    });

    const windowMenu = template.find(item => item.label === 'Window');
    windowMenu.role = 'window';
    windowMenu.submenu.push(
        { type: 'separator' },
        {
            label: strings.menu.bringAlltoFront,
            type: 'text',
            role: 'front',
        }
    );
}

if (process.platform === 'win32'){
    const helpMenu = template.find(item => item.label === 'Help');
    helpMenu.submenu.push(
        //{ type: 'separator' },
        {
            label: strings.menu.about,
            role: 'about',
        }
    );
        
    template.unshift({
        label: strings.menu.file,
        submenu: [
            {
                label: strings.menu.settings,
                role: 'hide',
            },
            { type: 'separator' },
            {
                label: strings.menu.exit,
                click() { app.quit(); },
            },

        ]
    });
}
      
      
  


exports.menu = Menu.buildFromTemplate(template);;