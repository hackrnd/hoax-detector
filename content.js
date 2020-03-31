var url = window.location.href
var servercall = "https://localhost:5555/?url="+url


var httpGetAsync =  function(servercall, callback)
{
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", servercall, true); // true for asynchronous
    xmlHttp.send(null);
}

httpGetAsync(servercall,function(data){
  newdata = JSON.parse(data)
  chrome.runtime.sendMessage({fake: newdata.fake, title: newdata.title, link: newdata.link, url: url});

})

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        console.log(message);
});

