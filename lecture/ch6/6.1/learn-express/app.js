const { error } = require('console');
const express = require('express') // express 모듈을 가져온다.
// express 또한 내부에서 http 메서드를 쓰고 있다.

const path = require('path')
// 아래의 path.join 함수를 쓰기위해 path 모듈을 불러옴


const app = express(); // app을 하나 가져옴


app.set('port',process.env.PORT||3000); // port 라는 속성을 3000으로 만듬
// 이때 process.env를 많이 쓸것인데 기본적으로 port는 process.env.PORT를 입력하지 않으면 3000



app.use('/',(req,res,next)=>{ // '/' 생략 가능
    console.log('1 요청 실행');
    next();
},
//(req,res)=>{
//    throw new Error('에러 발생함');
//}
)

app.use('/about',(req,res,next)=>{
    console.log('about경로 요청입니다.');
    next();
})
// 이 부분에서 매개변수를 포함한 함수가 미들웨어 이고
// 그 미들웨어를 app.use에 장착을 한 것이다. 
// app.use는 next를 이용하여 지정된 장소로 옮기는 미들웨어 역할을 부여 가능



app.get('/',(req,res)=>{
    //res.sendFile(path.join(__dirname,'./index.html')); // 여기서 응답 보내고 끝남
   // res.send('안녕하세요'); // 그런데 한번 더 보내려고 하는 것임
    //res.json({'hello':'me'}); 
    res.setHeader('Content-Type','text/html');
    res.status(200).send('안녕하세요');
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
// 에러 에서는 위 4개의 매개변수를 모두 써야한다.
// 위에서 throw new Error 코드 실행시 발생




app.listen(app.get('port'),()=>{  // 이런식으로 위에서의 port 속성을 가져올 수 있다.
    console.log('익스프레스 서버 실행');
});
  
