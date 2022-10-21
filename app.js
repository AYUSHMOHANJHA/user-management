const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5002;

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// Parse application/json
app.use(bodyParser.json());

// Static Files
app.use(express.static('public'));

// Templating Engine
app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');


//connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

// connect to DB

pool.getConnection((err,connection) => {
    if(err) throw err; // when not connected
    console.log('conected as ID: ' + connection.threadId);
});

const routes = require('./server/routes/user');
app.use('/', routes);



app.listen(port, () => console.log(`Listening on port ${port}`));
