const { _electron: electron } = require('playwright')
const { test, expect } = require('@playwright/test')
const utils = require('../util/util');


test.describe('CREATE', async () => {
  let electronApp;
  let window;

  let createAccountButton;
  let emailError;
  let usernameError;
  let passwordError;
  let confirmError;

  let emailField;
  let usernameField;
  let passwordField;
  let confirmField;

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

    await window.screenshot({ path: './test/output/intro.png' })

  });

  test('should switch to create account', async () => {
  
    let createAccountLink = await window.locator('#createAccount');
    let text = await createAccountLink.innerText();
    expect(text).toBe('Create Account');
    createAccountLink.click();
    await window.waitForTimeout(500);

    let createForm = await window.locator('#createForm');
    await expect(await createForm.getAttribute('style')).toBe('transform: translateX(-380px);');

    createAccountButton = await window.locator('#createForm #createButton.submitButton');
    emailError = await window.locator('#createForm #emailError');
    usernameError = await window.locator('#createForm #usernameError');
    passwordError = await window.locator('#createForm #passwordError');
    confirmError = await window.locator('#createForm #confirmError');

    emailField = await window.locator('#createForm #emailCreateField');
    usernameField = await window.locator('#createForm #usernameField');
    passwordField = await window.locator('#createForm #passwordCreateField');
    confirmField = await window.locator('#createForm #confirmPasswordField');

    await window.screenshot({ path: './test/output/createForm.png' });

  });
  
  test('should not allow create account with no username', async () => {
    await usernameField.fill('');
    await emailField.fill('abcd@test.com');
    await passwordField.fill('abcdABCD1234!');
    await confirmField.fill('abcdABCD1234!');

    await createAccountButton.click();

    await expect(usernameError).toHaveText('Username can\'t be blank');
    await expect(emailError).toHaveText('');
    await expect(passwordError).toHaveText('');
    await expect(confirmError).toHaveText('');
  });

  test('should not allow create account with no email', async () => {
    await usernameField.fill('abcd');
    await emailField.fill('');
    await passwordField.fill('abcdABCD1234!');
    await confirmField.fill('abcdABCD1234!');

    await createAccountButton.click();

    await expect(usernameError).toHaveText('');
    await expect(emailError).toHaveText('Email can\'t be blank');
    await expect(passwordError).toHaveText('');
    await expect(confirmError).toHaveText('');
  });

  test('should not allow create account with no password', async () => {
    await usernameField.fill('abcd');
    await emailField.fill('abcd@test.com');
    await passwordField.fill('');
    await confirmField.fill('abcdABCD1234!');

    await createAccountButton.click();

    await expect(usernameError).toHaveText('');
    await expect(emailError).toHaveText('');
    await expect(passwordError).toHaveText('Password can\'t be blank');
    await expect(confirmError).toHaveText('');
  });

  test('should not allow create account with no confirm', async () => {
    await usernameField.fill('abcd');
    await emailField.fill('abcd@test.com');
    await passwordField.fill('abcdABCD1234!');
    await confirmField.fill('');

    await createAccountButton.click();

    await expect(usernameError).toHaveText('');
    await expect(emailError).toHaveText('');
    await expect(passwordError).toHaveText('');
    await expect(confirmError).toHaveText('Passwords are not the same');
  });

  test('it should create account and login', async () => {
    await usernameField.fill('abcd');
    await emailField.fill('abcd@test.com');
    await passwordField.fill('abcdABCD1234!');
    await confirmField.fill('abcdABCD1234!');

    await createAccountButton.click();

    await expect(window.locator('#panel #form')).toHaveCount(0);
  });
  
 
  test.afterAll( async () => {
    // close app
    await electronApp.close()
  });
  
});
