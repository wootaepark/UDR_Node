const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () =>{
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser((id, done)=>{
        User.findOne({where : {id}})
        .then((user)=>done(null,user))
        .catch(err=>done(err));
    });

    local();

   
}
// 이 함수가 app.js 에서 불러와 지는 것이다. 