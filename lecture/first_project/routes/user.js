const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middlewares');
const {follow} = require('../controllers/user');

router.post('/:id/follow',isLoggedIn, follow); // 팔로우

// 위의 아이디에 팔로우하는 대상의 아이디가 들어감


module.exports = router;