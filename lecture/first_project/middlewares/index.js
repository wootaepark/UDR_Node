exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){ // passport 를 통해서 로그인을 했나?
        next();
    }
    else{
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){ // passport를 통해서 로그인을 안했나?
        next();
    }
    else{
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`); // localhost:8001?error=메시지
    }
};
