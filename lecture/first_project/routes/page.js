const express = require('express');
const router = express.Router();

const {renderJoin,renderMain,renderProfile} = require('../controllers/page');
const {isLoggedIn,isNotLoggedIn} = require('../middlewares');

router.use((req,res,next)=>{
    res.locals.user = req.user;

     // await User.find, 여기서 이와 같이 찾아서 써도 된다. 
     // req.user가 너무 커지면 좋지 않기 때문 (디시리얼라이즈 경우)

    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
     // null 이어도 에러 안나도록 ? 옵션추가
    next();
});
// 라우터들이 쓸 수 있는 공통 변수를 지정하는 곳이다.


router.get('/profile', isLoggedIn,renderProfile);
router.get('/join',isNotLoggedIn,renderJoin);
router.get('/',renderMain); // 메인 화면



// 위의 경우 컨트롤러 라고 부르는데 이들을 분리 할 것임

module.exports = router;
