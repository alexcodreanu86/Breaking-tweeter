$(document).ready(function() {
  var url = window.location.href;
  var userName = (/\w\/(\w+)/).exec(url);
  $('.container').html("<h1> Wait for it... </h1><div id='spinner'></div>")
  $.get('/' + userName[1], function(serverResponse) {
    $('.container').html(serverResponse);
  });
});
