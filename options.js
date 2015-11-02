$(function(){
  var storage = localStorage;
  var username = storage.getItem('username') ? storage.getItem('username') :'';
  $('#username').val(username);

  $('#save').on('click', function(){
    storage.setItem('username', $('#username').val());
    $('.alert').slideDown(100);
    setTimeout(function(){
      $('.alert').slideUp(100);
    }, 3000);
  });
});
