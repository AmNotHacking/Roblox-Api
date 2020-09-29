const puppeteer = require('puppeteer');
var request = require('request');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
 

function payuser(id) {
    console.log("PAYUSER");
    var form = {
            "PayoutType": "FixedAmount",
            "Recipients": [
              {
                "recipientId": id,
                "recipientType": "User",
                "amount": 1
              }
            ]
    };
    
    var formData = JSON.stringify(form);
    var contentLength = formData.length;
    
    request({
        headers: {
          'Content-Length': contentLength,
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': "Bl1tQWvGmn3S",
          "Accept": "application/json",
          "Cookie": "" //COOKIE INFORMATION HERRE!!!!!!!
        },
        uri: 'https://groups.roblox.com/v1/groups/148001/payouts',
        body: formData,
        method: 'POST'
      }, function (err, res, body) {
        console.log(res.body);
        console.log(res.statusCode);
      });
}

async function getId(Username) {
  console.log("GET ID");
  var ID = await new Promise(async function(resolve, reject) {
    await request({
      headers: {
        'X-CSRF-TOKEN': "Bl1tQWvGmn3S",
        "Accept": "application/json",
        "Cookie": "" //COOKIE INFORMATION HERRE!!!!!!!
      },
      uri: `https://api.roblox.com/users/get-by-username?username=${Username}`,
      method: 'GET'
    }, function (err, res, body) {
      ID = JSON.parse(res.body).Id;
      console.log(res.statusCode);
      resolve(ID);
    });
  });
  return ID
}

async function isGroup(id) {
  console.log("GROUP CHECK");
  //https://api.roblox.com/users/92364989/groups
  var ISGROUP = await new Promise(async function(resolve, reject) {
    await request({
      headers: {
        'X-CSRF-TOKEN': "Bl1tQWvGmn3S",
        "Accept": "application/json",
        "Cookie": "" //COOKIE INFORMATION HERRE!!!!!!!
      },
      uri: `https://api.roblox.com/users/${id}/groups`,
      method: 'GET'
    }, function (err, res, body) {
      ID = JSON.parse(res.body);
      console.log(res.statusCode);
      let Found = false;
      for (let i = 0; i < ID.length; i++) {
        if (ID[i].Name === "✖ GLI ITALIANI ✖") {
          Found = true;
        }
      }
      if (Found) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
  return ISGROUP;
}

exports.payuser = payuser;
exports.getId = getId;
exports.isGroup = isGroup;