var express = require('express');
var app = express();

var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
const waiterRoutes = require('./waiter');
const mongoose = require('mongoose');
const Models = require('./models');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/waiters')
const routes = waiterRoutes(models);
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(express.static('public'));
app.engine('handlebars', exphbs({
    defaultLayout: "main"
}));

app.set('view engine', 'handlebars');

// app.get('/index', routes.selectedDays);
app.get('/index/:user', routes.homepage);
app.post('/index/:user', routes.selectedDays);
app.get('/', function(req, res) {
    res.redirect('index');
})
app.set('port', process.env.PORT || 3005);
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
