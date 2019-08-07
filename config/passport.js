// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const keys = require('../config/keys');
const db = require('./db');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

// const opts ={};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = keys.secretOrKey;

passport.serializeUser((user,done) => {
    console.log('Сериализация', user)
    done(null, user.id);
});

passport.deserializeUser((id,done) => {
    console.log('Десериализация', id);
    db.findUserById({id:id}, user =>{
        if(!user){
            done(null, null);
        }else {
            done(null, user);
        }
    })
    
});

passport.use(new LocalStrategy({usernameField: 'username'},
(username, password, done) => {
        db.findUserByUsername({username: username}, res => {
            let user = res;
            if(user.password === password){
                console.log("Its OK"); 
                return done(null, user)
            } else {
                return done(null, false);
            }});
}));