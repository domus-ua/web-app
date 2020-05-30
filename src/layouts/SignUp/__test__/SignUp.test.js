const faker = require('faker');
const puppeteer = require('puppeteer');

const publicRouter = {
    signin: '/signin',
    signup: '/signup',
    houses: '/signin',
    home: '/'
}

//create global variables to be used in the beforeAll function
const baseUri = 'http://localhost:3000';
let browser;
let page;
let headless = true; // CHANGE TO 'true' IN EVERY COMMIT

beforeAll(async () => {
    // launch browser
    browser = await puppeteer.launch(
        {
            headless: headless, // headless mode set to false so browser opens up with visual feedback
            slowMo: 20, // how slow actions should be
        }
    )
    // creates a new page in the opened browser
    page = await browser.newPage()
})


describe('Render test', () => {
    test('Sign Up loads correctly', async () => {

        await page.goto(baseUri + publicRouter.signup);

        await page.waitForSelector("#sign-up-title")

        const html = await page.$eval('#sign-up-title', e => e.innerHTML);
        expect(html).toBe('Sign Up');

    }, 160000000);
});

describe('Invalid register test', () => {
    test('When invalid credentials, show error message', async () => {

        await page.goto(baseUri + publicRouter.signup);

        await page.waitForSelector('#signup-button');

        await page.click("#signup-button");

        const html = await page.$eval('#error-modal', e => e.innerHTML);
        expect(html).toBe('You need to correct the following errors to register:');

    }, 160000000);
});

describe('Register test', () => {
    test('User tries to register', async () => {

        await page.goto(baseUri + publicRouter.signup);

        await page.click('#username')
        await page.type('#username', faker.internet.email())
        await page.click('#firstName')
        await page.type('#firstName', faker.name.firstName())
        await page.click('#lastName')
        await page.type('#lastName', faker.name.lastName())
        await page.click('#password')
        await page.type('#password', 'Locador123')
        await page.click('#confirmPassword')
        await page.type('#confirmPassword', 'Locador123')
        await page.click('#phoneNumber')
        await page.type('#phoneNumber', '123456789')
        await page.click('#male')
        const [fileChooser] = await Promise.all([
            page.waitForFileChooser(),
            page.click('#photo1')
        ]);
        await fileChooser.accept(['src/assets/img/default-user.png'])
        await page.click('#locador')
        await page.waitForSelector('#signup-button');
        await page.click('#signup-button')
        await page.waitFor(5000);
        const html = await page.$eval('#registered', e => e.innerHTML);
        expect(html).toBe('You will be redirected.');

    }, 160000000);
});


// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close();
})
