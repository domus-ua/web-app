const faker = require('faker');
const puppeteer = require('puppeteer');

const publicRouter = {
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
            headless: headless, // headless mode set to false so browser opens up with visual feedback
            slowMo: 20, // how slow actions should be
        }
    )
    // creates a new page in the opened browser   
    page = await browser.newPage()
    
})

describe('Compare list test', () => {
    test('Checks if three houses are compared', async () => {

        await page.goto(baseUri);

        await page.waitForSelector('[data-testid=house-card15]');
        await page.waitForSelector('[data-testid=house-card16]');
        await page.waitForSelector('[data-testid=house-card17]');
        await page.waitForSelector('[data-testid=house-card18]');

        await page.click('[data-testid=house-card16]');
        await page.click('[data-testid=house-card17]');
        await page.click('[data-testid=house-card18]');

        await page.waitForSelector('[data-testid=compare-list-label]');

        await page.click('[data-testid=compare-list-label]');

        await page.waitForSelector('[data-testid=compare-modal-title]');


        const html = await page.$eval('[data-testid=compare-modal-title]', e => e.innerHTML);
        expect(html).toBe('Compare houses');

    }, 160000000);
});


// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close();
})
