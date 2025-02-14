const puppeteer = require('puppeteer');

const publicRouter = {
    myHouses: '/locador/houses',
    signIn: '/signin',
    home: '/'
}

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
};

global.localStorage = new LocalStorageMock;

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

    test('Render myHouses correctly', async () => {

        //Login First
        await page.goto(baseUri + publicRouter.signIn);
        await page.click('#username');
        await page.type('#username', 'locador1@mail.com');
        await page.click('#password');
        await page.type('#password', 'locador1');
        await page.click('#signin-button');
        await page.waitForSelector('#home-locador');

        //Real test
        await page.goto(baseUri + publicRouter.myHouses);
        await page.waitForSelector('#houses-card');




    }, 160000000);

    test('Deletes a house successfully', async () => {

        await page.goto(baseUri + publicRouter.myHouses);
        await page.waitForSelector('[data-testid=house-card1]');
        await page.click('[data-testid=house-card1]');
        await page.waitForSelector('#delete-confirmation');

    }, 160000000);

});




// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close();
})
