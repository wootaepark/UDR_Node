const passport = require('passport');
const {Strategy : KakaoStrategy} = require('passport-kakao');
const User = require('../models/user');

module.exports = () =>{
    passport.use(new KakaoStrategy({
        clientID : process.env.KAKAO_ID,
        callbackURL : '/auth/kakao/callback',
    },async(accessToken, refreshToken,profile, done)=>{ 
        // 앞선 local 과 다른 구조, api 호출 시에 acceptToekn, refreshToken 이 필요하다. 
        console.log('kakao profile',profile);
        try{
            const exUser = await User.findOne({
                where : {snsId : profile.id, provider : 'kakao'}
            });
            if(exUser){
                done(null,exUser);
            }// 로그인

            else{
                // 회원가입
                const newUser = await User.create({
                    email : profile._json?.kakao_account?.email,  // 이 구조는 자꾸 바뀐다.
                    nick : profile.displayName,
                    snsId : profile.id,
                    provider : 'kakao',
                })
                done (null,newUser);

            }
        }
        catch(error){
            console.error(error);
            done(error);
        }
    }));


};