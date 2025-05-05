const { Builder, By, Browser } = require("selenium-webdriver");
const { expect } = require("chai");
const TodoPage = require("../../utils/todo.util");

describe("To-Do List Functionality", function () {
  let driver;
  let themeClass;
  let todoPage;
  this.timeout(30000);

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("https://lordwill1.github.io/todo-list/");
    themeClass = await driver.findElement(By.css("body")).getAttribute("class");
    todoPage = new TodoPage(driver, themeClass);
  });

  after(async function () {
    await driver.quit();
  });

  it("should add a new task", async function () {
    const taskText = "Get Groceries";
    await todoPage.enterTask(taskText);
    await todoPage.clickAddTask();
    await todoPage.waitForTask(taskText);

    const addedTask = await todoPage.getTask(taskText);
    expect(await addedTask.getText()).to.equal(taskText);
  });

  it("should delete the added task", async function () {
    const taskText = "Get Groceries";
    await todoPage.deleteTask(taskText);

    const tasks = await driver.findElements(
      By.xpath(`//li[contains(text(), '${taskText}')]`)
    );
    expect(tasks.length).to.equal(0);
  });
});
