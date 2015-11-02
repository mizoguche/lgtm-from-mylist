$(document).ready(function(){
  fetch();
});

function fetch(){
  showStatus('#loading');

  var storage = localStorage;
  var username = storage.getItem('username') ? storage.getItem('username') :'';

  if(username === ''){
    showStatus('#nooptions');
    chrome.runtime.openOptionsPage();
    return;
  }
  var tabId   = 0;
  chrome.tabs.query({"active": true}, function(tab){
    tabId = tab[0].id;
  });

  $.ajax({
    url: 'http://lgtm.in/g/' + username,
    type: 'GET',
    success: function(result){
      var imageUrl = $(result).find('#imageUrl').val();
      var dataUrl = $(result).find('#dataUrl').val();
      console.log(imageUrl);
      var copyString = '[![LGTM](' + imageUrl + ')](' + dataUrl + ')';
          showStatus('#copied');
          $('#image').append('<img width="380" src="' + imageUrl + '">');
          $('#links').text(copyString);
          copy();
          chrome.tabs.sendMessage(tabId, copyString, function(response){});
          }});
      }

      function showStatus(selector){
        $('#loading').hide();
        $('#copied').hide();
        $('#nooptions').hide();
        $(selector).show();
      }

function copy(){
  $('#links').show();  
  $('#links').focus();  
  $('#links').select();  
  document.execCommand("Copy");
  window.getSelection().removeAllRanges();  
  $('#links').hide();  
}
