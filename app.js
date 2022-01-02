const puppeteer = require('puppeteer');
const cron = require('node-cron');
const beep = require('beepbeep');

(async () => {
    const headless = (process.env.HEADLESS === 'true')

    const elements = {
        bookAppointment: '#mainForm > div > div > div > div > div > div > div > div > div > div.div-text-content > div.text > div:nth-child(4) > a',
        tick: '#xi-cb-1',
        next: 'div.buttons.right > button > span',
        citizenSelect: '#xi-sel-400',
        pakistan: '461',
        applicants: '#xi-sel-422',
        person1: '1',
        liveWith: '#xi-sel-427',
        no: '2',
        residenceTitle: '#xi-div-30 > div.ozg-kachel.kachel-461-0-1.level1 > label',
        economic: '#inner-461-0-1 > div > div.ozg-accordion.accordion-461-0-1-1.level2 > label',
        // pakistan
        blueCard: '#inner-461-0-1 > div > div:nth-child(4) > div > div:nth-child(1) > label',
        // swiss
        // blueCard: '#inner-461-0-1 > div > div:nth-child(4) > div > div:nth-child(8) > label',

        loading: 'body > div.loading',
        errorMsg: '#messagesBox > ul > li',
        form: '#main > div.clearfix.antcl_content > div.contentContainer > div.formContainer.antcl_wizard',
        dateSelect: '#xi-fs-2 > div'
    };

    async function checkAppointment() {
        console.log('appointment check started :' + new Date());
        const browser = await puppeteer.launch({ headless, slowMo: 250 });
        const page = await browser.newPage();
        await page.goto('https://otv.verwalt-berlin.de/ams/TerminBuchen?lang=en');
        process.stdout.write('.');
        // await page.waitForNavigation({ waitUntil: 'networkidle2' });
        await page.waitForSelector(elements.bookAppointment);
        await page.waitForTimeout(1000);
        await page.click(elements.bookAppointment);
        await page.waitForTimeout(1000);
        process.stdout.write('.');
        // second page
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        process.stdout.write('.');
        await page.waitForSelector(elements.tick);
        await page.waitForTimeout(1000);
        await page.click(elements.tick);
        await page.waitForTimeout(1000);
        await page.waitForSelector(elements.next);
        await page.waitForTimeout(1000);
        await page.click(elements.next);
        await page.waitForTimeout(3000);
        process.stdout.write('.');
        // third page
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        process.stdout.write('.');
        await page.waitForTimeout(1000);
        await page.waitForSelector('#xi-fs-19');
        await page.waitForTimeout(1000);
        await page.waitForSelector(elements.citizenSelect);
        await page.waitForTimeout(1000);
        await page.select(elements.citizenSelect, elements.pakistan);
        process.stdout.write('.');
        // await page.click(elements.citizenSelect);
        await page.waitForTimeout(1000);
        await page.waitForSelector(elements.applicants);
        await page.waitForTimeout(1000);
        await page.select(elements.applicants, elements.person1);
        process.stdout.write('.');
        await page.waitForTimeout(1000);
        await page.waitForSelector(elements.liveWith);
        await page.waitForTimeout(1000);
        await page.select(elements.liveWith, elements.no);
        process.stdout.write('.');
        await page.waitForTimeout(1000);
        await page.waitForSelector(elements.residenceTitle);
        await page.click(elements.residenceTitle);
        await page.waitForTimeout(1000);
        process.stdout.write('.');
        await page.waitForTimeout(1000);
        await page.waitForSelector(elements.economic);
        await page.click(elements.economic);
        process.stdout.write('.');
        await page.waitForTimeout(1000);
        await page.waitForSelector(elements.blueCard);
        await page.click(elements.blueCard);
        process.stdout.write('.');
        await page.waitForSelector(elements.loading, { visible: false });
        await page.waitForSelector(elements.next);
        await page.waitForTimeout(1000);
        await page.click(elements.next);
        process.stdout.write('.');
        await page.waitForTimeout(1000);
        await page.waitForSelector(elements.loading, { visible: false });
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
        await page.waitForSelector(elements.loading, { visible: false });
        await page.waitForSelector(elements.form);
        process.stdout.write('.');
        await page.waitForTimeout(8000);
        process.stdout.write('.');
        try {
            process.stdout.write('.');
            await page.waitForSelector(elements.dateSelect);
            console.log('\nappointment found');
            beep(30, 1000);
        } catch (error) {
            console.log('\nappointment not found')
        }

        await browser.close();
    };

    // checkAppointment();

    cron.schedule('*/5 * * * *', function () {
        checkAppointment();
    });

})();
