const { app, BrowserWindow, Menu, MenuItem, shell } = require('electron');

const i18n = require('./i18n');


const template = [
    {
        label: i18n.t("Edit"),
        submenu: [
        {
            label: i18n.t("Undo"),
            accelerator: 'CommandOrControl+Z',
            role: 'undo',
        },
        {
            label: i18n.t("Redo"),
            accelerator: 'Shift+CommandOrControl+Z',
            role: 'redo',
        },
        { type: 'separator' },
        {
            label: i18n.t("Cut"),
            accelerator: 'CommandOrControl+X',
            role: 'cut',
        },
        {
            label: i18n.t("Copy"),
            accelerator: 'CommandOrControl+C',
            role: 'copy',
        },
        {
            label: i18n.t("Paste"),
            accelerator: 'CommandOrControl+V',
            role: 'paste',
        },
        {
            label: i18n.t("Select All"),
            accelerator: 'CommandOrControl+A',
            role: 'selectall',
        },
        ],
    },
    {
        label: i18n.t("Window"),
        submenu: [
        {
            label: i18n.t("Minimise"),
            accelerator: 'CommandOrControl+M',
            role: 'minimize',
        },
        {
            label: i18n.t("Close"),
            accelerator: 'CommandOrControl+W',
            role: 'close',
        },
        ],
    },
    {
        label: i18n.t("Help"),
        role: 'help',
        submenu: [
        {
            
            label: i18n.t("Learn More"),
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
            label: `${i18n.t("About")} ${name}`,
            role: 'about',
        },
        { type: 'separator' },
        {
            label: i18n.t("Services"),
            role: 'services',
            submenu: [],
        },
        { type: 'separator' },
        {
            label: `${i18n.t("Hide")} ${name}`,
            accelerator: 'Command+H',
            role: 'hide',
        },
        {
            label: i18n.t("Hide Others"),
            accelerator: 'Command+Alt+H',
            role: 'hideothers',
        },
        {
            label: i18n.t("Show All"),
            role: 'unhide',
        },
        { type: 'separator' },
        {
            label: `${i18n.t("Quit")} ${name}`,
            accelerator: 'Command+Q',
            click() { app.quit(); },
        },
        ],
    });

    const windowMenu = template.find(item => item.label ===  i18n.t('Window'));
    windowMenu.role = 'window';
    windowMenu.submenu.push(
        { type: 'separator' },
        {
            label: i18n.t("Bring All to Front"),
            type: 'text',
            role: 'front',
        }
    );
}

if (process.platform === 'win32'){
    const helpMenu = template.find(item => item.label === i18n.t('Help'));
    helpMenu.submenu.push(
        //{ type: 'separator' },
        {
            label: i18n.t("About"),
            role: 'about',
        }
    );
        
    template.unshift({
        label: i18n.t("File"),
        submenu: [
            {
                label: i18n.t("Settings"),
                role: 'hide',
            },
            { type: 'separator' },
            {
                label: i18n.t("Exit"),
                click() { app.quit(); },
            },

        ]
    });
}
      
      
  


exports.menu = Menu.buildFromTemplate(template);;