document.addEventListener('DOMContentLoaded', function() {
    var changeColor = document.getElementById('changeColor');
    var countSpan = document.getElementById('count');
  
    chrome.storage.sync.get('colorCount', function(data) {
      countSpan.textContent = data.colorCount || 0;
    });
  
    changeColor.addEventListener('click', function() {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "changeColor"}, function(response) {
          console.log(response);
        });
      });
  
      chrome.storage.sync.get('colorCount', function(data) {
        var newCount = (data.colorCount || 0) + 1;
        chrome.storage.sync.set({colorCount: newCount});
        countSpan.textContent = newCount;
      });
  
      chrome.runtime.sendMessage({action: "colorChanged"});
    });
  });
  
