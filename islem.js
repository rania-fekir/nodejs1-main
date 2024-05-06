const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/users', (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});

  res.end(JSON.stringify(users));
});

app.get('/favicon.ico', (req, res) => {
  res.writeHead(200, {'Content-Type': 'image/png'});
  var img = fs.readFileSync('./black.png');

  res.end(img, 'binary');
});

app.get('/add', (req, res) => {
  console.log(__dirname);
  res.sendFile('add.html', {root: __dirname});
});
app.use(express.json());

app.post('/add', (req, res) => {
  console.log(req.body);
  res.writeHead(200, {'Content-type': 'application/json'});
  res.send({result: somme});
});

app.post('/users', (req, res) => {
  console.log(req.body);
  req.body.age = Number(req.body.age);
  fs.readFile('islem.json', {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const users = JSON.parse(data);
    req.body.id = users.length + 1;
    users.push(req.body);
    fs.writeFile(
      'islem.json',
      JSON.stringify(users),
      {encoding: 'utf-8'},
      err => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        res.send(req.body);
      },
    );
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/islem.json');
});
