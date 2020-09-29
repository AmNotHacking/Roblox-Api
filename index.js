var request = require('request');
var http = require('http');
const { timeStamp } = require('console');
var fs = require("fs");
const { get } = require('request');
const { send } = require('process');
const r = require('./robuxhandler.js');


let groupID = 148001
let Username = "";
var UserId = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

http.createServer(async function (req, res) {
        console.log("call");
        if (req.method === 'POST') {
            let body = "";
            req.on("data", chunk => {
                body += chunk.toString();
            });
            req.on("end", () => {
                l();
                async function l(){
                    let Username = body;
                    let id = await r.getId(Username);
                    let ISGROUP = await r.isGroup(id);
                    console.log(ISGROUP);
                    if (!ISGROUP) {
                      await res.writeHeader(200, {"Content-Type": "text/html"});  
                      let html = fs.readFileSync('./RobuxForum/error.html');  
                      await res.write(html);
                      await res.end();
                    } else {
                      await r.payuser(id);
                      await res.writeHeader(200, {"Content-Type": "text/html"});  
                      let html = fs.readFileSync('./RobuxForum/paid.html');  
                      res.write(html);
                      await res.end();
                    }
                }
            })
        }
}).listen(8080);