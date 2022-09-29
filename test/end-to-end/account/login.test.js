const { _electron: electron } = require('playwright')
const { test, expect } = require('@playwright/test')
const utils = require('../util/util');

test.describe('LOGIN', async () => {
  let electronApp;
  let window;

  let loginButton;
  let loginError;

  let usernameField;
  let passwordField;

  test.beforeAll( async () => {

    electronApp = await electron.launch({ args: ['.'] })
    window = await electronApp.firstWindow();
    window.on('console', utils.handleConsole);
    
  });


  test('window should exist', async () => {
    const isPackaged = await electronApp.evaluate(async ({ app }) => {
      // This runs in Electron's main process, parameter here is always
      // the result of the require('electron') in the main app script.
      return app.isPackaged;
    });
  
    expect(isPackaged).toBe(false);

    

  });

  test('should switch to create account', async () => {
  
    let createAccountLink = await window.locator('#createAccount');
    let text = await createAccountLink.innerText();
    expect(text).toBe('Create Account');
    createAccountLink.click();
    await window.waitForTimeout(300);

    let createForm = await window.locator('#createForm');
    await expect(await createForm.getAttribute('style')).toBe('transform: translateX(-380px);');

  });

  test('should switch to login', async () => {
  
    let loginLink = await window.locator('#loginLink');
    let text = await loginLink.innerText();
    expect(text).toBe('Login Instead');
    loginLink.click();
    await window.waitForTimeout(500);

    let loginForm = await window.locator('#loginForm');
    await expect(await loginForm.getAttribute('style')).toBe('transform: translateX(0px);');

    loginButton = await window.locator('#loginForm .submitButton');
    loginError = await window.locator('#loginForm #loginError');

    usernameField = await window.locator('#loginForm #usernameLoginField');
    passwordField = await window.locator('#loginForm #passwordField');

    await window.screenshot({ path: './test/output/login.png' })
  });
  
  test('should not allow login if no local user file', async () => {
    await usernameField.fill('abcd@test.com');
    await passwordField.fill('abcdABCD1234!');

    await loginButton.click();

    await expect(loginError).toHaveText('User doesn\'t exist on this device');
  });

  test('should not allow login if credentials wrong', async () => {
    await usernameField.fill('abcd');
    await passwordField.fill('abcdABCD123');

    await loginButton.click();

    await expect(loginError).toHaveText('Inncorrect Username or Password');
  });


  test('it should login', async () => {
    await usernameField.fill('abcd');
    await passwordField.fill('abcdABCD1234!');

    await loginButton.click();

    await expect(window.locator('#panel #form')).toHaveCount(0);
  });
  
 
  test.afterAll( async () => {
    // close app
    await electronApp.close()
  });
  
});
