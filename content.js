var url = window.location.href.split("#")[0]
var servercall = "https://hoax-detector.azurewebsites.net/?url="+url


var httpGetAsync =  function(servercall, callback){
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", servercall, true); // true for asynchronous
    xmlHttp.send(null);
}

var startProcessing = function(sendResponse){
    chrome.storage.local.get(url, function(items) {
        data = items[url]

        if(data){
            chrome.runtime.sendMessage({fake: data[0], title: data[1], link: data[2], url: url});
            if(sendResponse){
                sendResponse();
            }
        }else {
            httpGetAsync(servercall,function(data){
                newdata = JSON.parse(data)
                chrome.runtime.sendMessage({fake: newdata.fake, title: newdata.title, link: newdata.link, url: url});
                if(sendResponse){
                    sendResponse();
                }           
            })
        }
    });
}

chrome.runtime.sendMessage({ init: 'init' });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
    if (message == "start"){
        startProcessing(sendResponse);
    }   
});