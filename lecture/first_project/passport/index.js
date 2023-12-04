const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () =>{
    passport.serializeUser((user,done)=>{ // user === exUser
        done(null,user.id); // user.id 대신 user 를 저장하게 되면 세션 쿠키 포함해서 저장한다.
    });
    // 세션 객체 {12123432 : 1}  {세션 쿠키 : 유저 아이디} -> 메모리에 저장  (메모리 과부하 발생 가능 
    // 따라서 유저 아이디만 추출해서 저장)

    passport.deserializeUser((id, done)=>{ // id : 1
        User.findOne({ // 모델을 통해 해당 id 의 유저를 찾음
            where : {id},
            include : [
                {
                    model : User,
                    attributes : ['id','nick'],
                    as :'Followers',
                },// 팔로잉
                {
                    model : User,
                    attributes : ['id','nick'],
                    as :'Followings',
                }, // 팔로워
            ]
        
        })
        .then((user)=>done(null,user)) // 위 id를 가지고 온 user 가 req.user가 된다. 
        .catch(err=>done(err));
    });

    local();
    kakao();

   
}
// 이 함수가 app.js 에서 불러와 지는 것이다. 