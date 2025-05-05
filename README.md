# Selenium WebDriver and Playwright Test Automation Project

This project automates web testing using **Selenium WebDriver** with **Mocha** and **Chai** for assertion handling, and **Playwright** for end-to-end testing.

## Getting Started

### Install Prerequisites

#### **Download & Install Node.js**
- Download Node.js (Recommended: LTS version)
- Verify installation:
  ```sh
  node -v
  npm -v
  ```

#### **Install VS Code (Skip, if you already have or if you're using a different text editor)**
- Download Visual Studio Code
- Recommended Extensions:
  - **ESLint** for JavaScript linting
  - **Mocha Test Explorer** for running tests within VS Code

---

### Setup the Project

#### **Initialize a Node.js Project**
Run the following in your project folder:
```sh
npm init -y
```
This will create a `package.json` file.

#### **Install Selenium WebDriver & Dependencies**
```sh
npm install selenium-webdriver chai mocha --save-dev
```

#### **Install ChromeDriver & GeckoDriver**
- **ChromeDriver** (for testing in Chrome):
  ```sh
  npm install chromedriver --save-dev
  ```
- **GeckoDriver** (for testing in Firefox):
  ```sh
  npm install geckodriver --save-dev
  ```

#### **Install Playwright & Dependencies**
```sh
npm install @playwright/test --save-dev
```
During the setup, you'll be asked if you want to install the Playwright browsers (Chromium, Firefox, and WebKit). Choose "yes" to install them.

---

### Update `package.json`
Modify your `package.json` to include test scripts for running both Selenium and Playwright tests.

```json
"scripts": {
  "test:selenium": "mocha tests/selenium --recursive --timeout 30000",
  "test:playwright": "playwright test",
  "test": "npm run test:selenium && npm run test:playwright"
}
```

This allows you to run tests using:
```sh
npm run test:selenium
npm run test:playwright
```

---

### Run Tests

#### **Execute Selenium Tests**
Run all test files inside the `tests/selenium` directory:
```sh
npm run test:selenium
```

#### **Execute Playwright Tests**
Run all test files inside the `tests/playwright` directory:
```sh
npm run test:playwright
```

---

### **Troubleshooting**
1. **If WebDriver fails** with missing browser drivers:
   - Ensure ChromeDriver and GeckoDriver are installed (`npm list chromedriver geckodriver`).
   - Check browser compatibility:
     ```sh
     chromedriver -v
     geckodriver -v
     ```

2. **If Mocha isn't recognized**, install it globally:
   ```sh
   npm install -g mocha
   ```

3. **If Playwright tests fail**, ensure the browsers are installed correctly:
   ```sh
   npx playwright install
   ```

---

### 📂 **Project Structure**
```
📦 Demo-Project
 ┣ 📂 node_modules
 ┣ 📂 tests
 ┃ ┣ 📂 playwright
 ┃ ┃ ┣ 📂 modules
 ┃ ┃ ┃ ┣ 📜 signIn.test.js
 ┃ ┣ 📂 selenium
 ┃ ┃ ┣ 📂 modules
 ┃ ┃ ┣ 📜 login.test.js
 ┃ ┃ ┣ 📜 todo.test.js
 ┃ ┣ 📂 utils
 ┃ ┃ ┣ 📜 login.util.js
 ┃ ┃ ┣ 📜 todo.util.js
 ┃ ┣ 📜 login.data.js
 ┣ 📜 .gitignore
 ┣ 📜 package-lock.json
 ┣ 📜 package.json
 ┣ 📜 playwright.config.js
 ┣ 📜 README.md
```

---

For more details on the testing frameworks, please visit the following official documentation:

- Selenium: [https://www.selenium.dev/documentation/]
- Playwright: [https://playwright.dev/docs/intro]