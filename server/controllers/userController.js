const mysql = require("mysql2");

//connection pool
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// view users
exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // when not connected
    console.log("conected as ID: " + connection.threadId);

    // user the connection
    connection.query("SELECT * FROM user_management.user", (err, rows) => {
      // when done with the connection, release it
      connection.release();
      if (!err) {
        res.render("home", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    });
  });
};

// find user by search
exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err; // when not connected
    console.log("conected as ID: " + connection.threadId);

    let searchTerm = req.body.search;

    // user the connection
    connection.query("SELECT * FROM user_management.user WHERE first_name LIKE ? OR last_name LIKE ?", ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
      // when done with the connection, release it
      connection.release();
      if (!err) {
        res.render("home", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    });
  });
};
