const express = require('express');
const router = express.Router();

const {renderJoin,renderMain,renderProfile} = require('../controllers/page');
const {isLoggedIn,isNotLoggedIn} = require('../middlewares');

router.use((req,res,next)=>{
    res.locals.user = req.user;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followingIdList = [];
    next();
});
// 라우터들이 쓸 수 있는 공통 변수를 지정하는 곳이다.


router.get('/profile', isLoggedIn,renderProfile);
router.get('/join',isNotLoggedIn,renderJoin);
router.get('/',renderMain); // 메인 화면



// 위의 경우 컨트롤러 라고 부르는데 이들을 분리 할 것임

module.exports = router;
