var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
                host: '34.41.68.202',
                user: 'root',
                password: 'team46-$',
                database: 'team46db'
});

connection.connect;


var app = express();

// set up ejs view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res) {
  res.render('base', { title: 'Homepage' });
});

app.get('/create', function(req, res) {
  res.render('index', { title: 'Add a new User' });
});

app.get('/main', function(req, res) {
  res.render('main', { title: 'Give your symptoms' });
});

app.get('/success', function(req, res) {
      res.send({'message': 'User request done'});
});

// this code is executed when a user clicks the form submit button
app.post('/mark', function(req, res) {
  var userid = req.body.userid;
  var password  = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var height = req.body.height;
  var weight = req.body.weight;
  var sex = req.body.sex;
  var age = req.body.age;
  var race = req.body.race;
  var email = req.body.email;
  var sqlcheck = 'SELECT COUNT(*) FROM users WHERE userid = ?';
  var sql = `INSERT INTO users (userid, firstname, lastname, height, weight, sex, age, race, email, password) VALUES ('${userid}','${firstname}','${lastname}','${height}','${weight}','${sex}','${age}','${race}','${email}','${password}')`;

  connection.query(sqlcheck, [userid], function(error, results) {
    if (results[0]["COUNT(*)"] == 1) {
      console.error('UserID already exists');
      res.status(500).send('Sorry, User ID already exists. Try again!');
      return;
    } else {
  
console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    res.send('New user succesfully added!');
  });}
});
});

app.post('/login', function(req, res) {
    var userid = req.body.userID;
    var password = req.body.password;
    var sqlcheck = 'SELECT COUNT(*) FROM users WHERE userid = ?';
    var sql = 'SELECT password FROM users WHERE userid = ?';

    connection.query(sqlcheck, [userid], function(error, results) {
    if (results[0]["COUNT(*)"] == 0) {
      console.error('UserID doesn\'t exist');
      res.status(500).send('Sorry, User ID not found. Try again!');
      return;
    } else {

  connection.query(sql, [userid], function(err, result) {
    if (result[0]['password'] != [password]) {
      console.error('Wrong password');
      res.status(500).send('Sorry, wrong Password. Try again!');
      return;
    }
    console.log('Received userID:', userid);
    res.redirect('\create');
  });}
  });
});

app.get('/api/users', function(req, res) {
  var sql = 'SELECT * FROM users';

  connection.query(sql, function(err, results) {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).send({ message: 'Error fetching user data', error: err });
      return;
    }
    res.json(results);
  });
});

app.listen(80, function () {
    console.log('Node app is running on port 80');
});
