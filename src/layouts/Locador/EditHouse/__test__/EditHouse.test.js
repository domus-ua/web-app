const faker = require('faker');
const puppeteer = require('puppeteer');

const publicRouter = {
    signin: '/signin',
    myhouses: '/locador/houses',
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

describe('Locador updates house test', () => {
    test('Locador updates house name', async () => {

        await page.goto(baseUri + publicRouter.signin)

        await page.click('#username')
        await page.type('#username', 'locador1@mail.com')
        await page.click('#password')
        await page.type('#password', 'locador1')
        await page.click("[data-testid=signin-button]")

        await page.waitForSelector("[data-testid=new-house]");
        await page.goto(baseUri + publicRouter.myhouses)
        await page.waitForSelector('[data-testid=editCasaTeste]');
        await page.click("[data-testid=editCasaTeste]");

        await page.waitFor(8000);
        await page.waitForSelector("#title");
        const input = await page.$('#title');
        await input.click({ clickCount: 3 })
        await page.type("#title", 'CasaTesteUpdated');

        await page.click("#upload-button");
        await page.waitForSelector("#update-confirmation")

        await page.reload()

        await page.waitFor(8000);
        await page.waitForSelector("#title");
        const input2 = await page.$('#title');
        await input2.click({ clickCount: 3 })
        await page.type("#title", 'CasaTeste');

        await page.click("#upload-button");
        await page.waitForSelector("#update-confirmation")

    }, 160000000);
});


// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close();
})
