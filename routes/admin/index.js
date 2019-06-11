const express = require('express');
const router = express.Router();
const ad = require('../../models/Advertisement');
const hbs = require('hbs');
const expressHbs = require("express-handlebars");
const handlebars = require('handlebars');
const mysql = require('mysql2');

const Category = require('../../models/Category');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'ad_db',
    password: '',
    port: '3307'
});


router.get('/',(req, res) => {
    if(req.isAuthenticated()){
        const user = req.user;
        connection.query('select * from categories', (err, category) => {        
            if(err) {
                return console.log(err);
            }
            res.render('./admin/allCategory',{category,user});
        })
    }else{
        res.redirect('/');
    }
    
});

router.post('/delete/:id', (req, res) => {
    const id = req.params.id;

    connection.query(`delete from categories where id=${id}`, (err, data) => {
        if(err) {
            console.log(err);
        }
        res.redirect('../');
    })
});

router.get('/addCategory', (req,res) =>{
    const user = req.user;
    connection.query('select * from categories where parent_id IS null', (err, category) => {
        if(err) {
            return console.log(err);
        }
        res.render('./admin/addCategory',{category,user});
    })      
});

router.post('/addCategory',(req,res) =>{
    
    const title = req.body.title;
    const parent = req.body.parent;
      
    connection.query(`select * from categories where title = "${parent}"`, (err, data) => {
        if(data[0] == null){
            connection.query(`INSERT INTO categories (title) VALUES ('${title}')`, (err, result) => {
                if(err){
                    return console.log(err);
                }
                res.redirect('./');
            }) 
        }else{
            connection.query(`INSERT INTO categories (title, parent_id) VALUES ('${title}', "${data[0].id == null? null:data[0].id }")`, (err, result) => {
                if(err){
                    return console.log(err);
                }
                res.redirect('./');
            })
        } 
})});

router.get('/users', (req, res) => {
    const user = req.user;
    connection.query('select id, username, email, profile_id from users', (err, users) => {
        res.render('./admin/users',{users, user});
    })
});

router.get('/ad', (req, res) => {
    const user = req.user;
    connection.query('select * from posts', (err, posts) => {
        if(err){
           return console.log(err);
        }
        res.render('./admin/ad', {posts, user})

    })
})




module.exports = router;