const passport = require('passport');
const {Strategy : LocalStrategy } = require('passport-local'); // 최신문법
//const LocalStrategy = require('passport-local').Strategy; 기존방식
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports=()=>{
    passport.use(new LocalStrategy({
        usernameField : 'email', // req.body.email 를 usernameFiled로 하겠다.
        password : 'password', // req.body.password 를 password로 하겠다.
        passReqToCallback : false, // true 인 경우 아래 async 함수에 req 인자가 들어감
        

    },
    async(email,password,done)=>{ // done(서버실패, 성공유저, 로직실패)
        // 이 함수에서 로그인을 시켜도 되는지 안되는지 판단.
        try {
            const exUser = await User.findOne({where : {email}});
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password); 
                // 사용자 입력 비밀번호와 db 저장 비밀번호가 일치하는지 판단하는 bcrypt
                if(result){
                    done(null,exUser); // 성공한 경우
                }else{ 
                    done(null, false, {message : '비밀번호가 일치하지 않습니다.'});
                }
            }
            else{
                done(null, false, {message : '가입되지 않은 회원 입니다.'});
            }
        }catch(error){    
            console.error(error);
            done(error); // 서버 실패 전달 (컴파일 에러, db 에러, 서버실패 등)
        }



    }));

};

// 여기서 로그인을 시켜도 되는지 안되는지 판단을 해준다,
// 만약 로그인을 시켜도 되는 경우 auth.js의 post 함수로 돌아간다.