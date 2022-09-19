const { _electron: electron } = require('playwright')
const { test, expect } = require('@playwright/test')
const utils = require('../util/util');

test.describe('UPDATE', async () => {
  let electronApp;
  let window;

  let username;
  let email;
  let firstName;
  let lastName;
  let phone;

  let usernameButton;
  let emailButton;
  let firstNameButton;
  let lastNameButton;
  let phoneButton;
  

  test.beforeAll( async () => {

    electronApp = await electron.launch({ args: ['.'] })
    window = await electronApp.firstWindow();
    window.on('console', utils.handleConsole);

    await window.locator('#loginForm #usernameLoginField').fill('abcd');
    await window.locator('#loginForm #passwordField').fill('abcdABCD1234!');
    await window.locator('#loginForm .submitButton').click();

    await expect(window.locator('#panel #form')).toHaveCount(0);
  });
 
  test('should open settings', async () => {
    await window.locator('#settingsButton').click();
    await expect(window.locator('#settings #settingsPage #myAccount')).toHaveCount(1);

    username = await window.locator('#profileData input[name="username"]');
    email = await window.locator('#profileData input[name="email"]');
    firstName = await window.locator('#profileData input[name="firstName"]');
    lastName = await window.locator('#profileData input[name="lastName"]');
    phone = await window.locator('#profileData input[name="phone"]');

    usernameButton = await window.locator('#profileData input[name="username"] ~ button');
    emailButton = await window.locator('#profileData input[name="email"] ~ button');
    firstNameButton = await window.locator('#profileData input[name="firstName"] ~ button');
    lastNameButton = await window.locator('#profileData input[name="lastName"] ~ button');
    phoneButton = await window.locator('#profileData input[name="phone"] ~ button');

    await expect(username).toHaveValue('abcd');
    await expect(username).not.toBeEditable();

    await expect(email).toHaveValue('abcd@test.com');
    await expect(email).not.toBeEditable();

    await expect(firstName).toHaveValue('--');
    await expect(firstName).not.toBeEditable();

    await expect(lastName).toHaveValue('--');
    await expect(lastName).not.toBeEditable();

    await expect(phone).toHaveValue('--');
    await expect(phone).not.toBeEditable();

    await expect(firstNameButton).toHaveText('Add');
    await expect(lastNameButton).toHaveText('Add');
    await expect(phoneButton).toHaveText('Add');

    await window.screenshot({ path: './test/output/myAccountSettings.png' })
  });

  test('should abort change of username', async () => {

    await usernameButton.click();
    await expect(username).toBeFocused();

    await username.type('wxyz');
    await email.focus();
    await expect(username).not.toBeEditable();
    await expect(username).toHaveValue('abcd');

  });

  test('should change username', async () => {

    await usernameButton.click();
    await expect(username).toBeFocused();

    await username.type('wxyz');
    await username.press('Enter');
    await expect(username).not.toBeEditable();
    await expect(username).toHaveValue('wxyz');

  });

  test('should not change email to invalid', async () => {

    await emailButton.click();
    await expect(email).toBeFocused();

    await email.type('wxyz');
    await email.press('Enter');
    await expect(email).toBeEditable();
    await expect(window.locator('#profileData input[name="email"] ~ .error')).toHaveText('Invalid email address');
    await username.focus();
  });

  test('should change email', async () => {

    await emailButton.click();
    await expect(email).toBeFocused();

    await email.type('wxyz@test.com');
    await email.press('Enter');
    await expect(email).not.toBeEditable();
    await expect(email).toHaveValue('wxyz@test.com');

  });

  test('should change first name', async () => {

    await firstNameButton.click();
    await expect(firstName).toBeFocused();

    await firstName.type('Tester');
    await firstName.press('Enter');
    await expect(firstName).not.toBeEditable();
    await expect(firstName).toHaveValue('Tester');
    await expect(firstNameButton).toHaveText('Edit');

  });

  test('should change last name', async () => {

    await lastNameButton.click();
    await expect(lastName).toBeFocused();

    await lastName.type('Test');
    await lastName.press('Enter');
    await expect(lastName).not.toBeEditable();
    await expect(lastName).toHaveValue('Test');
    await expect(lastNameButton).toHaveText('Edit');

  });

  test('should not change phone number to invalid', async () => {

    await phoneButton.click();
    await expect(phone).toBeFocused();

    await phone.type('abc');
    await phone.press('Enter');
    await expect(phone).toBeEditable();
    await expect(window.locator('#profileData input[name="phone"] ~ .error')).toHaveText('Invalid phone number');
    await username.focus();
  });

  test('should change phone number', async () => {

    await phoneButton.click();
    await expect(phone).toBeFocused();

    await phone.type('0123456789');
    await phone.press('Enter');
    await expect(phone).not.toBeEditable();
    await expect(phone).toHaveValue('0123456789');
    await expect(phoneButton).toHaveText('Edit');

  });


  // TODO: change profile picture


  test.describe('PASSWORD', async () => {

    test.beforeEach( async () => {
      await window.locator('#changePassword').click();
      await expect(window.locator('#modal h1')).toHaveText('Change Password');
    });
  
    test('should not accept bad password', async () => {
      await window.locator('#modal #input1.passwordInput').fill('a');
      await window.locator('#modal #input2.passwordInput').fill('a');
      await window.locator('#modal #button2.confirmButton').click();
      await expect(window.locator('#modal #error')).toHaveText('Password must contain at least one uppercase letter');

      await window.screenshot({ path: './test/output/changePasswordModal.png' })

      await window.locator('#modal #button1.cancelButton').click();
      await expect(window.locator('#modal')).toHaveCount(0);
       
    });

    test('should not accept missmatched passwords', async () => {
      await window.locator('#modal #input1.passwordInput').fill('a');
      await window.locator('#modal #input2.passwordInput').fill('b');
      await window.locator('#modal #button2.confirmButton').click();
      await expect(window.locator('#modal #error')).toHaveText('Passwords must match');

      await window.locator('#modal #button1.cancelButton').click();
      await expect(window.locator('#modal')).toHaveCount(0);
       
    });

    test('should change password', async () => {
      await window.locator('#modal #input1.passwordInput').fill('wxyzWXYZ1234!');
      await window.locator('#modal #input2.passwordInput').fill('wxyzWXYZ1234!');
      await window.locator('#modal #button2.confirmButton').click();

      await expect(window.locator('#modal')).toHaveCount(0);
       
    });
  
  });

  test('should logout', async () => {
    await window.locator('#logout').click();
    await expect(window.locator('#panel #form')).toHaveCount(1);
  })

  test('should not login with old creds', async () => {
    await window.locator('#loginForm #usernameLoginField').fill('abcd');
    await window.locator('#loginForm #passwordField').fill('abcdABCD1234!');
    await window.locator('#loginForm .submitButton').click();

    await expect(window.locator('#loginError')).toHaveText('User doesn\'t exist on this device');
    await expect(window.locator('#panel #form')).toHaveCount(1);
  })

  test('should login with new creds', async () => {
    await window.locator('#loginForm #usernameLoginField').fill('wxyz');
    await window.locator('#loginForm #passwordField').fill('wxyzWXYZ1234!');
    await window.locator('#loginForm .submitButton').click();

    await expect(window.locator('#panel #form')).toHaveCount(0);
  })

  
  test.afterAll( async () => {

    await electronApp.close()
  });
  
});
