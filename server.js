var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    app = express(),
    fileOptions = {
      root: __dirname + '/public/'
    };

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.sendFile('./index.html', fileOptions);
});

app.post('/register', function(req, res) {
  var email = String(req.body.email),
      validEmail = /.+\@.+/;

  if (!validEmail.test(email)) {
    res.status(400);
    console.log('400: ', email);
    res.sendFile("./email-invalid.html", fileOptions);
    return;
  }

  fs.appendFile("emails", email + "\n", function(err, data) {
    if (err) {
      res.status(500);
      console.log('500: ', email, JSON.stringify(err));
      res.sendFile("./email-error.html", fileOptions);
      return;
    }
    res.sendFile("./email-added.html", fileOptions);
  });
});

app.listen(8076, 'localhost');
