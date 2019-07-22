const mysql = require('mysql2');

const db = {};

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ad_db',
    password: '',
    port: '3307'
});

db.findUserByUsername = (user, successCallback, failureCallback) => {
    var sqlQuery = `Select * from users WHERE username="${user.username}"`;
    connection.query(sqlQuery, function (err, rows, fields, res) {
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


db.findUserById = (user, successCallback, failureCallback) => {
    var sqlQuery = `Select * from users WHERE id="${user.id}"`;
    connection.query(sqlQuery, function (err, rows) {
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
    
    connection.query(createProfile, (err,res) =>{
        if(err){
            return console.log(err)
        }
        console.log('Its ok');
        
    });
    connection.query(maxProfileId, (err, rows) =>{
        if(err){
            console.log(err);
        }else{
            let obj = rows[0];
            let key = Object.keys(obj);
            connection.query(`INSERT INTO users (username, password, email, profile_id)
                 VALUES ('${user.username}', '${user.password}', '${user.email}', '${obj[key[0]]}')`);
        }
    }); 
}

module.exports = db;