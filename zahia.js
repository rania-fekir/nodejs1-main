const fs = require('fs');
const express = require('express');
const app = express();

const port = 4001;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var users = [
  {id: 1, username: 'ahmed', email: 'ahmed@ghldsk.dkg', age: 25},
  {id: 2, username: 'mostapha', email: 'mostapha@ghldsk.dkg', age: 31},
];

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/users', (req, res) => {
  // res.writeHead(200, {'Content-Type': 'application/json'});
  console.log(__dirname);
  res.sendFile(__dirname + '/zahia.json');
  // res.end(JSON.stringify(users));
});

app.get('/favicon.ico', (req, res) => {
  res.writeHead(200, {'Content-Type': 'image/png'});
  const img = fs.readFileSync('./black.png');
  res.end(img, 'binary');
});

app.get('/add', (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + '/add.html');
});

app.post('/add', (req, res) => {
  console.log(req.body);
  res.send();
});

app.post('/users', (req, res) => {
  req.body.age = parseInt(req.body.age);
  fs.readFile('zahia.json', {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    const users = JSON.parse(data);
    req.body.id = users.length + 1;
    users.push(req.body);

    fs.writeFile(
      'zahia.json',
      JSON.stringify(users),
      {encoding: 'utf-8'},
      err => {
        if (err) {
          res.sendStatus(500);
          return;
        }
        res.send(req.body);
      },
    );
  });
});

app.get('/users/:id', function (req, res) {
  req.params.id = parseInt(req.params.id);

  fs.readFile('zahia.json', {encoding: 'utf-8'}, function (err, data) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    const users = JSON.parse(data);

    for (let i = 0; i < users.length; i++) {
      if (req.params.id == users[i].id) {
        res.send(users[i]);
        return;
      }
    }

    res.sendStatus(404);
  });
});

app.get('/user', function (req, res) {
  fs.readFile('zahia.json', {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    req.query.age = parseInt(req.query.age);
    const users = JSON.parse(data);
    var foundUsers = [];
    for (let i = 0; i < users.length; i++) {
      if (
        req.query.username == users[i].username &&
        req.query.age == users[i].age
      ) {
        foundUsers.push(users[i]);
      } else if (!req.query.username && req.query.age == users[i].age) {
        foundUsers.push(users[i]);
      } else if (!req.query.age && req.query.username == users[i].username) {
        foundUsers.push(users[i]);
      }
    }

    if (foundUsers.length == 0) res.sendStatus(404);
    else res.send(foundUsers);
  });
});

app.get('/rangeage', function (req, res) {
  req.query.ageStart = parseInt(req.query.ageStart);
  req.query.ageEnd = parseInt(req.query.ageEnd);

  if (
    req.query.ageStart &&
    req.query.ageEnd &&
    req.query.ageStart > req.query.ageEnd
  ) {
    res.status(400).send('ageStart should be less then ageEnd');
    return;
  }

  fs.readFile('zahia.json', {encoding: 'utf-8'}, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    const users = JSON.parse(data);
    var foundUsers = findUsersInAgeRange(
      users,
      req.query.ageStart,
      req.query.ageEnd,
    );

    if (foundUsers.length == 0) res.sendStatus(404);
    else res.send(foundUsers);
  });
});

function findUsersInAgeRange(users, ageStart, ageEnd) {
  var foundUsers = [];
  for (let i = 0; i < users.length; i++) {
    if (isUserAgeBetween(users[i].age, ageStart, ageEnd)) {
      foundUsers.push(users[i]);
    } else if (!ageEnd && ageStart <= users[i].age) {
      foundUsers.push(users[i]);
    } else if (!ageStart && users[i].age <= ageEnd) {
      foundUsers.push(users[i]);
    }
  }
  return foundUsers;
}

function isUserAgeBetween(age, ageStart, ageEnd) {
  return ageStart <= age && age <= ageEnd;
}
