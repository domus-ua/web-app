const faker = require('faker');
const puppeteer = require('puppeteer');

const publicRouter = {
    houseDetails: '/house-details',
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

describe('Render page test', () => {
    test('Render house no. 1 correctly', async () => {

        await page.goto(baseUri + publicRouter.houseDetails);

        await page.waitForSelector('#house-name');
        await page.waitForSelector('[data-testid=house-reviews]');
        await page.waitForSelector('[data-testid=house-seller]');

        const html = await page.$eval('#house-name', e => e.innerHTML);
        expect(html).toBe('Quarto c/ 2 quartos em Aveiro');

    }, 160000000);
});


// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close();
})
