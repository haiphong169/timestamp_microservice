// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

const isValid = (s) => {
  return !/[a-zA-Z]/.test(s);
};

app.get('/api/:date?', (req, res) => {
  let { date } = req.params;
  let unix, utc;
  if (date === undefined) {
    utc = new Date().toUTCString();
    unix = Date.now();
  } else {
    if (isValid(date)) {
      if (date.includes('-')) {
        utc = new Date(date).toUTCString();
        unix = new Date(date).getTime();
      } else {
        utc = new Date(Number.parseInt(date)).toUTCString();
        unix = Number.parseInt(date);
      }
    } else {
      if (date.includes(' ')) {
        utc = new Date(date).toUTCString();
        unix = new Date(date).getTime();
        return res.json({ unix, utc });
      }
      return res.json({ error: 'Invalid Date' });
    }
  }

  res.json({ unix, utc });
});
// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
