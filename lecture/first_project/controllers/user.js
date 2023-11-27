const User = require('../models/user');

exports.follow = async (req,res,next)=>{
    // req.user.id, req.params.id
    try {
        const user = await User.findOne({where : {id : req.user.id}});

        if(user){

            await user.addFollowing(parseInt(req.params.id,10)) ; // 문자열을 숫자로 변경
            res.send('success');
        }
        else{
            // db 에 유저가 없는경우 안전장치
            res.status(404).send('no user');
        }
        
        
    }catch(error){
        console.error(error);
        next(error);

    }
}