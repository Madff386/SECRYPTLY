const { _electron: electron } = require('playwright')
const { expect } = require('@playwright/test')



exports.setUpAcc = async (username) => {
    let electronApp = await electron.launch({ args: ['.'] })
    let window = await electronApp.firstWindow();
    window.on('console', console.log);

    await window.locator('#createAccount').click();
    await window.waitForTimeout(250);

    await window.locator('#createForm #emailCreateField').fill(username + '@test.com');
    await window.locator('#createForm #usernameField').fill(username);
    await window.locator('#createForm #passwordCreateField').fill(username + username.toUpperCase + '123!');
    await window.locator('#createForm #confirmPasswordField').fill(username + username.toUpperCase + '123!');

    await window.locator('#createForm #createButton.submitButton').click();

    await expect(window.locator('#panel #form')).toHaveCount(0);

    return {electronApp, window};
}


exports.tearDownAcc = async (electronApp, window) => {
    await window.locator('#settingsButton').click();
    await window.locator('#deleteAccount').click();
    await window.locator('#modal #button2.deleteButton').click();

    await electronApp.close()
}   


exports.handleConsole = ({...args}) => {
    //console.log(args._initializer);
}