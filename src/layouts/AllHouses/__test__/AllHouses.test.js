const puppeteer = require('puppeteer');

const publicRouter = {
    houses: '/houses',
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
            headless: false, // headless mode set to false so browser opens up with visual feedback
            slowMo: 50, // how slow actions should be
        }
    )
    // creates a new page in the opened browser
    page = await browser.newPage()
})

describe('Render all houses test', () => {

    test('Check all houses', async () => {

        await page.goto(baseUri + publicRouter.houses);
        await page.waitForSelector('[data-testid=house-card1]');
        await page.waitForSelector('[data-testid=house-card2]');
        await page.waitForSelector('[data-testid=house-card3]');
        await page.waitForSelector('[data-testid=house-card4]');

    }, 160000000);

});




// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close();
})
