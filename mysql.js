var mysql = require('mysql');

function connect_to_db() {
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306, // Thay bằng cổng chính xác
        user: 'root',
        password: 'root',
        database: 'smart_home'
    });

    connection.connect((err) => {
        if (err) {
            console.error('Database connection failed: ', err.stack);
            return;
        }
        console.log('Connected to database.');
    });

    return connection;
}

module.exports = connect_to_db;
