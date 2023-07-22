import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === "getLocalStorage") {
    sendResponse({ data: localStorage.getItem(request.key) });
  }
});

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

console.log("background loaded");
