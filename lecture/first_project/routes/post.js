const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { afterUploadImage, uploadPost } = require('../controllers/post');
const { isLoggedIn , isNotLoggedIn} = require('../middlewares');

const router = express.Router();

try{
    fs.readdirSync('uploads'); // uploads 라는 폴더가 있는지 확인

}catch(error){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');// 없는 경우 폴더 만들기
    fs.mkdirSync('uploads');  // 서버 재시작시 uploads라는 폴더가 만들어진다.
}

const upload = multer({
    storage : multer.diskStorage({
        destination(req,file,cb){
             cb(null,'uploads/'); //저장 공간 지정
        },
        filename(req,file,cb){
            const ext = path.extname(file.originalname); 
            // 이미지.png -> 이미지20231111.png (이미지 중복 방지 시간 붙임)

            cb(null, path.basename(file.originalname, ext)+Date.now() + ext); 
            // 파일 이름을 분리하고 사이에 날짜 숫자를 넣고 다시 확장자를 붙이는 형식
        },
    }),
    limits : {fileSize : 20 * 1024 * 1024},
}); // multer 사용 설정 


router.post('/img',isLoggedIn,upload.single('img'), afterUploadImage);
// 로그인 된 상태에서만 
// (main.html 의 img 문자와 같아야 한다.)


const upload2 = multer(); // 다른 설정의 multer를 사용하기위해 다른 변수를 이용함

router.post('/',isLoggedIn, upload2.none(), uploadPost); // 게시글 올릴 때는 이미지를 올리지 않음

module.exports=router;