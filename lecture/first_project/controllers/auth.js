const User = require('../models/user'); 
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.join = async (req,res,next) =>{
    const {nick, email, password} = req.body; // 구조분해 할당
    try{
        const exUser = await User.findOne({where : {email}});
        if(exUser){
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12); // 숫자 높을수록 보안 up 속도 down
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/'); 
    }

    catch (error){
        console.error(error);
        next(error);
    }
};

// POST /auth/login
exports.login = (req, res, next) =>{
    passport.authenticate('local', (authError,user,info)=>{
        if (authError){
            console.error(authError);
            return next(authError);

            // 서버실패의 경우
        }
        if (!user){ // 로직 실패
            return res.redirect(`/?loginError=${info.message}`);
            // 상황에 맞는 에러 메시지 출력
        }

        return req.login(user,(loginError)=>{  // 로그인 성공
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }

            return res.redirect('/');
        });
    })(req,res,next); // 미들웨어 확장 패턴
};



exports.logout = (req,res,next) =>{ // 세션쿠키가 있다. {121213123 : 1} 로그 아웃시 없애버림
    // 브라우저에서 쿠키는 계속 남아 있을 수 있다. 즉 connect.sid 가 남아 있어도 세션 객체가 없어졌기 때문에
    // 로그인이 안된다. 로그아웃의 원리
        req.logout(()=>{
            res.redirect('/');
        })

};