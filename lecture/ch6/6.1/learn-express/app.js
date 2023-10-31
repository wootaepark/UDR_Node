const { error } = require('console');
const express = require('express') // express 모듈을 가져온다.
// express 또한 내부에서 http 메서드를 쓰고 있다.

const path = require('path');
// 아래의 path.join 함수를 쓰기위해 path 모듈을 불러옴

const morgan=require('morgan');
const cookieParser=require('cookie-parser');


const app = express(); // app을 하나 가져옴


app.set('port',process.env.PORT||3000); // port 라는 속성을 3000으로 만듬
// 이때 process.env를 많이 쓸것인데 기본적으로 port는 process.env.PORT를 입력하지 않으면 3000


app.use(morgan('dev'));
//app.use(morgan('combined')); // 배포 시 combined 개발 시에는 dev 보통 씀
app.use(cookieParser('password'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//app.use(bodyParser.raw()); // 바이너리 데이터
//app.use(bodyParser.text()); // 문자열 

// raw, text는 잘 안쓰이기 때문에 express 에서 뺌




/*app.use('/',(req,res,next)=>{ 
    console.log('1 요청 실행');
    if(true){
        next('route'); // 다음 라우터 실행 

    }
    else{
        next(); // 계속해서 해당 미들웨어의 코드 실행 
    }    
},(req,res)=>{
    console.log('실행되나요?');
})


app.use('/',(req,res,next)=>{ // '/' 생략 가능
   console.log('실행 됩니다');
},
 /*(req,res,next)=>{
    try{
        console.log(abcabc);// 임의로 error 발생
    }catch(error){
        next(error); // 에러발생 시 실행되는 catch 문
    }
}*/
/*(req,res,next)=>{
    throw new Error('에러 발생함');
}
)
*/ 



app.use('/about',(req,res,next)=>{
    console.log('about경로 요청입니다.');
    next();
})
// 이 부분에서 매개변수를 포함한 함수가 미들웨어 이고
// 그 미들웨어를 app.use에 장착을 한 것이다. 
// app.use는 next를 이용하여 지정된 장소로 옮기는 미들웨어 역할을 부여 가능



app.get('/',(req,res,next)=>{

    //req.body 

    //req.body.name; // 클라이언트에서 'name'을 보냈으면 그 데이터의 body를 나타낸다.




    /*req.cookies // {mycookie : 'test'}, cookie가 있으면 여기 안에 알아서 넣어준다.
    req.signedCookies;
    res.cookie('name',encodeURIComponent(name), {
        expires: new Date(),
        httpOnly : true,
        path : '/',
    })// 쿠키 관련 조작
    res.clearCookie('name',encodeURIComponent(name), {
        httpOnly : true,
        path : '/',
    })// 쿠키 삭제

    */

    res.sendFile(path.join(__dirname,'./index.html')); // 여기서 응답 보내고 끝남
   // res.send('안녕하세요'); // 그런데 한번 더 보내려고 하는 것임
    //res.json({'hello':'me'}); 
   // res.setHeader('Content-Type','text/html');
    //res.status(200).send('안녕하세요');

    //res.json({hello:'my friend'}); // 응답을 보낼 뿐이지 함수 자채를 종료하지는 않는다.
    //console.log('hello'); // 실행이 된다.
});

app.post('/',(req,res)=>{
    res.send('hello express'); // post 요청 시 해당 문자 출력
});

// 위처럼 http에서 처럼 if 문 쓰지 않고 바로 메소드 별로 구별하여 사용할 수 있는 장점

app.get('/about',(req,res)=>{
    res.send('Hello Express');  
});

// app.use 다음에 실행되는 코드



app.get('/category/Javascript',(req,res)=>{
    res.send(`Hello Javascript`);
})
// 위 둘의 경우 라우트 매개변수를 쓰는 경우와 쓰지 않는 경우 모두에 Javascript라우터로 이동하면 
// express의 특성에 따라 맨 위의 코드가 실행되어진다.

app.get('/category/:name',(req,res)=>{
    res.send(`Hello wildcard`);
    
     // 위 : name을 category/ 다음에 입력받으면 해당 매개변수에 해당하는 데이터를 
     // 이 미들웨어에서 사용 가능하다.


}) // 와일드 카드 (라우트 매개변수)는 다른 라우터, 미들웨어 보다 아래 있어야 에러 발생 확률 down


//app.get('*',(req,res)=>{
    //res.send('Hello Everybody');  // next 생략한 경우
//});

// 모든 get 요청에 대해 실행 , 이코드가 맨 위에 있으면 이 코드에서 모든 get 요청이 중단 되기 때문에 
// 아래쪽 위치가 좋다.
// 따라서 와일드카드 또는 범위가 넓은 라우터들은 아래 위치가 좋다.


app.use((req,res,next)=>{
    res.status(200).send('404 에러');  
}) // 해당 경로가 없는 경우 실행

app.use('*',(err,req,res,next)=>{
    console.error(err);
    res.status(200).send('에러 발생했어요');
})
// 에러 에서는 위 4개의 매개변수를 모두 써야한다. (에러 처리 미들웨어)
// 위에서 throw new Error 코드 실행시 발생




app.listen(app.get('port'),()=>{  // 이런식으로 위에서의 port 속성을 가져올 수 있다.
    console.log('익스프레스 서버 실행');
});
  
