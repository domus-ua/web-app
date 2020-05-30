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



describe('House review test', () => {
    test('Locatario makes a review and deletes it', async () => {
        
        await page.goto(baseUri + publicRouter.signin)

        await page.click('#username')
        await page.type('#username', 'locatario1@mail.com')
        await page.click('#password')
        await page.type('#password', 'locatario1')
        await page.click("[data-testid=signin-button]")

        await page.waitForSelector("[data-testid=all-houses]")
        await page.click("[data-testid=all-houses]")

        await page.waitForSelector("[data-testid=houseCard1]")
        await page.click("[data-testid=houseCard1]")

        await page.waitForSelector("[data-testid=review-comment]")
        await page.click('[data-testid=review-comment]')
        await page.type('[data-testid=review-comment]', 'Very good!')

        await page.waitForSelector("[data-testid=review-button]")
        await page.click('[data-testid=review-button]')

        await page.waitForSelector("[data-testid=delete-review")
        await page.click('[data-testid=delete-review]')

    }, 1600000);
});


// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close();
})
