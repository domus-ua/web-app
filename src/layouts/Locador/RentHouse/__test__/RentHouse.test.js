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

describe('Rent house test', () => {
    test('Locador rents house', async () => {

        await page.goto(baseUri + publicRouter.signin);

        await page.click('#username')
        await page.type('#username', 'locador3@mail.com')
        await page.click('#password')
        await page.type('#password', 'locador3')
        await page.click("[data-testid=signin-button]")

        await page.waitForSelector("[data-testid=user-navbar]");
        await page.click("[data-testid=user-navbar]");
        
        await page.waitForSelector("[data-testid=my-houses]");
        await page.click("[data-testid=my-houses]");

        await page.waitForSelector("[data-testid=houseCard]");
        await page.click("[data-testid=houseCard]");

        await page.waitForSelector("[data-testid=rent-btn]");
        await page.click("[data-testid=rent-btn]");

        await page.waitForSelector("[data-testid=tenant-rent-email]");
        await page.click("[data-testid=tenant-rent-email]");
        await page.type('[data-testid=tenant-rent-email]', 'locatario3@mail.com');

        await page.waitForSelector("[data-testid=rent-price]");
        await page.click("[data-testid=rent-price]");
        await page.type('[data-testid=rent-price]', '1234');

        await page.waitForSelector("[data-testid=rent-button]");
        await page.click("[data-testid=rent-button]");

        

        

    }, 160000000);
});

// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close();
})
