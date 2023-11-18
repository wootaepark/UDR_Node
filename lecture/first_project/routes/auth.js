const express = require('express');
const router = express.Router();
const passport = require('passport');

const {isLoggedIn, isNotLoggedIn} = require('../middlewares');
const {join,login,logout} = require('../controllers/auth')

//POST /auth/join
// auth + /join 이 된다. 아래의 경우
router.post('/join',isNotLoggedIn,join); 
//POST /auth/join
router.post('/login',isNotLoggedIn,login); 
//POST /auth/join
router.post('/logout',isLoggedIn,logout); 


module.exports = router;