var secondsInDay = 86400;
 
var videoStreams = {
"apiKey" : "30532962", 
"sessionId" : "2_MX4zMDUzMjk2Mn4xMjcuMC4wLjF-VHVlIE1heSAyOCAwNDo1MzowOSBQRFQgMjAxM34wLjcxNjM4OTM2fg", 
"secret": "fd1fe9a08641ccf3513f34d8b1c6dd9fd79a86d3"}


var apiKey = videoStreams.apiKey;
var secret = videoStreams.secret;
var sessionId = videoStreams.sessionId;

TB.setLogLevel(TB.DEBUG);
var token = createToken();
var session = TB.initSession(sessionId);

session.addEventListener('sessionConnected', sessionConnectedHandler);
session.addEventListener('streamCreated', streamCreatedHandler);
session.addEventListener('streamDestroyed', streamDestroyedHandler);
TB.addEventListener("exception", exceptionHandler); 

session.connect(apiKey, token);

function createToken() {
 // Token Params
  var timeNow = Math.floor(Date.now()/1000);
  var expire = timeNow+secondsInDay;
  var role = "publisher";
  var data = "nand";
  
   // Calculation
  data = escape(data);
  var rand = Math.floor(Math.random()*999999);
  var dataString =  "session_id="+sessionId+"&create_time="+timeNow+"&expire_time="+expire+"&role="+role+"&connection_data="+data+"&nonce="+rand;
 
  // Encryption
  var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA1, secret);
  hmac.update( dataString );
  hash = hmac.finalize();
 
  preCoded = "partner_id="+apiKey+"&sig="+hash+":"+dataString;
  return "T1=="+$.base64.encode( preCoded )
 }

function exceptionHandler(event) {
 console.log("Exception occured");
 console.log(event);
}

function sessionConnectedHandler(event) {
  if(event.streams)
  {
    if(event.streams.length < 4)
    {
      var divProps = {width: 495, height:300, rememberDeviceAccess: true};
      var publisher = TB.initPublisher(apiKey, 'publisherContainer',divProps);
      session.publish(publisher);
    }
    subscribeToStreams(event.streams)
  }
}

function streamCreatedHandler(event) {
  // Subscribe to the newly created streams
  subscribeToStreams(event.streams);
}

function streamDestroyedHandler(event) {  
  // Get all destroyed streams    
  for (var i = 0; i < event.streams.length; i++) {
    // For each stream get the subscriber to that stream
    var subscribers = session.getSubscribersForStream(event.streams[i]);
    for (var j = 0; j < subscribers.length; j++) {
      // Then remove each stream
      
      var obj = document.getElementById(subscribers[j].id);
      var container = obj.parentNode;
      container.parentNode.removeChild(container);
    }
  }
}

function subscribeToStreams(streams) {
// For each stream
  for (var i = 0; i < streams.length; i++) {
    // Check if this is the stream that I am publishing, and if so do not subscribe.
    if (streams[i].connection.connectionId != session.connection.connectionId) {
      
      // Make a unique div id for this stream
      var divId = 'stream_' + streams[i].streamId;

      var container = document.createElement("div");
      var div = document.createElement("div");
      div.setAttribute('id', divId);
      
      container.appendChild(div);
      container.style.float = 'left';
      container.style.marginRight = '15px';

      var subscriberBox = document.getElementById('streamContainer');
      subscriberBox.appendChild(container);
      subscriberBox.style.display = 'inline-block';

      var divProps = {width: 150, height:150, name:"i stream"};
      session.subscribe(streams[i], divId, divProps);       
    }
  }
}