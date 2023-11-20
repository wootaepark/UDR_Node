const express = require('express');
const router = express.Router();
const passport = require('passport');

const {isLoggedIn, isNotLoggedIn} = require('../middlewares');
const {join,login,logout} = require('../controllers/auth')

//POST /auth/join
// auth + /join 이 된다. 아래의 경우
router.post('/join',isNotLoggedIn,join); 
//POST /auth/login
router.post('/login',isNotLoggedIn,login); 
//POST /auth/logout
router.get('/logout',isLoggedIn,logout); 


// /auth/kakao
router.get('/kakao',passport.authenticate('kakao')); // 카카오톡 로그인 화면으로 redirect

// /auth/kakao -> 카카오톡로그인화면 -> /auth/kakao/callback (두번 리다이렉트 되는 구조)

// /auth/kakao/callback  <- 카카오 아이디 비번 입력시 여기로 리다이렉트를 해준다.
router.get('/kakao/callback', passport.authenticate('kakao',{
    failureRedirect : '/?loginError=카카오로그인 실패',

}),(req, res)=>{
    res.redirect('/');
});



module.exports = router;