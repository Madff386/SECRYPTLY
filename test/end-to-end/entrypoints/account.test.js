const { test } = require('@playwright/test')


test.describe('ACCOUNT', async () => {
    require('../account/create.test');
    require('../account/login.test');
    require('../account/update.test');
    require('../account/delete.test');
})
