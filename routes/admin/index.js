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

    connection.query('select * from categories', (err, category) => {
        
        if(err) {
            return console.log(err);
        }
        res.render('./admin/allCategory',{category});
    })
});


router.get('/addCategory', (req,res) =>{
    connection.query('select * from categories where parent_id IS null', (err, category) => {
        
        if(err) {
            return console.log(err);
        }
        res.render('./admin/addCategory',{category});
    })      
});

router.post('/addCategory',(req,res) =>{
    
    const title = req.body.title;
    const parent = req.body.parent;
      
    connection.query(`select * from categories where title = "${parent}"`, (err, data) => {
        connection.query(`INSERT INTO categories (title, parent_id) VALUES ('${title}', "${data[0].id == null? null:data[0].id }")`, (err, result) => {
            if(err){
                return console.log(err);
            }
            res.redirect('./');
        })
})});

router.get('/users', (req, res) => {
    res.render('./admin/users');
});




module.exports = router;