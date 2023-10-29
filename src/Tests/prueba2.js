// Importa las funciones y clases necesarias desde 'selenium-webdriver' como módulos ESM
import { Builder, By, Key, until } from 'selenium-webdriver';

// Importa las opciones de configuración para Chrome desde 'selenium-webdriver/chrome.js'
import chrome from 'selenium-webdriver/chrome.js';

// Configura las opciones de Chrome (opcional)
const options = new chrome.Options();

// Crea una instancia del WebDriver para Chrome
const driver = new Builder()
  .forBrowser('chrome') // Especifica que se usará el navegador Chrome
  .setChromeOptions(options) // Configura las opciones de Chrome (puedes personalizarlas)
  .build(); // Crea la instancia del WebDriver

// Define la función de prueba
async function realizarRegistro() {
  try {
    // Navega a la página de veterinaria mistun
    await driver.get('https://vet-mitsun-development.vercel.app');

    // Encuentra el botón por su texto "Registrarse"
    const botonRegistrarse = await driver.findElement(By.xpath("//a[text()='REGISTRARSE']"));

    // Haz clic en el botón "Registrarse"
    await botonRegistrarse.click();
    
    // Encuentra los elementos de entrada de texto por su atributo "name" o "id"
    const inputNombre = await driver.findElement(By.name('firstName'));
    const inputApellido = await driver.findElement(By.name('lastName'));
    const inputFechaNac = await driver.findElement(By.id(':r2:'));
    const inputCorreo = await driver.findElement(By.name('email'));
    const inputContraseña = await driver.findElement(By.name('password'));
    const inputContraseña2 = await driver.findElement(By.name('repeatPassword'));

    const botonRegistrarme = await driver.findElement(By.xpath("//button[text()='Registrarme']"));

    // Espera para asegurarse que carge la pagina del registro
    await driver.sleep(2000); // Espera 2 segundos

    await botonRegistrarme.click();

    // Espera para asegurarte de que valida campos vacios
    await driver.sleep(2000); // Espera 2 segundos

    // Ingresa datos en los campos
    await inputNombre.sendKeys('Juan Manuel');
    await inputApellido.sendKeys('Calderon Pérez');
    await inputFechaNac.click();
    await inputFechaNac.sendKeys('30062000');
    await inputCorreo.sendKeys('juan15@gmail.com');
    await inputContraseña.sendKeys('miContraseña123');
    await inputContraseña2.sendKeys('miContraseña123');

    // Espera para asegurarte de que los datos se ingresaron antes de continuar (opcional)
    await driver.sleep(2000); // Espera 2 segundos

    await botonRegistrarme.click();

    // Espera para asegurarse que carge la pagina del login
    await driver.sleep(8000); // Espera 8 segundos

    // Encuentra los elementos de entrada para loggin
    const inputCorreoLog = await driver.findElement(By.name('email'));
    const inputContraseñaLog = await driver.findElement(By.name('password'));
    const botonIniciarSesion = await driver.findElement(By.xpath("//button[text()='Inicia sesión']"));

    // Ingresa datos en los campos
    await inputCorreoLog.sendKeys('juan15@gmail.com');
    await inputContraseñaLog.sendKeys('miContraseña123');
    
    await botonIniciarSesion.click();

  } finally {
    // Cierra el navegador al final de la prueba
    //await driver.quit();
  }
}

// Llama a la función de prueba para iniciar la automatización
realizarRegistro();
