const puppeteer = require('puppeteer');

const publicRouter = {
    signIn: '/signin',
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

describe('Render page test', () => {

    test('Search by city = qwerty', async () => {

        await page.goto(baseUri + publicRouter.home);
        await page.waitForSelector('#city');
        await page.type('#city', 'qwerty');
        await page.click('#search-button');
        await page.waitForSelector('#no-houses-found');
        const html = await page.$eval("#no-houses-found", e => e.innerHTML);
        expect(html).toBe('There are no houses in qwerty!');





    }, 160000000);

    test('Search by city = Aveiro', async () => {

        await page.goto(baseUri + publicRouter.home);
        await page.waitForSelector('#city');
        await page.type('#city', 'Aveiro');
        await page.type('#max-price', '300');
        await page.click('#search-button');
        await page.waitForSelector('[data-testid=house-card1]');

    }, 160000000);

});




// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close();
})
