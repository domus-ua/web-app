const faker = require('faker');
const puppeteer = require('puppeteer');

const publicRouter = {
    houseDetails: '/house-details',
    signin: '/signin',
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
        await page.waitForSelector('[data-testid=location]');
        await page.waitForSelector('[data-testid=description]');
        await page.waitForSelector('[data-testid=publish-date]');
        await page.waitForSelector('[data-testid=price]');
        await page.waitForSelector('[data-testid=sign-in-to-seller-details]');
        
        const description = await page.$eval('[data-testid=description]', e => e.innerHTML);
        expect(description).toBe('Totalmente remodelado em 2018, em tipologia de T2, com Wi-Fi.');

        const publishDate = await page.$eval('[data-testid=publish-date]', e => e.innerHTML);
        expect(publishDate).toBe('Published on 2020-05-28');

        const price = await page.$eval('[data-testid=price]', e => e.innerHTML);
        expect(price).toBe('250 €');

        const details = await page.$eval('[data-testid=sign-in-to-seller-details]', e => e.innerHTML);
        expect(details).toBe('<a href="/signin">Sign In</a> to see seller details.');


    }, 160000000);
});



// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close();
})
