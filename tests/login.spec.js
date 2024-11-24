const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");
describe("login", () => {

    
  it("Como usuario registrado, quiero iniciar sesión con mis credenciales, para acceder al sistema",async()=>{
        let driver = new Builder().forBrowser("chrome").build();
        await driver.get("https://sigeiacademico.itla.edu.do/account/login")

        const element = await driver.findElements(By.className('logo'))
        assert.equal(element.length, 1)

        
        await driver.findElement(By.id("email")).sendKeys("100351772mp@gmail.com")
        await driver.findElement(By.css("#password")).sendKeys("Ultralitoxxx1997_")
        await driver.findElement(By.css('[id="btnLogin"]')).click();
        

        await driver.sleep(5000)
        await driver.quit();
    });

    it("Como usuario, quiero recibir un mensaje de error cuando intento iniciar sesión con credenciales incorrectas, para saber que debo revisar mis datos",async()=>{
        let driver = new Builder().forBrowser("chrome").build();
        await driver.get("https://sigeiacademico.itla.edu.do/account/login")
        
        await driver.findElement(By.id("email")).sendKeys("100351772mp@gmail.com")
        await driver.findElement(By.css("#password")).sendKeys("Ultralitoxxx")
        await driver.findElement(By.css('[id="btnLogin"]')).click();
        
        await driver.sleep(3000)

        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, "https://sigeiacademico.itla.edu.do/account/login", "El usuario debería seguir en la página de login.");
        
        await driver.quit();
    });

  it("Como usuario, quiero tener la opción de que olvide mi contraseña, para recuperar mi acceso", async () => {
    let driver = new Builder().forBrowser("chrome").build();
    await driver.get("https://sigeiacademico.itla.edu.do/account/login");

    const element = await driver.findElements(By.className("link_login"));
    assert.equal(element.length, 2);

    await driver.sleep(3000);

    const currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(
      currentUrl,
      "https://sigeiacademico.itla.edu.do/account/login",
      "El usuario debería seguir en la página de login."
    );

    await driver.quit();
  });

    it("Como usuario,quiero que hacer click en registrar, para que se despliegue el formulario",async()=>{
        let driver = new Builder().forBrowser("chrome").build();
        await driver.get("https://sigeiacademico.itla.edu.do/account/login")    
        const elementoRegistro = await driver.findElements(By.css('span'))
        assert.equal(elementoRegistro.length, 9);
        await driver.findElement(By.css('button.btn.btn-success')).click();  


    });
    

  it("Como usuario, quiero que me redirija a la pagina principal, para ver los servicios de la app", async () => {
    let driver = new Builder().forBrowser("chrome").build();
        await driver.get("https://sigeiacademico.itla.edu.do/account/login")
        
        await driver.findElement(By.id("email")).sendKeys("100351772mp@gmail.com")
        await driver.findElement(By.css("#password")).sendKeys("Ultralitoxxx1997_")
        await driver.findElement(By.css('[id="btnLogin"]')).click();
        
        await driver.sleep(3000)

        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, "https://sigeiacademico.itla.edu.do/");
        
        await driver.quit();
  });
});
