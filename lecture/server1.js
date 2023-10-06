const http=require('http');

const server =http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'}); 
    res.write('<h1>Hello Node!</h1>');
    res.write('<p>hello server</p>');
    res.end('<p>Hello me!</p>');

    // 위 경우도 스트림의 한 종류이다. 

})// 우리가 만든 서버로 요청이 오면 이 함수가 실행된다.

    .listen(8080);

   /* .listen(8080,()=>{

        console.log('8080 포트에서 대기 중 입니다.'); // listen에 대한 콜백
    });*/

    // 서버도 프로그램이기 때문에 이것이 실행되면 프로세스로 올려줘야한다. 포트를 잡아 먹는다.
    // listen을 하는 경우에는 터미널 하나를 잡아먹는다.

server.on('listening',()=>{
    console.log('8080 포트에서 대기 중 입니다.'); // listen에 대한 콜백
})
server.on('error',(error)=>{
    console.log(error);
})
