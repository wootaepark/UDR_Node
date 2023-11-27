const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); // 로깅 모듈
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const {sequelize} = require('./models'); // 모델 폴더의 sequelize와 연결 
const passport = require('passport');


// process.env.COOKIE_SECRET 없음
dotenv.config(); // .env 파일의 정보가 process.env 안으로 들어간다.
// process.env.COOKIE_SECRETE 있음 여기서부터 process.env 가 생성되어 쓸 수 있다.
const pageRouter = require('./routes/page');  // 페이지 라우팅 파일
const passportConfig = require('./passport');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post'); 
const userRouter = require('./routes/user'); 

const app = express(); //express() 는 object 즉 객체이다.

passportConfig();

app.set('port',process.env.PORT || 8001);
app.set('view engine','html');
nunjucks.configure('views',{
    express:app,
    watch:true,
});

sequelize.sync({force : false}) // 개발 시에만 force : true를 통해 서버 실행마다 db를 지웠다가 다시 생성함
    .then(()=>{
        console.log('데이터베이스 연결 성공');
    })
    .catch((err)=>{
        console.error(err);
    })

    // 이 코드 이후에 db 관련 코드를 작성해야 함 (sync 를 위함) .


app.use(morgan('dev')); // 로깅 개발모드 배포시에는 'combined'
app.use(express.static(path.join(__dirname,'public'))); // public 폴더를 프런트에서 자유롭게 접근 가능케함
app.use('/img',express.static(path.join(__dirname,'uploads')));
app.use(express.json()); // json 요청받을 수 있도록 함, req.body를 ajax json 요청으로부터
app.use(express.urlencoded({extended:false})); // form 요청받을 수 있도록 함, req.body를 form 으로부터
app.use(cookieParser(process.env.COOKIE_SECRET));  // {connect.sid :121323123445}
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly : true, // 자바스크립트에서 접근하지 못하게 (보안 도움)
        secure : false, // https 적용시 true 로 변경
    }
}));

// 아래 두 줄의 코드는 반드시 session 미들웨어 아래에 있어야 한다. (세션을 사용하기 때문이다.)  
app.use(passport.initialize()); // req.user, req.login, req.isAuthenticated, req.logout 이 여기부터 나온다.
app.use(passport.session()); // connect.sid라는 이름으로 세션 쿠키가 브라우저로 전송된다.
// 브라우저 connect.sid = 121323123445 이런식으로 쿠키 저장 (이게 서버로 오면 쿠키 파서가 분석 후 객체로 만듬)


app.use('/',pageRouter);
app.use('/auth',authRouter);
app.use('/post',postRouter);
app.use('/user',userRouter);


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



