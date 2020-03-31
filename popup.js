
  chrome.tabs.query(
    {currentWindow: true, active : true},
    function(tabArray){
      url = tabArray[0].url.split("#")[0];
      tabId = tabArray[0].id;
      if (localStorage.autoDetect === "true"){       
        get(url);
      }else{
        chrome.tabs.sendMessage(tabId, "start", function() {
          get(url);
        });
        chrome.pageAction.setTitle({ title: "Analyzing page content...", tabId: tabId });
        chrome.pageAction.hide(tabId);  
      }     
    }
  );

  get = function(url){
    chrome.storage.local.get(url, function(items) {
        data = items[url]

        if(data){
          if(!data[0]){
            $("#iconscore").attr('src', 'img/good_large.png');
            $('#scored span').text("No hoax or fake news");
          }else {
            $("#iconscore").attr('src', 'img/bad_large.png');
            $('#scored span').text("Hoax or fake news");
            $('#fakeLinkPanel').show();
            $('#fakeLink').attr('href', data[2]);
            $('#fakeLink').text(data[1]);
          }
          $('#smallNote').show();
        }else{
          get(url);
        }        
    });
  }



