const User = require('../models/user');
const Post = require('../models/post');

exports.renderProfile = (req,res,next)=>{
    // 서비스를 호출, render를 이용하면 페이지를 가져온다.

    res.render('profile', {title: '내 정보 - NodeBird'});
};
exports.renderJoin= (req,res,next)=>{

    res.render('join',{title: '회원 가입 - NodeBird'});
};
exports.renderMain = async (req,res,next)=>{

    try{
        const posts = await Post.findAll({

            include : { // 사용자 정보 추출
                model : User,
                attributes : ['id', 'nick'],
            },

            // 정렬
            order: [['createdAt','DESC']],// 최신순 정렬

        });
        res.render('main',{
            title : 'NodeBird',
            twits : posts, 
    });

    }
    catch(error){
        console.error(error);
        next(error);    
    }
    

    
};
// 프론트에 넘기고 싶은 정보를 적는 곳이다.
// 라우터 -> 컨트롤러 호출 -> 서비스(요청, 응답을 모름) 호출