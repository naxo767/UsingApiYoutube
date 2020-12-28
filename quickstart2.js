var fs = require('fs');
var readline = require('readline');
var { google } = require('googleapis');
const { time } = require('console');
var OAuth2 = google.auth.OAuth2;
const service = google.youtube('v3');
//const sheets = google.sheets('v4');
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/youtube', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/documents', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.appdata', 'https://www.googleapis.com/auth/drive.metadata', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.activity', 'https://www.googleapis.com/auth/drive.scripts', 'https://www.googleapis.com/auth/youtube.upload', "https://www.googleapis.com/auth/youtube.force-ssl", "https://www.googleapis.com/auth/youtube.readonly"];
var TOKEN_DIR = 'credentials';
var TOKEN_PATH = 'token.json';


// Load client secrets from a local file.
fs.readFile('credentials.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }
  // Authorize a client with the loaded credentials, then call the YouTube API.
  //authorize(JSON.parse(content), getChannel);
  //authorize(JSON.parse(content), createUrls);
  authorize(JSON.parse(content), getChannel);

});



/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function (err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function (code) {
    rl.close();
    oauth2Client.getToken(code, function (err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) throw err;
    console.log('Token stored to ' + TOKEN_PATH);
  });
}
let values = [[]];

/**
 * Lists the names and IDs of up to 10 files.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function getChannel(auth) {
  var service = google.youtube('v3');

  let spreadsheetId = "1QrnD3ITuPGohGMpj-bYtpSGoFGhiEnk1hehBayTn-hU";

  const sheets = google.sheets({ version: 'v4', auth });

  service.activities.list({
    auth: auth,
    part: 'snippet,contentDetails,id',
    channelId: 'UCyQqzYXQBUWgBTn4pw_fFSQ',
    maxResults: 100
}, function (err, response) {
    if (err) {
        console.log('The API returned an error: ' + err);
        return;
    } else {


        service.activities.list({
            auth: auth,
            part: 'snippet,contentDetails,id',
            channelId: 'UCyQqzYXQBUWgBTn4pw_fFSQ',
            pageToken: response.nextPageToken,
            maxResults: 100
        }, function (err, response1) {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            } else {

                service.activities.list({
                    auth: auth,
                    part: 'snippet,contentDetails,id',
                    channelId: 'UCyQqzYXQBUWgBTn4pw_fFSQ',
                    pageToken: response1.nextPageToken,
                    maxResults: 100
                }, function (err, response2) {
                    if (err) {
                        console.log('The API returned an error: ' + err);
                        return;
                    } else {
                        service.activities.list({
                            auth: auth,
                            part: 'snippet,contentDetails,id',
                            channelId: 'UCyQqzYXQBUWgBTn4pw_fFSQ',
                            pageToken: response2.nextPageToken,
                            maxResults: 100
                        }, function (err, response3) {
                            if (err) {
                                console.log('The API returned an error: ' + err);
                                return;
                            } else {
                                service.activities.list({
                                    auth: auth,
                                    part: 'snippet,contentDetails,id',
                                    channelId: 'UCyQqzYXQBUWgBTn4pw_fFSQ',
                                    pageToken: response3.nextPageToken,
                                    maxResults: 100
                                }, function (err, response4) {
                                    if (err) {
                                        console.log('The API returned an error: ' + err);
                                        return;
                                    } else {
                                        var activities9 = response4.data.items;
                                        var activities8 = response3.data.items;
                                        var activities7=activities8.concat(activities9);
                                        var activities6 = response2.data.items;
                                        var activities5=activities6.concat(activities7);
                                        var activities4=response1.data.items;
                                        var activities3=activities4.concat(activities5); 
                                        var activities2 = response.data.items
                                        var activities = activities2.concat(activities3);
                                        
                                        
                                        
                                      
                                     
                                      
                                        console.log(activities.length);
                                        RellenarCuestionarios(auth, activities,spreadsheetId);
                                    }
                                });
                            }
                        });
                    }
                });


            }



        });


    }

});

 



 


      
        

   
}



function update(request, auth) {

  const sheets = google.sheets({ version: 'v4', auth });

  sheets.spreadsheets.values.batchUpdate(request, (err, result) => {
    if (err) {
      // Handle error
      console.log(err);
    } else {
      console.log(result)

      console.log('Celdas cambiadas');
    }
  });
}
function updateNames(request1, auth) {

  const sheets = google.sheets({ version: 'v4', auth });

  sheets.spreadsheets.values.batchUpdate(request1, (err, result) => {
    if (err) {
      // Handle error
      console.log(err);
    } else {
      console.log(result)

      console.log('Celdas cambiadas');
    }
  });
}





function RellenarCuestionarios(auth, activities,spreadsheetId) {
  
  



  console.log(activities);

  if (activities.length == 0) {
    console.log('No channel found.');
  } else {
    console.log("activities.length")
    console.log(activities.length);
    let request = {
      spreadsheetId: spreadsheetId,
      resource: {
        data:[{
          range: "Hoja1!I2:J1000", 
          majorDimension:"COLUMNS",
          values: [[

          ],[]
  
          ]

        }],
        valueInputOption: "RAW",
       
      }
    
     
     
      ,
      auth: auth,
    };
    let request1 = {
      spreadsheetId: spreadsheetId,
      resource: {
        data:[{
          range: "Hoja1!H2:I1000", 
          majorDimension:"COLUMNS",
          values: [[

          ],[]
  
          ]

        }],
        valueInputOption: "RAW",
       
      }
    
     
     
      ,
      auth: auth,
    };
    for (i = 0; i < activities.length; i++) {


      if (activities[i].contentDetails.upload) {
        console.log(activities[i].contentDetails);
        
       
        request.resource.data[0].values[0].push("https://www.youtube.com/watch?v=" + activities[i].contentDetails.upload.videoId);
        request1.resource.data[0].values[0].push(activities[i].snippet.title);
      
      };




    }
    update(request,auth);
    updateNames(request1,auth);
  }
} 
