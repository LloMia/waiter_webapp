const express = require('express');
const app = express();
const session = require('express-session')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const waiterRoutes = require('./waiter');
const mongoose = require('mongoose');
const Models = require('./models');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/waiters')
const routes = waiterRoutes(models);
const flash = require('express-flash');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.engine('handlebars', exphbs({
    defaultLayout: "main"
}));
app.set('view engine', 'handlebars');
app.use(session({
      secret :'keyboard cat',
      cookie : {maxAge: 60000 * 30},
}));
app.use(flash());

app.get('/', function(req, res) {
    res.redirect('/waiter');
})

app.get('/waiter', routes.landingpage);
app.post('/waiter', routes.landingpage);
// app.get('/index', routes.selectedDays);
app.get('/waiter/:user', routes.homepage);

app.post('/waiter/:user', routes.selectedDays);
app.get('/admin', routes.admin);
app.get('/admin', routes.reset);
app.post('/admin', routes.reset);
app.get('/reset', routes.reset);
app.post('/reset', routes.reset);
app.get('/', function(req, res) {
    res.redirect('index');
})
app.set('port', process.env.PORT || 3005);
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
