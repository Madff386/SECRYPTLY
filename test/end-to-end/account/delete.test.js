const { _electron: electron } = require('playwright')
const { test, expect } = require('@playwright/test')
const utils = require('../util/util');

test.describe('DELETE', async () => {
  let electronApp;
  let window;

  

  test.beforeAll( async () => {

    electronApp = await electron.launch({ args: ['.'] })
    window = await electronApp.firstWindow();
    window.on('console', utils.handleConsole);

    await window.locator('#loginForm #usernameLoginField').fill('wxyz');
    await window.locator('#loginForm #passwordField').fill('wxyzWXYZ1234!');
    await window.locator('#loginForm .submitButton').click();

    await expect(window.locator('#panel #form')).toHaveCount(0);
  });
 
  test('should open settings', async () => {
    await window.locator('#settingsButton').click();
    await expect(window.locator('#settings #settingsPage #myAccount')).toHaveCount(1);

  });

  test('should open delete modal', async () => {
    
    await window.locator('#myAccount #deleteAccount').click();
    await expect(window.locator('#modal h1')).toHaveText('Delete Account');
    
    await window.screenshot({ path: './test/output/deleteModal.png' })
  });

  test('should close delete modal', async () => {
    
    await window.locator('#modal #button1.cancelButton').click();
    await expect(window.locator('#modal')).toHaveCount(0);
    
  });

  test('should delete account', async () => {
    
    await window.locator('#myAccount #deleteAccount').click();
    await expect(window.locator('#modal h1')).toHaveText('Delete Account');

    await window.locator('#modal #button2.deleteButton').click();
    await expect(window.locator('#modal')).toHaveCount(0);
    await expect(window.locator('#panel #form')).toHaveCount(1);
    
  });

  test('should not login to deleted account', async () => {
    await window.locator('#loginForm #usernameLoginField').fill('wxyz');
    await window.locator('#loginForm #passwordField').fill('wxyzWXYZ1234!');
    await window.locator('#loginForm .submitButton').click();

    await expect(window.locator('#loginError')).toHaveText('User doesn\'t exist on this device');
    await expect(window.locator('#panel #form')).toHaveCount(1);
  })

  
  test.afterAll( async () => {

    await electronApp.close()
  });
  
});
