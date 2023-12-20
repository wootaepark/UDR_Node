const User = require('../models/user');

exports.follow = async (req,res,next)=>{
    // req.user.id, req.params.id
    try {
        const user = await User.findOne({where : {id : req.user.id}});

        if(user){

            await user.addFollowing(parseInt(req.params.id,10)) ; // 문자열을 숫자로 변경
            res.send('success'); // res 이후에는 아래 코드가 진행되지 않는다.
        }
        else{
            // db 에 유저가 없는경우 no user 보냄
            res.status(404).send('no user');
        }
        
        
    }catch(error){
        console.error(error);
        next(error); // 에러 미들웨어 이다.

    }
}