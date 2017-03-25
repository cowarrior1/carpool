var express = require('express');
var path = require('path');
var exphbs  = require('express-handlebars');
// var multer = require('multer');
// var upload = multer();
var mysql = require('mysql');
var app = express();

//body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Handlebar config
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('./assets'));
app.use('/product_uploads',express.static('product_uploads'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  MySQL Connection

var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Mac1!book2012',
	database: 'carpool'
});


con.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

app.get('/', function(req, res){
  res.render("home");
});

app.post('/insert', function(req, res){
    // var details= {
    //   FName = req.body.FName,
    //   LName = req.body.LName,
    //   Email = req.body.Email,
    //   password = req.body.password,
    //   confirmpassword = req.body.confirmpassword,
    //   contact_number = req.body.contact_number
    // }

  var query = con.query('INSERT INTO userinfo VALUES ?', [req.body.contact_number, req.body.password] , function(err, rows, fields){

// [FName, LName, Email, password, confirmpassword, contact_number], function(err, rows, fields){
    if (err)
    console.log (err);
    else
      console.log('Added');
  });
  res.redirect('/home');

})

app.get('/signup', function(req, res){
  res.render("signup");
})

app.listen(8080, function() {
  console.log("Server is listening on localhost:8080.")
})
