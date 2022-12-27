// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res) {
  const date = req.params.date
  let unix = ''

  if (date) {
    unix = date.match(/\d\d\d\d-\d\d-\d\d/) ? new Date(date).getTime() : Number(date);
    if (isNaN(unix)) res.json({ error: 'Invalid Date' });
  }
  else unix = Date.now();

  const utc = new Date(unix).toUTCString();
  res.json({
    unix: unix,
    utc: utc
  });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
