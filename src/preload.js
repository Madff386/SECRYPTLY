const { Titlebar, Color} = require("custom-electron-titlebar");

window.addEventListener('DOMContentLoaded', () => {
  new Titlebar({
    backgroundColor: Color.fromHex("#303032"),
    itemBackgroundColor: Color.fromHex("#3A3A3C"),
    svgColor: Color.fromHex("#677078"),
    icon: "../static/images/icon-transparent.ico",
  });
})


