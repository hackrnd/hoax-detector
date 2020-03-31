
// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.showNotif = true;        // The notification setting
  localStorage.autoDetect = true;        // The autoDetect setting
  localStorage.isInitialized = true; // The option initialization.
}

chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    var tabId = sender.tab.id;    

    if (message.init){
      if (localStorage.autoDetect === "true"){
        chrome.tabs.sendMessage(tabId, "start");
      }else{
        chrome.pageAction.setTitle({ title: "Click to analyze page content", tabId: tabId });
        chrome.pageAction.show(tabId);     
      }

    }else if(message.url){
      obj = {}
      obj[message.url] = [message.fake, message.title, message.link, tabId]
      chrome.storage.local.set(obj);
      show(message.title, message.link, message.fake, message.url, tabId)    
    }
  });

var tempDb = []

function show(title, link, fake, url, tabId) {

  // Get tabID
  // chrome.tabs.query({
  //   active: true,               // Select active tabs
  //   lastFocusedWindow: true     // In the current window
  // }, function (tabArray) {
  //   var tabId = tabArray[0].id;

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

    } else{

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

          notification= new Notification("Please fact check this site", {
            icon: 'img/48.png',
            body: "Hoax or fake news detected based on content of this web page."
          });
          notification.addEventListener('click', function(e) {
            chrome.tabs.update(tabId, {selected: true});
            e.target.close();
          }, false);
          tempDb.push(url)
        }
    }
   
 // });
}
