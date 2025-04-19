// Import the mysql2 library to enable communication with a MySQL database.
const mysql = require('mysql2');

// host: is running on that version.
// root for user and password on the database for the MySql user
// database imported on the file
// port: is the namber to connect to the MySwl server.
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'dog_adoption',
    port: 8889
});

db.connect((err) => {

    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    
    console.log('Connected to the dog_adoption database as id ' + db.threadId);
});
    
module.exports = db;