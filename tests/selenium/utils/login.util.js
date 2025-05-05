const { By, until } = require("selenium-webdriver");

class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.usernameField = By.id("username");
    this.passwordField = By.id("password");
    this.loginButton = By.css("button[type='submit']");
    this.successMessage = By.css(".flash.success");
    this.errorMessage = By.css(".flash.error");
  }

  async login(username, password) {
    await this.driver.findElement(this.usernameField).sendKeys(username);
    await this.driver.findElement(this.passwordField).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
  }

  async getLoginStatus() {
    await this.driver.sleep(3000);

    try {
      await this.driver.wait(until.elementLocated(this.successMessage), 5000);
      return await this.driver.findElement(this.successMessage).getText();
    } catch {
      try {
        await this.driver.wait(until.elementLocated(this.errorMessage), 5000);
        return await this.driver.findElement(this.errorMessage).getText();
      } catch {
        throw new Error(
          "No success or error message found. Login status unknown."
        );
      }
    }
  }
}

module.exports = LoginPage;
