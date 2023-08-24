// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Show Current Date
app.get("/api", function (req, res) {
  let timestamp = new Date();
  return res.json({ unix: timestamp.getTime(), utc: `${timestamp}` });
});

// Show Request Date
app.get("/api/:date?", function (req, res) {
  let dateStr = isFinite(req.params.date) ? parseInt(req.params.date) : req.params.date;
  let convertDate = new Date(dateStr);

  // Error Response
  if (convertDate == "Invalid Date") return res.json({ error: "Invalid Date" });
  
  // Success Response
  return res.json({ unix: convertDate.getTime(), utc: `${convertDate.toUTCString()}` });
}); 

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
