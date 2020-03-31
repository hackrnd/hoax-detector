
// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.showNotif = true;        // The notification setting
  localStorage.isInitialized = true; // The option initialization.
}

chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    console.log(message);
    if (message){
      show(message.title, message.link, message.fake, message.url)
      // Content script, storage (remember document title?)
      obj = {}
      tab = sender.tab.id
      obj[tab.toString()] = [message.fake, message.title, message.link]
      chrome.storage.local.set(obj);
    }   
  });


var tempDb = []

function show(title, link, fake, url) {

  // Get tabID
  chrome.tabs.query({
    active: true,               // Select active tabs
    lastFocusedWindow: true     // In the current window
  }, function (array_of_Tabs) {
    var tab = array_of_Tabs[0];
    var tabId = tab.id;

    // Start the score Logic

    if (!fake) {

      chrome.pageAction.setIcon({
        path: {
          "19": "img/good.png",
        },
        tabId: tabId
      });
      // set pageAction Title
      chrome.pageAction.setTitle({ title: "No hoax or fake news detected", tabId: tabId });
      // make icon active
      chrome.pageAction.show(tabId);

    } else {

        // Change the icon to bad
        chrome.pageAction.setIcon({
          path: {
            "19": "img/bad.png",
          },
          tabId: tabId
        });
        // set pageAction Title
        chrome.pageAction.setTitle({ title: "Hoax or fake news detected", tabId: tabId });
        // make icon active
        chrome.pageAction.show(tabId);

        if ( localStorage.showNotif === "true" && tempDb.includes(url) === false) {

          new Notification("Please fact check this site", {
            icon: 'img/48.png',
            body: "Hoax or fake news detected based on content of this web page."
          });
          tempDb.push(url)
        }
    }
  });
}
