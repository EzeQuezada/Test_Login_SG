const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
const fs = require('fs');
const path = require('path');

const screenshotDir = 'test/screenshots';

// Create screenshots directory if it doesn't exist
if (!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, { recursive: true });
}

describe("login", () => {
    
    it("Como usuario registrado, quiero iniciar sesión con mis credenciales, para acceder al sistema",async()=>{
        let driver = new Builder().forBrowser("chrome").build();
        await driver.get("https://sigeiacademico.itla.edu.do/account/login")

        const element = await driver.findElements(By.className('logo'))
        assert.equal(element.length, 1)
        
        await driver.findElement(By.id("email")).sendKeys("100351772mp@gmail.com")
        await driver.findElement(By.css("#password")).sendKeys("Ultralitoxxx1997_")
        await driver.findElement(By.css('[id="btnLogin"]')).click();
        
        // Take screenshot
        await driver.takeScreenshot().then(function(data) {
            fs.writeFileSync(path.join(screenshotDir, 'login-success.png'), data, 'base64');
        });

        await driver.sleep(5000)
        await driver.quit();
    });

    it("Como usuario, quiero recibir un mensaje de error cuando intento iniciar sesión con credenciales incorrectas",async()=>{
        let driver = new Builder().forBrowser("chrome").build();
        await driver.get("https://sigeiacademico.itla.edu.do/account/login")
        
        await driver.findElement(By.id("email")).sendKeys("100351772mp@gmail.com")
        await driver.findElement(By.css("#password")).sendKeys("Ultralitoxxx")
        await driver.findElement(By.css('[id="btnLogin"]')).click();
        
        await driver.sleep(3000)

        // Take screenshot
        await driver.takeScreenshot().then(function(data) {
            fs.writeFileSync(path.join(screenshotDir, 'login-error.png'), data, 'base64');
        });

        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, "https://sigeiacademico.itla.edu.do/account/login");
        
        await driver.quit();
    });

    it("Como usuario, quiero tener la opción de que olvide mi contraseña", async () => {
        let driver = new Builder().forBrowser("chrome").build();
        await driver.get("https://sigeiacademico.itla.edu.do/account/login");

        const element = await driver.findElements(By.className("link_login"));
        assert.equal(element.length, 2);

        // Take screenshot
        await driver.takeScreenshot().then(function(data) {
            fs.writeFileSync(path.join(screenshotDir, 'forgot-password.png'), data, 'base64');
        });

        await driver.sleep(3000);
        await driver.quit();
    });

    it("Como usuario,quiero que hacer click en registrar",async()=>{
        let driver = new Builder().forBrowser("chrome").build();
        await driver.get("https://sigeiacademico.itla.edu.do/account/login")    
        const elementoRegistro = await driver.findElements(By.css('span'))
        assert.equal(elementoRegistro.length, 9);
        await driver.findElement(By.css('button.btn.btn-success')).click();  

        // Take screenshot
        await driver.takeScreenshot().then(function(data) {
            fs.writeFileSync(path.join(screenshotDir, 'register-click.png'), data, 'base64');
        });

        await driver.quit();
    });

    it("Como usuario, quiero que me redirija a la pagina principal", async () => {
        let driver = new Builder().forBrowser("chrome").build();
        await driver.get("https://sigeiacademico.itla.edu.do/account/login")
        
        await driver.findElement(By.id("email")).sendKeys("100351772mp@gmail.com")
        await driver.findElement(By.css("#password")).sendKeys("Ultralitoxxx1997_")
        await driver.findElement(By.css('[id="btnLogin"]')).click();
        
        await driver.sleep(3000)

        // Take screenshot
        await driver.takeScreenshot().then(function(data) {
            fs.writeFileSync(path.join(screenshotDir, 'main-page-redirect.png'), data, 'base64');
        });

        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, "https://sigeiacademico.itla.edu.do/");
        
        await driver.quit();
    });
});
