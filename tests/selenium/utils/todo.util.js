const { By, until } = require("selenium-webdriver");

class TodoPage {
  constructor(driver, themeClass) {
    this.driver = driver;
    this.themeClass = themeClass;
    this.inputField = By.css(`.${themeClass}-input`);
    this.addButton = By.css(`.todo-btn.${this.themeClass}-button`);
  }

  async enterTask(taskText) {
    await this.driver.findElement(this.inputField).sendKeys(taskText);
  }

  async clickAddTask() {
    await this.driver.findElement(this.addButton).click();
  }

  async waitForTask(taskText) {
    await this.driver.wait(
      until.elementLocated(By.xpath(`//li[contains(text(), '${taskText}')]`)),
      10000
    );
  }

  async getTask(taskText) {
    return await this.driver.findElement(
      By.xpath(`//li[contains(text(), '${taskText}')]`)
    );
  }

  async deleteTask(taskText) {
    const deleteButtonSelector = ".delete-btn.standard-button";

    await this.waitForTask(taskText);
    const task = await this.getTask(taskText);

    await this.driver.wait(
      until.elementLocated(By.css(deleteButtonSelector)),
      5000
    );
    await this.driver.findElement(By.css(deleteButtonSelector)).click();

    await this.driver.wait(until.stalenessOf(task), 5000);
  }
}

module.exports = TodoPage;
