const faker = require('faker');
const puppeteer = require('puppeteer');

const publicRouter = {
    signin: '/signin',
    signup: '/houses',
    houses: '/signin',
    home: '/'
}


const person = {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    message: faker.random.words(),
    password: faker.internet.password()
};

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
            slowMo: 250, // how slow actions should be
        }
    )
    // creates a new page in the opened browser   
    page = await browser.newPage()
})


describe('Render test', () => {
    test('Sign In loads correctly', async () => {

        await page.goto(baseUri + publicRouter.signin);

        await page.waitForSelector("#sign-in-title")

        const html = await page.$eval('#sign-in-title', e => e.innerHTML);
        expect(html).toBe('Sign In');

    }, 1600000);
});

describe('Invalid login test', () => {
    test('When invalid credentials, show error message', async () => {

        await page.goto(baseUri + publicRouter.signin);

        await page.waitForSelector('#signin-button');

        await page.click("#signin-button");

        const html = await page.$eval('#invalid-credentials', e => e.innerHTML);
        expect(html).toBe('Invalid credentials!');

    }, 1600000);
});

describe('Locador login test', () => {
    test('Locador tries to login', async () => {

        await page.click('#username')
        await page.type('#username', 'locador@mail.com')
        await page.click('#password')
        await page.type('#password', 'locador')
        await page.click('#signin-button')
        await page.waitForSelector('#home-locador')

    }, 1600000);
});


// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close();
})
