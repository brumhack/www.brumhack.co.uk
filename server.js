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
  res.sendFile('index.html', fileOptions);
});

['error', 'added', 'invalid'].forEach(function(type) {
  app.get('/email-' + type, function(req, res) {
    res.sendFile('email-' + type + '.html', fileOptions);
  });
});

app.post('/register', function(req, res) {
  var email = String(req.body.email),
      validEmail = /.+\@.+/;

  if (!validEmail.test(email)) {
    console.log('400: ', email);
    res.redirect(302, "email-invalid");
    return;
  }

  fs.appendFile("emails", email + "\n", function(err, data) {
    if (err) {
      console.log('500: ', email, JSON.stringify(err));
      res.redirect(302, "email-error");
      return;
    }
    res.redirect(302, "email-added");
  });
});

app.listen(8076, 'localhost');
