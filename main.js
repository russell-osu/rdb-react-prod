// Code has been inspired by the model code in CS 340 (although altered significantly)

/*  
    Uses express, dbcon for database connection, body parser to parse form data  
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.set("port", process.env.PORT || 3001);
app.set('mysql', mysql);

app.use(express.static('public'));
app.use( express.static( `${__dirname}/build` ) );






app.use('/restaurant', require('./restaurant.js'));
app.use('/menu_item', require('./menu_item.js'));
app.use('/visit', require('./visit.js'));
app.use('/user', require('./user.js'));
app.use('/restaurant_review', require('./restaurant_review.js'));
app.use('/menu_item_review', require('./menu_item_review.js'));
app.use('/cuisine', require('./cuisine.js'));
app.use('/restaurant_cuisine', require('./restaurant_cuisine.js'));
app.use('/user_visit', require('./user_visit.js'));

const path = require('path');
app.get('*', (req, res)=>{  res.sendFile(path.join(__dirname, './build/index.html'));})


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});



app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
