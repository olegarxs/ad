const express = require('express');
const router = express.Router();
// const ad = require('../models/Advertisement');
const hbs = require('hbs');
const expressHbs = require("express-handlebars");
const handlebars = require('handlebars');
const mysql = require('mysql2');
const HandlebarsIntl = require('handlebars-intl');
const db = require('./../config/db');
const passport = require('passport');





// router.use(
//     session({
//         secret: 'fdsfsdf',
//         store: new FileStore(),
//         cookie:{
//             path:'/',
//             httpOnly: true,
//             maxAge: 60 * 60 * 1000
//         },
//         resave: false,
//         saveUninitialized: false
//     })
// );

HandlebarsIntl.registerWith(handlebars);
// require('./../config/passport');
// router.use(passport.initialize());
// router.use(passport.session());
// const Category = require('../models/Category');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ad_db',
    password: '',
    port: '3307'
});



router.get('/', (req, res) => {
    let list = [];
    connection.query('Select * from categories',(err, result, fields)=>{
        for (let i = 0; i < result.length; i++) {
            let el;
            if(result[i].parent_id == null){
             list.push(
                 el = {
                    id: result[i].id,
                    name: result[i].title, 
                    subcat: () => {
                        let arr = [];
                        let el2;
                        for (let j = 0; j < result.length; j++) {
                            if(result[j].parent_id == result[i].id){
                                arr.push(
                                    el2 = {
                                        name:  result[j].title,
                                        id: result[j].id
                                }); 
                            }
                        }
                        return arr;
                    }
                });
            }
        }
        if(req.isAuthenticated()){
            const user = req.user;
            res.render('category', {list, user});
        }else{
            res.render('category', {list});
        }
    });
});


router.get('/cat/:id',(req, res) =>{
    const id = req.params.id;
    connection.query(`Select * from posts WHERE cat_id=${id}`,(err, data) =>{
        connection.query(`Select * from categories WHERE id=${id}`,(err, cat) =>{
            const nameCategory = cat[0].title;
            
            if(req.isAuthenticated()){
                const user = req.user;
                res.render('eachCat',{data,nameCategory,id,user});
            }else{
                res.render('eachCat',{data,nameCategory,id});
            }
        })
    });
});

router.get('/post/:id', (req, res) =>{
    const id = req.params.id;
    connection.query(`Select * from posts WHERE id=${id}`,(err, data) =>{
        const post = data[0];
        const user_id = data[0].user_id
        connection.query(`Select * from users WHERE id=${user_id}`,(err, users) =>{
            const userPost = users[0];
            

            if(req.isAuthenticated()){
                const user = req.user;
                res.render('post',{post,userPost,user});
            }else{
                res.render('post',{post,userPost});
            }
        });
    });
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, user) {
        if (err) { return next(err); }
        if (!user) { return res.send('Укажите правильный имэил или пароль'); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/');
        });
      })(req, res, next);
})

router.get('/registration', (req, res) => {
    if(req.isAuthenticated()){
        res.redirect('/');
    }else{
        res.render('registration');
    }
})


router.post('/registration', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const birthDay = req.body.birthDay;

    db.addUser({
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
        birthDay: birthDay    
    })
    res.redirect('/login');


})

router.get(
    '/current',
    (req, res, next) => {
        connection.query('select MAX(id) from posts', (err, data) => {
            console.log(data);
            // res.redirect(`/post/${data[data.length-1].id}`); 
        })
});

router.get('/profile/:id', (req, res) => {
    connection.query(`select * from profiles where id="${req.user.profile_id}"`,(err, data) => {
        if(err){
            console.log(err);
        } else {
            const profile = data[0];
            const user = req.user;
            res.render('profile', {profile, user});    
        }
    })    
});

router.get('/addPost/cat/:id', (req, res) => {
    req.session.catId = req.params.id;
    console.log(req.session.idid);
    catIdD = req.params.id;
    res.render('addPost');
})

router.post('/addPost', (req, res) => {
    const title = req.body.title;
    const catId = req.session.catId;
    const userId = req.user.id;
    const description = req.body.description;
    const action = req.body.action;
    const cost = req.body.cost;
    
    connection.query(`INSERT INTO posts (cat_id, title, user_id, description, action, cost) 
        VALUES ('${catId}', '${title}', '${userId}', '${description}', '${action}', ${cost})`,
        (err,data)=> {
            if(err){
                console.log(err)
            }
        connection.query('select * from posts', (err, data) => {
            res.redirect(`/post/${data[data.length-1].id}`); 
        })
    });
    

})

module.exports = router;