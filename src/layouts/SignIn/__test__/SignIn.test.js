const faker = require('faker');
const puppeteer = require('puppeteer');

const publicRouter = {
    signin: '/signin',
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
            slowMo: 20, // how slow actions should be
        }
    )
    // creates a new page in the opened browser   
    page = await browser.newPage()
})


describe('Render test', () => {
    test('Sign In loads correctly', async () => {

        await page.goto(baseUri + publicRouter.signin);

        await page.waitForSelector("[data-testid=sign-in-title]")

        const html = await page.$eval("[data-testid=sign-in-title]", e => e.innerHTML);
        expect(html).toBe('Sign In');

    }, 160000000);
});

describe('Invalid login test', () => {
    test('When invalid credentials, show error message', async () => {

        await page.goto(baseUri + publicRouter.signin);

        await page.waitForSelector("[data-testid=signin-button]");

        await page.click("[data-testid=signin-button]");

        const html = await page.$eval("[data-testid=invalid-credentials]", e => e.innerHTML);
        expect(html).toBe('Invalid credentials!');

    }, 160000000);
});

describe('Locador login test', () => {
    test('Locador tries to login', async () => {

        await page.goto(baseUri + publicRouter.signin)

        await page.click('#username')
        await page.type('#username', 'locador1@mail.com')
        await page.click('#password')
        await page.type('#password', 'locador1')
        await page.click("[data-testid=signin-button]")
        await page.waitForSelector('#home-locador')
        await page.waitForSelector("[data-testid=user-navbar]");
        await page.click("[data-testid=user-navbar]");
        await page.waitForSelector("[data-testid=sign-out]");
        await page.click("[data-testid=sign-out]");

        

    }, 160000000);
});

describe('Locatario login test', () => {
    test('Locatario tries to login', async () => {
        
        await page.goto(baseUri + publicRouter.signin)

        await page.click('#username')
        await page.type('#username', 'locatario1@mail.com')
        await page.click('#password')
        await page.type('#password', 'locatario1')
        await page.click("[data-testid=signin-button]")
        await page.waitForSelector('#home-locatario')

    }, 160000000);
});


// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close();
})
