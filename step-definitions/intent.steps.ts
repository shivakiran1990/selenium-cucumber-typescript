import { BeforeAll, AfterAll, Given, Then, When, setDefaultTimeout } from 'cucumber'
import { Builder, WebDriver, By, until } from 'selenium-webdriver';
import { Options } from "selenium-webdriver/chrome";
import assert from 'assert';

let driver: WebDriver;

var options = new Options();
options.addArguments('--no-sandbox')
options.addArguments('--disable-gpu')
options.addArguments('--ignore-certificate-errors=true')
options.addArguments('--disable-dev-shm-usage')
//options.addArguments('--headless')

BeforeAll(async () => {
    setDefaultTimeout(10000)
    driver = new Builder().forBrowser('chrome').setChromeOptions(options).build()
    await driver.manage().window().maximize()
});
//MicrosoftEdge
//firefox

Given('The customer launches the site', async () => {
    await driver.get("https://mortgages.secure.halifax-online.co.uk/homes/?action=mortgage_calculator");
    await driver.manage().setTimeouts({ implicit: 2000 });
});

Given('The customer selects the intent Preferences', async () => {
    let cookie = await driver.findElement(By.xpath('//*[@id="accept"]'));
    await driver.wait(until.elementIsVisible(cookie), 30000);
    await driver.findElement(By.xpath('//*[@id="accept"]')).click();
    let revealed = await driver.findElement(By.xpath("//*[@data-qa-id='question-0-text']"));
    let text = await driver.findElement(By.xpath("//*[@data-qa-id='question-0-text']")).getText();
    console.log(text);
    await driver.wait(until.elementIsVisible(revealed), 30000);
    assert.equal("Firstly, what would you like to do?", text);
});

Given('The customer selects the first intent Preference', async () => {
    await driver.findElement(By.xpath("//*[text()='I want to buy a home']")).click();
});

AfterAll(async () => await driver.close());