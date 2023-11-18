const User = require('../models/user'); 
const bcrypt = require('bcrypt');

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

exports.login = () =>{

};

exports.logout = () =>{

};