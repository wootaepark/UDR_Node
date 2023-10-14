const express = require('express') // express 모듈을 가져온다.
// express 또한 내부에서 http 메서드를 쓰고 있다.

const path = require('path')


const app = express(); // app을 하나 가져옴


app.set('port',process.env.PORT||3000); // port 라는 속성을 3000으로 만듬
// 이때 process.env를 많이 쓸것인데 기본적으로 port는 process.env.PORT를 입력하지 않으면 3000
// 나중에 설정 방법을 배울 것임

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./index.html')); // 이런식으로 index.html에 접근 가능
});

app.post('/',(req,res)=>{
    res.send('hello express');
});

// 위처럼 http에서 처럼 if 문 쓰지 않고 바로 메소드 별로 구별하여 사용할 수 있는 장점

app.listen(app.get('port'),()=>{  // 이런식으로 위에서의 port 속성을 가져올 수 있다.
    console.log('익스프레스 서버 실행');
});
  
