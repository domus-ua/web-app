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
let headless = false; // CHANGE TO 'true' IN EVERY COMMIT

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

describe('Locador login test', () => {
    test('Locador tries to login', async () => {

        await page.goto(baseUri + publicRouter.signin)

        await page.click('#username')
        await page.type('#username', 'locador1@mail.com')
        await page.click('#password')
        await page.type('#password', 'locador1')
        await page.click("[data-testid=signin-button]")
        
        await page.waitForSelector("[data-testid=new-house]");
        await page.click("[data-testid=new-house");

        await page.waitForSelector("[data-testid=title]");
        await page.click("[data-testid=title]");
        await page.type('[data-testid=title]', 'Apartamento T1 na Guarda');

        await page.waitForSelector("[data-testid=city]");
        await page.click("[data-testid=city]");
        await page.type('[data-testid=city]', 'Guarda');

        await page.waitForSelector("[data-testid=bedrooms]");
        await page.click("[data-testid=bedrooms]");
        await page.waitForSelector("[data-testid=bedroom1]");
        await page.click("[data-testid=bedroom1]");


        await page.waitForSelector("[data-testid=description]");
        await page.click("[data-testid=description]");
        await page.type('[data-testid=description]', 'Muito confortável!');

        await page.waitForSelector("[data-testid=street]");
        await page.click("[data-testid=street]");
        await page.type('[data-testid=street]', 'Street');

        await page.waitForSelector("[data-testid=bathrooms]");
        await page.click("[data-testid=bathrooms]");
        await page.waitForSelector("[data-testid=bathroom1]");
        await page.click("[data-testid=bathroom1]");

        await page.waitForSelector("[data-testid=habitable-area]");
        await page.click("[data-testid=habitable-area]");
        await page.type('[data-testid=habitable-area]', '500');

        await page.waitForSelector("[data-testid=postal-code-1]");
        await page.click("[data-testid=postal-code-1]");
        await page.type('[data-testid=postal-code-1]', '1234');

        await page.waitForSelector("[data-testid=postal-code-2]");
        await page.click("[data-testid=postal-code-2]");
        await page.type('[data-testid=postal-code-2]', '123');

        await page.waitForSelector("[data-testid=garages]");
        await page.click("[data-testid=garages]");
        await page.waitForSelector("[data-testid=garages1]");
        await page.click("[data-testid=garages1]");



    }, 1600000);
});


// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close();
})
