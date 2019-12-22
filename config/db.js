const mysql = require('mysql2');

const db = {};

db.connection = mysql.createConnection({
    connectionLimit: 5,
    host: 'localhost',
    user: 'olegarxs',
    database: 'ad_db',
    password: '6812387',
    port: '3306'
});

db.connection.connect(err =>{
    if(err){
        console.log(err);
    }else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
})


db.findUserByUsername = (user, successCallback, failureCallback) => {
    var sqlQuery = `Select * from users WHERE username="${user.username}"`;
    db.connection.query(sqlQuery, function (err, rows, fields, res) {
        if (err) {
            failureCallback(err);
            return;
        }
        if (rows.length > 0) {
            successCallback(rows[0])
        } else {
            failureCallback(null)
        }
})};


db.findUserById = (user, successCallback, failureCallback) => {
    var sqlQuery = `Select * from users WHERE id="${user.id}"`;
    db.connection.query(sqlQuery, function (err, rows) {
        if (err) {
            failureCallback(err);
            return;
        }
        if (rows.length > 0) {
            successCallback(rows[0])
        } else {
            failureCallback('User not found.');
        }
})};

db.addUser = (user) => {
    const createProfile = `INSERT INTO profiles (first_name, last_name, photo, birthday) 
        VALUES ('${user.firstName}', '${user.lastName}', '${user.photo}', '${user.birthDay}')`;
    const maxProfileId = `SELECT MAX(id) FROM profiles`;
    
    db.connection.query(createProfile, (err,res) =>{
        if(err){
            return console.log(err)
        }
        console.log('Its ok');
        
    });
    db.connection.query(maxProfileId, (err, rows) =>{
        if(err){
            console.log(err);
        }else{
            let obj = rows[0];
            let key = Object.keys(obj);
            db.connection.query(`INSERT INTO users (username, password, email, profile_id)
                 VALUES ('${user.username}', '${user.password}', '${user.email}', '${obj[key[0]]}')`);
        }
    }); 
}

module.exports = db;