
  chrome.tabs.query(
    {currentWindow: true, active : true},
    function(tabArray){
      tab = tabArray[0].id;
      get(tab);
    }
  )

  get = function(tab){
    chrome.storage.local.get(tab.toString(), function(items) {
        data = items[tab.toString()]

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
    });

  }
