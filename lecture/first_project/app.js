const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

// process.env.COOKIE_SECRET 없음
dotenv.config(); // .env 파일의 정보가 process.env 안으로 들어간다.
// process.env.COOKIE_SECRETE 있음 여기서부터 process.env 가 생성되어 쓸 수 있다.
const pageRouter = require('./routes/page')  // 페이지 라우팅 파일

const app = express();

app.set('port',process.env.PORT || 8001);
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
    watch:true,
});


app.use(morgan('dev')); // 로깅 개발모드 배포시에는 'combined'
app.use(express.static(path.join(__dirname,'public'))); // public 폴더를 프런트에서 자유롭게 접근 가능케함
app.use(express.json()); // json 요청받을 수 있도록 함
app.use(express.urlencoded({extended:false})); // form 요청받을 수 있도록 함
app.use(cookieParser(process.env.COOKIE_SECRET)); 
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly : true, // 자바스크립트에서 접근하지 못하게 (보안 도움)
        secure : false, // https 적용시 true 로 변경
    }
}));

app.use('/',pageRouter);
app.use((req,res,next)=>{ // 404 not found 응답을 위함
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
}); // 없는 라우터 요청시 처리할 코드

app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err:{}; // 배포모드가 아니면 에러 가져옴 , 에러로그 서비스로 넘김
    res.status(err.status||500);
    res.render('error'); // view 폴더 안의 error.html이 에러 로그 대신 전송이 될 것이다.
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 대기중');
});



