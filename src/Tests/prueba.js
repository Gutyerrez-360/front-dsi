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
async function realizarBusquedaEnGoogle() {
  try {
    // Navega a la página de Google
    await driver.get('https://www.google.com');

    // Encuentra el campo de búsqueda por su atributo "name" (en este caso, "q" es el campo de búsqueda de Google)
    const campoDeBusqueda = await driver.findElement(By.name('q'));

    // Ingresa un término de búsqueda y presiona "Enter"
    await campoDeBusqueda.sendKeys('Pruebas automatizadas con Selenium', Key.RETURN);

    // Espera a que aparezcan los resultados de búsqueda (puedes ajustar el tiempo)
    await driver.wait(until.titleContains('Pruebas automatizadas con Selenium'), 5000);

    // Obtiene el título de la página actual
    const titulo = await driver.getTitle();

    // Imprime el título de la página actual en la consola
    console.log('Título de la página:', titulo);
  } catch (error) {
    // Maneja cualquier error que ocurra durante la ejecución de las pruebas
    console.error('Ocurrió un error:', error);
  } finally {
    // Cierra el navegador al final de la prueba
    //await driver.quit();
  }
}

// Llama a la función de prueba para iniciar la automatización
realizarBusquedaEnGoogle();
