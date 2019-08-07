const express = require('express');
const app = express();
// const mongoose = require('mongoose');
const expressHbs = require("express-handlebars");
const mysql = require('mysql2');
const passport = require('passport');
const home = require('./routes/home');
const admin = require('./routes/admin/index')
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const db = require('./config/db')
// //connect MongoDB
// mongoose
//     .connect(db)
//     .then(() => console.log('MongoDB Connected'))
//     .catch(err => console.log(err));

const connection = db.connection;



// connection.connect(err =>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Подключение к серверу MySQL успешно установлено");
//     }
// })

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.use(
    session({
        secret: 'fdsfsdf',
        store: new FileStore(),
        cookie:{
            path:'/',
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        },
        resave: false,
        saveUninitialized: false
    })
);

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());


app.use('/', home);
app.use('/admin',admin)
app.set('view engine', 'hbs');

app.engine("hbs", expressHbs(
    {
        layoutsDir: "views", // папка расположения шаблонов
        defaultLayout: "index", // шаблон
        extname: "hbs",
        partialsDir: "./views/partials"
    }
))

app.listen(3000, () => {
    console.log('Server is running on 3000 port');
})