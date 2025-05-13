document.getElementById("loginButton").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const username = "standard_user";
      const password = "secret_sauce";

      function getElementByXPath(xpath) {
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      }

      function setInputValue(input, value) {
        const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeSetter.call(input, value);
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }

      const userInput = getElementByXPath("//input[@id='user-name']");
      const passInput = getElementByXPath("//input[@id='password']");
      const loginButton = getElementByXPath("//input[@id='login-button']");

      if (userInput && passInput && loginButton) {
        setInputValue(userInput, username);
        setInputValue(passInput, password);
        loginButton.click();
      } else {
        console.warn("Login fields not found.");
      }
    }
  });
});

document.getElementById("logoutButton").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      function getElementByXPath(xpath) {
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      }

      const menuButton = getElementByXPath("//button[@id='react-burger-menu-btn']");

      if (menuButton) {
        menuButton.click();

        setTimeout(() => {
          const logout = getElementByXPath("//a[@id='logout_sidebar_link']");
          if (logout) {
            logout.click();
          } else {
            console.warn("Logout link not found.");
          }
        }, 500);
      } else {
        console.warn("Menu button not found.");
      }
    }
  });
});

