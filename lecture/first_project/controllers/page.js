exports.renderProfile = (req,res,next)=>{
    // 서비스를 호출, render를 이용하면 페이지를 가져온다.

    res.render('profile', {title: '내 정보 - NodeBird'});
};
exports.renderJoin= (req,res,next)=>{

    res.render('join',{title: '회원 가입 - NodeBird'});
};
exports.renderMain = (req,res,next)=>{

    res.render('main',{
        title : 'NodeBird',
        twits : [], 
    });
};
// 프론트에 넘기고 싶은 정보를 적는 곳이다.
// 라우터 -> 컨트롤러 호출 -> 서비스(요청, 응답을 모름) 호출