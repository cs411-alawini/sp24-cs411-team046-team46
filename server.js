var OpenAI = require('openai');
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
const OPENAI_API_KEY="sk-proj-LY9iZ9ZwF5oan1Pi7GAnT3BlbkFJH5WISY5jC1rXbTeeGaUH";
connection.connect;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
});
var currUser = 0;
var app = express();

// set up ejs view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('base', { title: 'Homepage' });
});

app.get('/addSymptom', function(req, res) {
  res.render('symptom', { title: 'Give your symptoms' });
});

app.get('/addDisease', function(req, res) {
  res.render('disease', { title: 'Give your disease' });
});

app.get('/create', function(req, res) {
  res.render('index', { title: 'Add a new User' });
});

app.get('/main', function(req, res) {
  res.render('main', { title: 'Give your symptoms' });
});

app.get('/chatbot', function(req, res) {
  res.render('chatindex', { title: 'Talk to an AI chatbot' });
});

app.get('/sicksense', function(req, res) {
  res.render('sicksense', { title: 'Show potential diseases' });
});

app.get('/success', function(req, res) {
      res.send({'message': 'User request done'});
});

app.get('/symptomlist', function(req, res) {
  var sql = 'SELECT distinct SymptomName FROM symptoms';

  connection.query(sql, function(err, results) {
    if (err) {
      console.error('Error fetching symptom data:', err);
      res.status(500).send({ message: 'Error fetching symptom data', error: err });
      return;
    }
    res.json(results);
  });
});

app.get('/diseaselist', function(req, res) {
    var sql = 'SELECT distinct DiseaseName FROM diseases';
  //  console.log(sql);
  connection.query(sql, function(err, results) {
    if (err) {
      console.error('Error fetching disease data:', err);
      res.status(500).send({ message: 'Error fetching disease data', error: err });
      return;
    }
//    console.log(results)
    res.json(results);
  });
});

app.post('/addNewSymptom', function(req, res) {
  var symptomname = req.body.symptomname;
  var severity = req.body.severity;
  var disease = req.body.disease;
  var sqlcheck = 'SELECT COUNT(*) FROM symptoms WHERE SymptomName = ? AND DiseaseName = ?';
  var insertquery = `INSERT INTO symptoms (SymptomName, Severity, DiseaseName) VALUES ('${symptomname}', '${severity}', '${disease}')`;
  connection.query(sqlcheck, [symptomname, disease], function(error, results) {
    console.log(results);
    if (results[0]["COUNT(*)"] >= 1) {
      console.error('Symptom and Disease already exist');
      res.status(500).send('Symptom and Disease already exist. Input again!');
      return;
    } else {
  connection.query(insertquery, (err, results2) => {
    if (err) {
      return res.status(500).send('Symptom must not be an empty string.');
    }
    res.send('Symptom added successfully!');
  });}
});
});

app.post('/addNewDisease', function(req, res) {
  var disease = req.body.disease;
  var insertquery = `INSERT INTO diseases (DiseaseName) VALUES ('${disease}')`;
  var sqlcheck = 'SELECT COUNT(*) FROM diseases WHERE DiseaseName = ?';

  connection.query(sqlcheck, [disease], function(error, results) {
    if (results[0]["COUNT(*)"] >= 1) {
      var sql = 'UPDATE diseases SET Rarity = Rarity + 1 WHERE DiseaseName = ?';
      connection.query(sql, [disease], function(err1, results2) {
        if (err1) {
	   res.status(500).send('error');
	   return;
	}
  //      console.log(sql);
        res.send('Disease already exists in database. Rarity Updated!');
        return; });
    } else {
  connection.query(insertquery, function(err, results2) {
//    console.log(results2);
    if (err) {
    	res.status(500).send('error');
	return;
    }
    res.send("Disease added successfully!");
})};
});
});

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
      res.status(500).send('Some required fields are missing!');
      return;
    }
    currUser = userid;
    res.redirect('/main');
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
    var resultpass = JSON.stringify(result[0]['password']);
    var newstr = "";
    var cont = false;
    for (let i = 0; i < resultpass.length; i++) {
         if (cont) { 
		cont = false;
		continue;
	 }
         if (resultpass[i] == '\\') {
		cont = true;
         } else {
		newstr += resultpass[i];
	 }
    };
    var inputpass = JSON.stringify(password)
    if (newstr != inputpass) {
      console.error('Wrong password');
      res.status(500).send('Sorry, wrong Password. Try again!');
      return;
    }
    currUser = userid;
    console.log('Received userID:', currUser);
    res.send("Done!");
  });}
  });
});

app.post('/chat', async function (req, res) {
   const userInput = req.body.message;

   try {
       const completion = await openai.chat.completions.create({
           model: 'gpt-3.5-turbo',
           messages: [{ role: 'user', content: userInput }],
       });

       const completionText = completion.choices[0].message.content;

       res.json({ message: completionText });
   } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'An error occurred' });
   }
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

app.post('/api/update', function(req, res) {
  var userid = currUser;
  var symptom1 = req.body.symptom1;
  var symptom2  = req.body.symptom2;
  var symptom3 = req.body.symptom3;
  var sql = `INSERT INTO diagnosis (userid, s1, s2, s3) VALUES ('${userid}','${symptom1}','${symptom2}','${symptom3}')`;

  console.log(sql);
  connection.query(sql, function(err, results) {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Error symptom', error: err });
      return;
    }
    console.log(results);
    res.send('Next!'); 
});
});

app.get('/api/predict', function(req, res) {
   var sqltry = 'CALL predict_diseases';
   var bestmatch = 'SELECT diseases.DiseaseName FROM diseases JOIN ( SELECT DiseaseName, COUNT(DiseaseName) AS count FROM ( (SELECT symptoms.DiseaseName FROM symptoms JOIN (SELECT diagnosis.s1 FROM diagnosis WHERE diagnosis.DiagnosisID = (SELECT LAST_INSERT_ID())) AS latest ON symptoms.SymptomName = latest.s1) UNION ALL (SELECT symptoms.DiseaseName FROM symptoms JOIN (SELECT diagnosis.s2 FROM diagnosis WHERE diagnosis.DiagnosisID = (SELECT LAST_INSERT_ID())) AS latest ON symptoms.SymptomName = latest.s2) UNION ALL (SELECT symptoms.DiseaseName FROM symptoms JOIN (SELECT diagnosis.s3 FROM diagnosis WHERE diagnosis.DiagnosisID = (SELECT LAST_INSERT_ID())) AS latest ON symptoms.SymptomName = latest.s3) ) AS possible_diseases GROUP BY DiseaseName HAVING count = ( SELECT MAX(incount) FROM ( SELECT DiseaseName, COUNT(DiseaseName) AS incount FROM ( (SELECT symptoms.DiseaseName FROM symptoms JOIN (SELECT diagnosis.s1 FROM diagnosis WHERE diagnosis.DiagnosisID = (SELECT LAST_INSERT_ID())) AS latest ON symptoms.SymptomName = latest.s1) UNION ALL (SELECT symptoms.DiseaseName FROM symptoms JOIN (SELECT diagnosis.s2 FROM diagnosis WHERE diagnosis.DiagnosisID = (SELECT LAST_INSERT_ID())) AS latest ON symptoms.SymptomName = latest.s2) UNION ALL (SELECT symptoms.DiseaseName FROM symptoms JOIN (SELECT diagnosis.s3 FROM diagnosis WHERE diagnosis.DiagnosisID = (SELECT LAST_INSERT_ID())) AS latest ON symptoms.SymptomName = latest.s3) ) AS possible_diseases GROUP BY DiseaseName ) AS sub ) ) AS countdis ON countdis.DiseaseName = diseases.DiseaseName ORDER BY Rarity DESC LIMIT 1';
   var sqlupdate = 'UPDATE diagnosis SET DiseaseName = ('+bestmatch+') WHERE DiagnosisID = (SELECT LAST_INSERT_ID())';

   connection.query(sqltry, function(err, result) {
   if (err) {
     res.send(err);
     return;
   }
   connection.query(sqlupdate, function(err2, result2) {
   if (err2) {
     res.send(err2);
     return;
   }
   });
   res.json(result);
});
});

app.get('/api/noofsymp', function(req, res) {
   connection.beginTransaction(function (transerr) {
   if (transerr) {
      throw transerr;
   }
   var sql = 'CALL Query4';
   connection.query(sql, function(err, result) {
   if (err) {
     connection.rollback(function () {
        res.status(500).send(err);
     });
   }
   connection.commit(function (err) {
     if (err) {
       connection.rollback(function () {
          return;
       })
     }
   });
   console.log(result);
   res.json(result);
  });
});
});

app.get('/api/mostsevere', function(req, res) {
   connection.beginTransaction(function (transerr) {
   if (transerr) {
      throw transerr;
   }
   var sql = 'CALL Query3';
   connection.query(sql, function(err, result) {
   if (err) {
     connection.rollback(function () {
        res.status(500).send(err);
     });
   }
   connection.commit(function (err) {
     if (err) {
       connection.rollback(function () {
          return;
       })
     }
   });
   console.log(result);
   res.json(result);
  });
});
});

app.get('/api/treatment', function(req, res) {
  var sql = 'SELECT MedicineName, Composition, SideEffects, ImageURL FROM medicines JOIN (SELECT MedicineID FROM treatment JOIN (SELECT diagnosis.DiseaseName FROM diagnosis where diagnosis.DiagnosisID=(SELECT LAST_INSERT_ID())) AS predicted_disease ON predicted_disease.DiseaseName = treatment.DiseaseName) AS list_of_id ON list_of_id.MedicineID = medicines.MedicineID';

  connection.query(sql, function(err, results) {
    if (err) {
      console.error('Error fetching medicine data:', err);
      res.status(500).send({ message: 'Error fetching medicine data', error: err });
      return;
    }
    console.log(results);
    res.json(results);
  });
});

app.listen(80, function () {
    console.log('Node app is running on port 80');
});

