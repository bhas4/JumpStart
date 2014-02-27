var path = require('path');
var util = require('util');
var googleapis = require('googleapis');

//getting the GA data from API
exports.queryGoogleAnalyticsData = function(req, res){
  res.contentType('application/json');

  //service account, created for your app
  var SERVICE_ACCOUNT = 'xxx-xxx@developer.gserviceaccount.com';

  //location to the private key for authorization
  var pemFile = path.join(__dirname) + '/lib/ga_private.pem';

  //go ahead first authorize, then invoke connect function to start API calls
  this.jwt = new googleapis.auth.JWT(
      SERVICE_ACCOUNT,
      pemFile,'',
      ['https://www.googleapis.com/auth/analytics.readonly', 'https://www.googleapis.com/auth/prediction']
    );
    this.jwt.authorize((function(err, result){
      if(!err){
        this.jwt.credentials = result;
        connect();
      }
    }).bind(this));

  //main API invoke
  function connect(){
    googleapis.discover('analytics', 'v3').withAuthClient(this.jwt)
        .execute((function(err, client){
          if (err){
            console.log("Error Occurred");
            res.end();
            return;
          }
          console.log("Client object == "+util.inspect(client));
          this.client = client;
          this.accList = client.analytics.management.accounts.list().execute(function(err, response){
            console.log("Account List == "+util.inspect(response));
            if (!response.code) {
              if (response && response.items && response.items.length) {
                console.log("First Account Object == "+util.inspect(response.items[0]));
                queryWebproperties(response.items[0].id);
              }
            }
          });
        }));
  }

  //fetches the list of web properties for the account
  function queryWebproperties(accountId){
    this.client.analytics.management.webproperties.list({
      'accountId': accountId
    }).execute(function(err, response){
      console.log("Web Properties == "+util.inspect(response));
      if (!response.code) {
        if (response && response.items && response.items.length) {
          queryProfiles(accountId, response.items[0].id);
        }
      }
    });
  }

  //fetches the list of profiles for the account & web property
  function queryProfiles(accountId, webPropertyId){
    this.client.analytics.management.profiles.list({
      'accountId': accountId,
      'webPropertyId': webPropertyId
    }).execute(function(err, response){
      console.log("Profiles == "+util.inspect(response));
      if (!response.code) {
        if (response && response.items && response.items.length) {
          queryAPI(accountId, webPropertyId, response.items[0].id);
        }
      }
    });
  }

  function queryAPI(accountId, webPropertyId, profileId){
    console.log("AccountID = "+accountId+", webPropertyId = "+webPropertyId+", profileId = "+profileId);
    //metrics - ga:newVisits, ga:pageviews,
    var parameters = {'ids':"ga:"+profileId, 'start-date': '2014-01-01', 'end-date': '2014-03-31',
          'metrics': 'ga:visitors, ga:totalEvents', 'dimensions': 'ga:pagePath, ga:eventAction, ga:eventCategory'}
    this.client.analytics.data.ga.get(parameters).execute(function(err, response){
      if (!err){
        console.log("Results == "+util.inspect(response));
        res.write(JSON.stringify(response));
      } else {
        console.log("Error Occurred == "+util.inspect(err));
      }
      res.end();
    });
  }
}