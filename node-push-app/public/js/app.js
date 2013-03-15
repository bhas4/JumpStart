function initReceiver() {
  var socket = io.connect('http://'+window.location.host);

  //on connetion, updates connection state and sends subscribe request
  socket.on('connect', function(data){
    socket.emit('subscribe', {channel:'notification'});
  });

  socket.on('message', function (data) {
    var ndiv = $('<div>').addClass('alert alert-success');
    ndiv.html(data.message);
    $("#ui_message").append(ndiv);
  });  
}
