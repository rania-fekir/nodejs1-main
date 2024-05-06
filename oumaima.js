const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./oumaima.db1', err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('base de donnée crééer');
});

db.run(
  `create table IF NOT EXISTS user (id integer primary key autoincrement, username text, email text, age integer)`,
  err => {
    if (err) {
      console.log(err);
      return;
    }

    console.log('table crééer');
  },
);

app.post('/usersqllite3', (req, res) => {
  const newUser = req.body;

  db.run(
    `INSERT INTO user ('username', 'email', 'age') VALUES (?, ?, ?)`,
    [newUser.username, newUser.email, newUser.age],
    function (err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log(this);

      console.log(
        `user with username '${newUser.username}' created, with id ${this.lastID}`,
      );
    },
  );
});

app.get('/utilisateur/:id', (req, res) => {
  const userId = req.params.id;
  console.log(userId)
  const sql = `SELECT * FROM user WHERE id = ?`;
  db.get(sql, [parseInt(userId)], (err, row) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    console.log(row);
    if (!row) {
      res.status(404).send('Utilisateur non trouvé');
      return;
    }
    
    res.json(row);
  });
});

function getUsersByAgeRange(minAge, maxAge, callback) {
  const sql = `SELECT * FROM user WHERE age >= ? AND age <= ?`;
  db.all(sql, [minAge, maxAge], callback);
}

app.get('/usersByage', (req, res) => {
  const minAge = req.query.minAge; 
  const maxAge = req.query.maxAge; 
  
  
 if (!minAge || !maxAge) {
    return res.status(400).json({ error: 'Minimum and maximum age are required' });
  }

  getUsersByAgeRange(minAge, maxAge, (err, rows) => {
    if (err) {
      console.error("Error executing SQL query", err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ message: 'No users found within the specified age range' });
    }

    res.json(rows); 
  });
});

//const db = new sqlite3.Database('./database.db');
const port = 8001;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/addUser', (req, res) => {
  res.sendFile(__dirname + '/add-user.html');
});

app.get('/usersJson', (req, res) => {
  res.sendFile(__dirname + '/oumaima.json');
});

const XLSX = require('xlsx');

let lastId = 12;

app.post('/usersXlsx', (req, res) => {
  const newUser = req.body;
  newUser.age = parseInt(newUser.age);
  if (newUser.age === NaN) {
    console.log('wrong data');
    res.status(400).send('age has to be a number');
    return;
  }
  let workbook;
  try {
    workbook = XLSX.readFile('oumaima.xlsx', {});
  } catch (err) {
    console.log(err);
    res.status(500).send();
    return;
  }
  const firstSheetName = workbook.SheetNames[0];
  const firstSheet = workbook.Sheets[firstSheetName];
  lastId += 1;
  newUser.id = lastId;
  XLSX.utils.sheet_add_aoa(
    firstSheet,
    [[newUser.id, newUser.username, newUser.email, newUser.age]],
    {origin: -1},
  );
  try {
    XLSX.writeFile(workbook, 'oumaima.xlsx');
  } catch (e) {
    console.log(e);
    res.status(500).send();
    return;
  }
  res.sendStatus(200).send(newUser);
});

app.get('/usersXlsx', (req, res) => {
  let workbook;

  try {
    workbook = XLSX.readFile('oumaima.xlsx', {});
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
    return;
  }

  const firstSheetName = workbook.SheetNames[0];
  const firstSheet = workbook.Sheets[firstSheetName];
  const users = XLSX.utils.sheet_to_json(firstSheet, {range: 'B2:E14'});
  res.send(users);
});

app.post('/usersJson', (req, res) => {
  const newUser = req.body;
  fs.readFile('oumaima.json', {encoding: 'utf8'}, (err, data) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    const users = JSON.parse(data);
    newUser.id = users.length + 1;
    newUser.age = parseInt(newUser.age);
    users.push(newUser);
    fs.writeFile('oumaima.json', JSON.stringify(users), err => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
      }
      res.send(newUser);
    });
  });
});

/*app.get('/users', (req, res) => {
 // res.writeHead(200, {'Content-Type': 'application/json'});

 // res.end(JSON.stringify(users));
//});*/

app.get('/favicon.ico', (req, res) => {
  res.writeHead(200, {'Content-Type': 'image/png'});
  var img = fs.readFileSync('./black.png');

  res.end(img, 'binary');
});

app.get('/add', (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + '/add.html');
});

app.post('/add', (req, res) => {
  console.log(req.body);
});

app.get('/users/:id', (req, res) => {
  console.log(req.params);

  fs.readFile('oumaima.json', {encoding: 'utf8'}, function (err, data) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }

    const users = JSON.parse(data);

    for (let i = 0; i < users.length; i++) {
      if (users[i].id == parseInt(req.params.id)) {
        res.send(users[i]);
        return;
      }
    }

    res.sendStatus(404);
  });
});

app.get('/user', function (req, res) {
  let data = '';
  try {
    data = fs.readFileSync('oumaima.json', {encoding: 'utf8'});
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
    return;
  }

  const users = JSON.parse(data);
  const foundUsers = [];
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

  if (foundUsers.length == 0) {
    res.sendStatus(404);
  } else {
    res.send(foundUsers);
  }
});

app.get('/rangeage', function (req, res) {
  req.query.ageStart = parseInt(req.query.ageStart);
  req.query.ageEnd = parseInt(req.query.ageEnd);
  if (req.query.ageStart <= req.query.ageEnd) {
    fs.readFile('oumaima.json', {encoding: 'utf-8'}, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      const users = JSON.parse(data);
      var foundUsers = [];
      for (let i = 0; i < users.length; i++) {
        if (
          req.query.ageStart <= users[i].age &&
          users[i].age <= req.query.ageEnd
        ) {
          foundUsers.push(users[i]);
        } else if (!req.query.ageEnd && req.query.ageStart <= users[i].age) {
          foundUsers.push(users[i]);
        } else if (!req.query.ageStart && users[i].age <= req.query.ageEnd) {
          foundUsers.push(users[i]);
        }
      }

      if (foundUsers.length == 0) res.sendStatus(404);
      else res.send(foundUsers);
    });
  } else res.status(400).send('ageStart should be less then ageEnd');
});
